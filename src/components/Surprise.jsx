// src/components/Surprise.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Gift, Heart, PartyPopper, Sparkles } from "lucide-react";
import { config } from "../birthdayConfig";

const CONFETTI_COLORS = ["#b76e79", "#f7e7ce", "#ff5e78", "#ffffff", "#e8c4c9"];

function createConfetti() {
  return Array.from({ length: 44 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 44 + Math.random() * 0.6;
    const distance = 140 + Math.random() * 240;
    return {
      id: index,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 60,
      rotate: Math.random() * 720 - 360,
      size: 6 + Math.random() * 9,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      delay: Math.random() * 0.25,
      duration: 1.5 + Math.random() * 1.1,
      round: index % 3 === 0,
    };
  });
}

function Surprise({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const openSurprise = () => {
    setConfetti(createConfetti());
    setOpened(true);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-14 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(183,110,121,0.18),transparent_60%)]" />

      {opened && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {confetti.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute left-1/2 top-[45%]"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.round ? "9999px" : "2px",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: piece.x,
                y: piece.y,
                opacity: 0,
                scale: 1,
                rotate: piece.rotate,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Sparkles className="mb-4 text-champagne" size={26} />
        <h2 className="max-w-3xl font-serif text-3xl text-rose-gold sm:text-4xl md:text-5xl">
          {config.headings.surpriseTitle}
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="gift"
            type="button"
            onClick={openSurprise}
            className="group relative z-10 mt-12 flex flex-col items-center rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            aria-label="Open your surprise"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7, rotate: -8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="absolute -inset-10 rounded-full bg-rose-gold/25 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="relative flex h-44 w-44 items-center justify-center rounded-[2rem] border border-rose-gold/50 bg-glass backdrop-blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Gift size={96} strokeWidth={1.1} className="text-rose-gold" />
              <motion.span
                className="absolute -right-3 -top-3 text-champagne"
                animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles size={28} />
              </motion.span>
            </motion.span>
            <span className="mt-7 text-xs uppercase tracking-[0.4em] text-champagne/80">
              Tap to open
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="message"
            className="relative z-10 mt-10 w-full max-w-xl rounded-3xl border border-rose-gold/50 bg-glass p-7 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-gold text-black"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            >
              <PartyPopper size={30} />
            </motion.div>

            <h3 className="font-serif text-2xl text-champagne sm:text-3xl">
              A little something, just for you
            </h3>
            <p className="mt-4 text-base leading-relaxed text-pink-100 sm:text-lg">
              {config.headings.finalMessage}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 font-serif text-xl text-rose-gold">
              <Heart size={18} fill="currentColor" />
              <span>{config.headings.forever}</span>
              <Heart size={18} fill="currentColor" />
            </div>

            <motion.button
              type="button"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-rose-gold px-6 py-3 text-black transition hover:bg-champagne"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Your Final Wish
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Surprise;
