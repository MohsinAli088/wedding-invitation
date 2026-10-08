// Wording comes from "all event invite.docx" (all events), "kankotri and mataji
// na lota.docx" (Janam-1) and "Save the date PDF.pdf". Keep the Gujarati,
// Sanskrit and Hindi exactly as written.

export const couple = {
  bride: 'Prarthana',
  groom: 'Yatin',
  tagline: 'United as one - two souls, one journey.',
}

export const mantra = {
  shri: 'શ્રી',
  ganesh: 'શ્રી ગણેશાય નમઃ',
  kuldevi: ['કુલદેવી શ્રી હિંગળાજ માતા', 'અને રાજ રાજેશ્વરી અંબાજી મા ની કૃપાથી'],
}

// MAIN PAGE 1
export const opening = {
  shloka: ['વક્રતુંડ મહાકાય સૂર્યકોટિ સમપ્રભઃ ।', 'નિર્વિઘ્નં કુરુ મે દેવ શુભકાર્યેષુ સર્વદા ॥'],
  intro: 'Wedding invitation of',
  groom: { name: 'Yatin', parents: '(Son of Sona and Pritesh Karia)' },
  bride: { name: 'Prarthana', parents: '(Daughter of Hema and Bhrugesh Bhatt)' },
}

// PAGE 3: DESCRIPTION
export const description = {
  title: 'Saptabandhan',
  subtitle: 'Seven Janams, Seven Worlds, One Love',
  paragraphs: [
    'In Hindu tradition, marriage is not a single-lifetime promise. The seven pheras taken around the sacred fire are seven vows — and each vow is said to bind two souls across seven janams, seven lifetimes, until the bond is complete. Agni bears witness not just to this life, but to every life that follows.',
    'This is the belief at the heart of Saptabandhan: that a soul does not find its partner once. It finds them again and again, across time, across worlds, across forms — until the search itself becomes the proof of the bond.',
  ],
}

export const concept = {
  title: 'Concept',
  lead: 'Seven elements. Seven vows. One story..',
  body: "A reflection of Yatin and Prarthana's shared values, cherished passions, and the timeless bond that unites them across lifetimes",
  elementsTitle: 'Meanings of elements',
  elements: [
    { icon: 'lotus', name: 'Lotus', meaning: 'Purity, spiritual awakening and divine blessings.' },
    { icon: 'agni', name: 'Agni', meaning: 'The sacred fire that witnesses our vows and strengthens our bond..' },
    { icon: 'waves', name: 'Waves', meaning: 'Love for the sea, peace and calm' },
    { icon: 'north-star', name: 'North Star', meaning: 'Guidance, shared dreams and exploring the world together' },
    { icon: 'infinity', name: 'Infinity', meaning: 'Eternal love, an unending bond that transcends time.' },
    { icon: 'knot', name: 'Sacred Wedding Knot', meaning: 'The sacred knot of marriage, symbolizing unity, commitment and an unbreakable bond.' },
    { icon: 'sun-moon', name: 'Sun–Moon', meaning: 'Balance of energies, harmony through every phase of life.' },
  ],
}

const PARADISE_PARK = ['12,Paradise Park society,Behind Welcom hotel,', 'Ushmanpura,Ahmedabad,Gujarat']
const KAMLA_AMRUT = ['Kamla Amrut Farm']

// PAGE 4 onwards — one page per wedding function, each opening with its Janam
// (era) name and closing with that Janam's vow. Janam numbers run 1–7 to match
// the seven elements; the docx repeats "Janam-3" and "Janam-6".
export const events = [
  {
    id: 'forest-era',
    janam: 1,
    era: 'The Forest Era',
    theme: 'forest',
    element: 'lotus',
    invocation: 'ganesh',
    title: 'Mataji na Lota & Kankotri Lekhan',
    date: 'Sunday, 25th October 2026',
    schedule: [
      { label: 'Mataji na Lota', time: '10:00 AM onwards', note: '(followed by Lunch)' },
      { label: 'Kankotri Lekhan', time: '6:00 PM onwards', note: '(followed by dinner)' },
    ],
    dressCode: { label: 'Orange/Cream/Golden', colors: ['#d9622b', '#f3e9d2', '#d4a537'] },
    venue: PARADISE_PARK,
    vow: {
      name: 'Vow of Nourishment.',
      text: 'Before language or names, two souls in an ancient forest found each other by instinct — the most basic vow, lived in its rawest form. Like the lotus rising untouched through muddied water, this was the beginning: pure, unhurried, unaware of its own significance yet.',
    },
  },
  {
    id: 'royal-rajputana-era',
    janam: 2,
    era: 'The Royal Rajputana Era',
    theme: 'rajputana',
    element: 'agni',
    invocation: { lang: 'sa', lines: ['॥ श्री कृष्णः शरणं मम ॥'] },
    title: 'Vivah Khel',
    blessing: { lang: 'sa', lines: ['॥ प्रेम्णा समर्पितं जीवनं,', 'सेवया सुशोभितं दाम्पत्यम्।', 'श्रीकृष्णकृपया मंगलं भवतु ॥'] },
    date: 'Saturday, 20th November 2026',
    schedule: [{ label: 'Timing', time: '6:00 PM onwards', note: '(followed by Dinner)' }],
    dressCode: { label: 'Green', colors: ['#2f7d4a'] },
    venue: ['Kalyan Pushti Haveli, Vastrapur', 'Ahmedabad,Gujarat'],
    vow: {
      name: 'Vow of Strength.',
      text: "As a king and his queen, Yatin and Prarthana carried a kingdom's weight side by side — strength not just for themselves, but for those who depended on them. Agni bore witness here, the sacred fire that strengthens every vow it touches.",
    },
  },
  {
    id: 'mughal-garden-era',
    janam: 3,
    era: 'Mughal Garden Era',
    theme: 'mughal',
    element: 'waves',
    invocation: 'ganesh',
    title: 'The Mehandi Mela',
    blessing: {
      lines: [
        'As the colours of Mehendi bring joy, tradition and celebration to this beautiful occasion,',
        'may we gather to bless the groom with love, laughter and cherished memories.',
      ],
    },
    date: 'Saturday, 21st November 2026',
    schedule: [{ label: 'Mehandi ceremony', time: '5:00 PM onwards', note: '(followed by dinner)' }],
    dressCode: { label: 'Pink', colors: ['#e58fb0'] },
    venue: PARADISE_PARK,
    vow: {
      name: 'Vow of Prosperity.',
      text: 'Amid fountains and roses, this was a lifetime of flourishing — a love that grew the way a garden does, tended by both hands. Like waves finding their rhythm, prosperity here was never sudden — it was steady, returning, building with each tide.',
    },
  },
  {
    id: 'temple-era',
    janam: 4,
    era: 'The Temple Era',
    theme: 'temple',
    element: 'north-star',
    invocation: 'ganesh',
    title: 'Grah Shanti',
    blessing: {
      lines: [
        'As sacred mantras echo through the home and blessings fill every corner,',
        'we invite you to join us as this Grah Shanti marks a blessed beginning to the celebrations that follow.',
      ],
    },
    date: 'Sunday, 22nd November 2026',
    schedule: [
      { label: 'Ganesh Stapana', time: '9:05 AM' },
      { label: 'Mandap Stapna', time: '9:25 AM' },
      { label: 'Grah Shanti Yagya', time: '10:15 AM', note: '(followed by Lunch)' },
    ],
    dressCode: { label: 'Yellow/Red/Grahcola', colors: ['#f2c230', '#c0272d'] },
    venue: PARADISE_PARK,
    vow: {
      name: 'Vow of Happiness.',
      text: "As devotees drawn to the same temple by something neither chose, they learned that joy, like devotion, is stronger when it isn't carried alone. The North Star guided them there — the same quiet guidance that points two souls toward shared joy.",
    },
  },
  {
    id: 'village-mela-era',
    janam: 5,
    era: 'The Village Mela Era',
    theme: 'village',
    element: 'infinity',
    invocation: 'ganesh',
    title: 'Pastel Paradise for Haldi',
    subtitle: 'Of Yatin & Prarthana',
    blessing: {
      lines: [
        'Amidst rustic charm, vibrant colours, and the joy of a village carnival,',
        'join us for a Haldi celebration filled with laughter, love, and festive cheer.',
      ],
    },
    date: 'Monday, 23rd November 2026',
    schedule: [{ label: 'Haldi', time: '10:00 AM onwards', note: '(followed by Lunch)' }],
    dressCode: { label: 'Shades of Pastel', colors: ['#f6c6d0', '#fde3a7', '#c8e6c9', '#bfdcf2', '#d9c8ef'] },
    venue: KAMLA_AMRUT,
    vow: {
      name: 'Vow of Family.',
      text: 'Ordinary and unadorned, they found each other at the fair — the simplest, most human vow, lived among simple, ordinary people. And yet even here, infinity was present — a bond already stretching further than either of them could see.',
    },
  },
  {
    id: 'golden-era',
    janam: 6,
    era: 'The Golden Era',
    theme: 'golden',
    element: 'knot',
    invocation: 'ganesh',
    title: 'The Moonlight Mehfil',
    blessing: {
      lines: [
        'Where galaxies glow beneath a moonlit sky,',
        'join us for a Sufi night where soulful melodies meet a celebration written in the stars.',
      ],
    },
    date: 'Monday, 23rd November 2026',
    schedule: [{ label: 'Sangeet', time: '7:00 PM onwards', note: '(followed by DINNER)' }],
    dressCode: { label: 'Blue/Black', colors: ['#1f3c88', '#111111'] },
    venue: KAMLA_AMRUT,
    vow: {
      name: 'Vow of Longevity.',
      text: 'Found through song, in a world where every glance had a soundtrack, this lifetime was about staying — a love built to last through every act. The knot was tied here in spirit, long before it was tied in ritual — unity that outlasted the final scene.',
    },
  },
  {
    id: 'eternity',
    janam: 7,
    era: 'Eternity. All Lifetimes, One Moment',
    theme: 'eternity',
    element: 'sun-moon',
    invocation: 'ganesh',
    title: 'Wedding',
    blessing: {
      verse: { lang: 'hi', lines: ['जेहि कें जेहि पर सत्य सनेहू।', 'सो तेहि मिलइ न कछु संदेहू॥'] },
      lines: [
        'With mantras in the air, blessings in our hearts, and the grace of the divine,',
        'we invite you to witness the sacred union of two hearts and two families.',
      ],
    },
    date: 'Tuesday, 24th November 2026',
    dateNote: 'Shukla Purnima,Vikram Samvant 2083',
    schedule: [
      { label: 'Jaan Prasthan', time: '3:05 PM' },
      { label: 'Hastmelap', time: '6:35 PM', note: '(followed by DINNER)' },
    ],
    dressCode: { label: 'Indian Traditional', colors: [] },
    venue: KAMLA_AMRUT,
    vow: {
      name: 'Vow of Friendship & Loyalty.',
      text: 'Six lifetimes of searching end here, in one circle where Yatin and Prarthana complete a bond that was never really seven separate stories — only one. Like sun and moon, never together yet never apart, they now share one sky — in perfect, permanent balance.',
    },
  },
]

// PAGE 9
export const family = {
  title: 'A cordial invitation from',
  couples: [
    ['Late Rameshbhai Jayantibhai Karia', 'Mrs. Jayshreeben Rameshbhai Karia'],
    ['Bakulbhai Jayantibhai Karia', 'Mrs. Meenaben Bakulbhai Karia'],
    ['Mukundbhai Jayantibhai Karia', 'Mrs. Amitaben Mukundbhai Karia'],
    ['Shyambhai Jayantibhai Karia', 'Mrs. Rupaben Shyambhai Karia'],
    ['Rambhai Jayantibhai Karia', 'Mrs. Sona Rambhai Karia'],
    ['Mr Kaushikbhai Babubhai Karia', 'Mrs. Parulben Kaushikbhai Karia'],
    ['Mr. Prakashbhai Babubhai Karia', 'Mrs. Beenaben Prakashbhai Karia'],
  ],
  awaits: 'Entire Karia Family awaits your presence',
  // "Tahuko" is a heading in the docx with no lines under it yet
  tahuko: { title: 'Tahuko', lines: [] },
  note: 'No gifts,no flowers only blessings',
}

export const mapsLink = (lines) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lines.join(' '))}`
