export interface App {
  name: string
  url: string
  tags: string[]
  github?: string       // "owner/repo" format
  description?: string  // short description / GitHub about
  dateAdded?: string    // ISO date string, e.g. "2026-05-25"
}

export interface RepoData {
  stars: number
  fetchedAt: number
}

export interface CachedRepoData {
  [repo: string]: RepoData
}

export interface CachedUserStars {
  repos: string[]
  fetchedAt: number
}
