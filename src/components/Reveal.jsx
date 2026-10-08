import { useContext } from 'react'
import { CardContext, useInViewOnce, useRevealDelay } from './motion'

// Fades, lifts and un-blurs its children once both it and its Card are in view.
// The card's ink wash plays first, so reveals wait for it to clear.
export const INK_LEAD_MS = 450

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInViewOnce(0.15)
  const cardSince = useContext(CardContext)
  const visible = inView && cardSince > 0
  const wait = useRevealDelay(visible, cardSince, INK_LEAD_MS + delay)

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${wait}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
