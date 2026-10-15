import { useState, useEffect } from 'react'
import Envelope from './components/Envelope'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Couple from './components/Couple'
import Story from './components/Story'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Venue from './components/Venue'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import Petals from './components/Petals'
import CursorSparkle from './components/CursorSparkle'

export default function App() {
  const [opened, setOpened] = useState(false)

  // Lock scrolling while the envelope intro is showing.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
  }, [opened])

  return (
    <>
      <CursorSparkle />
      <Envelope onOpen={() => setOpened(true)} />
      {opened && (
        <>
          <Petals />
          <Nav />
          <main>
            <Hero />
            <Countdown />
            <Couple />
            <Story />
            <Events />
            <Gallery />
            <Venue />
            <RSVP />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
