# Saptabandhan — Yatin & Prarthana wedding invitation

A responsive invitation website built with React, Vite and Tailwind CSS v4. Its design comes from the couple's "Save the date" PDF, and its content comes from the event invite documents.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production files in dist/
npm run preview  # serve dist/ locally
```

## What's inside

- **Opening animation:** recreated from the invitation video. A sealed envelope opens, marigolds burst out, and the card grows into the first page (`src/components/Intro.jsx`).
- **Pages:**
  1. Shri Ganesh
  2. Monogram
  3. Saptabandhan description
  4. Concept
  5. Seven Janam event pages: Forest, Royal Rajputana, Mughal Garden, Temple, Village Mela, Golden Era, Eternity
  6. Family invitation
- **Scroll motion:**
  - each page washes in with teal watercolour ink;
  - the garland and peacock animate in;
  - names reveal letter by letter;
  - each Janam page has its own theme decoration (`src/components/ThemeDecor.jsx`);
  - smooth scrolling via Lenis.
- All wording lives in `src/data/content.js`.
- Artwork in `public/images/` was extracted from the PDF, except the marigold and ink-wash images, which were generated.

**Ganesh photo:** add it as `public/images/ganesh.png`. Until then the first page shows a શ્રી medallion.

Dev-only URL switches: `?skipIntro` skips the opening; `?introAt=2500` freezes the opening at 2.5 s.
