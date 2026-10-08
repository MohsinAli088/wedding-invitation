# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page wedding invitation site ("Saptabandhan", for Yatin & Prarthana), built with React 19, Vite and Tailwind CSS v4. Tailwind runs through `@tailwindcss/vite`; there is no `tailwind.config` file, and all theme tokens are in `@theme` in `src/index.css`. Smooth scrolling comes from Lenis. There is no router, no test suite and no linter.

The source material lives in the parent folder (`../`):
- `all event invite.docx`: the full event list. It is the source of truth for wording, dates, timings, dress codes and venues.
- `kankotri and mataji na lota.docx`: the details for Janam-1.
- `Save the date PDF.pdf`: the visual design.
- The WhatsApp `.mp4`: the reference for the opening animation.

## Commands

```bash
npm run dev       # dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # serve dist/
```

There are two dev-only URL switches, read through `import.meta.env.DEV`:
- `?skipIntro` skips the envelope opening.
- `?introAt=2500` freezes the opening at 2500 ms, which is useful for checking single frames.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes to GitHub Pages at `https://mohsinali088.github.io/wedding-invitation/`.

The site is served from a subfolder, so the workflow builds with `BASE_PATH=/<repo>/`, and `vite.config.js` uses that as `base`. As a result, **every image path in JSX must go through `img()` from `src/asset.js`**, never a hard-coded `/images/...`. Vite rewrites paths in CSS `url()` and `index.html` by itself.

To build or preview exactly what Pages serves, set the same environment variable. In Git Bash, also set `MSYS_NO_PATHCONV=1`, or the path gets rewritten to `/Program Files/Git/...`:

```bash
MSYS_NO_PATHCONV=1 BASE_PATH=/wedding-invitation/ npm run build
MSYS_NO_PATHCONV=1 BASE_PATH=/wedding-invitation/ npx vite preview   # → /wedding-invitation/
```

Commits use the repo-local identity `MohsinAli088 <223065563+MohsinAli088@users.noreply.github.com>`. This PC's global Git identity and its signed-in GitHub account belong to someone else.

## Architecture

**Content vs. presentation.** All wording is in `src/data/content.js`. Each wedding function is one object in the `events` array. `App.jsx` renders one `EventPage` per object, and that same array also generates the nav items. To add or change an event, edit the data, not the components. Keep Gujarati, Sanskrit and Hindi text exactly as written in the docx.

**Page shell.** Every section is wrapped in `components/Card.jsx`, which draws one "page" of the invitation:
- the orange/teal block-print frame (`.card-frame`, a CSS `border-image` over `frame.webp`, with its width set by the CSS variable `--bw`);
- the paper background;
- the garland top-left and the peacock bottom-left;
- an ink-wash overlay.

`Card` takes a `theme` from `THEMES` in `components/ThemeDecor.jsx`. The theme supplies the CSS variables `--accent`, `--accent-2` and `--page-ink`, and `night: true` switches to the dark Golden Era card. `EventPage` styles its text with those variables (`text-(--accent)`). `Card` also takes a `decor` element: `<ThemeDecor theme=…/>` provides each Janam's own artwork and ambient animation.

**Animation gating.** This is the part that needs several files read together:
- `GateContext` (in `components/motion.js`) stays false while the intro overlay is up, so nothing animates unseen. `App` holds `introDone`, and while the intro plays it stops Lenis and locks page scrolling.
- `Card` observes its own visibility once. It then supplies `CardContext` with the time it entered the viewport, or `0` if it hasn't, and adds the `.is-inview` class. That class triggers the CSS animations in `index.css`: the ink bloom, the garland drop, the peacock rise, and un-pausing every `.decor-*` animation.
- `Reveal` and `SplitText` reveal content only once both they and their card are in view. They wait `INK_LEAD_MS` so the ink wash clears first. `useRevealDelay` drops the staggered delay for anything reached more than 700 ms after the card arrived, such as the lower part of a long page on a phone.
- Every animation has an alternative under `prefers-reduced-motion` in `index.css`, and with reduced motion the intro is skipped entirely.

**Intro** (`components/Intro.jsx`). This is a hand-written `requestAnimationFrame` timeline, not CSS keyframes:
- The `T` table holds each phase's start and end time in milliseconds.
- The envelope parts (back, front pocket, flap, seal) are sibling layers that share one transform, so the card can slot between them in the stacking order.
- The card then scales up to exactly match the first `Card`, and the overlay fades out. That hand-off only looks seamless while the padding and max-width values in `cardBox()` match the section padding in `Card.jsx`, so keep them in sync.
- Before playing, the intro preloads and decodes every image in `SITE_IMAGES` plus the web fonts, showing a loading seal while it waits. On a slow connection, the animations otherwise played over half-loaded images. Add any new artwork to `SITE_IMAGES`.
- After loading, the intro waits on a "Tap to open" seal (phases: `loading` → `ready` → `playing`). That tap is required because browsers only allow audio to start after a user gesture: `onOpen` starts the background song in `components/MusicPlayer.jsx` (`music` in `content.js`, file at `public/audio/preet-re.mp3`). The music button hides itself if the audio file fails to load.

**Assets** (`public/images/`). These were extracted from the PDF:
- the frame, paper, peacock, garland, logo and ampersand;
- the seven element icons.

The marigold and ink-wash images were generated. Large artwork is WebP for load time; `logo.png` is kept only as the favicon. The optional Ganesh photo goes at `public/images/ganesh.png`; until it exists, `Ganesh.jsx` shows a શ્રી medallion instead.
