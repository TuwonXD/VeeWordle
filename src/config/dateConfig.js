/**
 * VeeWordle Configuration
 * Matched precisely to the reference mobile designs
 */

export const dateConfig = {
  appName: "VeeWordle",
  brandHeart: true,
  footerText: "made with love, just for you",

  // 1. Start Screen
  startScreen: {
    kicker: "hello langga",
    title: "little game lang po :D",
    description: "bagong website nanaman ano kaya to, sana hindi ka pa nagsasawa sa mga websites ko :((",
    buttonText: "Start",
    subtext: "5 puzzles about us, very easy to promise hehe",
  },

  // 2. The Puzzles (5 attempts per puzzle matching reference images)
  maxAttempts: 5,
  puzzles: [
    {
      id: 1,
      number: "01",
      answer: "MATCHA",
      length: 6,
      clue: "our fav thing to drink",
      hint: "Starts with M (sweet & green 🍵)",
    },
    {
      id: 2,
      number: "02",
      answer: "FOODTRIP",
      length: 8,
      clue: "fave gawain pag dates",
      hint: "Starts with F (our bottomless appetite 🍜)",
    },
    {
      id: 3,
      number: "03",
      answer: "MOVIES",
      length: 6,
      clue: "what we always swore to go to pag may bagong papanoorin",
      hint: "Starts with M (cinema & popcorn 🍿)",
    },
    {
      id: 4,
      number: "04",
      answer: "PHOTOBOOTH",
      length: 10,
      clue: "what we always do at the end of every date",
      hint: "Starts with P (cute film strips 📸)",
    },
    {
      id: 5,
      number: "05",
      answer: "POPUPS",
      length: 6,
      clue: "go-to ganap sa Nuvali",
      hint: "Starts with P (night booths at Nuvali 🎪)",
    },
  ],

  // 3. Post-Puzzle 5 Celebration Screen
  celebrationScreen: {
    kicker: "THE BEST PART IS STILL AHEAD",
    monthNumber: "01",
    monthLabel: "MONTH OF US",
    pillBadge: "my favorite chapter so far",
    message: "You know what time it is? I think it's time to celebrate a month of being together, officially :DD",
    buttonText: "Click to continue",
    subtext: "Five little memories. So many more to make.",
  },

  // 4. The Big Question
  questionScreen: {
    kicker: "ONE LAST LITTLE QUESTION",
    calendarMonth: "NOVEMBER",
    calendarDay: "03",
    calendarYear: "2026",
    question: "Will you go on a date with me this November 3, 2026, a whole day to ourselves and no one to object?",
    initialSubtitle: "One day. Just us.",
    dodgeSubtitles: [
      "Are you sure?",
      "Are you really sure? 🥺",
      "Think about all the matcha and photobooths! 💕",
      "You really want to say no to me? 🙈",
    ],
    dodgeSideNotes: [
      "that little no is getting shy...",
      "a whole day with your favorite person",
      "nice try though 😏",
      "YES is right there! ✨",
    ],
    yesButtonText: "YES",
    noButtonText: "NO",
  },

  // 5. Success / She Said Yes Screen
  yesScreen: {
    title: "She said yes!!",
    subtitle: "A whole day to look forward to.",
    badge: "IT'S A DATE",
    dateText: "November 3, 2026",
    buttonText: "Save the date",
    subtext: "Can't wait to make more memories with you.",
    eventDate: "2026-11-03",
    eventTitle: "Our Date 💗",
    eventDescription: "Celebrating 1 month of being together officially! An all-day date: Matcha, Food trip, Movies, Pop-ups at Nuvali, and Photobooth.",
    eventLocation: "Nuvali & our favorite date spots",
  },

  // 6. Itinerary built from puzzle answers in order
  itinerary: {
    title: "Our plans",
    subtitle: "A little wish list · all times & venues TBD",
    items: [
      {
        id: "matcha",
        title: "Matcha",
        timeVenue: "Time TBD · Venue TBD",
        icon: "coffee",
      },
      {
        id: "foodtrip",
        title: "Food trip",
        timeVenue: "Time TBD · Venue TBD",
        icon: "cutlery",
      },
      {
        id: "movies",
        title: "Movies",
        timeVenue: "Time TBD · Venue TBD",
        icon: "film",
      },
      {
        id: "popups",
        title: "Pop-ups at Nuvali",
        timeVenue: "Time TBD · Venue TBD",
        icon: "bag",
      },
      {
        id: "photobooth",
        title: "Photobooth",
        timeVenue: "Time TBD · Venue TBD",
        icon: "camera",
      },
    ],
  },
};
