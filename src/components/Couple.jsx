import { motion } from 'framer-motion'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

const people = [
  { name: wedding.groom, role: 'The Groom', family: wedding.groomFamily, img: 'https://picsum.photos/seed/groom/400/400', from: -120 },
  { name: wedding.bride, role: 'The Bride', family: wedding.brideFamily, img: 'https://picsum.photos/seed/bride/400/400', from: 120 },
]

export default function Couple() {
  return (
    <section className="section couple" id="couple">
      <SectionTitle eyebrow="Meet the" title="Happy Couple" />
      <div className="couple-grid">
        {people.map((p, i) => (
          <motion.div
            key={p.role}
            className="person"
            initial={{ opacity: 0, x: p.from }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="portrait-ring">
              <motion.img
                src={p.img}
                alt={p.name}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="eyebrow">{p.role}</span>
            <h3 className="script">{p.name}</h3>
            <p>{p.family}</p>
            {i === 0 && (
              <motion.span
                className="couple-heart"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ♥
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
