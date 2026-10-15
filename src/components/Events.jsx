import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

// Card that tilts in 3D towards the cursor.
function TiltCard({ event, index }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 15 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="event-card"
      style={{ rotateX, rotateY, '--accent': event.color }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (index % 3) * 0.15, duration: 0.7 }}
    >
      <motion.div
        className="event-icon"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
      >
        {event.icon}
      </motion.div>
      <h3 className="script">{event.name}</h3>
      <div className="event-meta">
        <p>📅 {event.date}</p>
        <p>⏰ {event.time}</p>
        <p>📍 {event.venue}</p>
      </div>
      <span className="dress">Dress code: {event.dress}</span>
    </motion.div>
  )
}

export default function Events() {
  return (
    <section className="section events" id="events">
      <SectionTitle eyebrow="Join us for" title="The Celebrations" />
      <div className="events-grid">
        {wedding.events.map((ev, i) => (
          <TiltCard key={ev.name} event={ev} index={i} />
        ))}
      </div>
    </section>
  )
}
