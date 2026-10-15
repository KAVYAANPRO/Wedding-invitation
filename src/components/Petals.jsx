import { useMemo } from 'react'

// Falling rose petals across the whole page (pure CSS animation, cheap on phones).
// Phones get fewer petals so scrolling stays smooth on low-end devices.
const defaultCount = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches ? 12 : 22

export default function Petals({ count = defaultCount }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 14,
        duration: 9 + Math.random() * 10,
        delay: -Math.random() * 20,
        sway: 40 + Math.random() * 80,
        color: Math.random() > 0.5 ? '#e8a0a8' : '#f5c6cb',
      })),
    [count]
  )

  return (
    <div className="petals" aria-hidden>
      {petals.map((p) => (
        <span key={p.id} className="petal-track" style={{ left: `${p.left}%`, '--sway': `${p.sway}px`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}>
          <span
            className="petal"
            style={{
              width: p.size,
              height: p.size * 0.8,
              background: p.color,
              animationDuration: `${p.duration / 3}s`,
            }}
          />
        </span>
      ))}
    </div>
  )
}
