import Card from '../components/Card'
import { Divider, Icon } from '../components/Ornaments'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { concept, description } from '../data/content'

// Docx "PAGE 3: DESCRIPTION"
export default function Description() {
  return (
    <Card id="saptabandhan" label={description.title}>
      <h2 className="text-4xl font-semibold text-crimson uppercase sm:text-5xl lg:text-6xl">
        <SplitText chars={description.title} step={80} className="tracking-[0.2em]" />
      </h2>
      <Reveal delay={800}>
        <p className="mt-3 text-xl text-teal-deep italic sm:text-2xl">{description.subtitle}</p>
        <Divider className="mt-6 text-rust" />
      </Reveal>
      <div className="mx-auto mt-6 max-w-2xl space-y-4">
        {description.paragraphs.map((p, i) => (
          <Reveal key={i} delay={1000 + i * 250}>
            <p className="text-lg leading-relaxed text-ink sm:text-xl">{p}</p>
          </Reveal>
        ))}
      </div>
      {/* the seven elements, one per janam */}
      <ul className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-5" aria-label="Seven elements">
        {concept.elements.map((el, i) => (
          <Reveal as="li" key={el.icon} delay={1500 + i * 120} title={el.name}>
            <Icon name={el.icon} className="size-9 sm:size-11" />
          </Reveal>
        ))}
      </ul>
    </Card>
  )
}
