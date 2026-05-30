export type AppCategory = 'clinical' | 'education' | 'data'
export type DataAccess = 'open' | 'credentialed' | 'restricted'

export interface App {
  name: string
  url: string
  tags: string[]
  category: AppCategory[]
  languages: string[]       // ISO 639-1 codes, e.g. ["en", "es"]
  github?: string           // "owner/repo" format
  description?: string
  dateAdded?: string        // YYYY-MM-DD
  access?: DataAccess       // data resources only
  dataType?: string[]       // data resources only
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
