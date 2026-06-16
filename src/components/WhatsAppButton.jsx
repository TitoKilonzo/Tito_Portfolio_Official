import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const phoneNumber = "254741563880"
  const message = "Hello Tito, I'm reaching out from your portfolio."

  useEffect(() => {
    // Show tooltip after a few seconds to grab attention
    const timer = setTimeout(() => setShowTooltip(true), 3500)
    const hideTimer = setTimeout(() => setShowTooltip(false), 12000)
    return () => { clearTimeout(timer); clearTimeout(hideTimer) }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(20px, 4vw, 30px)',
      right: 'clamp(20px, 4vw, 30px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 12,
      pointerEvents: 'none' // allow clicking through empty space
    }}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
              background: 'rgba(13,26,45,0.85)',
              border: '1px solid var(--border-hover)',
              padding: '14px 18px',
              borderRadius: 'var(--radius)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              position: 'relative',
              marginRight: 4,
              pointerEvents: 'auto'
            }}
          >
            <button 
              onClick={() => setShowTooltip(false)}
              style={{
                position: 'absolute', top: 4, right: 4,
                color: 'var(--text-faint)', padding: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}
            >
              <X size={12} />
            </button>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: '0.9rem', color: 'var(--text)', marginBottom: 4, paddingRight: 16
            }}>Let's Chat!</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>I'm available for new projects.</div>
            
            {/* Pointer triangle */}
            <div style={{
              position: 'absolute', bottom: -6, right: 22,
              width: 12, height: 12,
              background: 'rgba(13,26,45,0.85)',
              borderRight: '1px solid var(--border-hover)',
              borderBottom: '1px solid var(--border-hover)',
              transform: 'rotate(45deg)',
              backdropFilter: 'blur(20px)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        style={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: '#25D366', // Authentic WhatsApp Green
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          position: 'relative',
          cursor: 'pointer',
          pointerEvents: 'auto'
        }}
      >
        {/* Pulse animation ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '2px solid #25D366',
          }}
        />
        
        {/* Crisp WhatsApp SVG logo */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  )
}
