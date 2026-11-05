// src/components/BirthdayCake.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TIER_GRADIENT =
  "linear-gradient(180deg, #f7e7ce 0%, #ecc9cb 46%, #c98a90 78%, #a65c68 100%)";

const sprinkles = [
  { left: "14%", top: "48%", color: "#ff5e78", rotate: 22 },
  { left: "30%", top: "34%", color: "#f7e7ce", rotate: -28 },
  { left: "48%", top: "52%", color: "#8f4f58", rotate: 42 },
  { left: "66%", top: "36%", color: "#ff5e78", rotate: -14 },
  { left: "83%", top: "50%", color: "#f7e7ce", rotate: 30 },
];

function FrostingDrips({ count = 7 }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 top-0 flex justify-around">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={`-translate-y-1 rounded-full bg-champagne/95 ${
            index % 2 === 0 ? "h-3 w-3" : "h-2.5 w-2.5"
          }`}
        />
      ))}
    </span>
  );
}

function SprinkleLayer() {
  return (
    <span className="pointer-events-none absolute inset-0">
      {sprinkles.map((sprinkle, index) => (
        <span
          key={index}
          className="absolute h-[3px] w-3 rounded-full"
          style={{
            left: sprinkle.left,
            top: sprinkle.top,
            backgroundColor: sprinkle.color,
            transform: `rotate(${sprinkle.rotate}deg)`,
          }}
        />
      ))}
    </span>
  );
}

function Candle({ index }) {
  return (
    <span className="relative flex flex-col items-center">
      <motion.span
        className="h-4 w-2.5 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 75%, #fff9d9 0%, #ffd166 38%, #ff8a3d 68%, #ff5e78 100%)",
          boxShadow:
            "0 0 16px rgba(255, 209, 102, 0.9), 0 0 34px rgba(255, 94, 120, 0.45)",
          transformOrigin: "bottom center",
        }}
        animate={{
          scaleY: [1, 1.25, 0.9, 1.15, 1],
          scaleX: [1, 0.86, 1.06, 0.92, 1],
          rotate: [-3, 3, -2, 2, -3],
          opacity: [1, 0.88, 1, 0.94, 1],
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          delay: index * 0.23,
          ease: "easeInOut",
        }}
      />
      <span className="h-1 w-[2px] bg-[#5b3b27]" />
      <span
        className="h-9 w-2.5 rounded-sm border border-[#d8b4a0]/40"
        style={{
          background:
            "linear-gradient(90deg, #f7e7ce 0%, #b76e79 50%, #f7e7ce 100%)",
        }}
      />
      <span className="h-1 w-4 rounded-full bg-champagne/70" />
    </span>
  );
}

function BirthdayCake() {
  return (
    <motion.div
      role="img"
      aria-label="A three-tier rose gold birthday cake with three lit candles"
      className="relative flex flex-col items-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="absolute bottom-2 h-24 w-64 rounded-full bg-rose-gold/30 blur-3xl" />

      <motion.span
        className="absolute -left-12 top-8 text-champagne/75"
        animate={{ y: [0, -10, 0], rotate: [0, 18, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={22} />
      </motion.span>
      <motion.span
        className="absolute -right-10 top-20 text-rose-gold/80"
        animate={{ y: [0, -12, 0], rotate: [0, -16, 0], opacity: [0.35, 0.9, 0.35] }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
      >
        <Sparkles size={18} />
      </motion.span>

      <div className="relative z-20 mb-[-6px] flex items-end gap-5">
        {[0, 1, 2].map((index) => (
          <Candle key={index} index={index} />
        ))}
      </div>

      <div className="relative z-30 h-14 w-36 rounded-t-[1.5rem] border border-rose-gold/50 shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
        <div
          className="relative h-full w-full overflow-hidden rounded-t-[1.4rem]"
          style={{ background: TIER_GRADIENT }}
        >
          <FrostingDrips count={7} />
          <SprinkleLayer />
        </div>
      </div>

      <div className="relative z-20 -mt-1 h-16 w-48 rounded-t-[1.75rem] border border-rose-gold/45 shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
        <div
          className="relative h-full w-full overflow-hidden rounded-t-[1.65rem]"
          style={{ background: TIER_GRADIENT }}
        >
          <FrostingDrips count={9} />
        </div>
      </div>

      <div className="relative z-10 -mt-1 h-20 w-60 rounded-t-[2rem] rounded-b-2xl border border-rose-gold/40 shadow-[0_18px_35px_rgba(0,0,0,0.45)]">
        <div
          className="relative h-full w-full overflow-hidden rounded-t-[1.9rem] rounded-b-2xl"
          style={{ background: TIER_GRADIENT }}
        >
          <FrostingDrips count={11} />
          <span className="absolute inset-x-6 bottom-4 h-1.5 rounded-full bg-champagne/25" />
          <span className="absolute inset-x-10 bottom-2 h-1 rounded-full bg-rose-gold/30" />
        </div>
      </div>

      <div className="relative z-10 -mt-1 h-3 w-72 rounded-full border border-champagne/20 bg-gradient-to-r from-transparent via-champagne/40 to-transparent shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
    </motion.div>
  );
}

export default BirthdayCake;
