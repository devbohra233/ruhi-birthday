// src/components/LoveLetters.jsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Heart,
  Mail,
  RotateCcw,
} from "lucide-react";
import { config } from "../birthdayConfig";

const lettersConfig = config.letters ?? {};
const items = lettersConfig.letters ?? [];

// Deterministic pseudo-random from an index (keeps render pure for the compiler).
const seeded = (index, salt) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const hearts = Array.from({ length: 7 }, (_, index) => ({
  left: `${(index * 41 + 8) % 90}%`,
  size: 12 + Math.round(seeded(index, 1) * 14),
  duration: 8 + seeded(index, 2) * 6,
  delay: seeded(index, 3) * 6,
  drift: (index % 2 === 0 ? 1 : -1) * (14 + seeded(index, 4) * 26),
  color: ["#b76e79", "#ff5e78", "#f7e7ce"][index % 3],
}));

const roses = Array.from({ length: 5 }, (_, index) => ({
  left: `${(index * 59 + 16) % 88}%`,
  size: 14 + Math.round(seeded(index, 5) * 12),
  duration: 9 + seeded(index, 6) * 6,
  delay: seeded(index, 7) * 7,
  drift: (index % 2 === 0 ? -1 : 1) * (10 + seeded(index, 8) * 22),
  color: ["#ff5e78", "#b76e79", "#e8c4c9"][index % 3],
}));

function Typewriter({ text, speed = 16 }) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (typed >= text.length) return undefined;
    const timer = setTimeout(() => {
      setTyped((current) => Math.min(current + 1, text.length));
    }, speed);
    return () => clearTimeout(timer);
  }, [typed, text, speed]);

  const done = typed >= text.length;

  return (
    <p className="whitespace-pre-line font-hand text-[1.35rem] leading-[1.9] text-[#4a3538] sm:text-[1.6rem]">
      {text.slice(0, typed)}
      {!done && (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-deep-pink" aria-hidden="true">
          &nbsp;
        </span>
      )}
    </p>
  );
}

function LoveLetters({ onNext }) {
  const [phase, setPhase] = useState("sealed");
  const [index, setIndex] = useState(0);
  const [runId, setRunId] = useState(0);
  const openTimer = useRef(null);

  const letter = items[index];
  const isFirst = index === 0;
  const isLast = index === items.length - 1;

  useEffect(
    () => () => {
      if (openTimer.current) clearTimeout(openTimer.current);
    },
    []
  );

  const openEnvelope = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    openTimer.current = setTimeout(() => setPhase("reading"), 1000);
  };

  const goTo = (next) => {
    setIndex(Math.max(0, Math.min(next, items.length - 1)));
    setRunId((current) => current + 1);
  };

  const readAgain = () => setRunId((current) => current + 1);

  if (items.length === 0) return null;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-16 text-white sm:px-6">
      {/* Warm glowing background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(183,110,121,0.28), transparent 55%), radial-gradient(circle at 85% 80%, rgba(255,94,120,0.14), transparent 52%), radial-gradient(circle at 12% 82%, rgba(247,231,206,0.1), transparent 48%)",
        }}
      />
      <motion.div
        className="absolute left-[12%] top-[16%] h-64 w-64 rounded-full bg-rose-gold/20 blur-3xl"
        animate={{ x: [0, 34, 0], y: [0, -22, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[14%] right-[10%] h-72 w-72 rounded-full bg-deep-pink/15 blur-3xl"
        animate={{ x: [0, -28, 0], y: [0, 26, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating hearts and roses */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((floater, floaterIndex) => (
          <motion.span
            key={`heart-${floaterIndex}`}
            className="absolute"
            style={{ left: floater.left, color: floater.color }}
            animate={{
              y: [0, -1000],
              x: [0, floater.drift, 0],
              opacity: [0, 0.8, 0.8, 0],
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
        {roses.map((rose, roseIndex) => (
          <motion.span
            key={`rose-${roseIndex}`}
            className="absolute"
            style={{ left: rose.left, color: rose.color }}
            animate={{
              y: [0, -1000],
              x: [0, rose.drift, 0],
              opacity: [0, 0.85, 0.85, 0],
              rotate: [8, -8, 8],
            }}
            transition={{
              duration: rose.duration,
              delay: rose.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Flower2 size={rose.size} />
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center font-serif text-2xl text-rose-gold drop-shadow-[0_0_24px_rgba(183,110,121,0.6)] sm:text-4xl"
        >
          {lettersConfig.title}
        </motion.h1>

        <AnimatePresence mode="wait">
          {phase !== "reading" ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center"
            >
              <motion.button
                type="button"
                onClick={openEnvelope}
                whileHover={phase === "sealed" ? { scale: 1.04 } : undefined}
                whileTap={phase === "sealed" ? { scale: 0.97 } : undefined}
                aria-label={lettersConfig.envelopeHint}
                className="relative block cursor-pointer"
                style={{ perspective: 900 }}
              >
                <motion.div
                  animate={phase === "sealed" ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                  transition={
                    phase === "sealed"
                      ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.2 }
                  }
                  className="relative h-[200px] w-[300px] sm:h-[220px] sm:w-[360px]"
                >
                  {/* Letter peeking inside */}
                  <motion.div
                    className="absolute left-1/2 top-2 w-[86%] -translate-x-1/2 rounded-md bg-[#fbf5ea] shadow-md"
                    style={{ height: "88%" }}
                    animate={phase === "sealed" ? { y: 6 } : { y: -64 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="px-4 pt-4">
                      <div className="h-2 w-2/5 rounded bg-rose-gold/40" />
                      <div className="mt-2 h-2 w-4/5 rounded bg-rose-gold/25" />
                      <div className="mt-2 h-2 w-3/5 rounded bg-rose-gold/25" />
                    </div>
                  </motion.div>

                  {/* Envelope pocket */}
                  <div
                    className="absolute inset-0 rounded-xl border border-rose-gold/40 shadow-[0_18px_50px_-12px_rgba(183,110,121,0.55)]"
                    style={{
                      background:
                        "linear-gradient(160deg, #efd9bd 0%, #e4c6a4 55%, #d9b68f 100%)",
                      clipPath:
                        "polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(200deg, rgba(255,255,255,0.25), transparent 45%)",
                      clipPath:
                        "polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)",
                    }}
                  />

                  {/* Envelope flap */}
                  <motion.div
                    className="absolute left-0 top-0 h-[52%] w-full"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(180deg, #e9cfa9 0%, #d9b68f 100%)",
                      transformOrigin: "top center",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                    animate={
                      phase === "sealed" ? { rotateX: 0, zIndex: 30 } : { rotateX: 180, zIndex: 5 }
                    }
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />

                  {/* Wax seal */}
                  <motion.div
                    className="absolute left-1/2 top-[46%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-rose-gold/60 bg-deep-pink shadow-[0_0_20px_rgba(255,94,120,0.7)]"
                    animate={phase === "sealed" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeIn" }}
                  >
                    <Heart size={20} fill="#f7e7ce" className="text-champagne" />
                  </motion.div>
                </motion.div>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex items-center gap-2 font-serif text-sm italic tracking-wide text-champagne/80 sm:text-base"
              >
                <Mail size={16} className="text-rose-gold" />
                {lettersConfig.envelopeHint}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 w-full"
            >
              <div
                className="letter-scroll max-h-[58vh] w-full -rotate-[0.4deg] overflow-y-auto rounded-[1.4rem] border border-rose-gold/40 px-6 py-8 shadow-[0_24px_70px_-18px_rgba(183,110,121,0.6)] sm:px-10 sm:py-10"
                style={{
                  backgroundColor: "#f8f1e3",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(183,110,121,0.05) 0px, rgba(183,110,121,0.05) 1px, transparent 1px, transparent 34px), radial-gradient(ellipse at 15% 8%, rgba(183,110,121,0.10), transparent 45%), radial-gradient(ellipse at 88% 95%, rgba(255,94,120,0.07), transparent 45%)",
                }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/40 bg-white/50 px-3.5 py-1 text-[10px] uppercase tracking-[0.28em] text-[#8a5a64]">
                  <Heart size={11} fill="currentColor" />
                  {lettersConfig.badge} · {index + 1} of {items.length}
                </span>

                <h2 className="mt-5 font-serif text-xl text-[#7c4750] sm:text-2xl">
                  {letter.title}
                </h2>

                <div className="mt-4">
                  <Typewriter key={`${index}-${runId}`} text={letter.body} speed={16} />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={isFirst}
                  whileHover={!isFirst ? { scale: 1.05 } : undefined}
                  whileTap={!isFirst ? { scale: 0.95 } : undefined}
                  className="flex items-center gap-1.5 rounded-full border border-rose-gold/50 bg-white/[0.06] px-5 py-2.5 text-sm text-champagne transition hover:bg-rose-gold/15 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={17} />
                  {lettersConfig.prevButton}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={readAgain}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 rounded-full border border-rose-gold/50 bg-white/[0.06] px-5 py-2.5 text-sm text-champagne transition hover:bg-rose-gold/15"
                >
                  <RotateCcw size={15} />
                  {lettersConfig.readAgainButton}
                </motion.button>

                {isLast ? (
                  <motion.button
                    type="button"
                    onClick={onNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 rounded-full bg-rose-gold px-5 py-2.5 text-sm font-medium text-black transition hover:bg-champagne"
                  >
                    {lettersConfig.continueButton}
                    <ArrowRight size={16} />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 rounded-full bg-rose-gold px-5 py-2.5 text-sm font-medium text-black transition hover:bg-champagne"
                  >
                    {lettersConfig.nextButton}
                    <ChevronRight size={17} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default LoveLetters;
