import { useState, useEffect, useMemo } from "react";
import type { App, AppCategory } from "./types";
import { useGitHubData } from "./hooks/useGitHubData";
import AppCard from "./components/AppCard";
import SearchBar from "./components/SearchBar";
import TagFilter from "./components/TagFilter";
import LanguageFilter from "./components/LanguageFilter";
import CategoryTabs from "./components/CategoryTabs";
import InfoModal from "./components/InfoModal";
import AccountModal from "./components/AccountModal";
import AppDetailModal from "./components/AppDetailModal";

const SUBMIT_EMAIL = "ovsak.gavin@gmail.com";
const USERNAME_KEY = "foamapps_github_username";
const MYSTAR_FILTER_KEY = "foamapps_mystar_filter";
const LOCAL_STARS_KEY = "foamapps_local_stars";
const SORT_KEY = "foamapps_sort";
const LANG_PREFS_KEY = "foamapps_language_prefs";

type SortOption =
  | "default"
  | "date-asc"
  | "date-desc"
  | "stars-asc"
  | "stars-desc";

type CategoryOrAll = AppCategory | "all";

function load<T>(key: string, fallback: T, parse: (v: string) => T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* noop */
  }
}

function parseStarCount(s: string | undefined): number {
  if (!s) return -1;
  if (s.endsWith("k")) return parseFloat(s) * 1000;
  return parseFloat(s);
}

function getBrowserLanguages(): Set<string> {
  try {
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language ?? "en"];
    return new Set(langs.map((l) => l.split("-")[0].toLowerCase()));
  } catch {
    return new Set(["en"]);
  }
}

export default function App() {
  const [apps, setApps] = useState<App[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [activeLanguages, setActiveLanguages] = useState<Set<string>>(
    new Set()
  );
  const [activeCategory, setActiveCategory] = useState<CategoryOrAll>("all");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [githubUsername, setGithubUsername] = useState(() =>
    load(USERNAME_KEY, "", (v) => v)
  );
  const [myStarFilter, setMyStarFilter] = useState(() =>
    load(MYSTAR_FILTER_KEY, false, (v) => v === "true")
  );
  const [localStarred, setLocalStarred] = useState<Set<string>>(() =>
    load(LOCAL_STARS_KEY, new Set<string>(), (v) => new Set(JSON.parse(v)))
  );
  const [sort, setSort] = useState<SortOption>(() =>
    load(SORT_KEY, "stars-desc" as SortOption, (v) => v as SortOption)
  );
  const [showFilters, setShowFilters] = useState(false);
  const [languagePrefs, setLanguagePrefs] = useState<string[]>(() =>
    load(LANG_PREFS_KEY, [], (v) => JSON.parse(v) as string[])
  );

  const { repoStars, userStarred, loadingUserStars, rateLimited } =
    useGitHubData(apps, githubUsername);

  // Browser language auto-detection (for sort boost when no prefs set)
  const browserLanguages = useMemo(() => getBrowserLanguages(), []);

  // Effective language preference: explicit prefs > browser detection
  const effectiveLanguages = useMemo<Set<string>>(() => {
    if (languagePrefs.length > 0) return new Set(languagePrefs);
    return browserLanguages;
  }, [languagePrefs, browserLanguages]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/apps.json`)
      .then((r) => r.json())
      .then((data: App[]) => {
        setApps(data);
        setLoadingApps(false);
      })
      .catch(() => setLoadingApps(false));
  }, []);

  const handleSetUsername = (u: string) => {
    setGithubUsername(u);
    save(USERNAME_KEY, u);
  };

  const toggleMyStarFilter = () => {
    const next = !myStarFilter;
    setMyStarFilter(next);
    save(MYSTAR_FILTER_KEY, String(next));
  };

  const toggleLocalStar = (url: string) => {
    setLocalStarred((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      save(LOCAL_STARS_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const handleSortChange = (next: SortOption) => {
    setSort(next);
    save(SORT_KEY, next);
  };

  const handleSaveLanguagePrefs = (langs: string[]) => {
    setLanguagePrefs(langs);
    save(LANG_PREFS_KEY, JSON.stringify(langs));
  };

  const toggleLanguage = (code: string) =>
    setActiveLanguages((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });

  // Apps filtered to the active category (base for tags + language counts)
  const categoryFilteredApps = useMemo(() => {
    if (activeCategory === "all") return apps;
    return apps.filter((app) => app.category === activeCategory);
  }, [apps, activeCategory]);

  // Tag counts derived from category-scoped apps
  const allTags = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryFilteredApps.forEach((app) =>
      app.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      })
    );
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [categoryFilteredApps]);

  // Language counts derived from category-scoped apps
  const allLanguages = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryFilteredApps.forEach((app) =>
      app.languages.forEach((lang) => {
        counts[lang] = (counts[lang] || 0) + 1;
      })
    );
    return Object.entries(counts)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count);
  }, [categoryFilteredApps]);

  // Category counts for the tabs
  const categoryCounts = useMemo(() => {
    const counts = { all: apps.length, clinical: 0, education: 0, data: 0 };
    apps.forEach((app) => {
      if (app.category in counts)
        counts[app.category as AppCategory]++;
    });
    return counts;
  }, [apps]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });

  const handleCardTagClick = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.size === 1 && next.has(tag)) {
        next.delete(tag);
      } else {
        next.clear();
        next.add(tag);
      }
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = categoryFilteredApps.filter((app) => {
      if (myStarFilter) {
        if (app.github) {
          if (!githubUsername || !userStarred.has(app.github)) return false;
        } else {
          if (!localStarred.has(app.url)) return false;
        }
      }
      if (activeLanguages.size > 0 && !app.languages.some((l) => activeLanguages.has(l)))
        return false;
      if (activeTags.size > 0 && !app.tags.some((t) => activeTags.has(t)))
        return false;
      if (q) {
        const inName = app.name.toLowerCase().includes(q);
        const inTags = app.tags.some((t) => t.toLowerCase().includes(q));
        if (!inName && !inTags) return false;
      }
      return true;
    });

    // Base sort
    if (sort === "date-asc") {
      result = [...result].sort((a, b) =>
        (a.dateAdded ?? "").localeCompare(b.dateAdded ?? "")
      );
    } else if (sort === "date-desc") {
      result = [...result].sort((a, b) =>
        (b.dateAdded ?? "").localeCompare(a.dateAdded ?? "")
      );
    } else if (sort === "stars-asc") {
      result = [...result].sort(
        (a, b) =>
          parseStarCount(a.github ? repoStars[a.github] : undefined) -
          parseStarCount(b.github ? repoStars[b.github] : undefined)
      );
    } else if (sort === "stars-desc") {
      result = [...result].sort(
        (a, b) =>
          parseStarCount(b.github ? repoStars[b.github] : undefined) -
          parseStarCount(a.github ? repoStars[a.github] : undefined)
      );
    }

    // Language boost: apps matching user's preferred languages float up,
    // but only when not already filtering by language (filter already handles it)
    if (activeLanguages.size === 0) {
      const preferredLangs = effectiveLanguages;
      const hasNonEnglishPref = [...preferredLangs].some((l) => l !== "en");
      if (hasNonEnglishPref) {
        result = [...result].sort((a, b) => {
          const aM = a.languages.some((l) => preferredLangs.has(l));
          const bM = b.languages.some((l) => preferredLangs.has(l));
          return Number(bM) - Number(aM);
        });
      }
    }

    // Starred always float to top (stable — preserves sort within each group)
    result = [...result].sort((a, b) => {
      const aStarred = !!(a.github
        ? userStarred.has(a.github)
        : localStarred.has(a.url));
      const bStarred = !!(b.github
        ? userStarred.has(b.github)
        : localStarred.has(b.url));
      return Number(bStarred) - Number(aStarred);
    });

    return result;
  }, [
    categoryFilteredApps,
    search,
    activeTags,
    activeLanguages,
    myStarFilter,
    githubUsername,
    userStarred,
    localStarred,
    sort,
    repoStars,
    effectiveLanguages,
  ]);

  const activeFilterCount = activeTags.size + activeLanguages.size;

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "date-desc", label: "Newest first" },
    { value: "date-asc", label: "Oldest first" },
    { value: "stars-desc", label: "Most stars" },
    { value: "stars-asc", label: "Fewest stars" },
  ];

  return (
    <div className="flex flex-col h-screen h-dvh bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm z-40 shrink-0">
        {/* Top row: branding + actions */}
        <div className="max-w-6xl mx-auto px-4 pt-3 pb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚕️</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">
                FOAM Apps
              </h1>
              <p className="text-xs text-gray-400 leading-none mt-0.5">
                Free Open Access Medical Apps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {rateLimited && (
              <span className="hidden sm:inline-flex items-center text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
                GitHub rate limit reached
              </span>
            )}

            {/* My Stars toggle */}
            <button
              onClick={toggleMyStarFilter}
              title="Filter by My Stars"
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                myStarFilter
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg
                className={`w-4 h-4 ${myStarFilter ? "fill-amber-500 text-amber-500" : "text-gray-400"}`}
                viewBox="0 0 20 20"
                fill={myStarFilter ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={myStarFilter ? 0 : 1.5}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="hidden sm:inline">My Stars</span>
              {loadingUserStars && (
                <svg
                  className="w-3 h-3 animate-spin text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              )}
            </button>

            {/* Account button (GitHub + language prefs) */}
            <button
              onClick={() => setShowAccountModal(true)}
              title={githubUsername ? `Account (@${githubUsername})` : "Account"}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {githubUsername && (
                <span className="hidden sm:inline">@{githubUsername}</span>
              )}
              {languagePrefs.length > 0 && (
                <span className="text-violet-500 font-medium hidden sm:inline">
                  · {languagePrefs.length} lang{languagePrefs.length > 1 ? "s" : ""}
                </span>
              )}
            </button>

            {/* Info button */}
            <button
              onClick={() => setShowInfoModal(true)}
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Info"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search row */}
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            title="Toggle filters"
            className={`flex items-center gap-1.5 shrink-0 text-sm font-medium px-3 py-2.5 rounded-xl border transition-colors ${
              showFilters || activeFilterCount > 0
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            <span className="hidden sm:inline">Filter</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Category tabs */}
        <div className="max-w-6xl mx-auto px-4 pb-2.5">
          <CategoryTabs
            active={activeCategory}
            onChange={(cat) => {
              setActiveCategory(cat);
              setActiveTags(new Set());
              setActiveLanguages(new Set());
            }}
            counts={categoryCounts}
          />
        </div>

        {/* Collapsible filters */}
        {showFilters && (
          <div className="max-w-6xl mx-auto px-4 pb-3 space-y-2">
            <LanguageFilter
              languages={allLanguages}
              activeLanguages={activeLanguages}
              onToggle={toggleLanguage}
              onClear={() => setActiveLanguages(new Set())}
            />
            <TagFilter
              allTags={allTags}
              activeTags={activeTags}
              onToggle={toggleTag}
              onClear={() => setActiveTags(new Set())}
            />
          </div>
        )}
      </header>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          {/* Results count + sort */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-gray-400">
              {loadingApps
                ? "Loading apps…"
                : `${filtered.length} of ${apps.length} apps`}
              {myStarFilter && (
                <span className="ml-1 text-amber-600 font-medium">
                  · filtered by your stars
                </span>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {loadingApps ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 h-36 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm">No apps match your filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveTags(new Set());
                  setActiveLanguages(new Set());
                  setActiveCategory("all");
                  setMyStarFilter(false);
                  save(MYSTAR_FILTER_KEY, "false");
                }}
                className="mt-2 text-sm text-blue-500 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((app) => (
                <AppCard
                  key={app.name}
                  app={app}
                  stars={app.github ? repoStars[app.github] : undefined}
                  isUserStarred={!!app.github && userStarred.has(app.github)}
                  isLocalStarred={!app.github && localStarred.has(app.url)}
                  onToggleLocalStar={() => toggleLocalStar(app.url)}
                  onOpenDetail={() => setSelectedApp(app)}
                  activeTag={activeTags.size === 1 ? [...activeTags][0] : null}
                  onTagClick={handleCardTagClick}
                />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-300 py-8 max-w-6xl mx-auto w-full">
          <a
            href="https://github.com/GavinOvsak/FOAMapps"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors"
          >
            github.com/GavinOvsak/FOAMapps
          </a>
          {" · "}
          <a
            href={`mailto:${SUBMIT_EMAIL}`}
            className="hover:text-gray-500 transition-colors"
          >
            Submit an app
          </a>
        </footer>
      </div>

      {/* Modals */}
      {showInfoModal && (
        <InfoModal
          onClose={() => setShowInfoModal(false)}
          submitEmail={SUBMIT_EMAIL}
        />
      )}
      {showAccountModal && (
        <AccountModal
          currentUsername={githubUsername}
          onSaveUsername={handleSetUsername}
          languagePrefs={languagePrefs}
          onSaveLanguagePrefs={handleSaveLanguagePrefs}
          availableLanguages={allLanguages.map((l) => l.code)}
          loadingStars={loadingUserStars}
          onClose={() => setShowAccountModal(false)}
        />
      )}
      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}
