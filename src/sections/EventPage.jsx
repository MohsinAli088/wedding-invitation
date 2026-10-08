import Card from '../components/Card'
import { Divider, Icon, MantraHeader } from '../components/Ornaments'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import ThemeDecor, { THEMES } from '../components/ThemeDecor'
import { mapsLink } from '../data/content'

const LANG_FONT = { sa: 'font-devanagari', hi: 'font-devanagari' }

function Invocation({ invocation }) {
  if (invocation === 'ganesh') return <MantraHeader />
  return (
    <header lang={invocation.lang} className={`${LANG_FONT[invocation.lang]} text-xl font-semibold text-(--accent) sm:text-2xl`}>
      {invocation.lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
    </header>
  )
}

// One wedding function. Opens with the Janam (era) name like the docx's
// "AGNI TATVA" sample, and closes with the Janam's vow like its
// "~ Wedding Ritual Connection ~" sample.
export default function EventPage({ event }) {
  const theme = THEMES[event.theme]
  const { blessing } = event
  const label = `Janam-${event.janam} ${event.era}`

  return (
    <Card id={event.id} label={`${label} — ${event.title}`} theme={theme} decor={<ThemeDecor theme={event.theme} />}>
      <div className="flex w-full flex-col items-center text-(--page-ink)">
        <Reveal>
          <Invocation invocation={event.invocation} />
        </Reveal>

        {/* Janam name */}
        <Reveal delay={150} className="mt-7 flex flex-col items-center">
          <span className="relative grid size-16 place-items-center sm:size-20">
            <span className="absolute inset-0 rounded-full border border-(--accent)/40" />
            <span className="animate-spin-slow absolute inset-1.5 rounded-full border border-dashed border-(--accent-2)/40" />
            <Icon name={event.element} className={`size-10 sm:size-12 ${theme.night ? 'brightness-0 invert sepia-[.6] saturate-[2.5]' : ''}`} />
          </span>
          <p className="mt-3 text-sm tracking-[0.4em] text-(--accent-2) uppercase sm:text-base">Janam-{event.janam}</p>
        </Reveal>
        <h2 className="mt-1 max-w-3xl text-3xl leading-tight font-semibold text-(--accent) uppercase sm:text-4xl lg:text-5xl">
          <SplitText chars={event.era} step={35} delay={250} />
        </h2>
        <Reveal delay={700}>
          <p className="mt-3 text-2xl font-bold text-(--accent-2) sm:text-3xl">{event.title}</p>
          {event.subtitle && <p className="mt-1 text-lg text-(--accent-2) italic sm:text-xl">{event.subtitle}</p>}
        </Reveal>

        {blessing?.verse && (
          <Reveal delay={850} lang={blessing.verse.lang} className={`mt-4 ${LANG_FONT[blessing.verse.lang]} text-lg font-semibold text-(--accent) sm:text-xl`}>
            {blessing.verse.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </Reveal>
        )}
        {blessing && (
          <Reveal
            delay={950}
            lang={blessing.lang}
            className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed sm:text-xl ${
              blessing.lang ? `${LANG_FONT[blessing.lang]} font-semibold text-(--accent)` : 'text-(--accent-2) italic'
            }`}
          >
            {blessing.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </Reveal>
        )}

        <Reveal delay={1100} className="mt-6">
          <Divider className="text-(--accent)" />
          <p className="mt-5 text-lg font-semibold tracking-[0.18em] text-(--accent) uppercase sm:text-xl">{event.date}</p>
          {event.dateNote && <p className="mt-1 text-sm tracking-[0.2em] text-(--accent-2) uppercase sm:text-base">{event.dateNote}</p>}
        </Reveal>

        {/* Timings */}
        <Reveal
          delay={1250}
          className={`mt-6 grid w-full max-w-3xl gap-3 ${event.schedule.length === 2 ? 'sm:grid-cols-2' : event.schedule.length > 2 ? 'sm:grid-cols-3' : 'max-w-sm'}`}
        >
          {event.schedule.map((s) => (
            <div
              key={s.label}
              className={`rounded-sm border border-(--accent)/30 px-4 py-4 ${theme.night ? 'bg-white/5' : 'bg-paper/70'}`}
            >
              <p className="text-base tracking-[0.15em] text-(--accent-2) uppercase sm:text-lg">{s.label}</p>
              <p className="mt-1 text-xl font-semibold tracking-wider text-(--accent) uppercase">{s.time}</p>
              {s.note && <p className="text-base opacity-90">{s.note}</p>}
            </div>
          ))}
        </Reveal>

        <Reveal delay={1400} className="mt-7 flex flex-col items-center">
          <p className="text-base tracking-[0.2em] text-(--accent-2) uppercase sm:text-lg">
            Dress code: <span className="text-(--accent)">{event.dressCode.label}</span>
          </p>
          {event.dressCode.colors.length > 0 && (
            <ul className="mt-3 flex gap-2.5" aria-hidden="true">
              {event.dressCode.colors.map((c) => (
                <li key={c} className="size-7 rounded-full border border-black/15 shadow-inner" style={{ backgroundColor: c }} />
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={1550} className="mt-7">
          <p className="text-sm tracking-[0.3em] text-(--accent) uppercase">Venue:</p>
          <address className="mt-1 text-lg text-(--accent-2) not-italic sm:text-xl">
            {event.venue.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={mapsLink(event.venue)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block border border-(--accent) px-5 py-2 text-sm tracking-[0.2em] text-(--accent) uppercase transition hover:bg-(--accent) hover:text-paper"
          >
            View on map
          </a>
        </Reveal>

        {/* Theme description at the end of the page */}
        <Reveal delay={1700} as="footer" className="mt-10 max-w-2xl">
          <p className="text-lg font-semibold text-(--accent-2) sm:text-xl">~ {label} ~</p>
          <p className="mt-2 text-base leading-relaxed italic opacity-90 sm:text-lg">
            <strong className="font-semibold not-italic text-(--accent)">{event.vow.name}</strong> {event.vow.text}
          </p>
        </Reveal>
      </div>
    </Card>
  )
}
