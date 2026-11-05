// src/components/LoveStory.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Camera, Heart } from "lucide-react";
import { config } from "../birthdayConfig";
import { useAssetStatus } from "../hooks/useAssetStatus";

function MemoryPhoto({ item, className = "" }) {
  const [failed, setFailed] = useState(false);
  const status = useAssetStatus(item.photo);

  if (status === "checking") {
    return (
      <span
        aria-hidden="true"
        className={`block animate-pulse bg-[radial-gradient(circle_at_50%_40%,rgba(183,110,121,0.24),#100b0e_75%)] ${className}`}
      />
    );
  }

  if (status === "missing" || failed || !item.photo) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,rgba(183,110,121,0.3),#120d10_72%)] ${className}`}
        title={item.photo ? `Add your photo at ${item.photo}` : undefined}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-gold/40 bg-black/30 text-rose-gold">
          <Camera size={22} />
        </span>
        <span className="px-4 text-center text-[10px] uppercase tracking-[0.3em] text-champagne/60">
          A memory is waiting
        </span>
      </div>
    );
  }

  return (
    <img
      src={item.photo}
      alt={item.caption ? `${item.date} — ${item.caption}` : item.date}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function LoveStory({ onNext }) {
  const timeline = config.timeline;
  const lastIndex = timeline.length - 1;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(183,110,121,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-champagne/5 blur-3xl" />

      <motion.header
        className="relative z-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-glass px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-champagne/80">
          <Heart size={12} fill="currentColor" className="text-rose-gold" />
          The story of us
        </span>
        <h2 className="mt-5 font-serif text-3xl text-rose-gold sm:text-4xl md:text-5xl">
          {config.headings.loveStoryTitle}
        </h2>
      </motion.header>

      <div className="relative z-10 mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-2">
        {timeline.map((item, idx) => {
          const featured = idx === lastIndex;
          return (
            <motion.article
              key={item.date}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-rose-gold/35 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-1.5 backdrop-blur-sm transition-colors duration-500 hover:border-rose-gold/70 ${
                featured ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + idx * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <span className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-rose-gold/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-[1.35rem] border border-rose-gold/25">
                <MemoryPhoto
                  item={item}
                  className={`w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${
                    featured ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-[10px] uppercase tracking-[0.3em] text-champagne/80">
                  <Heart size={12} fill="currentColor" className="text-rose-gold" />
                  Our story · {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative px-4 pb-4 pt-5 sm:px-5">
                <div className="flex items-center gap-2 text-rose-gold">
                  <Calendar size={18} />
                  <h3 className="font-serif text-xl text-champagne sm:text-2xl">
                    {item.date}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-[1.85] text-pink-100/90 sm:text-[1.05rem]">
                  {item.description}
                </p>
                {item.caption && (
                  <p className="mt-3 border-t border-rose-gold/15 pt-3 font-serif text-sm italic leading-relaxed text-champagne/75 sm:text-base">
                    “{item.caption}”
                  </p>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.button
        className="relative z-10 mt-11 flex items-center gap-2 rounded-full bg-rose-gold px-6 py-3 text-black transition hover:bg-champagne"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Heart size={20} />
        Next
      </motion.button>
    </section>
  );
}

export default LoveStory;
