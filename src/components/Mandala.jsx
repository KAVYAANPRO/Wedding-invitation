// Decorative mandala drawn with SVG; rotation is applied via CSS.
export default function Mandala({ size = 520, className = '' }) {
  const petals = Array.from({ length: 16 })
  return (
    <svg className={className} width={size} height={size} viewBox="-100 -100 200 200" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        {[90, 75, 60, 30].map((r) => (
          <circle key={r} r={r} />
        ))}
        {petals.map((_, i) => (
          <g key={i} transform={`rotate(${(360 / 16) * i})`}>
            <path d="M0,-30 C12,-50 12,-70 0,-90 C-12,-70 -12,-50 0,-30Z" />
            <path d="M0,-60 C6,-68 6,-74 0,-80 C-6,-74 -6,-68 0,-60Z" />
            <circle cy="-95" r="2" />
          </g>
        ))}
        {petals.map((_, i) => (
          <g key={`s${i}`} transform={`rotate(${(360 / 16) * i + 11.25})`}>
            <path d="M0,-30 C6,-40 6,-50 0,-58 C-6,-50 -6,-40 0,-30Z" />
          </g>
        ))}
      </g>
    </svg>
  )
}
