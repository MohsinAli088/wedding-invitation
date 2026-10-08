import { useEffect, useRef, useState } from 'react'

// Opening sequence recreated from the invitation video:
// envelope slides in → wax seal lifts → flap opens → marigolds burst out →
// the card rises out, grows to fill the screen, and the page fades in beneath.

const T = {
  enter: [150, 1300],
  sealPulse: [1300, 1550],
  sealGone: [1550, 1800],
  flap: [1650, 2250],
  flowers: [2150, 4300],
  cardIn: [2250, 2450],
  cardRise: [2300, 3450],
  zoom: [3500, 4700],
  envOut: [3550, 4500],
  fadeOut: [4950, 5550],
}
const END = T.fadeOut[1]

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const seg = (t, [a, b]) => clamp01((t - a) / (b - a))
const lerp = (a, b, p) => a + (b - a) * p
const outCubic = (p) => 1 - (1 - p) ** 3
const inCubic = (p) => p ** 3
const inOutCubic = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)

const OLIVE = '#6b7b34'
const OLIVE_DARK = '#5d6c2c'
const OLIVE_LIGHT = '#76873b'
const LINER = '#e9dfc3'

// Deterministic flower flight paths
const FLOWERS = Array.from({ length: 11 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280
    return x - Math.floor(x)
  }
  return {
    delay: i * 70,
    dur: 1500 + r(1) * 600,
    x: (r(2) - 0.5) * 1.1, // × viewport width
    y: -(0.4 + r(3) * 0.65), // × viewport height
    size: 0.11 + r(4) * 0.13, // × min(vw, vh)
    spin: (r(5) > 0.5 ? 1 : -1) * (90 + r(6) * 200),
    grow: 1 + r(7) * 0.9,
  }
})

// Must match Card.jsx section padding / max width so the hand-off is seamless
function cardBox(vw, vh) {
  const px = vw >= 1280 ? 56 : vw >= 1024 ? 24 : vw >= 640 ? 16 : 8
  const py = vw >= 640 ? 16 : 8
  return { w: Math.min(vw - 2 * px, 1280), h: vh - 2 * py }
}

function geometry(vw, vh) {
  const E = Math.min(vw * 0.78, 460)
  const H = E * 0.66
  const desktop = vw >= 768
  const cx = vw * (desktop ? 0.1 : 0.06)
  const cy = vh * (desktop ? 0.2 : 0.24)
  const card = cardBox(vw, vh)
  const s = (0.52 * E) / card.w
  return { E, H, cx, cy, card, s, ch: s * card.h }
}

function envelopeAt(t, g, vw, vh) {
  const p = outCubic(seg(t, T.enter))
  const q = inCubic(seg(t, T.envOut))
  return {
    dx: g.cx + lerp(vw * 0.6, 0, p),
    dy: g.cy + lerp(vh * 0.6, 0, p) + q * vh * 0.9,
    r: lerp(24, -7, p) - 10 * q,
    blur: q * 6,
  }
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('loading')
  const refs = {
    root: useRef(null),
    garland: useRef(null),
    back: useRef(null),
    front: useRef(null),
    flap: useRef(null),
    flapInner: useRef(null),
    seal: useRef(null),
    card: useRef(null),
    flowers: useRef([]),
  }
  const skipRef = useRef(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  // Wait for artwork so the sequence doesn't play over half-loaded images
  useEffect(() => {
    const srcs = ['/images/logo.png', '/images/frame.png', '/images/paper.jpg', '/images/garland.png', '/images/marigold.png']
    const loads = srcs.map(
      (src) =>
        new Promise((res) => {
          const img = new Image()
          img.onload = img.onerror = res
          img.src = src
        }),
    )
    const timeout = new Promise((res) => setTimeout(res, 3000))
    Promise.race([Promise.all(loads), timeout]).then(() => setPhase('playing'))
  }, [])

  useEffect(() => {
    if (phase !== 'playing') return
    let raf
    let start = performance.now()
    // Dev only: ?introAt=2500 freezes the sequence at that moment for inspection
    const frozenAt = import.meta.env.DEV ? new URLSearchParams(location.search).get('introAt') : null

    const frame = (now) => {
      if (skipRef.current) {
        // jump to the fade-out
        start = Math.min(start, now - T.fadeOut[0])
        skipRef.current = false
      }
      const t = frozenAt !== null ? +frozenAt : now - start
      const vw = window.innerWidth
      const vh = window.innerHeight
      const g = geometry(vw, vh)
      const env = envelopeAt(t, g, vw, vh)
      const base = `translate(${env.dx}px, ${env.dy}px) rotate(${env.r}deg)`
      const envFilter = env.blur ? `blur(${env.blur}px)` : 'none'

      for (const part of [refs.back, refs.front, refs.flap, refs.seal]) {
        const el = part.current
        if (!el) continue
        el.style.width = `${g.E}px`
        el.style.height = `${g.H}px`
        el.style.transform = `translate(-50%, -50%) ${base}`
        el.style.filter = envFilter
      }

      // wax seal: small pulse, then lifts away
      const pulse = Math.sin(seg(t, T.sealPulse) * Math.PI) * 0.12
      const gone = seg(t, T.sealGone)
      refs.seal.current.style.opacity = String(1 - gone)
      refs.seal.current.firstChild.style.transform = `scale(${1 + pulse + gone * 0.5}) translateY(${-gone * 30}px)`

      // flap swings open; drops behind the card once past vertical
      const flapAngle = 180 * inOutCubic(seg(t, T.flap))
      refs.flapInner.current.style.transform = `rotateX(${flapAngle}deg)`
      refs.flap.current.style.zIndex = flapAngle > 90 ? '1' : '5'

      // card: rises out of the envelope, then grows to fill the screen
      const card = refs.card.current
      card.style.width = `${g.card.w}px`
      card.style.height = `${g.card.h}px`
      const yStart = -g.H / 2 + g.ch / 2 + g.H * 0.1
      const yEnd = -g.H / 2 + g.H * 0.12 - g.ch / 2
      const rise = inOutCubic(seg(t, T.cardRise))
      const z = inOutCubic(seg(t, T.zoom))
      const frozen = envelopeAt(T.zoom[0], g, vw, vh)
      const src = t < T.zoom[0] ? env : frozen
      const dx = lerp(src.dx, 0, z)
      const dy = lerp(src.dy, 0, z)
      const r = lerp(src.r, 0, z)
      const y = lerp(lerp(yStart, yEnd, rise), 0, z)
      const s = lerp(g.s, 1, z)
      card.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${r}deg) translateY(${y}px) scale(${s})`
      card.style.opacity = String(seg(t, T.cardIn))
      card.style.zIndex = t >= T.zoom[0] ? '8' : '3'
      // hide whatever would poke out below the envelope
      const visible = clamp01((g.H / 2 - (y - g.ch / 2)) / g.ch)
      card.style.clipPath = z > 0 ? 'none' : `inset(0 0 ${(1 - visible) * 100}% 0)`

      // marigolds burst from the envelope mouth
      const mouth = -g.H / 2 + g.H * 0.2
      const rad = (env.r * Math.PI) / 180
      const ox = env.dx - mouth * Math.sin(rad)
      const oy = env.dy + mouth * Math.cos(rad)
      const unit = Math.min(vw, vh)
      FLOWERS.forEach((f, i) => {
        const el = refs.flowers.current[i]
        if (!el) return
        const local = clamp01((t - T.flowers[0] - f.delay) / f.dur)
        const p = outCubic(local)
        const size = f.size * unit
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.transform = `translate(-50%, -50%) translate(${ox + f.x * vw * p}px, ${oy + f.y * vh * p}px) rotate(${f.spin * p}deg) scale(${lerp(0.25, f.grow, p)})`
        el.style.opacity = local <= 0 ? '0' : String(Math.min(1, local * 8) * (1 - clamp01((local - 0.62) / 0.38)))
        el.style.filter = local > 0.6 ? `blur(${(local - 0.6) * 10}px)` : 'none'
      })

      // garland drops in at the start
      refs.garland.current.style.transform = `translateY(${(1 - outCubic(seg(t, [0, 900]))) * -100}%)`

      // fade the whole overlay away, revealing the site
      const fade = seg(t, T.fadeOut)
      refs.root.current.style.opacity = String(1 - fade)

      if (t >= END && frozenAt === null) {
        doneRef.current()
        return
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={refs.root}
      role="dialog"
      aria-label="Opening invitation"
      className="fixed inset-0 z-[100] overflow-hidden bg-paper"
      style={{ background: "url('/images/paper.jpg') center / cover, var(--color-paper)" }}
    >
      <div ref={refs.garland} className="absolute top-0 left-[4%] w-[46%] max-w-[420px] sm:w-[30%] lg:w-[24%]" style={{ transform: 'translateY(-100%)' }}>
        <img src="/images/garland.png" alt="" className="animate-sway w-full" />
      </div>

      {/* Envelope parts share one transform; separate layers let the card slot between them */}
      <div ref={refs.flap} className="absolute top-1/2 left-1/2" style={{ perspective: '900px', zIndex: 5 }}>
        <div ref={refs.flapInner} className="h-full w-full" style={{ transformOrigin: '50% 0', transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 100 66" preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_3px_3px_rgba(40,50,10,0.25)]">
            <path d="M0 0 H100 L53 37 Q50 39.5 47 37 Z" fill={OLIVE_LIGHT} />
          </svg>
        </div>
      </div>

      <div ref={refs.back} className="absolute top-1/2 left-1/2 z-[2] drop-shadow-[0_18px_22px_rgba(50,45,20,0.28)]">
        <svg viewBox="0 0 100 66" preserveAspectRatio="none" className="h-full w-full">
          <rect width="100" height="66" rx="1.5" fill={OLIVE} />
          <path d="M1.5 1.5 H98.5 L50 34 Z" fill={LINER} />
        </svg>
      </div>

      <div ref={refs.front} className="absolute top-1/2 left-1/2 z-[4]">
        <svg viewBox="0 0 100 66" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <pattern id="env-tex" patternUnits="userSpaceOnUse" width="60" height="66">
              <image href="/images/paper.jpg" width="60" height="66" preserveAspectRatio="xMidYMid slice" />
            </pattern>
          </defs>
          <path d="M0 0 L50 37 L0 66 Z" fill={OLIVE_DARK} />
          <path d="M100 0 L50 37 L100 66 Z" fill={OLIVE_DARK} />
          <path d="M0 66 L48 33.5 Q50 32 52 33.5 L100 66 Z" fill={OLIVE} />
          <path d="M0 66 L48 33.5 Q50 32 52 33.5 L100 66" fill="none" stroke="#4d5a22" strokeWidth="0.35" strokeOpacity="0.6" />
          <rect width="100" height="66" fill="url(#env-tex)" style={{ mixBlendMode: 'multiply' }} opacity="0.35" />
        </svg>
      </div>

      <div ref={refs.seal} className="absolute top-1/2 left-1/2 z-[6]">
        {/* sits on the flap tip */}
        <div className="absolute top-[57%] left-1/2 aspect-square w-[21%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="grid h-full w-full place-items-center rounded-full shadow-[0_3px_6px_rgba(60,50,20,0.35),inset_0_-3px_6px_rgba(120,110,80,0.35),inset_0_3px_5px_rgba(255,255,255,0.7)]"
            style={{ background: 'radial-gradient(circle at 40% 35%, #f6f2e4, #ddd5bd 70%, #c9bf9f)' }}
          >
            <img src="/images/logo.png" alt="" className="w-[78%] opacity-70 mix-blend-multiply" />
          </div>
        </div>
      </div>

      <div ref={refs.card} className="card-frame absolute top-1/2 left-1/2 grid place-items-center" style={{ opacity: 0 }}>
        <img src="/images/logo.png" alt="" className="w-[min(60%,22rem)]" />
      </div>

      {FLOWERS.map((_, i) => (
        <img
          key={i}
          ref={(el) => (refs.flowers.current[i] = el)}
          src="/images/marigold.png"
          alt=""
          className="absolute top-1/2 left-1/2 z-[7]"
          style={{ opacity: 0 }}
        />
      ))}

      <button
        type="button"
        onClick={() => (phase === 'playing' ? (skipRef.current = true) : onDone())}
        className="absolute right-4 bottom-4 z-[9] border border-teal-deep/60 bg-paper/80 px-4 py-1.5 text-xs tracking-[0.3em] text-teal-deep uppercase backdrop-blur-sm transition hover:bg-teal-deep hover:text-paper sm:right-6 sm:bottom-6"
      >
        Skip
      </button>
    </div>
  )
}
