import Lenis from 'lenis'
import { useEffect, useRef, useState } from 'react'
import Intro from './components/Intro'
import MusicPlayer from './components/MusicPlayer'
import NavDots from './components/NavDots'
import { GateContext, prefersReducedMotion } from './components/motion'
import { events } from './data/content'
import Concept from './sections/Concept'
import Description from './sections/Description'
import EventPage from './sections/EventPage'
import Family from './sections/Family'
import Ganesh from './sections/Ganesh'
import Monogram from './sections/Monogram'

// Page order follows "all event invite.docx"
const sections = [
  { id: 'ganesh', label: 'Shri Ganesh' },
  { id: 'monogram', label: 'Prarthana & Yatin' },
  { id: 'saptabandhan', label: 'Saptabandhan' },
  { id: 'concept', label: 'Concept' },
  ...events.map((e) => ({ id: e.id, label: `Janam-${e.janam} · ${e.title}` })),
  { id: 'family', label: 'Karia Family' },
]

export default function App() {
  const [introDone, setIntroDone] = useState(
    () => prefersReducedMotion() || (import.meta.env.DEV && new URLSearchParams(location.search).has('skipIntro')),
  )
  const lenisRef = useRef(null)
  const musicRef = useRef(null)

  // Smooth, eased scrolling (touch devices keep native scrolling)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.085 })
    lenisRef.current = lenis
    return () => lenis.destroy()
  }, [])

  // Hold the page still while the envelope intro plays
  useEffect(() => {
    if (introDone) {
      lenisRef.current?.start()
      document.documentElement.style.overflow = ''
    } else {
      window.scrollTo(0, 0)
      lenisRef.current?.stop()
      document.documentElement.style.overflow = 'hidden'
    }
  }, [introDone])

  return (
    <GateContext.Provider value={introDone}>
      <MusicPlayer ref={musicRef} />
      {!introDone && <Intro onOpen={() => musicRef.current?.start()} onDone={() => setIntroDone(true)} />}
      <main>
        <NavDots items={sections} />
        <Ganesh />
        <Monogram />
        <Description />
        <Concept />
        {events.map((e) => (
          <EventPage key={e.id} event={e} />
        ))}
        <Family />
        <footer className="py-6 text-center text-xs tracking-[0.3em] text-paper/90 uppercase">
          Seven Bond · Seven Lifetimes
        </footer>
      </main>
    </GateContext.Provider>
  )
}
