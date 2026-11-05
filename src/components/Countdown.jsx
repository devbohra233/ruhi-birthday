// src/components/Countdown.jsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Balloon, Heart, Music2, Timer } from "lucide-react";
import { config } from "../birthdayConfig";
import Confetti from "./Confetti";
import Fireworks from "./Fireworks";

const countdown = config.countdown ?? {};
const MONTH = countdown.month ?? 11;
const DAY = countdown.day ?? 9;

function getTargetDate() {
  const now = new Date();
  const year =
    now > new Date(now.getFullYear(), MONTH - 1, DAY, 23, 59, 59, 999)
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(year, MONTH - 1, DAY, 0, 0, 0);
}

function splitUnits(milliseconds) {
  const total = Math.max(0, Math.floor(milliseconds / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (value) => String(value).padStart(2, "0");

// Deterministic pseudo-random from an index (keeps render pure for the compiler).
const seeded = (index, salt) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const floaters = Array.from({ length: 14 }, (_, index) => ({
  left: `${(index * 37 + 5) % 94}%`,
  size: 16 + Math.round(seeded(index, 1) * 18),
  duration: 7 + seeded(index, 2) * 6,
  delay: seeded(index, 3) * 5,
  drift: (index % 2 === 0 ? 1 : -1) * (12 + seeded(index, 4) * 26),
  heart: index % 3 !== 0,
  color: ["#b76e79", "#ff5e78", "#f7e7ce"][index % 3],
}));

function TimeUnit({ value, label }) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-2xl border border-white/10 bg-white/[0.05] px-1 py-3 sm:px-4 sm:py-5">
      <div className="relative h-[1.2em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "-110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block font-serif text-2xl font-semibold tabular-nums text-champagne drop-shadow-[0_0_16px_rgba(247,231,206,0.5)] sm:text-4xl md:text-5xl"
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 text-[9px] uppercase tracking-[0.26em] text-rose-gold/85 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const [target] = useState(getTargetDate);
  const [now, setNow] = useState(() => Date.now());
  const [typed, setTyped] = useState("");
  const [needsGesture, setNeedsGesture] = useState(false);

  const remaining = target.getTime() - now;
  const celebrating = remaining <= 0;
  const units = splitUnits(remaining);

  useEffect(() => {
    if (celebrating) return undefined;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [celebrating]);

  useEffect(() => {
    if (!celebrating) return undefined;
    const text = countdown.typewriterText ?? "";
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [celebrating]);

  useEffect(() => {
    if (!celebrating) return undefined;
    const timers = [];
    timers.push(
      setTimeout(() => {
        window.dispatchEvent(new Event("ruhi:play-music"));
        timers.push(
          setTimeout(() => {
            const audio = document.querySelector("audio");
            if (!audio || audio.paused) setNeedsGesture(true);
          }, 1100)
        );
      }, 800)
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [celebrating]);

  const requestSong = () => {
    setNeedsGesture(false);
    window.dispatchEvent(new Event("ruhi:play-music"));
  };

  return (
    <motion.div
      className="relative z-10 mt-8 w-full max-w-md sm:max-w-xl md:max-w-2xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        {celebrating ? (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="pointer-events-none fixed inset-0 z-0">
              <Fireworks />
            </div>
            <Confetti />

            <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
              {floaters.map((floater, index) => (
                <motion.span
                  key={index}
                  className="absolute"
                  style={{ left: floater.left, color: floater.color }}
                  animate={{
                    y: [0, -1100],
                    x: [0, floater.drift, 0],
                    opacity: [0, 0.9, 0.9, 0],
                    rotate: [-6, 6, -6],
                  }}
                  transition={{
                    duration: floater.duration,
                    delay: floater.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {floater.heart ? (
                    <Heart size={floater.size} fill="currentColor" />
                  ) : (
                    <Balloon size={floater.size} />
                  )}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 overflow-hidden rounded-[2rem] border border-rose-gold/35 bg-white/[0.06] px-5 py-8 text-center shadow-[0_0_70px_-12px_rgba(183,110,121,0.55)] backdrop-blur-xl sm:px-10 sm:py-10"
            >
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-serif text-3xl leading-tight text-rose-gold drop-shadow-[0_0_26px_rgba(183,110,121,0.6)] sm:text-4xl md:text-5xl"
              >
                {countdown.celebrationTitle}
              </motion.h2>

              <p className="mx-auto mt-5 min-h-[4.5rem] max-w-xl font-serif text-base italic leading-relaxed text-champagne/90 sm:text-lg">
                {typed}
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-champagne/80 align-text-bottom" />
              </p>

              {needsGesture && (
                <motion.button
                  type="button"
                  onClick={requestSong}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-champagne"
                >
                  <Music2 size={16} />
                  {countdown.playPrompt}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-rose-gold/30 bg-white/[0.06] px-4 py-7 shadow-[0_0_60px_-14px_rgba(183,110,121,0.5)] backdrop-blur-xl sm:px-8 sm:py-9"
          >
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-rose-gold/20 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-glass px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-champagne/85">
                <Timer size={12} className="text-rose-gold" />
                {countdown.badge}
              </span>
              <h2 className="mt-4 font-serif text-2xl text-rose-gold sm:text-3xl">
                {countdown.title}
              </h2>
              <p className="mt-2 text-sm text-pink-100/75 sm:text-base">
                {countdown.subtitle}
              </p>

              <div className="mt-6 grid w-full grid-cols-4 gap-2 sm:gap-4">
                <TimeUnit value={units.days} label="Days" />
                <TimeUnit value={units.hours} label="Hours" />
                <TimeUnit value={units.minutes} label="Minutes" />
                <TimeUnit value={units.seconds} label="Seconds" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Countdown;
