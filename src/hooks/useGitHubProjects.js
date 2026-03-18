import { useState, useEffect } from 'react'
import { cacheGet, cacheSet, sanitizeText } from '../utils/security'

const GITHUB_USER = 'TitoKilonzo'
const CACHE_KEY   = 'gh_repos_v2'
const TTL_MS      = 60 * 60 * 1000 // 1 hour

export default function useGitHubProjects() {
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const cached = cacheGet(CACHE_KEY)
    if (cached) { setRepos(cached); setLoading(false); return }

    const controller = new AbortController()

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=18&type=public`,
          { signal: controller.signal, headers: { 'Accept': 'application/vnd.github.v3+json' } }
        )
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        const raw = await res.json()

        const cleaned = raw
          .filter(r => !r.fork && r.name !== GITHUB_USER)
          .map(r => ({
            id:          r.id,
            name:        sanitizeText(r.name),
            description: sanitizeText(r.description || ''),
            url:         r.html_url,
            homepage:    r.homepage ? sanitizeText(r.homepage) : null,
            language:    sanitizeText(r.language || ''),
            stars:       r.stargazers_count,
            forks:       r.forks_count,
            topics:      (r.topics || []).map(t => sanitizeText(t)),
            updated:     r.updated_at,
          }))

        cacheSet(CACHE_KEY, cleaned, TTL_MS)
        setRepos(cleaned)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
    return () => controller.abort()
  }, [])

  return { repos, loading, error }
}
