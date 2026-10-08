// Theme elements for each Janam page. Everything sits behind the text, clear of
// the garland (top-left) and peacock (bottom-left), and only animates once the
// page is in view (see `.is-inview` rules in index.css).

// Colours per theme, exposed to the page as CSS variables
export const THEMES = {
  forest: { accent: '#3f6b2a', accent2: '#b54226', ink: '#321d0f' },
  rajputana: { accent: '#8c1d2f', accent2: '#b07a1f', ink: '#321d0f' },
  mughal: { accent: '#a8325f', accent2: '#01424e', ink: '#321d0f' },
  temple: { accent: '#b54226', accent2: '#a86d08', ink: '#321d0f' },
  village: { accent: '#6b4f9a', accent2: '#2f7f79', ink: '#321d0f' },
  golden: { accent: '#e8c26a', accent2: '#c9d6ff', ink: '#f3ead6', night: true },
  eternity: { accent: '#b22d2f', accent2: '#a8741a', ink: '#321d0f' },
}

// Cusped (multi-foil) arch used for Rajput jharokhas and Mughal gateways
function Arch({ className = '', stroke = 'currentColor' }) {
  const lobes = 'M20 260 V122 Q20 98 40 92 A14 14 0 0 1 58 74 A16 16 0 0 1 79 55 A19 19 0 0 1 100 32 A19 19 0 0 1 121 55 A16 16 0 0 1 142 74 A14 14 0 0 1 160 92 Q180 98 180 122 V260'
  return (
    <svg viewBox="0 0 200 270" className={className} fill="none" stroke={stroke} strokeWidth="1.4" aria-hidden="true">
      <path d={lobes} />
      <path d={lobes} transform="translate(100 150) scale(0.86) translate(-100 -150)" strokeWidth="0.8" strokeDasharray="2 3" />
      <path d="M100 32 V18 M94 22 Q100 8 106 22 Z M100 8 v-4" />
      <circle cx="100" cy="4" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Diya({ className = '', delay = 0 }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="diya-flame" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset="0.45" stopColor="#ffc23a" />
          <stop offset="1" stopColor="#e2541b" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="22" r="16" fill="#ffb53a" opacity="0.18" className="decor-glow" style={{ animationDelay: `${delay}ms` }} />
      <path d="M30 6 C36 16 38 24 30 30 C22 24 24 16 30 6 Z" fill="url(#diya-flame)" className="decor-flame" style={{ animationDelay: `${delay}ms` }} />
      <path d="M8 34 Q30 56 52 34 Q41 40 30 40 Q19 40 8 34 Z" fill="#9a4a1c" />
      <path d="M8 34 Q19 40 30 40 Q41 40 52 34" fill="none" stroke="#e0a14a" strokeWidth="1.2" />
    </svg>
  )
}

function Bell({ className = '', delay = 0, length = 60 }) {
  return (
    <div className={`decor-bell ${className}`} style={{ animationDelay: `${delay}ms` }} aria-hidden="true">
      <svg viewBox={`0 0 40 ${length + 46}`} className="w-full">
        <line x1="20" y1="0" x2="20" y2={length} stroke="#a86d08" strokeWidth="1.2" />
        <circle cx="20" cy={length + 2} r="3" fill="none" stroke="#a86d08" strokeWidth="1.2" />
        <path d={`M8 ${length + 36} Q8 ${length + 8} 20 ${length + 6} Q32 ${length + 8} 32 ${length + 36} Q36 ${length + 38} 36 ${length + 40} H4 Q4 ${length + 38} 8 ${length + 36} Z`} fill="#d29a2a" stroke="#8a560a" strokeWidth="1" />
        <circle cx="20" cy={length + 43} r="3" fill="#8a560a" />
      </svg>
    </div>
  )
}

function Temple({ className = '' }) {
  return (
    <svg viewBox="0 0 160 200" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M80 6 V18 M74 12 L80 4 L86 12" />
      <path d="M80 18 C62 40 56 70 52 100 H108 C104 70 98 40 80 18 Z" />
      <path d="M66 44 H94 M60 66 H100 M56 86 H104" strokeDasharray="2 2" />
      <path d="M36 100 H124 V108 H36 Z M44 108 V160 M116 108 V160" />
      <path d="M62 160 V128 Q80 110 98 128 V160" />
      <path d="M24 160 H136 V170 H24 Z M16 170 H144 V180 H16 Z" />
      <path d="M28 100 C30 90 36 84 44 82 M132 100 C130 90 124 84 116 82" />
    </svg>
  )
}

function FerrisWheel({ className = '' }) {
  const cabins = Array.from({ length: 8 }, (_, i) => (i * Math.PI * 2) / 8)
  const colors = ['#f6a5b8', '#f9d27a', '#9fd7b5', '#9cc7ec', '#c8b0ea']
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 200 220" className="h-full w-full overflow-visible">
        <path d="M100 100 L60 210 M100 100 L140 210 M50 210 H150" stroke="#8a6a52" strokeWidth="3" fill="none" />
        <g className="decor-wheel" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#b08a6a" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="66" fill="none" stroke="#b08a6a" strokeWidth="1" strokeDasharray="3 4" />
          {cabins.map((a, i) => (
            <line key={i} x1="100" y1="100" x2={100 + 80 * Math.cos(a)} y2={100 + 80 * Math.sin(a)} stroke="#b08a6a" strokeWidth="1.2" />
          ))}
          {cabins.map((a, i) => (
            <g key={`c${i}`} transform={`translate(${100 + 80 * Math.cos(a)} ${100 + 80 * Math.sin(a)})`}>
              <g className="decor-cabin">
                <path d="M-9 2 H9 V12 Q0 17 -9 12 Z" fill={colors[i % colors.length]} stroke="#8a6a52" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="2" stroke="#8a6a52" />
              </g>
            </g>
          ))}
          <circle cx="100" cy="100" r="6" fill="#8a6a52" />
        </g>
      </svg>
    </div>
  )
}

function Bunting({ className = '' }) {
  const colors = ['#f6a5b8', '#f9d27a', '#9fd7b5', '#9cc7ec', '#c8b0ea', '#f7b98b']
  const flags = Array.from({ length: 14 }, (_, i) => i)
  return (
    <svg viewBox="0 0 700 80" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 6 Q350 50 700 6" fill="none" stroke="#8a6a52" strokeWidth="1.5" />
      {flags.map((i) => {
        const x = 25 + i * 47
        const t = x / 700
        const y = 6 + 88 * t * (1 - t) + 1
        return (
          <path
            key={i}
            d={`M${x - 15} ${y} L${x + 15} ${y} L${x} ${y + 30} Z`}
            fill={colors[i % colors.length]}
            className="decor-flag"
            style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 160}ms` }}
          />
        )
      })}
    </svg>
  )
}

function Rays({ className = '' }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      {Array.from({ length: 36 }, (_, i) => (
        <path key={i} d="M0 -38 L3 -96 L-3 -96 Z" fill="currentColor" opacity={i % 2 ? 0.5 : 1} transform={`rotate(${i * 10})`} />
      ))}
      <circle r="34" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle r="28" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
    </svg>
  )
}

function Leaf({ className = '', style }) {
  return (
    <svg viewBox="0 0 40 60" className={className} style={style} aria-hidden="true">
      <path d="M20 2 C36 18 36 42 20 58 C4 42 4 18 20 2 Z" fill="#6f9a45" />
      <path d="M20 6 V56 M20 20 L28 14 M20 30 L30 24 M20 40 L28 34 M20 24 L12 18 M20 34 L10 28" stroke="#3f6b2a" strokeWidth="1" fill="none" />
    </svg>
  )
}

// deterministic scatter
const spread = (n, seed) =>
  Array.from({ length: n }, (_, i) => {
    const r = (k) => {
      const x = Math.sin((i + 1) * 12.9898 + seed * 78.233 + k * 37.719) * 43758.5453
      return x - Math.floor(x)
    }
    return { x: r(1), y: r(2), s: r(3), d: r(4) }
  })

const STARS = spread(46, 3)
const PETALS = spread(12, 7)
const LEAVES = spread(8, 11)

export default function ThemeDecor({ theme }) {
  switch (theme) {
    case 'forest':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {LEAVES.map((l, i) => (
            <Leaf
              key={i}
              className="decor-leaf absolute w-6 sm:w-8"
              style={{ left: `${30 + l.x * 68}%`, top: '-8%', animationDuration: `${11 + l.d * 8}s`, animationDelay: `${l.s * 6}s`, '--drift': `${(l.x - 0.5) * 120}px` }}
            />
          ))}
          <div className="absolute right-[4%] bottom-[3%] flex items-end gap-1 opacity-80 sm:right-[6%]">
            <img src="/images/icon-lotus.png" alt="" className="decor-bob w-12 sm:w-16" />
            <img src="/images/icon-lotus.png" alt="" className="decor-bob w-8 sm:w-11" style={{ animationDelay: '1.2s' }} />
          </div>
          <img src="/images/icon-waves.png" alt="" className="absolute right-[3%] bottom-[1%] w-24 opacity-40 sm:right-[5%] sm:w-32" />
        </div>
      )
    case 'rajputana':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Arch className="decor-draw absolute top-[3%] left-1/2 w-[92%] max-w-[620px] -translate-x-1/2 text-[#b07a1f] opacity-30" />
          <div className="absolute right-[4%] bottom-[3%] flex items-end gap-2 sm:right-[6%]">
            <Diya className="w-10 sm:w-14" />
            <Diya className="w-12 sm:w-16" delay={300} />
            <Diya className="w-10 sm:w-14" delay={600} />
          </div>
        </div>
      )
    case 'mughal':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Arch className="decor-draw absolute top-[3%] left-1/2 w-[92%] max-w-[620px] -translate-x-1/2 text-[#a8325f] opacity-25" />
          {PETALS.map((p, i) => (
            <span
              key={i}
              className="decor-petal absolute block rounded-[60%_0_60%_0] bg-[#e58fb0]"
              style={{
                left: `${p.x * 100}%`,
                top: '-5%',
                width: `${10 + p.s * 10}px`,
                height: `${10 + p.s * 10}px`,
                opacity: 0.75,
                animationDuration: `${9 + p.d * 7}s`,
                animationDelay: `${p.y * 8}s`,
                '--drift': `${(p.x - 0.5) * 160}px`,
              }}
            />
          ))}
          <img src="/images/icon-waves.png" alt="" className="decor-bob absolute right-[4%] bottom-[3%] w-20 opacity-60 sm:w-28" />
        </div>
      )
    case 'temple':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Temple className="absolute top-[3%] left-1/2 w-40 -translate-x-1/2 text-[#a86d08] opacity-20 sm:w-56" />
          <div className="absolute top-0 right-[8%] flex gap-4 sm:right-[10%] sm:gap-8">
            <Bell className="w-6 sm:w-8" length={50} />
            <Bell className="w-8 sm:w-10" length={90} delay={400} />
            <Bell className="w-6 sm:w-8" length={60} delay={800} />
          </div>
          <div className="absolute right-[5%] bottom-[3%] sm:right-[7%]">
            <Diya className="w-12 sm:w-16" />
          </div>
        </div>
      )
    case 'village':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Bunting className="absolute top-0 right-0 h-12 w-[70%] sm:h-16" />
          <FerrisWheel className="absolute right-[3%] bottom-[2%] h-32 w-28 opacity-70 sm:h-48 sm:w-44" />
        </div>
      )
    case 'golden':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="decor-star absolute block rounded-full bg-[#fff6d8]"
              style={{
                left: `${s.x * 100}%`,
                top: `${s.y * 100}%`,
                width: `${1 + s.s * 2.5}px`,
                height: `${1 + s.s * 2.5}px`,
                animationDelay: `${s.d * 4}s`,
                animationDuration: `${2.5 + s.s * 3}s`,
              }}
            />
          ))}
          <span className="decor-shooting absolute top-[12%] left-[30%] block h-px w-24 bg-gradient-to-r from-transparent to-[#fff6d8]" />
          <div className="absolute top-[5%] right-[6%] size-20 rounded-full shadow-[0_0_60px_20px_rgba(255,236,170,0.25)] sm:size-28">
            <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff8df,#f1d58c_60%,#c9a24e)] [mask-image:radial-gradient(circle_at_72%_32%,transparent_42%,#000_43%)]" />
          </div>
        </div>
      )
    case 'eternity':
      return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Rays className="decor-spin absolute top-[2%] left-1/2 w-[85%] max-w-[560px] -translate-x-1/2 text-[#d4a537] opacity-15" />
          <div className="absolute top-0 right-0 flex w-[70%] justify-between px-2">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="decor-toran flex flex-col items-center" style={{ animationDelay: `${i * 200}ms` }}>
                <span className="block w-px bg-[#8a6a2a]" style={{ height: `${14 + (i % 3) * 10}px` }} />
                <img src="/images/marigold.png" alt="" className="w-5 sm:w-7" />
                <img src="/images/marigold.png" alt="" className="-mt-1 w-4 sm:w-6" />
              </div>
            ))}
          </div>
          {PETALS.map((p, i) => (
            <img
              key={i}
              src="/images/marigold.png"
              alt=""
              className="decor-petal absolute"
              style={{
                left: `${p.x * 100}%`,
                top: '-6%',
                width: `${18 + p.s * 22}px`,
                animationDuration: `${8 + p.d * 6}s`,
                animationDelay: `${0.8 + p.y * 6}s`,
                '--drift': `${(p.x - 0.5) * 140}px`,
              }}
            />
          ))}
        </div>
      )
    default:
      return null
  }
}
