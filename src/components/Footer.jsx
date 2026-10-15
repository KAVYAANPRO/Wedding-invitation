import { motion } from 'framer-motion'
import { wedding } from '../data/weddingData'

export default function Footer() {
  return (
    <footer className="footer">
      <motion.p
        className="script footer-names"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {wedding.groom} &amp; {wedding.bride}
      </motion.p>
      <p>{wedding.displayDate} · {wedding.city}</p>
      <p className="hashtag">{wedding.hashtag}</p>
      <p className="footer-small">With love and gratitude to our families ♥</p>
    </footer>
  )
}
