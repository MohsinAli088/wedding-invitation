import { useContext } from 'react'
import { INK_LEAD_MS } from './Reveal'
import { CardContext, useInViewOnce, useRevealDelay } from './motion'

// Letter-by-letter reveal, as the names appear in the invitation video.
// `chars` may mix plain strings and { ch, className } for per-letter styling.
export default function SplitText({ chars, label, delay = 0, step = 90, className = '' }) {
  const [ref, inView] = useInViewOnce(0.3)
  const cardSince = useContext(CardContext)
  const visible = inView && cardSince > 0
  const wait = useRevealDelay(visible, cardSince, INK_LEAD_MS + delay)
  const list = (typeof chars === 'string' ? [...chars] : chars).map((c) => (typeof c === 'string' ? { ch: c } : c))
  const words = [[]]
  list.forEach((c, i) => (c.ch === ' ' ? words.push([]) : words.at(-1).push({ ...c, i })))

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{label ?? list.map((c) => c.ch).join('')}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            {w > 0 && ' '}
            {/* keep each word whole so lines only break between words */}
            <span className="inline-block whitespace-nowrap">
              {word.map(({ ch, className: cls, i }) => (
                <span
                  key={i}
                  className={`split-char ${visible ? 'is-visible' : ''} ${cls ?? ''}`}
                  style={{ transitionDelay: `${wait + i * step}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}
