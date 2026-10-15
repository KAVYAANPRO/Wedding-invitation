import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

export default function Story() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section className="section story" id="story">
      <SectionTitle eyebrow="How it all began" title="Our Love Story" />
      <div className="timeline" ref={ref}>
        <div className="timeline-track" />
        <motion.div className="timeline-fill" style={{ scaleY: lineScale }} />
        {wedding.story.map((item, i) => (
          <motion.div
            key={item.year}
            className={`timeline-item ${i % 2 ? 'right' : 'left'}`}
            initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              ♥
            </motion.span>
            <div className="timeline-card">
              <span className="year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
