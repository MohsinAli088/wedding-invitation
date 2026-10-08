import { createContext, useContext, useEffect, useRef, useState } from 'react'

// False while the envelope intro covers the page, so nothing animates unseen.
export const GateContext = createContext(true)
// performance.now() when the enclosing Card scrolled into view; 0 while it hasn't.
export const CardContext = createContext(1)

// Stagger delays apply when a page first arrives. Anything reached later
// (e.g. further down a long page on a phone) appears almost immediately.
export function useRevealDelay(visible, cardSince, delay) {
  const late = useRef(null)
  if (visible && late.current === null) late.current = performance.now() - cardSince > 700
  return late.current ? 60 : delay
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Becomes true once (and stays true) when the element enters the viewport
// and the intro gate is open.
export function useInViewOnce(threshold = 0.2) {
  const ref = useRef(null)
  const gate = useContext(GateContext)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])

  return [ref, seen && gate]
}
