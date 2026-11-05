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

  // Live countdown to the birthday (local timezone). When it hits zero the
  // page flips into celebration mode automatically.
  countdown: {
    month: 11,
    day: 9,
    badge: "The Final Countdown",
    title: "Until Your Special Day",
    subtitle: "Every second brings us closer to celebrating you.",
    celebrationTitle: "🎉 Happy Birthday Ruhi ❤️",
    typewriterText:
      "May this year wrap you in all the love you give so freely. You are my favourite person, my happiest moment, and my forever. I love you, Ruhi. ❤️",
    playPrompt: "Tap to play our song 🎶",
  },

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

  // Romantic story slideshow shown after the gallery, before the wishes slideshow.
  storySlideshow: {
    badge: "Our Story",
    autoAdvanceMs: 7000,
    replayButton: "Replay Our Story ❤️",
    continueButton: "Continue",
    slides: [
      {
        title: "Hey Beautiful... ❤️",
        message:
          "There are millions of people in this world,\nbut somehow my heart chose you.\nAnd honestly...\nI couldn't have made a better choice.",
      },
      {
        title: "Your Smile 🌹",
        message:
          "Your smile has a strange kind of magic...\nIt can turn an ordinary day\ninto my favorite memory.",
      },
      {
        title: "Little Things ✨",
        message:
          "I don't need expensive gifts,\nor perfect moments.\n\nJust talking to you,\nseeing you happy,\nand hearing your voice\nis enough to make my day.",
      },
      {
        title: "One Wish 💖",
        message:
          "If I had one wish today,\nit would simply be this...\n\nMay you always smile\nthe way you make others smile.",
      },
      {
        title: "You 🌙",
        message:
          "You are not perfect...\nand neither am I.\n\nBut somehow,\nyou are perfectly special to me.",
      },
      {
        title: "Birthday Girl 🎂",
        message:
          "Today is your day.\n\nLaugh louder...\nSmile brighter...\nDream bigger...\n\nBecause the world became more beautiful\nthe day you were born.",
      },
      {
        title: "Forever? 💍",
        message:
          "I don't know what tomorrow brings...\n\nBut today,\nI just want to remind you\nthat you're someone truly special to me.",
      },
      {
        title: "Happy Birthday Ruhi ❤️",
        message:
          "I hope today becomes one of the happiest days of your life.\n\nMay every smile,\nevery surprise,\nand every dream\nfind its way to you.\n\nStay happy.\nStay beautiful.\nStay exactly the way you are.\n\nHappy Birthday, Beautiful. ❤️",
      },
    ],
  },

  // Romantic slideshow shown after the gallery.
  slideshow: {
    badge: "A Few Words For You",
    autoAdvanceMs: 7000,
    replayButton: "Replay Memories ❤️",
    continueButton: "Continue To My Letter 💌",
    slides: [
      {
        title: "For The Most Beautiful Girl In My Life ❤️",
        message:
          "Today isn't just another day...\nIt's the day my favorite person came into this world.\nHappy Birthday, Ruhi. ❤️",
      },
      {
        title: "First Smile 😊",
        message:
          "I don't know if you remember our first conversations,\nbut I still remember how happy they made me.\nYour smile has become one of my favorite things in this world.",
      },
      {
        title: "Thank You 🌹",
        message:
          "Thank you for making ordinary days feel special.\nThank you for every smile,\nevery laugh,\nevery memory.\nYou make life brighter just by being in it.",
      },
      {
        title: "My Wish ✨",
        message:
          "My only wish today is that\nyour life is always filled with happiness,\nsuccess,\ngood health,\nand endless reasons to smile.\nYou deserve every beautiful thing in this world.",
      },
      {
        title: "Promise 💕",
        message:
          "No matter where life takes us,\nI will always wish the best for you.\nMay every dream you have become reality.",
      },
      {
        title: "Birthday Wishes 🎂",
        message:
          "May this birthday bring\nnew opportunities,\nnew adventures,\ncountless blessings,\nand unforgettable memories.\nHappy Birthday, Ruhi!",
      },
      {
        title: "Forever Memory 🌸",
        message:
          "Some people become memories...\nSome become happiness...\nAnd some become both.\nThank you for being one of the most beautiful parts of my life.",
      },
      {
        title: "Happy Birthday Ruhi ❤️",
        message:
          "You are truly special.\nKeep smiling,\nkeep shining,\nand never stop being the amazing person you are.\n\nHave the happiest birthday ever.\n\n❤️ Forever wishing you happiness ❤️",
      },
    ],
  },

  // Handwritten letters shown after the wishes slideshow.
  letters: {
    title: "Letters For Deviiii Jiiii ❤️",
    envelopeHint: "Tap the envelope to open your letter",
    badge: "A Letter For You",
    prevButton: "Previous Letter",
    nextButton: "Next Letter",
    readAgainButton: "Read Again",
    continueButton: "Continue 💌",
    letters: [
      {
        title: "Letter One — Your Smile",
        body: "Deviiii Jiiii ❤️,\n\nSome people walk into a life quietly, and then one day you realize the whole world feels softer because they are in it. That is exactly what your smile does. The moment it appears, an ordinary day stops being ordinary.\n\nI love how your eyes light up when you talk about the things you love, and how your smile arrives before your words do. You carry a warmth that makes everyone around you feel completely at ease.\n\nThank you for sharing that light so freely. I hope life hands you back even half of the happiness you give so easily.\n\nWith all my love, ❤️",
      },
      {
        title: "Letter Two — Your Laughter",
        body: "Deviiii Jiiii ❤️,\n\nYour laughter is honestly my favourite sound in the entire world. It starts small, then takes over the whole room, and before anyone even notices, everyone is smiling along with you.\n\nWhat I love even more is the person behind that laugh. You are playful, sharp, and full of little surprises. Every conversation with you feels like an unexpected gift.\n\nLife gets busy and the days move fast, but the moments with you slow everything down in the best possible way. You make simple things, a message, a joke, a random story, feel truly special.\n\nStay exactly this wonderful.\n\nYours, with a smile, ❤️",
      },
      {
        title: "Letter Three — Your Kindness",
        body: "Deviiii Jiiii ❤️,\n\nToday I want to talk about the quiet thing you do that the world does not notice enough, your kindness. The way you check on people, the way you remember the small details, the way you care even when no one is watching.\n\nThat gentle side of you says more about who you are than any words ever could. It is rare, and it is truly beautiful.\n\nYou make people feel seen, and that is one of the most special gifts anyone can have. The world honestly feels softer and kinder because of you.\n\nI notice it, I admire it, and I hope you never stop being the beautiful soul you are.\n\nFondly and truly yours, ❤️",
      },
      {
        title: "Letter Four — Simply You",
        body: "Deviiii Jiiii ❤️,\n\nThere is something about your presence that I cannot fully explain. You walk into a room and the mood lifts. You leave, and people keep smiling a little longer.\n\nYou are strong in the calmest way, sweet without even trying, and honest in a world that often is not. Being around you makes me want to be better, more patient, more kind, more present.\n\nI love the way you dream out loud, the way you care so deeply, and the way you turn small moments into memories. You are not just someone I admire. You are someone I feel truly lucky to know.\n\nThank you for being you, perfectly, wonderfully you.\n\nHolding you in my thoughts, ❤️",
      },
      {
        title: "Letter Five — Happy Birthday",
        body: "Deviiii Jiiii ❤️,\n\nHappy Birthday, my favourite person. Today is all about you, and honestly, the world became a little brighter the day you arrived in it.\n\nMay this new year of your life bring you laughter on the hard days, comfort when you are tired, and a thousand small reasons to smile. You deserve every soft and happy thing life can offer.\n\nI hope you always remember how deeply you are cared for, not just today, but on every ordinary day in between. People like you deserve to feel treasured all year long.\n\nSo eat the cake, make the wish, and know that someone is celebrating you with the biggest smile.\n\nWith a heart full of you, ❤️",
      },
      {
        title: "To My Jaan ❤️",
        body: "Dear Jaan ❤️,\n\nI was thinking about how the smallest things with you become my favourite memories. A random text from you can fix my whole day. A photo you send stays on my screen longer than it should. A call with you always feels shorter than it really is.\n\nYou have this quiet magic of making normal moments feel special, and I don't think you even realise you do it. That is honestly the most beautiful part of you.\n\nOn your birthday, I just want you to know how much these little things mean to me. You are loved more than words can ever carry, today and on every ordinary day after it.\n\nYours, today and every single day, ❤️",
      },
      {
        title: "To My Baby Jaan ❤️",
        body: "Dear Baby Jaan ❤️,\n\nCan we talk about how unfairly cute you are? The way you pout when you are pretending to be angry, the way your voice goes soft when you are sleepy, the way you celebrate tiny wins like you just conquered the world. I notice all of it, and I adore every bit of it.\n\nBeing around you feels like comfort and excitement at the same time. You make me laugh when I least expect it, and you make my heart soft in the best possible way.\n\nHappy Birthday, my cutest one. May your day be as sweet as the happiness you spread everywhere you go.\n\nWith all my hugs and kisses, ❤️",
      },
      {
        title: "To My Darlinggggg ❤️",
        body: "Dear Darlinggggg ❤️,\n\nNot everyone is lucky enough to be understood without explaining themselves. With you, I never have to try so hard. You listen, you understand, and you stand by me even on my most difficult days.\n\nThank you for your patience, for your honest words, and for all the quiet ways you show you care. You make me want to grow, and you make it feel safe to be imperfect.\n\nOn your birthday, I wish you all the softness you so freely give to others. You deserve a world that treats you as gently as you treat everyone around you.\n\nYour biggest admirer, ❤️",
      },
      {
        title: "To My Wifey ❤️",
        body: "Dear Wifey ❤️,\n\nSome dreams are loud, and some are quiet. Mine are quiet and simple, and somehow they all look like you. Slow mornings, long conversations, little trips, shared playlists, and a lifetime of small happy moments built one day at a time.\n\nI don't know everything the future holds, but I know I want to keep making you smile through all of it, whatever it brings.\n\nHappy Birthday to the one who makes every plan feel warmer just by being in it. Here is to more laughter, more memories, and more of us.\n\nDreaming of our tomorrow, ❤️",
      },
      {
        title: "To My Dharmpatni Jii ❤️",
        body: "Dear Dharmpatni Jii ❤️,\n\nSome words feel too small for what a person truly means to you, and honestly, every word feels that way today. You are my peace, my favourite hello, and the best part of my every single day.\n\nI respect the person you are, your values, your strength, and the love you carry so gently in your heart. With you, love feels both exciting and safe, and that is a rare and beautiful thing.\n\nOn your birthday, I pray that life keeps blessing you the way you bless mine, with happiness, good health, and endless reasons to smile.\n\nWith deepest love and respect, ❤️",
      },
    ],
  },

  // Place your local MP3 inside public/music/.
  music: "/music/birthday-song.mp3",
  musicTitle: "Tere Bina Na Guzara E",
};
