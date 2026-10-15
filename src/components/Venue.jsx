import { motion } from 'framer-motion'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

export default function Venue() {
  const { venue } = wedding
  return (
    <section className="section venue" id="venue">
      <SectionTitle eyebrow="Where the magic happens" title="The Venue" />
      <div className="venue-wrap">
        <motion.div
          className="venue-info"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="pin"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            📍
          </motion.div>
          <h3>{venue.name}</h3>
          <p>{venue.address}</p>
          <motion.a
            className="btn"
            href={venue.mapLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Directions
          </motion.a>
        </motion.div>
        <motion.div
          className="venue-map"
          initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
          whileInView={{ opacity: 1, clipPath: 'circle(75% at 50% 50%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <iframe title="Venue map" src={venue.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
      </div>
    </section>
  )
}
