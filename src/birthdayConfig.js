// src/birthdayConfig.js
export const config = {
  name: "Ruhi",

  // Password required to enter the surprise.
  password: "2109",

  passwordScreen: {
    heading: "Hey Ruhi ❤️",
    subtitle: "Someone has created something special for you.",
    placeholder: "Enter the secret password",
    button: "Unlock Surprise",
    hint: "Clue: you already know it ❤️",
    error: "That's not quite it, my love. Try again.",
    success: "Welcome, my love ❤️",
  },

  headings: {
    intro: "Something Beautiful Was Created For Someone Special...",
    reveal: "That Someone Is YOU, RUHI ❤️",
    main: "HAPPY BIRTHDAY RUHI",
    subtitle: "To the girl who makes my world more beautiful.",
    loveStoryTitle: "Every Love Story Is Beautiful, But Ours Is My Favourite.",
    galleryTitle: "Our Beautiful Memories",
    gallerySubtitle: "Every picture of you is a memory I never want to forget.",
    letterTitle: "Ruhi, I Have Something To Tell You...",
    surpriseTitle: "Ruhi, One Last Surprise Is Waiting For You...",
    finalTitle: "Happy Birthday, My Ruhi ❤️",
    finalMessage: "You are my favourite chapter, my happiest feeling, and my most beautiful dream.",
    forever: "Forever & Always ♾️",
  },

  birthdayMessages: [
    "You make ordinary days feel extraordinary.",
    "Your smile is my favourite place to come home to.",
    "Today the whole world celebrates you.",
  ],

  loveLetter: `My Dearest Ruhi,

Happy Birthday, my love! ❤️

I don't know how to explain how special you are to me. You bring happiness into my life in ways words can never fully describe.

Your smile is my favourite sight, your happiness means everything to me, and every moment with you becomes a beautiful memory.

I wish I could make every single day as special as you make my life.

May all your dreams come true. I want to see you smile, achieve everything you wish for, and always feel loved.

Thank you for being you.

I love you, Ruhi. ❤️

Forever Yours.`,

  timeline: [
    {
      date: "Day we first met ❤️",
      description:
        "Our story began with one small online encounter. When we first crossed paths on Telegram, I had no idea that a simple conversation could turn into something so special. Slowly, you became a part of my life that every day felt incomplete without. What began with a stranger is now one of my most precious memories.",
      photo: "/images/ruhi1.jpg",
    },
    {
      date: "First conversation 💕",
      description:
        "Our first real conversation happened in a group VC. It was such a simple moment, yet for me it became something truly special. The way you talked, your laughter, your adorable nature — I fell for all of it. Before I even realised it, one little conversation had grown into a beautiful connection.",
      photo: "/images/ruhi2.jpg",
    },
    {
      date: "Favourite memories 🥰",
      description:
        "My favourite memory will always be the day you became my girlfriend. That moment filled me with so much happiness, because that day someone truly special came into my life. Every little moment we share — every conversation, every laugh — is a beautiful memory I will carry with me forever.",
      photo: "/images/ruhi3.jpg",
    },
    {
      date: "Moments I fell for you ❤️",
      description:
        "I fell for you even harder when I started joining VC just to be with you. All day long, my only excitement was waiting for you to come online so we could talk. Talking to you, hearing your laugh, and spending time with you quietly became the best part of my every single day.",
      photo: "/images/ruhi4.jpg",
    },
    {
      date: "Our dreams together ✨",
      description:
        "Together, we have dreamed so many little and big dreams. My only wish is that we always stand by each other, fulfil every dream side by side, and enjoy every moment of life together. May we always keep laughing, stay happy, and stay together — always. ❤️",
      photo: "/images/ruhi5.jpg",
    },
  ],

  // Only Ruhi's solo photos — place these files inside public/images/.
  gallery: [
    { src: "/images/ruhi1.jpg", caption: "The way you light up every room" },
    { src: "/images/ruhi2.jpg", caption: "My favourite smile in the whole world" },
    { src: "/images/ruhi3.jpg", caption: "Golden hour has nothing on you" },
    { src: "/images/ruhi4.jpg", caption: "Every version of you is my favourite" },
    { src: "/images/ruhi5.jpg", caption: "The girl who makes life feel like a dream" },
  ],

  // Place your local MP3 inside public/music/.
  music: "/music/birthday-song.mp3",
  musicTitle: "Our Song",
};
