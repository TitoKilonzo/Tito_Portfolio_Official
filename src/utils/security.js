/**
 * Security utilities — XSS prevention via DOMPurify
 */
import DOMPurify from 'dompurify'

/** Sanitize a raw HTML string from external APIs */
export function sanitizeHTML(dirty) {
  if (typeof dirty !== 'string') return ''
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b','i','em','strong','a','br','p','ul','li','code','pre','span'],
    ALLOWED_ATTR: ['href','target','rel','class'],
    FORCE_BODY: true,
  })
}

/** Strip ALL HTML tags — returns plain text only */
export function sanitizeText(dirty) {
  if (typeof dirty !== 'string') return ''
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}

/** Session-cache with TTL (ms) — no sensitive data, just API responses */
export function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { data, expires } = JSON.parse(raw)
    if (Date.now() > expires) { sessionStorage.removeItem(key); return null }
    return data
  } catch { return null }
}

export function cacheSet(key, data, ttlMs = 3_600_000) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, expires: Date.now() + ttlMs }))
  } catch { /* storage full — degrade gracefully */ }
}
