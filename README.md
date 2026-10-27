# VeeWordle 💌

A romantic single-page date invitation website told through 5 Wordle-style puzzles, built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **Soft Romantic Aesthetic**: Blush, rose, and cream palette with rounded corners, subtle glassmorphism, floating background hearts, and custom typography (`Pacifico` display font + `Quicksand` body text).
- **5 Custom Wordle Puzzles**:
  1. `MATCHA` (6 letters) - *"go-to drink"*
  2. `FOODTRIP` (8 letters) - *"fave gawin"*
  3. `MOVIES` (6 letters) - *"what we always swore to go to pag may bagong papanoorin"*
  4. `PHOTOBOOTH` (10 letters) - *"what we always do at the end of every date"*
  5. `POPUPS` (6 letters) - *"go-to ganap sa Nuvali"*
- **Wordle Game Mechanics**:
  - Dynamic grid columns based on word length (mobile-optimized tile sizing).
  - 6 attempts per puzzle with classic evaluation colors.
  - On-screen touch keyboard + physical keyboard input.
  - Staggered tile-flip animations on submit, pop-in animation on type, and shake animation on incomplete rows.
  - Gentle fallback on 6 attempts: *"so close! try again 💕"* with retry and hint options (no hard fail!).
- **Post-Puzzle 5 Celebration**:
  - Festive confetti burst and message: *"You know what time it is? I think it's time to celebrate a month of being together, officially :DD"*.
- **The Question**:
  - *"Will you go on a date with me this November 3, 2026, a whole day to ourselves and no one to object?"*
  - **Impossible-to-click NO button**: Jumps to a random safe position within the viewport on desktop hover, mobile touchstart/pointerdown, or keyboard focus, never leaving the screen and never overlapping the YES button.
  - YES button grows bigger with each dodge attempt!
- **After YES**:
  - Full confetti burst with *"She said yes!!"*.
  - **Save the Date (.ics)**: One-click download of an `.ics` calendar file for November 3, 2026 (all-day event titled *"Our Date 💗"*).
  - **Add to Google Calendar**: Direct link opening Google Calendar with all prefilled details.
  - **"Our plans" Itinerary Card**: Chronological date timeline built from the puzzle answers in order (*Matcha → Food trip → Movies → Pop-ups at Nuvali → Photobooth to end the day*).
- **Progress Persistence**: Automatically saves progress to `localStorage` so refreshing or switching tabs never loses completed puzzles. A discreet restart button allows replaying anytime.
- **Accessibility & Mobile-first**: Large tap targets (min 44px), ARIA labels, visible focus states, and `@media (prefers-reduced-motion)` support.

---

## 📁 File Structure

```text
VeeWordle/
├── index.html                     # Entry HTML with Pacifico & Quicksand fonts
├── package.json                   # Dependencies & build scripts
├── postcss.config.js              # PostCSS configuration for Tailwind
├── tailwind.config.js             # Theme colors, fonts, and animation keyframes
├── vite.config.js                 # Vite bundler configuration
└── src/
    ├── main.jsx                   # React root entry point
    ├── App.jsx                    # Core flow orchestration & localStorage persistence
    ├── index.css                  # Tailwind styles & 3D flip rules
    ├── config/
    │   └── dateConfig.js          # Central config for all puzzles, copy, & itinerary
    ├── components/
    │   ├── BackgroundEffects.jsx  # Floating hearts & ambient glow
    │   ├── Header.jsx             # VeeWordle brand, heart progress bar & restart modal
    │   ├── StartScreen.jsx        # Landing card with envelope & start button
    │   ├── WordlePuzzle.jsx       # Wordle grid, tile animations & gentle retry modal
    │   ├── Keyboard.jsx           # On-screen keyboard with key evaluation colors
    │   ├── Celebration.jsx        # Puzzle 5 celebration screen with confetti
    │   ├── Question.jsx           # Date question & impossible runaway NO button
    │   └── SavedDate.jsx          # "She said yes!!", .ics download & itinerary timeline
    └── utils/
        ├── calendar.js            # .ics file generator & Google Calendar URL builder
        ├── confetti.js            # Canvas-confetti celebration triggers
        └── wordleHelper.js        # Exact Wordle letter frequency evaluation algorithm
```

---

## 🚀 Run Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser (or your local network IP on mobile).

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build locally
```bash
npm run preview
```

---

## 🛠️ Easy Customization

To edit answers, clues, dates, or the itinerary, open `src/config/dateConfig.js`:

```javascript
// Change puzzle answers or clues:
puzzles: [
  { id: 1, answer: "MATCHA", length: 6, clue: "go-to drink", ... },
  ...
]

// Change date details or itinerary:
yesScreen: {
  eventDate: "2026-11-03",
  eventTitle: "Our Date 💗",
  ...
}
```

