import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { wedding } from '../data/weddingData'
import SectionTitle from './SectionTitle'

// No backend: the RSVP builds a WhatsApp message and opens it in a new tab.
export default function RSVP() {
  const [form, setForm] = useState({ name: '', guests: '1', attending: 'yes', message: '' })
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text = [
      `RSVP for ${wedding.groom} & ${wedding.bride}'s wedding`,
      `Name: ${form.name}`,
      `Attending: ${form.attending === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}`,
      `Guests: ${form.guests}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(`https://wa.me/${wedding.rsvp.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')

    const colors = ['#d4af37', '#b3263a', '#f5c6cb', '#ffffff']
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.7 }, colors })
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }), 250)
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }), 400)
    setSent(true)
  }

  return (
    <section className="section rsvp" id="rsvp">
      <SectionTitle eyebrow={`Kindly respond by ${wedding.rsvp.deadline}`} title="Will You Join Us?" />
      <motion.div
        className="rsvp-card"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              className="thanks"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.span
                className="big-heart"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ♥
              </motion.span>
              <h3 className="script">Thank you, {form.name || 'dear guest'}!</h3>
              <p>We can’t wait to celebrate with you.</p>
              <button className="btn ghost" onClick={() => setSent(false)}>Edit response</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -20 }}>
              <label>
                Your name
                <input required value={form.name} onChange={update('name')} placeholder="Full name" />
              </label>
              <div className="toggle-group">
                {['yes', 'no'].map((v) => (
                  <button
                    type="button"
                    key={v}
                    className={form.attending === v ? 'active' : ''}
                    onClick={() => setForm({ ...form, attending: v })}
                  >
                    {form.attending === v && <motion.span layoutId="toggle-bg" className="toggle-bg" />}
                    <span>{v === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {form.attending === 'yes' && (
                  <motion.label
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Number of guests
                    <select value={form.guests} onChange={update('guests')}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </motion.label>
                )}
              </AnimatePresence>
              <label>
                Blessings for the couple
                <textarea rows="3" value={form.message} onChange={update('message')} placeholder="Write a sweet note..." />
              </label>
              <motion.button className="btn" type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                Send RSVP on WhatsApp
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
