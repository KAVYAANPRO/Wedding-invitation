import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { wedding } from '../data/weddingData'
import Mandala from './Mandala'

const letters = (word, baseDelay) =>
  word.split('').map((ch, i) => (
    <motion.span
      key={i}
      className="letter"
      initial={{ opacity: 0, y: 60, rotate: -10 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: baseDelay + i * 0.08, type: 'spring', stiffness: 120, damping: 12 }}
    >
      {ch}
    </motion.span>
  ))

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const mandalaScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])

  return (
    <section className="hero" ref={ref} id="home">
      <motion.div className="hero-mandala" style={{ scale: mandalaScale }}>
        <Mandala className="spin-slow" size={640} />
      </motion.div>

      <motion.div className="hero-content" style={{ y, opacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.4 }}
        >
          Together with their families
        </motion.p>

        <h1 className="hero-names">
          <span className="script name">{letters(wedding.groom, 0.3)}</span>
          <motion.span
            className="hero-amp"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.9, type: 'spring' }}
          >
            &amp;
          </motion.span>
          <span className="script name">{letters(wedding.bride, 1.1)}</span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          request the pleasure of your company to celebrate their wedding
        </motion.p>

        <motion.div
          className="hero-date"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          <span className="line" />
          <span>{wedding.displayDate}</span>
          <span className="line" />
        </motion.div>
        <motion.p
          className="hero-city"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          {wedding.city}
        </motion.p>
      </motion.div>

      <motion.a
        href="#countdown"
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ opacity: { delay: 3 }, y: { duration: 1.8, repeat: Infinity } }}
        aria-label="Scroll down"
      >
        <span />
      </motion.a>
    </section>
  )
}
