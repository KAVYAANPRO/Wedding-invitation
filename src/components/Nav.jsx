import { useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { wedding } from '../data/weddingData'

const links = ['Home', 'Couple', 'Story', 'Events', 'Gallery', 'Venue', 'RSVP']

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 80))

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: progress }} />
      <motion.nav
        className={`nav ${solid ? 'solid' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
      >
        <span className="script nav-logo">{wedding.groom[0]} ♥ {wedding.bride[0]}</span>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          ☰
        </button>
        <ul className={open ? 'open' : ''}>
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
                {l}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  )
}
