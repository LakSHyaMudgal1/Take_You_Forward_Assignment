# 🗓️ Wall Calendar

A polished, production-level interactive wall calendar built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Designed to replicate the feel of a physical wall calendar with a modern, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)

🔗 **Live Demo:** [https://tuf-orpin.vercel.app/](https://tuf-orpin.vercel.app/)

---

## Features

- **Wall calendar aesthetic** — spiral binding header, per-month hero photography, strong visual hierarchy
- **Month navigation** — slide animation between months, jump to today
- **Date range selection** — click once for start, again for end, third click resets. Start, end, and in-between dates are visually distinct
- **Holiday markers** — US holidays shown as emoji badges on their dates
- **Notes panel** — add general monthly notes or notes tied to a selected date range, with inline edit and delete. All notes persist via `localStorage`
- **Dark / light mode** — toggle with smooth transition, preference saved to `localStorage`
- **Responsive layout** — side-by-side on desktop, stacked on mobile
- **Framer Motion animations** — hero image crossfade, grid slide, cell spring hover, note entry/exit

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| localStorage | Note persistence |

---

## Project Structure

```
wall-calendar/
├── app/
│   ├── layout.tsx          # Root layout, font imports
│   ├── page.tsx            # Entry point
│   └── globals.css         # Tailwind base + global styles
├── components/
│   ├── calendar/
│   │   ├── WallCalendar.tsx    # Root orchestrator component
│   │   ├── ImageSection.tsx    # Hero image + spiral binding
│   │   ├── CalendarHeader.tsx  # Month nav + controls
│   │   ├── CalendarGrid.tsx    # 7-col date grid with animation
│   │   ├── DateCell.tsx        # Individual day cell
│   │   └── NotesPanel.tsx      # Notes CRUD panel
│   └── ui/
│       └── ThemeToggle.tsx     # Dark/light mode switch
├── hooks/
│   ├── useCalendar.ts      # View state, range selection, navigation
│   └── useNotes.ts         # Notes CRUD + localStorage persistence
├── lib/
│   ├── utils.ts            # Date helpers, class merging
│   ├── holidays.ts         # US holiday definitions
│   └── monthImages.ts      # Per-month Unsplash image map
└── types/
    └── calendar.ts         # Shared TypeScript interfaces
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How Date Range Selection Works

The calendar uses a 3-state click cycle managed in `useCalendar.ts`:

1. First click → sets **start date** (indigo filled circle)
2. Second click → sets **end date**, highlights the full range (indigo tinted background)
3. Third click → **resets** selection and starts a new one

If you click an earlier date as the second click, the range is automatically normalized so start is always before end.

---

## Notes

Notes are stored per month under the key `wall-calendar-notes` in `localStorage` as a `{ "YYYY-MM": Note[] }` map. Each note optionally carries a `rangeStart` and `rangeEnd` ISO date string if a range was active when the note was created. Notes support inline editing and deletion.

---

## Customization

- **Hero images** — swap out URLs in `lib/monthImages.ts`
- **Holidays** — add or edit entries in `lib/holidays.ts` using `"MM-DD"` keys
- **Theme colors** — adjust the indigo accent in `tailwind.config.ts`
