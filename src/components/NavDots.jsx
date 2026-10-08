import { useEffect, useState } from 'react'

// Floating section index on the right edge
export default function NavDots({ items }) {
  const [active, setActive] = useState(items[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label="Sections" className="fixed top-1/2 right-4 z-50 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col gap-3">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={active === id ? 'true' : undefined}
              className="group flex items-center justify-end gap-2 p-1"
            >
              <span className="hidden rounded-sm bg-paper/90 px-2 py-0.5 text-xs tracking-widest text-teal-deep uppercase opacity-0 shadow transition group-hover:opacity-100 lg:block">
                {label}
              </span>
              <span
                className={`block size-2.5 rotate-45 border transition ${
                  active === id ? 'scale-125 border-paper bg-gold' : 'border-teal-deep bg-paper/80'
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
