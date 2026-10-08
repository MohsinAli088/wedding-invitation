import Card from '../components/Card'
import { Divider, MantraHeader } from '../components/Ornaments'
import Reveal from '../components/Reveal'
import { family } from '../data/content'

// Docx "PAGE 9"
export default function Family() {
  return (
    <Card id="family" label="A cordial invitation">
      <Reveal>
        <MantraHeader />
      </Reveal>
      <Reveal delay={200} className="mt-8">
        <h2 className="text-2xl text-crimson uppercase sm:text-3xl">{family.title}</h2>
        <Divider className="mt-4 text-rust" />
      </Reveal>

      <ul className="mt-6 w-full max-w-3xl space-y-3 sm:space-y-2">
        {family.couples.map(([him, her], i) => (
          <Reveal as="li" key={him} delay={400 + i * 110} className="grid gap-0.5 sm:grid-cols-2 sm:gap-8">
            <span className="text-lg text-teal-deep sm:text-right sm:text-xl">{him}</span>
            <span className="text-lg text-teal-deep sm:text-left sm:text-xl">{her}</span>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={1300} className="mt-8">
        <p className="text-xl font-semibold text-rust italic sm:text-2xl">{family.awaits}</p>
      </Reveal>

      {family.tahuko.lines.length > 0 && (
        <Reveal delay={1450} className="mt-8">
          <h3 className="text-xl text-crimson uppercase">{family.tahuko.title}</h3>
          {family.tahuko.lines.map((l) => (
            <p key={l} className="mt-1 text-lg text-teal-deep">
              {l}
            </p>
          ))}
        </Reveal>
      )}

      <Reveal delay={1600} className="mt-8">
        <p className="border-y border-rust/40 px-6 py-3 text-base tracking-[0.2em] text-crimson uppercase sm:text-lg">{family.note}</p>
      </Reveal>
    </Card>
  )
}
