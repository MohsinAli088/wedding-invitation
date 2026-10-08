import { useMemo } from 'react'
import { CardContext, useInViewOnce } from './motion'
import { img } from '../asset'

// Teal watercolour blooms that wash over a page as it arrives (video transition)
const INK = [
  { src: img('ink-1.png'), className: 'left-[-20%] top-[5%] w-[95%] sm:w-[60%]', delay: 0 },
  { src: img('ink-2.png'), className: 'right-[-25%] top-[30%] w-[100%] sm:w-[65%]', delay: 120 },
  { src: img('ink-1.png'), className: 'left-[10%] bottom-[-15%] w-[90%] sm:w-[55%] rotate-90', delay: 240 },
]

// One "page" of the invitation: paper, block-print frame, hanging garland
// top-left and the peacock bottom-left, as in the PDF.
export default function Card({ id, label, children, peacock = true, className = '', theme, decor }) {
  const [ref, inView] = useInViewOnce(0.25)
  const since = useMemo(() => (inView ? performance.now() : 0), [inView])

  return (
    <section id={id} aria-label={label} className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 xl:px-14">
      <div
        ref={ref}
        className={`card-frame relative mx-auto flex min-h-[calc(100svh-1rem)] max-w-7xl flex-col sm:min-h-[calc(100svh-2rem)] ${
          theme?.night ? 'card-night' : ''
        } ${inView ? 'is-inview' : ''}`}
        style={
          theme && {
            '--accent': theme.accent,
            '--accent-2': theme.accent2,
            '--page-ink': theme.ink,
          }
        }
      >
        {decor && <div className="absolute inset-0 z-[5]">{decor}</div>}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          {INK.map((ink, i) => (
            <img
              key={i}
              src={ink.src}
              alt=""
              className={`ink-bloom absolute max-w-none ${ink.className}`}
              style={{ animationDelay: `${ink.delay}ms` }}
            />
          ))}
        </div>

        <div className="card-garland pointer-events-none absolute top-0 left-[7%] w-[40%] max-w-[420px] select-none sm:w-[30%] lg:w-[24%]">
          <img src={img('garland.png')} alt="" aria-hidden="true" className="animate-sway w-full" />
        </div>
        {peacock && (
          <img
            src={img('peacock.png')}
            alt=""
            aria-hidden="true"
            className="card-peacock pointer-events-none absolute bottom-[calc(-1*var(--bw))] left-[calc(-1*var(--bw))] z-10 w-[62%] max-w-[520px] select-none sm:w-[44%] lg:w-[31%]"
          />
        )}

        <CardContext.Provider value={since}>
          <div
            className={`relative z-20 flex flex-1 flex-col items-center justify-center px-5 pt-[32vw] pb-[42vw] text-center sm:px-10 sm:pt-[22vw] sm:pb-[30vw] lg:pt-20 lg:pb-24 ${className}`}
          >
            {children}
          </div>
        </CardContext.Provider>
      </div>
    </section>
  )
}
