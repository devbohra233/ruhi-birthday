// src/components/Gallery.jsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { config } from "../birthdayConfig";
import { useAssetStatus } from "../hooks/useAssetStatus";

const spanClasses = [
  "sm:col-span-2 lg:col-span-4 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-3 aspect-[4/3]",
  "lg:col-span-3 aspect-[4/3]",
];

function RuhiPhoto({ item, className = "", showPlaceholderDetails = false }) {
  const [failed, setFailed] = useState(false);
  const status = useAssetStatus(item?.src);

  if (status === "checking") {
    return (
      <span
        aria-hidden="true"
        className={`block animate-pulse bg-[radial-gradient(circle_at_50%_35%,rgba(183,110,121,0.22),#0d0b0c_72%)] ${className}`}
      />
    );
  }

  if (failed || status === "missing" || !item?.src) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_35%,rgba(183,110,121,0.3),#120d10_72%)] ${className}`}
        title={item?.src ? `Add your photo at ${item.src}` : "Photo coming soon"}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-gold/40 bg-black/30 text-rose-gold">
          <Camera size={24} />
        </div>
        <p className="px-4 text-center text-[10px] uppercase tracking-[0.32em] text-champagne/60">
          A memory is waiting
        </p>
        {showPlaceholderDetails && item?.src && (
          <p className="px-6 text-center text-[11px] text-white/30">
            Add your photo at {item.src}
          </p>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.caption}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function Gallery({ onNext }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const photos = config.gallery;
  const selected = selectedIndex === null ? null : photos[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) => (index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) => (index - 1 + photos.length) % photos.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, photos.length]);

  const showPrevious = (event) => {
    event.stopPropagation();
    setSelectedIndex((index) => (index - 1 + photos.length) % photos.length);
  };

  const showNext = (event) => {
    event.stopPropagation();
    setSelectedIndex((index) => (index + 1) % photos.length);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(183,110,121,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-champagne/5 blur-3xl" />

      <motion.header
        className="relative z-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-glass px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-champagne/80">
          <Heart size={12} fill="currentColor" className="text-rose-gold" />
          A gallery of you
        </span>
        <h2 className="mt-5 font-serif text-4xl text-rose-gold sm:text-5xl md:text-6xl">
          {config.headings.galleryTitle}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-pink-100/80 sm:text-lg">
          {config.headings.gallerySubtitle}
        </p>
      </motion.header>

      <div className="relative z-10 mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-6">
        {photos.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Open photo: ${item.caption}`}
            className={`group relative overflow-hidden rounded-[1.75rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
              spanClasses[index % spanClasses.length]
            }`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <span className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-rose-gold/25 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
            <span className="relative block h-full w-full rounded-[1.75rem] bg-gradient-to-br from-rose-gold/70 via-champagne/20 to-deep-pink/50 p-px shadow-[0_20px_60px_-30px_rgba(183,110,121,0.65)]">
              <span className="relative block h-full w-full overflow-hidden rounded-[calc(1.75rem-1px)] bg-[#0d0b0c]">
                <RuhiPhoto
                  item={item}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 block p-5">
                  <span className="mb-2 flex items-center gap-2 text-rose-gold">
                    <Heart size={12} fill="currentColor" />
                    <span className="h-px w-8 bg-rose-gold/50" />
                  </span>
                  <span className="block font-serif text-lg leading-snug text-champagne sm:text-xl">
                    {item.caption}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-[calc(1.75rem-1px)] ring-1 ring-inset ring-white/5" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onNext}
        className="relative z-10 mt-11 inline-flex items-center gap-2 rounded-full bg-rose-gold px-6 py-3 text-black transition hover:bg-champagne"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
        <ChevronRight size={18} />
      </motion.button>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <button
              type="button"
              autoFocus
              onClick={() => setSelectedIndex(null)}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-rose-gold/40 bg-black/60 text-champagne transition hover:bg-rose-gold hover:text-black sm:right-8 sm:top-8"
            >
              <X size={22} />
            </button>

            {photos.length > 1 && (
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-rose-gold/40 bg-black/60 text-champagne transition hover:bg-rose-gold hover:text-black sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <motion.figure
              key={selected.src}
              className="relative flex w-full max-w-5xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex min-h-[46vh] max-h-[76vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-rose-gold/50 bg-lux-black shadow-[0_30px_120px_-30px_rgba(183,110,121,0.8)]">
                <RuhiPhoto
                  item={selected}
                  showPlaceholderDetails
                  className="max-h-[76vh] w-full object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-2 text-center font-serif text-lg text-champagne sm:text-xl">
                <Heart size={16} fill="currentColor" className="text-rose-gold" />
                {selected.caption}
              </figcaption>
              <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/35">
                {selectedIndex + 1} / {photos.length}
              </p>
            </motion.figure>

            {photos.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-rose-gold/40 bg-black/60 text-champagne transition hover:bg-rose-gold hover:text-black sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
