import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title }) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="script">{title}</h2>
      <motion.div
        className="divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span>❦</span>
      </motion.div>
    </motion.div>
  )
}
