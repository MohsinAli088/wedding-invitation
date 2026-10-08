import { useState } from 'react'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { mantra, opening } from '../data/content'

// Docx "MAIN PAGE 1: GANESH BHAGWAN PHOTO AND MANTRA".
// Drop the photo at public/images/ganesh.png; until then a શ્રી medallion shows.
export default function Ganesh() {
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <Card id="ganesh" label="Shri Ganeshay Namah">
      <Reveal className="flex flex-col items-center">
        <div className="relative grid size-44 place-items-center sm:size-56 lg:size-60">
          <span className="absolute inset-0 rounded-full border border-rust/60" />
          <span className="animate-spin-slow absolute inset-2 rounded-full border border-dashed border-teal-deep/40" />
          {hasPhoto ? (
            <img
              src="/images/ganesh.png"
              alt="Shri Ganesh"
              onError={() => setHasPhoto(false)}
              className="size-[86%] rounded-full object-cover"
            />
          ) : (
            <span lang="gu" className="font-gujarati text-7xl font-bold text-rust sm:text-8xl">
              {mantra.shri}
            </span>
          )}
        </div>
      </Reveal>

      <Reveal delay={200} lang="gu" className="mt-6 font-gujarati text-lg leading-relaxed font-semibold text-rust sm:text-2xl">
        {opening.shloka.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </Reveal>

      <Reveal delay={450} className="mt-8">
        <p className="text-sm tracking-[0.35em] text-teal-deep uppercase sm:text-base">{opening.intro}</p>
      </Reveal>
      <div className="mt-4 flex flex-col items-center">
        <SplitText chars={opening.groom.name.toUpperCase()} label={opening.groom.name} delay={650} className="tracking-name text-3xl font-semibold text-crimson sm:text-4xl" />
        <Reveal delay={1100}>
          <p className="mt-1 text-sm tracking-wider text-teal-deep uppercase sm:text-base">{opening.groom.parents}</p>
        </Reveal>
        <Reveal delay={1250}>
          <img src="/images/ampersand.png" alt="and" className="my-3 w-12 sm:w-16" />
        </Reveal>
        <SplitText chars={opening.bride.name.toUpperCase()} label={opening.bride.name} delay={1400} className="tracking-name text-3xl font-semibold text-crimson sm:text-4xl" />
        <Reveal delay={2000}>
          <p className="mt-1 text-sm tracking-wider text-teal-deep uppercase sm:text-base">{opening.bride.parents}</p>
        </Reveal>
      </div>
    </Card>
  )
}
