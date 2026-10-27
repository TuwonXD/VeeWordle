# a little us 💌 (VeeWordle)

Just a cute, wholesome little website I made to ask my favorite person out on a date through 5 custom Wordle puzzles. 

Built with React, Vite, Tailwind CSS, and Framer Motion — because why send a boring text when you can make an entire interactive puzzle game instead? :D

---

## What is this? 🌸

Basically, it's a 5-step journey through our favorite memories and date spots, ending with one very important question. 

Here’s the rundown of how it works:

1. **The Envelope (Landing Page)**
   - Starts with a sweet letter tucked into a pink envelope.
   - Clean and simple: tap **Start** and dive into the clues.

2. **5 Custom Wordles (About Us)**
   - **01. FOODTRIP** — *fave gawain pag dates* 🍜
   - **02. POPUPS** — *go-to ganap sa Nuvali* 🎪
   - **03. MATCHA** — *our fav thing to drink* 🍵
   - **04. PICNIC** — *something we've been longing to do* 🧺
   - **05. PHOTOBOOTH** — *what we always do at the end of every date* 📸
   - No pressure gameplay: hints are available, and if 6 guesses run out, it gently resets with *"so close! try again 💕"* instead of a game over screen.

3. **1 Month Celebration 🎉**
   - Solving all 5 triggers confetti and a cute milestone screen celebrating 1 month of being together officially!

4. **The Big Question 📅**
   - *"Will you go on a date with me this November 7, 2026, a whole day to ourselves and no one to object?"*
   - There's a big **YES** button and a **NO** button... but good luck clicking NO because it dodges your mouse/finger and literally runs away across the screen. Saying no is simply not an option here. 😏

5. **She Said Yes!! 💖**
   - Confetti blast!
   - One-click **Save the date** button that downloads an `.ics` calendar file for **November 7, 2026**.
   - An **Add to Google Calendar** link with all the details pre-filled.
   - Our little 5-stop date itinerary roadmap ready to go.

---

## Responsive & Zero-Scroll 📱💻

Designed from scratch for two separate views with zero scrolling needed:
- **Mobile (< 768px)**: Fitted nicely in `100dvh` — stacked cleanly so everything (including the 10-letter Wordle grid and keyboard) fits comfortably on a phone screen without scrolling.
- **Desktop (1024px+)**: Exact 2-panel layout matching the Figma designs (`100vh`, overflow hidden), with big clue cards, guide legends, and interactive components side-by-side.

---

## Quick Start 🚀

Wanna run it locally? Super easy:

```bash
# 1. Grab the dependencies
npm install

# 2. Fire up the dev server
npm run dev
```

Open `http://localhost:5173` in your browser (or use the network link to check it out on your phone!).

To build for production:
```bash
npm run build
```

---

## Changing Details ⚙️

Everything (puzzles, clues, hints, dates, and copy) lives in one tidy file:
👉 `src/config/dateConfig.js`

You can swap out words, change the date, or tweak the messages anytime. Progress is automatically saved in `localStorage`, and you can restart anytime by tapping the little sparkle or brand icon in the header.

---

made with love, just for you 💕
