import { useState, useEffect, useMemo } from "react";
import type { App } from "./types";
import { useGitHubData } from "./hooks/useGitHubData";
import AppCard from "./components/AppCard";
import SearchBar from "./components/SearchBar";
import TagFilter from "./components/TagFilter";
import InfoModal from "./components/InfoModal";
import MyStarsModal from "./components/MyStarsModal";
import AppDetailModal from "./components/AppDetailModal";

const SUBMIT_EMAIL = "ovsak.gavin@gmail.com";
const USERNAME_KEY = "foamapps_github_username";
const MYSTAR_FILTER_KEY = "foamapps_mystar_filter";
const LOCAL_STARS_KEY = "foamapps_local_stars";
const SORT_KEY = "foamapps_sort";

type SortOption =
  | "default"
  | "date-asc"
  | "date-desc"
  | "stars-asc"
  | "stars-desc";

function loadUsername(): string {
  try {
    return localStorage.getItem(USERNAME_KEY) ?? "";
  } catch {
    return "";
  }
}
function saveUsername(u: string) {
  try {
    localStorage.setItem(USERNAME_KEY, u);
  } catch {
    /* noop */
  }
}
function loadMyStarFilter(): boolean {
  try {
    return localStorage.getItem(MYSTAR_FILTER_KEY) === "true";
  } catch {
    return false;
  }
}
function saveMyStarFilter(v: boolean) {
  try {
    localStorage.setItem(MYSTAR_FILTER_KEY, String(v));
  } catch {
    /* noop */
  }
}
function loadLocalStars(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_STARS_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}
function saveLocalStars(stars: Set<string>) {
  try {
    localStorage.setItem(LOCAL_STARS_KEY, JSON.stringify([...stars]));
  } catch {
    /* noop */
  }
}
function loadSort(): SortOption {
  try {
    return (localStorage.getItem(SORT_KEY) as SortOption) ?? "stars-desc";
  } catch {
    return "stars-desc";
  }
}
function saveSort(v: SortOption) {
  try {
    localStorage.setItem(SORT_KEY, v);
  } catch {
    /* noop */
  }
}

function parseStarCount(s: string | undefined): number {
  if (!s) return -1;
  if (s.endsWith("k")) return parseFloat(s) * 1000;
  return parseFloat(s);
}

export default function App() {
  const [apps, setApps] = useState<App[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showMyStarsModal, setShowMyStarsModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [githubUsername, setGithubUsername] = useState(loadUsername);
  const [myStarFilter, setMyStarFilter] = useState(loadMyStarFilter);
  const [localStarred, setLocalStarred] = useState<Set<string>>(loadLocalStars);
  const [sort, setSort] = useState<SortOption>(loadSort);
  const [showFilters, setShowFilters] = useState(false);

  const { repoStars, userStarred, loadingUserStars, rateLimited } =
    useGitHubData(apps, githubUsername);

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
    saveUsername(u);
  };

  const toggleMyStarFilter = () => {
    const next = !myStarFilter;
    setMyStarFilter(next);
    saveMyStarFilter(next);
  };

  const toggleLocalStar = (url: string) => {
    setLocalStarred((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      saveLocalStars(next);
      return next;
    });
  };

  const handleSortChange = (next: SortOption) => {
    setSort(next);
    saveSort(next);
  };

  const allTags = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach((app) => {
      app.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
      });
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
    let result = apps.filter((app) => {
      if (myStarFilter) {
        if (app.github) {
          if (!githubUsername || !userStarred.has(app.github)) return false;
        } else {
          if (!localStarred.has(app.url)) return false;
        }
      }
      if (activeTags.size > 0 && !app.tags.some((t) => activeTags.has(t)))
        return false;
      if (q) {
        const inName = app.name.toLowerCase().includes(q);
        const inTags = app.tags.some((t) => t.toLowerCase().includes(q));
        if (!inName && !inTags) return false;
      }
      return true;
    });

    if (sort === "date-asc") {
      result = [...result].sort((a, b) =>
        (a.dateAdded ?? "").localeCompare(b.dateAdded ?? ""),
      );
    } else if (sort === "date-desc") {
      result = [...result].sort((a, b) =>
        (b.dateAdded ?? "").localeCompare(a.dateAdded ?? ""),
      );
    } else if (sort === "stars-asc") {
      result = [...result].sort(
        (a, b) =>
          parseStarCount(a.github ? repoStars[a.github] : undefined) -
          parseStarCount(b.github ? repoStars[b.github] : undefined),
      );
    } else if (sort === "stars-desc") {
      result = [...result].sort(
        (a, b) =>
          parseStarCount(b.github ? repoStars[b.github] : undefined) -
          parseStarCount(a.github ? repoStars[a.github] : undefined),
      );
    }

    // Always float starred apps to the top (stable — preserves sort within each group)
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
    apps,
    search,
    activeTags,
    myStarFilter,
    githubUsername,
    userStarred,
    localStarred,
    sort,
    repoStars,
  ]);

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "date-desc", label: "Newest first" },
    { value: "date-asc", label: "Oldest first" },
    { value: "stars-desc", label: "Most stars" },
    { value: "stars-asc", label: "Fewest stars" },
  ];

  return (
    <div className="flex flex-col h-screen h-dvh bg-slate-50">
      {/* Header — pinned by flex layout, not sticky */}
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

            {/* Edit GitHub username */}
            <button
              onClick={() => setShowMyStarsModal(true)}
              title={
                githubUsername
                  ? `GitHub: ${githubUsername}`
                  : "Set GitHub username for repo stars"
              }
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {githubUsername ? `@${githubUsername}` : "@"}
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
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-2">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            title="Toggle tag filters"
            className={`flex items-center gap-1.5 shrink-0 text-sm font-medium px-3 py-2.5 rounded-xl border transition-colors ${
              showFilters || activeTags.size > 0
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
            {activeTags.size > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {activeTags.size}
              </span>
            )}
          </button>
        </div>

        {/* Collapsible tag filters */}
        {showFilters && (
          <div className="max-w-6xl mx-auto px-4 pb-3">
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
                  • filtered by your stars
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
                  setMyStarFilter(false);
                  saveMyStarFilter(false);
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
      </div>{" "}
      {/* end scrollable area */}
      {/* Modals */}
      {showInfoModal && (
        <InfoModal
          onClose={() => setShowInfoModal(false)}
          submitEmail={SUBMIT_EMAIL}
        />
      )}
      {showMyStarsModal && (
        <MyStarsModal
          currentUsername={githubUsername}
          onSave={handleSetUsername}
          onClose={() => setShowMyStarsModal(false)}
          loading={loadingUserStars}
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
