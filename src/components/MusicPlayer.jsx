import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { music } from '../data/content'

// Background song. Browsers only allow audio after a tap, so the intro's
// "Tap to open" calls start(); the floating button pauses/resumes.
const MusicPlayer = forwardRef(function MusicPlayer(_, ref) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  const fadeTo = (target, ms = 1200) => {
    const a = audioRef.current
    const from = a.volume
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / ms)
      a.volume = from + (target - from) * p
      if (p < 1) requestAnimationFrame(step)
      else if (target === 0) a.pause()
    }
    requestAnimationFrame(step)
  }

  const play = () => {
    const a = audioRef.current
    if (!a || !available) return
    a.volume = 0
    a.play()
      .then(() => {
        setPlaying(true)
        fadeTo(music.volume)
      })
      .catch(() => setPlaying(false))
  }

  const pause = () => {
    setPlaying(false)
    fadeTo(0, 500)
  }

  useImperativeHandle(ref, () => ({ start: play }))

  // Pause when the tab is hidden, resume when it comes back
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current
      if (!a || !playing) return
      if (document.hidden) a.pause()
      else a.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [playing])

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}${music.src}`}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />
      {available && (
        <button
          type="button"
          onClick={playing ? pause : play}
          aria-label={playing ? `Pause music: ${music.title}` : `Play music: ${music.title}`}
          aria-pressed={playing}
          className="fixed top-4 right-4 z-[90] flex items-center gap-2 rounded-full border border-gold/60 bg-teal-deep/85 py-2 pr-4 pl-3 text-paper shadow-lg backdrop-blur-sm transition hover:bg-teal-deep sm:top-6 sm:right-6"
        >
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`music-bar w-[3px] rounded-full bg-gold ${playing ? 'is-playing' : ''}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
          <span className="text-xs tracking-[0.2em] uppercase">{music.title}</span>
        </button>
      )}
    </>
  )
})

export default MusicPlayer
