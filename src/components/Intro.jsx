// src/components/Intro.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../birthdayConfig";
import { Sparkles } from "lucide-react";

function Intro({ onEnter }) {
  useEffect(() => {
    // Optional: start background particles via GSAP here if desired
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };
  const textVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-black"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl md:text-6xl font-serif text-rose-gold mb-4" variants={textVariant}>
          {config.headings.intro}
        </motion.h1>
        <motion.h2 className="text-3xl md:text-5xl font-serif text-champagne mb-8" variants={textVariant}>
          {config.headings.reveal}
        </motion.h2>
        {/* Simple floating particles using CSS animation */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Rose petal placeholders */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-rose-gold rounded-full opacity-60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, 200], opacity: [0.6, 0] }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
        <motion.button
          className="mt-12 px-6 py-3 bg-rose-gold text-black rounded-full flex items-center gap-2 hover:bg-champagne transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
        >
          <Sparkles size={20} />
          Enter Your Birthday World ✨
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Intro;

