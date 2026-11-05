// src/components/Letter.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Mail } from "lucide-react";
import { config } from "../birthdayConfig";

const floatingHearts = [
  { left: "8%", top: "20%", size: 16, delay: 0, duration: 9 },
  { left: "18%", top: "70%", size: 12, delay: 1.4, duration: 8 },
  { left: "30%", top: "12%", size: 10, delay: 0.6, duration: 10 },
  { left: "78%", top: "18%", size: 14, delay: 0.9, duration: 9 },
  { left: "88%", top: "62%", size: 18, delay: 2.1, duration: 11 },
  { left: "66%", top: "82%", size: 11, delay: 1.7, duration: 8 },
];

function Letter({ onNext }) {
  const lines = config.loveLetter
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const greeting = lines[0];
  const signOff = lines[lines.length - 1];
  const body = lines.slice(1, -1);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-14 text-white">
      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute text-rose-gold/30"
            style={{ left: heart.left, top: heart.top }}
            animate={{ y: [0, -70, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.h2
        className="relative mb-8 max-w-3xl text-center font-serif text-3xl text-rose-gold sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {config.headings.letterTitle}
      </motion.h2>

      <motion.div
        className="relative w-full max-w-2xl"
        initial={{ opacity: 0, y: 45, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      >
        <div className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-2 rounded-sm bg-rose-gold/80 shadow-md" />
        <div className="relative overflow-hidden rounded-2xl border border-rose-gold/40 bg-champagne text-lux-black shadow-[0_30px_90px_-25px_rgba(183,110,121,0.65)]">
          <div className="flex items-center justify-between border-b border-rose-gold/25 px-6 py-4 text-rose-gold sm:px-9">
            <Mail size={22} />
            <span className="text-[10px] uppercase tracking-[0.35em] text-lux-black/50">
              A letter for you
            </span>
            <Heart size={18} fill="currentColor" />
          </div>

          <div className="px-6 py-6 sm:px-9 sm:py-8">
            <motion.p
              className="font-serif text-xl font-semibold text-rose-gold sm:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {greeting}
            </motion.p>

            <div className="letter-scroll mt-5 max-h-[46vh] space-y-4 overflow-y-auto pr-2 text-[16px] leading-relaxed text-lux-black/85 sm:text-[17px]">
              {body.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.1, duration: 0.45 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-6 flex items-center justify-end gap-2 text-rose-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + body.length * 0.1 }}
            >
              <span className="font-serif text-lg italic">{signOff}</span>
              <Heart size={16} fill="currentColor" />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-gold/15 blur-2xl" />
        </div>

        <motion.div
          className="absolute -bottom-5 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-rose-gold text-champagne shadow-lg ring-4 ring-champagne"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 180 }}
        >
          <Heart size={20} fill="currentColor" />
        </motion.div>
      </motion.div>

      <motion.button
        className="mt-12 flex items-center gap-2 rounded-full bg-rose-gold px-6 py-3 text-black transition hover:bg-champagne"
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        One Last Surprise
        <ArrowRight size={20} />
      </motion.button>
    </section>
  );
}

export default Letter;
