// src/components/FinalScreen.jsx
import React from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import Fireworks from "./Fireworks";
import { config } from "../birthdayConfig";

const risingHearts = [
  { left: "10%", size: 18, delay: 0, duration: 11 },
  { left: "22%", size: 12, delay: 2.5, duration: 9 },
  { left: "35%", size: 20, delay: 1.2, duration: 13 },
  { left: "68%", size: 14, delay: 0.6, duration: 10 },
  { left: "80%", size: 22, delay: 3.1, duration: 12 },
  { left: "91%", size: 12, delay: 1.8, duration: 9 },
];

function FinalScreen({ onReplay }) {
  const handleReplay = () => {
    if (onReplay) {
      onReplay();
      return;
    }
    window.location.reload();
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-16 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(183,110,121,0.24),transparent_58%)]" />
      <Fireworks />

      <div className="pointer-events-none absolute inset-0">
        {risingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute bottom-[-10%] text-rose-gold/35"
            style={{ left: heart.left }}
            animate={{ y: [0, -760], opacity: [0, 0.65, 0], rotate: [0, 18, -14] }}
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

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/40 bg-glass px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-champagne">
          <Sparkles size={14} />
          The final wish
        </span>
        <h1 className="mt-7 font-serif text-4xl text-rose-gold drop-shadow-[0_0_35px_rgba(183,110,121,0.4)] sm:text-5xl md:text-6xl">
          {config.headings.finalTitle}
        </h1>
      </motion.div>

      <motion.p
        className="relative z-10 mt-8 max-w-2xl text-lg leading-relaxed text-pink-100 sm:text-xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        {config.headings.finalMessage}
      </motion.p>

      <motion.div
        className="relative z-10 mt-10 flex items-center gap-3 font-serif text-2xl text-rose-gold sm:text-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, type: "spring", stiffness: 120 }}
      >
        <motion.span
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={26} fill="currentColor" />
        </motion.span>
        <span>{config.headings.forever}</span>
        <motion.span
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
        >
          <Heart size={26} fill="currentColor" />
        </motion.span>
      </motion.div>

      <motion.button
        type="button"
        onClick={handleReplay}
        className="relative z-10 mt-12 inline-flex items-center gap-2 rounded-full border border-rose-gold/60 px-6 py-3 text-champagne transition hover:border-champagne hover:bg-rose-gold hover:text-black"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        <RotateCcw size={18} />
        Replay Our Story
      </motion.button>
    </section>
  );
}

export default FinalScreen;
