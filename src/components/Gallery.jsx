import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section className="section gallery" id="gallery">
      <SectionTitle eyebrow="Captured moments" title="Our Gallery" />
      <div className="gallery-grid">
        {wedding.gallery.map((src, i) => (
          <motion.div
            key={src}
            className="gallery-item"
            layoutId={`photo-${i}`}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, scale: 0.8, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (i % 4) * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            <span className="gallery-overlay">♥</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img layoutId={`photo-${active}`} src={wedding.gallery[active]} alt="" />
            <button className="lightbox-close" aria-label="Close">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
