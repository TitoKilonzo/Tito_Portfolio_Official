import AnimatedBackground from '../components/AnimatedBackground'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ExternalLink, RefreshCw, Tag, Shield, Cpu, Code2 } from 'lucide-react'
import useTechBlog from '../hooks/useTechBlog'

const PAGE = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const CAT_META = {
  Cybersecurity: { color: '#00ff88', icon: Shield },
  Technology:    { color: '#38d2f7', icon: Cpu },
  Dev:           { color: '#a855f7', icon: Code2 },
}

function ShimmerCard() {
  return (
    <div style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)',
      background: 'var(--bg-card)', overflow: 'hidden' }}>
      <div className="shimmer" style={{ height: 180 }} />
      <div style={{ padding: 20 }}>
        <div className="shimmer" style={{ height: 12, width: '40%', marginBottom: 10, borderRadius: 4 }} />
        <div className="shimmer" style={{ height: 16, width: '90%', marginBottom: 8, borderRadius: 4 }} />
        <div className="shimmer" style={{ height: 12, width: '75%', borderRadius: 4 }} />
      </div>
    </div>
  )
}

function ArticleCard({ article, index }) {
  const cat  = CAT_META[article.category] || CAT_META.Dev
  const Icon = cat.icon
  const date = new Date(article.publishedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }} viewport={{ once: true }}>
      <motion.a
        href={article.url} target="_blank" rel="noopener noreferrer"
        whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
        style={{ display: 'block', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
          background: 'var(--bg-card)', overflow: 'hidden', height: '100%',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          transition: 'border-color 0.3s', textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = cat.color + '50'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {/* Cover Image */}
        <div style={{ height: 180, overflow: 'hidden', position: 'relative',
          background: 'var(--bg-tertiary)' }}>
          {article.cover ? (
            <img src={article.cover} alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${cat.color}18, transparent)` }}>
              <Icon size={40} color={cat.color} style={{ opacity: 0.4 }} />
            </div>
          )}
          {/* Category badge overlay */}
          <div style={{ position: 'absolute', top: 12, left: 12,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
            border: `1px solid ${cat.color}40`,
            padding: '4px 10px', borderRadius: 99,
            display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon size={11} color={cat.color} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: cat.color,
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>{article.category}</span>
          </div>
          {/* Read time */}
          <div style={{ position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
            padding: '4px 10px', borderRadius: 99 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={10} /> {article.readTime} min
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 20px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.98rem',
            color: 'var(--text)', marginBottom: 8, lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.title}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 14,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.description}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
              {article.tags.slice(0, 3).map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  padding: '2px 8px', borderRadius: 99,
                  background: `${cat.color}14`, color: cat.color }}>#{t}</span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {article.authorAvatar && (
                <img src={article.authorAvatar} alt={article.author} loading="lazy"
                  style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
              )}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {article.author}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>{date}</span>
              <ExternalLink size={12} color={cat.color} />
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}

export default function Blog() {
  const { articles, loading, error } = useTechBlog()
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Cybersecurity', 'Technology', 'Dev']
  const filtered   = filter === 'All' ? articles : articles.filter(a => a.category === filter)

  return (
    <motion.main variants={PAGE} initial="initial" animate="animate" exit="exit"
      className="page-wrap">
      <AnimatedBackground variant="blog" />

      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 48 }}>
            <span className="section-tag">Tech & Cyber Blog</span>
            <h1 className="section-title">Emerging Trends & Insights</h1>
            <p className="section-desc">
              Auto-curated daily articles on cybersecurity, technology, and development — sourced from Dev.to.
            </p>
          </motion.div>

          {/* Live indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28,
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)',
              animation: 'pulse-glow 2s ease-in-out infinite' }} />
            Live feed — updated hourly from Dev.to API
          </motion.div>

          {/* Category filter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:36, overflowX:'auto', paddingBottom:4 }}>
            {categories.map(cat => {
              const meta = CAT_META[cat]
              const Icon = meta?.icon
              return (
                <button key={cat} onClick={() => setFilter(cat)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 16px', borderRadius: 99, cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    border: `1px solid ${filter === cat ? (meta?.color || 'var(--primary)') : 'var(--border)'}`,
                    background: filter === cat ? `${meta?.color || 'var(--primary)'}18` : 'transparent',
                    color: filter === cat ? (meta?.color || 'var(--primary)') : 'var(--text-muted)',
                    transition: 'var(--transition)',
                  }}>
                  {Icon && <Icon size={13} />} {cat}
                </button>
              )
            })}
          </motion.div>

          {/* Error state */}
          {error && (
            <div style={{ textAlign: 'center', padding: 80 }}>
              <RefreshCw size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Failed to load articles from Dev.to API.</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-faint)' }}>{error}</p>
            </div>
          )}

          {/* Articles grid */}
          <div className="card-grid">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => <ShimmerCard key={i} />)
              : filtered.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))
            }
          </div>

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
              No articles found in <strong style={{ color: 'var(--primary)' }}>{filter}</strong>.
            </div>
          )}

          {/* Attribution */}
          {!loading && !error && filtered.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginTop: 48, fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              Articles sourced from{' '}
              <a href="https://dev.to" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--primary)' }}>Dev.to</a>. Content belongs to respective authors.
            </motion.div>
          )}
        </div>
      </section>
    </motion.main>
  )
}
