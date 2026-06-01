# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check + production build (outputs to dist/)
npm run test       # Validate apps.json schema (scripts/validate-data.js)
npm run lint       # ESLint over src/
npm run preview    # Serve the production build locally
```

Run `npm run test` after any edit to `public/data/apps.json` to catch schema violations before committing.

## Architecture

This is a single-page React + TypeScript app with **no backend** — all data is static JSON served as a GitHub Pages site at `/FOAMapps/`.

### Data layer

- **`public/data/apps.json`** is the entire database. The `App` type in `src/types/index.ts` is the authoritative schema.
- Required fields: `name`, `url`, `tags` (free-form strings), `category` (`clinical | education | data`), `languages` (ISO 639-1 codes).
- Optional fields: `github` (`"owner/repo"` format — enables live star counts), `description`, `dateAdded` (YYYY-MM-DD), `access` (`open | credentialed | restricted`), `dataType`.
- `scripts/validate-data.js` enforces the schema and rejects unknown keys — run it after editing `apps.json`.

### State & persistence

All application state lives in `App.tsx` (no external state library). User preferences are persisted to `localStorage` under these keys:

| Key | Contents |
|-----|----------|
| `foamapps_github_username` | Linked GitHub username |
| `foamapps_repo_cache` | Star counts per repo (1-hour TTL) |
| `foamapps_stars_<username>` | Repos starred by user (5-minute TTL) |
| `foamapps_local_stars` | Locally starred apps (no GitHub repo) |
| `foamapps_mystar_filter` | Whether "My Stars" filter is active |
| `foamapps_sort` | Active sort option |
| `foamapps_language_prefs` | Selected language filters |

### GitHub integration

`src/hooks/useGitHubData.ts` handles all GitHub API calls:
- Fetches star counts for every app that has a `github` field, in batches of 5 with a 200ms delay between batches.
- Fetches all repos starred by the linked GitHub user (paginates 100 at a time).
- Both are cached in `localStorage` with TTLs above. Rate-limit responses (403/429) set a `rateLimited` flag displayed in the UI.

### Internationalization

- `src/i18n.ts` defines the `Translations` interface and all locale objects (English is the fallback).
- `src/TranslationContext.tsx` exposes a `useT()` hook — use this in every component instead of hardcoding strings.
- UI language is detected from `navigator.languages` at startup via `getUiLanguage()` in `i18n.ts`.
- `src/constants.ts` holds `LANGUAGE_NAMES` and `LANGUAGE_FLAGS` maps (ISO 639-1 → display name/flag) used for the language filter UI.

### Categories vs. tags

- **`category`** is a typed, fixed enum (`clinical | education | data`) used for the top-level tab navigation in `CategoryTabs.tsx`.
- **`tags`** are free-form strings used for the secondary tag-filter chips in `TagFilter.tsx`. Tags are derived dynamically from the data — no allowlist is enforced in the app (only the validator enforces types).

### PWA

The app is a full PWA via `vite-plugin-pwa`. The service worker (`dist/sw.js`) is auto-generated at build time using Workbox in `generateSW` mode — do not edit it directly. PWA config lives in `vite.config.ts`. Icons are at `public/icon-192.png` and `public/icon-512.png`.

### Deployment

GitHub Actions deploys the `dist/` output to GitHub Pages on every push to `main`. The Vite `base` is set to `/FOAMapps/` — all asset paths and the PWA `start_url`/`scope` must use this prefix.
