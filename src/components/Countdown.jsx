import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

const getTimeLeft = () => {
  const diff = Math.max(new Date(wedding.weddingDate) - new Date(), 0)
  return {
    Days: Math.floor(diff / 86400000),
    Hours: Math.floor((diff / 3600000) % 24),
    Minutes: Math.floor((diff / 60000) % 60),
    Seconds: Math.floor((diff / 1000) % 60),
  }
}

function FlipNumber({ value }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flip">
      {/* Keyed remount gives a flip-in on every change without exit nodes piling up in background tabs. */}
      <motion.span
        key={text}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        {text}
      </motion.span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section countdown" id="countdown">
      <SectionTitle eyebrow="Counting every moment" title="Until We Say I Do" />
      <div className="countdown-grid">
        {Object.entries(time).map(([label, value], i) => (
          <motion.div
            key={label}
            className="count-box"
            initial={{ opacity: 0, y: 50, rotateY: 90 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
          >
            <FlipNumber value={value} />
            <span className="count-label">{label}</span>
          </motion.div>
        ))}
      </div>
      <motion.blockquote
        className="quote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1.2 }}
      >
        “{wedding.quote}”
      </motion.blockquote>
    </section>
  )
}
