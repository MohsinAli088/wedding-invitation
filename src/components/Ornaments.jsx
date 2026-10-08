import { mantra } from '../data/content'
import { img } from '../asset'

// "——— ◆ ———" rule from the Concept page
export function Divider({ className = 'text-teal-deep' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-current sm:w-16" />
      <span className="size-1.5 rotate-45 bg-current" />
      <span className="h-px w-12 bg-current sm:w-16" />
    </div>
  )
}

export function Icon({ name, className = 'size-10' }) {
  return <img src={img(`icon-${name}.png`)} alt="" aria-hidden="true" className={className} />
}

// Invocation that opens each era page in the docx
export function MantraHeader({ className = '' }) {
  return (
    <header lang="gu" className={`font-gujarati text-[var(--accent,#b54226)] ${className}`}>
      <p className="text-2xl font-semibold sm:text-3xl">{mantra.shri}</p>
      <p className="mt-1 text-lg sm:text-xl">{mantra.ganesh}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed font-bold text-[var(--accent-2,#01424e)] sm:text-base">
        {mantra.kuldevi.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </header>
  )
}

export function EraTitle({ kicker, children }) {
  return (
    <div>
      {kicker && <p className="text-sm tracking-[0.3em] text-rust uppercase sm:text-base">{kicker}</p>}
      <h2 className="mt-1 text-3xl text-crimson uppercase sm:text-4xl lg:text-5xl">{children}</h2>
    </div>
  )
}
