// src/components/Slideshow.jsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, RotateCcw, Sparkles } from "lucide-react";
import { config } from "../birthdayConfig";
import Confetti from "./Confetti";
import Fireworks from "./Fireworks";

const slideshow = config.slideshow ?? {};
const slides = slideshow.slides ?? [];
const SLIDE_MS = slideshow.autoAdvanceMs ?? 7000;

// Deterministic pseudo-random from an index (keeps render pure for the compiler).
const seeded = (index, salt) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const BACKGROUNDS = [
  "radial-gradient(circle at 22% 24%, rgba(183,110,121,0.3), transparent 55%), radial-gradient(circle at 82% 78%, rgba(255,94,120,0.16), transparent 52%)",
  "radial-gradient(circle at 78% 18%, rgba(247,231,206,0.16), transparent 50%), radial-gradient(circle at 18% 82%, rgba(183,110,121,0.28), transparent 55%)",
  "radial-gradient(circle at 50% 12%, rgba(255,94,120,0.2), transparent 48%), radial-gradient(circle at 85% 85%, rgba(183,110,121,0.26), transparent 55%)",
  "radial-gradient(circle at 15% 70%, rgba(247,231,206,0.14), transparent 50%), radial-gradient(circle at 80% 30%, rgba(183,110,121,0.3), transparent 55%)",
  "radial-gradient(circle at 30% 85%, rgba(255,94,120,0.18), transparent 52%), radial-gradient(circle at 75% 15%, rgba(183,110,121,0.28), transparent 55%)",
  "radial-gradient(circle at 65% 80%, rgba(247,231,206,0.15), transparent 50%), radial-gradient(circle at 20% 20%, rgba(255,94,120,0.18), transparent 52%)",
  "radial-gradient(circle at 85% 60%, rgba(183,110,121,0.28), transparent 55%), radial-gradient(circle at 12% 30%, rgba(255,94,120,0.16), transparent 50%)",
  "radial-gradient(circle at 50% 30%, rgba(255,94,120,0.24), transparent 55%), radial-gradient(circle at 50% 90%, rgba(247,231,206,0.14), transparent 50%)",
];

const floaters = Array.from({ length: 12 }, (_, index) => ({
  left: `${(index * 41 + 4) % 94}%`,
  size: 14 + Math.round(seeded(index, 1) * 18),
  duration: 8 + seeded(index, 2) * 6,
  delay: seeded(index, 3) * 6,
  drift: (index % 2 === 0 ? 1 : -1) * (14 + seeded(index, 4) * 30),
  color: ["#b76e79", "#ff5e78", "#f7e7ce"][index % 3],
}));

const glowDots = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 53 + 7) % 96}%`,
  top: `${(index * 29 + 11) % 88}%`,
  size: 3 + Math.round(seeded(index, 5) * 4),
  duration: 2.4 + seeded(index, 6) * 2.8,
  delay: seeded(index, 7) * 3,
}));

function Slideshow({ onNext }) {
  const [index, setIndex] = useState(0);
  const lastIndex = slides.length - 1;
  const isFinal = index === lastIndex;
  const slide = slides[index];

  useEffect(() => {
    if (isFinal || slides.length === 0) return undefined;
    const timer = setTimeout(() => {
      setIndex((current) => Math.min(current + 1, lastIndex));
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [index, isFinal, lastIndex]);

  useEffect(() => {
    if (isFinal) window.dispatchEvent(new Event("ruhi:play-music"));
  }, [isFinal]);

  const goTo = (next) => {
    setIndex(Math.max(0, Math.min(next, lastIndex)));
  };

  if (slides.length === 0) return null;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-16 text-white sm:px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: BACKGROUNDS[index % BACKGROUNDS.length] }}
          />
          <div className="pointer-events-none absolute inset-0">
            {floaters.map((floater, floaterIndex) => (
              <motion.span
                key={floaterIndex}
                className="absolute"
                style={{ left: floater.left, color: floater.color }}
                animate={{
                  y: [0, -1050],
                  x: [0, floater.drift, 0],
                  opacity: [0, 0.85, 0.85, 0],
                  rotate: [-6, 6, -6],
                }}
                transition={{
                  duration: floater.duration,
                  delay: floater.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Heart size={floater.size} fill="currentColor" />
              </motion.span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0">
            {glowDots.map((dot, dotIndex) => (
              <motion.span
                key={dotIndex}
                className="absolute rounded-full bg-champagne"
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.size,
                  height: dot.size,
                  boxShadow: "0 0 12px 2px rgba(247,231,206,0.55)",
                }}
                animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.5, 1] }}
                transition={{
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {isFinal && (
        <>
          <div className="pointer-events-none fixed inset-0 z-0">
            <Fireworks />
          </div>
          <Confetti />
        </>
      )}

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-[2rem] border border-rose-gold/30 bg-white/[0.06] px-6 py-9 text-center shadow-[0_0_60px_-14px_rgba(183,110,121,0.5)] backdrop-blur-xl sm:px-12 sm:py-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-glass px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-champagne/85">
              <Sparkles size={12} className="text-rose-gold" />
              {slideshow.badge} · {index + 1} / {slides.length}
            </span>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={
                isFinal
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: [1, 1.045, 1],
                      transition: {
                        opacity: { delay: 0.25, duration: 0.7 },
                        y: { delay: 0.25, duration: 0.7 },
                        scale: { delay: 1, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                      },
                    }
                  : { opacity: 1, y: 0 }
              }
              transition={{ delay: 0.25, duration: 0.7 }}
              className={`mt-6 font-serif leading-tight ${
                isFinal
                  ? "text-3xl text-rose-gold drop-shadow-[0_0_30px_rgba(183,110,121,0.75)] sm:text-5xl"
                  : "text-2xl text-rose-gold sm:text-4xl"
              }`}
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mx-auto mt-6 max-w-xl whitespace-pre-line font-serif text-base italic leading-[1.9] text-pink-100/90 sm:text-lg md:text-xl"
            >
              {slide.message}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-2.5">
          {slides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                dotIndex === index
                  ? "w-7 bg-rose-gold shadow-[0_0_10px_rgba(183,110,121,0.8)]"
                  : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {isFinal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <motion.button
              type="button"
              onClick={() => goTo(0)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border border-rose-gold/50 bg-white/[0.06] px-6 py-3 text-champagne transition hover:bg-rose-gold/15"
            >
              <RotateCcw size={18} />
              {slideshow.replayButton}
            </motion.button>
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-rose-gold px-6 py-3 text-black transition hover:bg-champagne"
            >
              {slideshow.continueButton}
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Slideshow;
