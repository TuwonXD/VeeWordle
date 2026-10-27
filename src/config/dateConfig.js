/**
 * VeeWordle / a little us Configuration
 * Matched precisely to the Figma designs
 */

export const dateConfig = {
  appName: "VeeWordle",
  headerTagline: "A little love, in five clues",
  footerText: "made with love, just for you",
  footerRight: "OUR LITTLE NOVEMBER STORY · 2026",

  // 1. Start Screen
  startScreen: {
    kicker: "hello langga",
    title: "little game lang po",
    description: "madali lang yung mga puzzles promise",
    buttonText: "Start",
    subtext: "click the button to start",
    pillBadge: "a small surprise, a whole lot of us",
  },

  // 2. The Puzzles (6 rows per puzzle)
  maxAttempts: 6,
  puzzles: [
    {
      id: 1,
      number: "01",
      answer: "FOODTRIP",
      length: 8,
      title: "Our favorite way to date.",
      clue: "fave gawain pag dates",
      hint: "Starts with F (our bottomless appetite 🍜)",
    },
    {
      id: 2,
      number: "02",
      answer: "POPUPS",
      length: 6,
      title: "Our go-to Nuvali stroll.",
      clue: "go-to ganap sa Nuvali",
      hint: "Starts with P (night booths at Nuvali 🎪)",
    },
    {
      id: 3,
      number: "03",
      answer: "MATCHA",
      length: 6,
      title: "Our sweet daily obsession.",
      clue: "our fav thing to drink",
      hint: "Starts with M (sweet & green 🍵)",
    },
    {
      id: 4,
      number: "04",
      answer: "PICNIC",
      length: 6,
      title: "Something we've been longing for.",
      clue: "something we've been longing to do",
      hint: "Starts with P (mat, breeze & food 🧺)",
    },
    {
      id: 5,
      number: "05",
      answer: "PHOTOBOOTH",
      length: 10,
      title: "Our favorite little tradition.",
      clue: "what we always do at the end of every date",
      hint: "Starts with P (cute film strips 📸)",
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
    subtext: "Five little memories, and so many more to make.",
  },

  // 4. The Big Question
  questionScreen: {
    kicker: "ONE LAST, VERY IMPORTANT QUESTION",
    calendarMonth: "NOVEMBER",
    calendarDay: "07",
    calendarYear: "2026",
    calendarFootnote: "A whole day, just us.",
    question: "Will you go on a date with me this November 7, 2026, a whole day to ourselves and no one to object?",
    initialSubtitle: "One day. Just us.",
    dodgeSubtitles: [
      "Are you sure?",
      "Are you really sure? 🥺",
      "Think about all the food trip and photobooths! 💕",
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
    kicker: "HERE'S TO OUR NEXT CHAPTER",
    title: "See you Langga!",
    subtitle: "A whole day to look forward to. Just you and me :))",
    badge: "IT'S A DATE",
    dateText: "November 7, 2026",
    buttonText: "Save the date",
    subtext: "Can't wait to make more memories with you.",
    eventDate: "2026-11-07",
    eventTitle: "Our Date 💗",
    eventDescription: "Celebrating 1 month of being together officially! An all-day date: Food trip, Pop-ups at Nuvali, Matcha, Picnic, and Photobooth.",
    eventLocation: "Nuvali & our favorite date spots",
  },

  // 6. Itinerary built from puzzle answers in order
  itinerary: {
    title: "Our plans",
    subtitle: "A little wish list · all times & venues TBD",
    items: [
      {
        id: "foodtrip",
        title: "Food trip",
        timeVenue: "Marugame, Solenad",
        icon: "cutlery",
      },
      {
        id: "popups",
        title: "Pop-ups at Nuvali",
        timeVenue: "Solenad Popups",
        icon: "bag",
      },
      {
        id: "matcha",
        title: "Matcha",
        timeVenue: "Solenad Popups",
        icon: "coffee",
      },
      {
        id: "picnic",
        title: "Picnic",
        timeVenue: "Nuvali",
        icon: "basket",
      },
      {
        id: "photobooth",
        title: "Photobooth",
        timeVenue: "Vistamall",
        icon: "camera",
      },
    ],
  },
};
