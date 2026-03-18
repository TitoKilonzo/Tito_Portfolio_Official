import { useState, useEffect } from 'react'
import { cacheGet, cacheSet, sanitizeText } from '../utils/security'

const DEVTO_BASE = 'https://dev.to/api/articles'
const CACHE_KEY  = 'tech_blog_v2'
const TTL_MS     = 60 * 60 * 1000 // 1 hour

async function fetchDevTo(tag, perPage = 6) {
  const res = await fetch(
    `${DEVTO_BASE}?tag=${tag}&per_page=${perPage}&state=rising`,
    { headers: { 'Accept': 'application/json' } }
  )
  if (!res.ok) throw new Error(`Dev.to API ${res.status}`)
  return res.json()
}

function mapArticle(a, category) {
  return {
    id:          a.id,
    title:       sanitizeText(a.title),
    description: sanitizeText(a.description || ''),
    url:         sanitizeText(a.url),
    cover:       a.cover_image || a.social_image || null,
    tags:        (a.tag_list || []).map(t => sanitizeText(t)),
    readTime:    a.reading_time_minutes || 3,
    publishedAt: a.published_at,
    author:      sanitizeText(a.user?.name || 'Dev.to'),
    authorAvatar:a.user?.profile_image_90 || null,
    category,
  }
}

export default function useTechBlog() {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    const cached = cacheGet(CACHE_KEY)
    if (cached) { setArticles(cached); setLoading(false); return }

    const controller = new AbortController()

    async function fetchAll() {
      try {
        const [secPosts, techPosts, devPosts] = await Promise.allSettled([
          fetchDevTo('cybersecurity', 6),
          fetchDevTo('technology', 4),
          fetchDevTo('programming', 4),
        ])

        const all = [
          ...(secPosts.status  === 'fulfilled' ? secPosts.value.map(a  => mapArticle(a, 'Cybersecurity')) : []),
          ...(techPosts.status === 'fulfilled' ? techPosts.value.map(a => mapArticle(a, 'Technology'))   : []),
          ...(devPosts.status  === 'fulfilled' ? devPosts.value.map(a  => mapArticle(a, 'Dev'))          : []),
        ]

        const unique = all.filter((a, i, arr) => arr.findIndex(b => b.id === a.id) === i)
        cacheSet(CACHE_KEY, unique, TTL_MS)
        setArticles(unique)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
    return () => controller.abort()
  }, [])

  return { articles, loading, error }
}
