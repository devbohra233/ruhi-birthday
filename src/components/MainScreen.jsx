// src/components/MainScreen.jsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Balloon, Sparkles } from "lucide-react";
import BirthdayCake from "./BirthdayCake";
import Countdown from "./Countdown";
import { config } from "../birthdayConfig";

const balloons = [
  { left: "5%", top: "16%", size: 34, duration: 9, delay: 0.4, color: "#b76e79" },
  { left: "17%", top: "62%", size: 22, duration: 11, delay: 1.6, color: "#f7e7ce" },
  { left: "78%", top: "20%", size: 30, duration: 10, delay: 0.9, color: "#ff5e78" },
  { left: "88%", top: "58%", size: 26, duration: 12, delay: 2.4, color: "#b76e79" },
  { left: "48%", top: "8%", size: 18, duration: 8, delay: 1.2, color: "#f7e7ce" },
];

const petals = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 17 + 3) % 100}%`,
  top: `${(index * 13) % 92}%`,
  width: 7 + (index % 4) * 2,
  height: 10 + (index % 4) * 3,
  duration: 10 + (index % 6) * 1.8,
  delay: (index % 9) * 0.7,
  drift: (index % 2 === 0 ? 1 : -1) * (12 + (index % 5) * 6),
  rotation: (index * 53) % 360,
}));

function MainScreen({ onCelebrate }) {
  const messages = config.birthdayMessages ?? [];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return undefined;
    const interval = setInterval(() => {
      setMessageIndex((index) => (index + 1) % messages.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [messages.length]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const item = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120 } },
  };
  const currentMessage = messages.length > 0 ? messages[messageIndex % messages.length] : null;

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-20 text-white"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(183,110,121,0.2),transparent_58%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-deep-pink/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-champagne/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-0">
        {petals.map((petal, index) => (
          <motion.span
            key={index}
            className="absolute"
            style={{
              left: petal.left,
              top: petal.top,
              width: petal.width,
              height: petal.height,
              borderRadius: "70% 30% 60% 40%",
              background:
                "linear-gradient(135deg, rgba(183,110,121,0.95), rgba(255,94,120,0.55))",
              boxShadow: "0 0 12px rgba(183,110,121,0.25)",
            }}
            animate={{
              y: [0, 300],
              x: [0, petal.drift, 0],
              rotate: [petal.rotation, petal.rotation + 220],
              opacity: [0, 0.8, 0.35, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        {balloons.map((balloon, index) => (
          <motion.span
            key={index}
            className="absolute"
            style={{ left: balloon.left, top: balloon.top, color: balloon.color }}
            animate={{ y: [0, -280], opacity: [0, 0.85, 0], rotate: [-4, 4, -4] }}
            transition={{
              duration: balloon.duration,
              delay: balloon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Balloon size={balloon.size} />
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="max-w-5xl font-serif text-4xl leading-tight text-rose-gold drop-shadow-[0_0_30px_rgba(183,110,121,0.35)] sm:text-6xl md:text-7xl"
          variants={item}
        >
          {config.headings.main}
        </motion.h1>

        <motion.p
          className="mt-5 max-w-2xl text-lg text-pink-100/85 sm:text-xl md:text-2xl"
          variants={item}
        >
          {config.headings.subtitle}
        </motion.p>

        <div className="mt-3 flex min-h-7 items-center justify-center px-2">
          {currentMessage && (
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                className="text-sm tracking-wide text-champagne/70 sm:text-base"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
              >
                {currentMessage}
              </motion.p>
            </AnimatePresence>
          )}
        </div>

        <Countdown />

        <motion.div className="mb-7 mt-7 origin-center scale-90 sm:scale-100" variants={item}>
          <BirthdayCake />
        </motion.div>

        <motion.button
          className="flex items-center gap-2 rounded-full bg-rose-gold px-6 py-3 text-black transition hover:bg-champagne"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCelebrate}
          variants={item}
        >
          <Sparkles size={20} />
          Celebrate Your Special Day 🎂
        </motion.button>
      </div>
    </motion.section>
  );
}

export default MainScreen;
