import Card from '../components/Card'
import Reveal from '../components/Reveal'
import { Divider, Icon } from '../components/Ornaments'
import { concept } from '../data/content'

// PDF page 2 — lines arrive one after another, as in the video
export default function Concept() {
  return (
    <Card id="concept" label="Concept">
      <Reveal>
        <h2 className="text-3xl text-crimson uppercase sm:text-4xl">{concept.title}</h2>
      </Reveal>
      <Reveal delay={250}>
        <p className="mt-5 text-xl text-teal-deep sm:text-2xl">{concept.lead}</p>
      </Reveal>
      <Reveal delay={500}>
        <p className="mx-auto mt-3 max-w-md text-lg leading-snug text-teal-deep sm:text-xl">{concept.body}</p>
      </Reveal>
      <Reveal delay={750}>
        <Divider className="mt-6 text-teal-deep" />
        <h3 className="mt-5 text-lg text-teal-deep uppercase sm:text-xl">{concept.elementsTitle}</h3>
      </Reveal>

      <ul className="mx-auto mt-6 grid w-full max-w-xl gap-y-5 text-left sm:mt-8">
        {concept.elements.map((el, i) => (
          <Reveal as="li" key={el.icon} delay={900 + i * 160} className="flex items-start gap-4">
            <Icon name={el.icon} className="size-11 shrink-0 sm:size-12" />
            <div>
              <p className="text-lg text-teal-deep uppercase sm:text-xl">{el.name}</p>
              <p className="text-base leading-snug text-ink">{el.meaning}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Card>
  )
}
