import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { wedding } from '../data/weddingData'
import Mandala from './Mandala'

// Cinematic intro. Stages run in order after the seal is tapped:
// closed -> open (seal cracks, flap lifts) -> rising (card slides out)
// -> zoom (envelope falls away, card fills the stage) -> reveal (curtains part onto the site) -> done
const TIMELINE = { rising: 900, zoom: 2500, reveal: 3900, done: 5200 }

const HEADLINE = 'You are cordially invited'

function CornerOrnament({ className }) {
  return (
    <svg className={`corner ${className}`} viewBox="0 0 200 200" aria-hidden>
      {[
        'M10,190 C10,90 90,10 190,10',
        'M30,190 C35,120 70,70 120,55 C150,46 170,60 165,80 C160,100 130,98 132,80',
        'M10,150 C40,140 60,110 55,85 C50,65 30,62 25,75 C20,90 38,96 45,85',
        'M70,40 C80,25 100,22 108,32 M150,105 C138,112 136,128 148,134',
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.25, duration: 2.2, ease: 'easeInOut' }}
        />
      ))}
      {[[120, 55], [45, 85], [148, 134], [108, 32]].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 + i * 0.15, type: 'spring' }}
        />
      ))}
    </svg>
  )
}

export default function Envelope({ onOpen }) {
  const [stage, setStage] = useState('closed')
  const sealRef = useRef(null)

  // 3D tilt following the pointer while the envelope is closed.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 14 })
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 14 })

  const dust = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: -Math.random() * 10,
      })),
    []
  )

  const burst = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2
        const dist = 90 + Math.random() * 70
        return { id: i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 4 + Math.random() * 6 }
      }),
    []
  )

  const onPointerMove = (e) => {
    if (stage !== 'closed') return
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  const open = () => {
    if (stage !== 'closed') return
    mx.set(0)
    my.set(0)
    setStage('open')

    const r = sealRef.current?.getBoundingClientRect()
    if (r) {
      const origin = { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight }
      confetti({ particleCount: 70, spread: 360, startVelocity: 22, gravity: 0.6, scalar: 0.8, ticks: 160, origin, colors: ['#d4af37', '#f5e3a3', '#f5c6cb', '#ffffff'], zIndex: 300 })
    }

    setTimeout(() => setStage('rising'), TIMELINE.rising)
    setTimeout(() => setStage('zoom'), TIMELINE.zoom)
    setTimeout(() => {
      setStage('reveal')
      onOpen()
    }, TIMELINE.reveal)
    setTimeout(() => setStage('done'), TIMELINE.done)
  }

  const isClosed = stage === 'closed'
  const flapOpen = stage !== 'closed'
  const cardOut = stage === 'rising'
  const zoomed = stage === 'zoom' || stage === 'reveal'
  const revealing = stage === 'reveal'
  const bodyGone = zoomed

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <div className={`intro ${revealing ? 'revealing' : ''}`} onPointerMove={onPointerMove}>
          {/* Curtains carry the background; they slide apart to reveal the site underneath. */}
          <motion.div className="curtain left" animate={revealing ? { x: '-101%' } : { x: 0 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="curtain right" animate={revealing ? { x: '101%' } : { x: 0 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} />

          <motion.div
            className="intro-stage"
            animate={revealing ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rays" />
            <div className="intro-mandala">
              <Mandala className="spin-slow" size={900} />
            </div>
            <div className="dust" aria-hidden>
              {dust.map((d) => (
                <span
                  key={d.id}
                  style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s` }}
                />
              ))}
            </div>

            <CornerOrnament className="tl" />
            <CornerOrnament className="tr" />
            <CornerOrnament className="bl" />
            <CornerOrnament className="br" />

            <motion.div className="intro-top" animate={{ opacity: isClosed ? 1 : 0, y: isClosed ? 0 : -30 }} transition={{ duration: 0.5 }}>
              <motion.span
                className="intro-om"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 90 }}
              >
                ✦
              </motion.span>
              <h1 className="intro-headline">
                {/* Letters animate one by one but are grouped per word so phones never break mid-word. */}
                {HEADLINE.split(' ').map((word, w, words) => {
                  const offset = words.slice(0, w).join(' ').length + (w ? 1 : 0)
                  return (
                    <span key={w} className="word">
                      {word.split('').map((ch, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ delay: 0.6 + (offset + i) * 0.04, duration: 0.5 }}
                        >
                          {ch}
                        </motion.span>
                      ))}
                    </span>
                  )
                })}
              </h1>
              <motion.p
                className="intro-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                to the wedding celebration of
              </motion.p>
            </motion.div>

            {/* Envelope drops in, then floats. */}
            <motion.div
              className="envelope-float"
              initial={{ y: -500, rotate: -25, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 50, damping: 9 }}
            >
              <motion.div
                className="envelope-bob"
                animate={isClosed ? { y: [0, -12, 0] } : { y: 0 }}
                transition={isClosed ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
              >
                <motion.div className="envelope" style={{ rotateX: tiltX, rotateY: tiltY }}>
                  <motion.div className="envelope-back" animate={bodyGone ? { y: 400, opacity: 0, rotate: 8 } : {}} transition={{ duration: 0.9, ease: 'easeIn' }} />

                  <motion.div
                    className="envelope-card"
                    style={{ zIndex: zoomed ? 8 : 2 }}
                    animate={zoomed ? { y: '-8%', scale: 1.35 } : cardOut ? { y: '-62%', scale: 1 } : { y: 0, scale: 1 }}
                    transition={{ duration: zoomed ? 1 : 1.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="card-inner">
                      <span className="card-eyebrow">Save the Date</span>
                      <span className="script card-name">{wedding.groom}</span>
                      <motion.span
                        className="card-amp"
                        animate={zoomed ? { rotate: 360, scale: [1, 1.4, 1] } : {}}
                        transition={{ duration: 1 }}
                      >
                        &amp;
                      </motion.span>
                      <span className="script card-name">{wedding.bride}</span>
                      <span className="card-flourish">❦</span>
                      <span className="card-date">{wedding.displayDate}</span>
                    </div>
                    <motion.div
                      className="card-shine"
                      animate={cardOut || zoomed ? { x: ['-120%', '220%'] } : {}}
                      transition={{ duration: 1.4, delay: 0.4 }}
                    />
                  </motion.div>

                  <motion.div className="envelope-front" animate={bodyGone ? { y: 400, opacity: 0, rotate: -6 } : {}} transition={{ duration: 0.9, ease: 'easeIn' }}>
                    <span className="envelope-to script">Dear Guest</span>
                  </motion.div>

                  <motion.div
                    className="envelope-flap"
                    style={{ zIndex: stage === 'closed' || stage === 'open' ? 5 : 1 }}
                    animate={bodyGone ? { y: 400, opacity: 0 } : flapOpen ? { rotateX: 180 } : { rotateX: 0 }}
                    transition={bodyGone ? { duration: 0.9, ease: 'easeIn' } : { delay: 0.35, duration: 0.8, ease: 'easeInOut' }}
                  >
                    <div className="flap-face outer" />
                    <div className="flap-face inner" />
                  </motion.div>

                  {/* Wax seal: pulsing glow while closed, cracks into two halves on tap. */}
                  <div className="seal-wrap" ref={sealRef}>
                    {isClosed && (
                      <>
                        <span className="seal-ring" />
                        <span className="seal-ring delay" />
                      </>
                    )}
                    <button className="wax-seal" onClick={open} aria-label="Open invitation" disabled={!isClosed}>
                      {['left', 'right'].map((side) => (
                        <motion.span
                          key={side}
                          className={`seal-half ${side}`}
                          animate={
                            isClosed
                              ? { scale: [1, 1.06, 1] }
                              : { x: side === 'left' ? -70 : 70, y: 80, rotate: side === 'left' ? -50 : 50, opacity: 0 }
                          }
                          transition={isClosed ? { duration: 1.6, repeat: Infinity } : { duration: 0.7, ease: 'easeIn' }}
                        >
                          {wedding.groom[0]}
                          <small>&amp;</small>
                          {wedding.bride[0]}
                        </motion.span>
                      ))}
                    </button>
                    {!isClosed &&
                      burst.map((b) => (
                        <motion.span
                          key={b.id}
                          className="burst"
                          style={{ width: b.size, height: b.size }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: b.x, y: b.y, opacity: 0, scale: 0.3 }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="tap-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosed ? 1 : 0 }}
              transition={{ delay: isClosed ? 2.6 : 0, duration: 0.6 }}
            >
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                👆
              </motion.span>
              <span>Tap the seal to open</span>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
