import { useContext } from 'react'
import Card from '../components/Card'
import Reveal, { INK_LEAD_MS } from '../components/Reveal'
import SplitText from '../components/SplitText'
import { CardContext, useInViewOnce } from '../components/motion'
import { couple } from '../data/content'

function Logo() {
  const [ref, inView] = useInViewOnce(0.2)
  const cardSince = useContext(CardContext)
  return (
    <div ref={ref} className="animate-float">
      <img
        src="/images/logo.png"
        alt="Prarthana and Yatin monogram — Seven Bond, Seven Lifetimes"
        className={`logo-in mx-auto w-60 sm:w-72 lg:w-80 ${inView && cardSince > 0 ? 'is-visible' : ''}`}
        style={{ transitionDelay: `${INK_LEAD_MS}ms` }}
      />
    </div>
  )
}

// PDF page 1 / docx "PAGE 2: LOGO"
export default function Monogram() {
  return (
    <Card id="monogram" label="Prarthana and Yatin">
      <Logo />
      <h1 className="mt-8 flex flex-col items-center leading-tight">
        <SplitText
          chars={couple.bride.toUpperCase()}
          label={couple.bride}
          delay={900}
          className="tracking-name text-3xl text-teal-deep sm:text-4xl lg:text-5xl"
        />
        <SplitText
          chars={[{ ch: 'य', className: 'font-devanagari font-semibold' }, ...couple.groom.slice(1).toUpperCase()]}
          label={couple.groom}
          delay={900 + couple.bride.length * 90 + 150}
          className="tracking-name mt-1 text-3xl text-rust sm:text-4xl lg:text-5xl"
        />
      </h1>
      <Reveal delay={2400}>
        <p className="mt-5 text-sm text-teal-deep uppercase sm:text-base">{couple.tagline}</p>
      </Reveal>
    </Card>
  )
}
