import { useState, useEffect, useCallback } from 'react'
import type { App, CachedRepoData, CachedUserStars } from '../types'

const REPO_CACHE_TTL = 60 * 60 * 1000       // 1 hour
const STARS_CACHE_TTL = 5 * 60 * 1000        // 5 minutes
const REPO_CACHE_KEY = 'foamapps_repo_cache'
const STARS_CACHE_PREFIX = 'foamapps_stars_'

function loadRepoCache(): CachedRepoData {
  try {
    const raw = localStorage.getItem(REPO_CACHE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveRepoCache(cache: CachedRepoData) {
  try {
    localStorage.setItem(REPO_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage unavailable
  }
}

function loadUserStarsCache(username: string): CachedUserStars | null {
  try {
    const raw = localStorage.getItem(`${STARS_CACHE_PREFIX}${username}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveUserStarsCache(username: string, data: CachedUserStars) {
  try {
    localStorage.setItem(`${STARS_CACHE_PREFIX}${username}`, JSON.stringify(data))
  } catch {
    // localStorage unavailable
  }
}

function formatStarCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function useGitHubData(apps: App[], githubUsername: string) {
  const [repoStars, setRepoStars] = useState<Record<string, string>>({})
  const [userStarred, setUserStarred] = useState<Set<string>>(new Set())
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [loadingUserStars, setLoadingUserStars] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  // Fetch star counts for all apps with github repos
  useEffect(() => {
    const repos = apps.map(a => a.github).filter((g): g is string => !!g)
    if (repos.length === 0) return

    const cache = loadRepoCache()
    const now = Date.now()
    const stale = repos.filter(
      r => !cache[r] || now - cache[r].fetchedAt > REPO_CACHE_TTL
    )

    // Populate from fresh cache immediately
    const initial: Record<string, string> = {}
    for (const repo of repos) {
      if (cache[repo]) initial[repo] = formatStarCount(cache[repo].stars)
    }
    if (Object.keys(initial).length > 0) setRepoStars(initial)

    if (stale.length === 0) return

    setLoadingRepos(true)

    const fetchRepo = async (repo: string) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`)
        if (res.status === 403 || res.status === 429) {
          setRateLimited(true)
          return null
        }
        if (!res.ok) return null
        const data = await res.json()
        return { repo, stars: data.stargazers_count as number }
      } catch {
        return null
      }
    }

    // Fetch in batches of 5 to be courteous with the API
    const BATCH = 5
    let cancelled = false

    const run = async () => {
      const updatedCache = { ...loadRepoCache() }
      const now = Date.now()

      for (let i = 0; i < stale.length; i += BATCH) {
        if (cancelled) break
        const batch = stale.slice(i, i + BATCH)
        const results = await Promise.all(batch.map(fetchRepo))

        for (const result of results) {
          if (result) {
            updatedCache[result.repo] = { stars: result.stars, fetchedAt: now }
          }
        }

        saveRepoCache(updatedCache)
        setRepoStars(prev => {
          const next = { ...prev }
          for (const result of results) {
            if (result) next[result.repo] = formatStarCount(result.stars)
          }
          return next
        })

        // Small delay between batches to avoid hammering the API
        if (i + BATCH < stale.length) {
          await new Promise(r => setTimeout(r, 200))
        }
      }

      if (!cancelled) setLoadingRepos(false)
    }

    run()
    return () => { cancelled = true }
  }, [apps])

  // Fetch repos starred by the given GitHub user
  const fetchUserStars = useCallback(async (username: string) => {
    if (!username) return

    const cached = loadUserStarsCache(username)
    if (cached && Date.now() - cached.fetchedAt < STARS_CACHE_TTL) {
      setUserStarred(new Set(cached.repos))
      return
    }

    setLoadingUserStars(true)
    const allStarred: string[] = []
    let page = 1

    try {
      while (true) {
        const res = await fetch(
          `https://api.github.com/users/${username}/starred?per_page=100&page=${page}`
        )
        if (res.status === 403 || res.status === 429) {
          setRateLimited(true)
          break
        }
        if (!res.ok) break

        const data = await res.json()
        if (!Array.isArray(data) || data.length === 0) break

        for (const repo of data) {
          allStarred.push(repo.full_name as string)
        }

        if (data.length < 100) break
        page++
      }
    } catch {
      // network error – use whatever we got
    }

    const cacheEntry: CachedUserStars = { repos: allStarred, fetchedAt: Date.now() }
    saveUserStarsCache(username, cacheEntry)
    setUserStarred(new Set(allStarred))
    setLoadingUserStars(false)
  }, [])

  useEffect(() => {
    if (githubUsername) fetchUserStars(githubUsername)
  }, [githubUsername, fetchUserStars])

  return { repoStars, userStarred, loadingRepos, loadingUserStars, rateLimited, fetchUserStars }
}
