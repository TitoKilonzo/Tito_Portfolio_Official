import AnimatedBackground from '../components/AnimatedBackground'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, Code2, RefreshCw } from 'lucide-react'
import useGitHubProjects from '../hooks/useGitHubProjects'
import WaveCard from '../components/WaveCard'

const PAGE = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const LANG_COLORS = {
  Python: '#3776ab', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Kotlin: '#7f52ff', Dart: '#00b4ab',
}

function LangDot({ lang }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%',
        background: LANG_COLORS[lang] || 'var(--text-faint)' }} />
      {lang}
    </span>
  )
}

function ShimmerCard() {
  return (
    <div style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)',
      padding: '24px', background: 'var(--bg-card)', overflow: 'hidden' }}>
      <div className="shimmer" style={{ height: 16, width: '60%', marginBottom: 12 }} />
      <div className="shimmer" style={{ height: 12, width: '90%', marginBottom: 8 }} />
      <div className="shimmer" style={{ height: 12, width: '75%', marginBottom: 20 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="shimmer" style={{ height: 22, width: 60, borderRadius: 99 }} />
        <div className="shimmer" style={{ height: 22, width: 80, borderRadius: 99 }} />
      </div>
    </div>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGitHubProjects()
  const [filter, setFilter] = useState('All')

  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))]
  const filtered  = filter === 'All' ? repos : repos.filter(r => r.language === filter)

  return (
    <motion.main variants={PAGE} initial="initial" animate="animate" exit="exit"
      className="page-wrap">
      <AnimatedBackground variant="projects" />

      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <div>
              <span className="section-tag">GitHub Projects</span>
              <h1 className="section-title">What I've Built</h1>
              <p className="section-desc">
                Live-updated from{' '}
                <a href="https://github.com/TitoKilonzo" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--primary)' }}>@TitoKilonzo</a> — refreshed every hour.
              </p>
            </div>
            <a href="https://github.com/TitoKilonzo" target="_blank" rel="noopener noreferrer"
              className="btn-outline" style={{ alignSelf: 'flex-start', marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
              <Github size={16} /> View All on GitHub
            </a>
          </motion.div>

          {/* Language filter */}
          {!loading && !error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:36, overflowX:'auto', paddingBottom:4 }}>
              {languages.map(lang => (
                <button key={lang} onClick={() => setFilter(lang)}
                  style={{
                    padding: '7px 16px', borderRadius: 99, cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    border: `1px solid ${filter === lang ? 'var(--primary)' : 'var(--border)'}`,
                    background: filter === lang ? 'var(--primary-dim)' : 'transparent',
                    color: filter === lang ? 'var(--primary)' : 'var(--text-muted)',
                    transition: 'var(--transition)',
                  }}>
                  {lang}
                </button>
              ))}
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <div style={{ textAlign: 'center', padding: 80 }}>
              <RefreshCw size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: 'var(--text-muted)' }}>Failed to load projects — GitHub API limit may be reached.</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-faint)', marginTop: 8 }}>{error}</p>
            </div>
          )}

          {/* Grid */}
          <div className="card-grid">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => <ShimmerCard key={i} />)
              : filtered.map((repo, i) => (
                <motion.div key={repo.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <WaveCard style={{ height: '100%' }}>
                    <div className="glass" style={{ borderRadius: 'var(--radius)', padding: '22px 24px',
                      border: '1px solid var(--border)', height: '100%', display: 'flex',
                      flexDirection: 'column', transition: 'var(--transition)', cursor: 'default' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                      {/* Top */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        marginBottom: 12 }}>
                        <Code2 size={18} color="var(--primary)" />
                        <div style={{ display: 'flex', gap: 6 }}>
                          {repo.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                              style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}
                              onMouseEnter={e => e.currentTarget.style.color = 'var(--secondary)'}
                              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                              <ExternalLink size={15} />
                            </a>
                          )}
                          <a href={repo.url} target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            <Github size={15} />
                          </a>
                        </div>
                      </div>

                      <a href={repo.url} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.98rem',
                          color: 'var(--text)', marginBottom: 8, display: 'block',
                          transition: 'var(--transition)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}>
                        {repo.name.replace(/-/g, ' ')}
                      </a>

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6,
                        flex: 1, marginBottom: 16 }}>
                        {repo.description || 'No description provided.'}
                      </p>

                      {/* Topics */}
                      {repo.topics.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                          {repo.topics.slice(0, 4).map(t => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                        {repo.language ? <LangDot lang={repo.language} /> : <span />}
                        <div style={{ display: 'flex', gap: 12 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4,
                            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            <Star size={12} /> {repo.stars}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4,
                            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            <GitFork size={12} /> {repo.forks}
                          </span>
                        </div>
                      </div>
                    </div>
                  </WaveCard>
                </motion.div>
              ))
            }
          </div>

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
              No repositories found for <strong style={{ color: 'var(--primary)' }}>{filter}</strong>.
            </div>
          )}
        </div>
      </section>
    </motion.main>
  )
}
