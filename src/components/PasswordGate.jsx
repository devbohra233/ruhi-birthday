// src/components/PasswordGate.jsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Eye, EyeOff, Heart, Lock, Sparkles, Unlock } from "lucide-react";
import { config } from "../birthdayConfig";

const floatingHearts = [
  { left: "7%", top: "22%", size: 14, delay: 0, duration: 9 },
  { left: "16%", top: "72%", size: 10, delay: 1.6, duration: 8 },
  { left: "28%", top: "12%", size: 8, delay: 0.8, duration: 10 },
  { left: "74%", top: "18%", size: 12, delay: 1.1, duration: 9 },
  { left: "87%", top: "66%", size: 16, delay: 2.3, duration: 11 },
  { left: "62%", top: "84%", size: 9, delay: 1.9, duration: 8 },
];

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    inputRef.current?.focus();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (unlocked) return;

    const expected = String(config.password ?? "").trim();
    const entered = password.trim();
    const matches =
      expected.length > 0 &&
      entered.toLowerCase() === expected.toLowerCase();

    if (!matches) {
      setError(config.passwordScreen.error);
      await shakeControls.start({
        x: [0, -12, 12, -9, 9, -5, 5, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      inputRef.current?.select();
      return;
    }

    setError("");
    setUnlocked(true);
    timerRef.current = setTimeout(() => onUnlock?.(), 1050);
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
    if (error) setError("");
  };

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-lux-black px-4 py-16 text-center text-white"
      animate={
        unlocked
          ? { opacity: 0, scale: 1.04, filter: "blur(10px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.65, delay: unlocked ? 0.45 : 0, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(183,110,121,0.26),transparent_58%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-deep-pink/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-champagne/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0a0a0a_82%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-gold/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/10" />

      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute text-rose-gold/25"
            style={{ left: heart.left, top: heart.top }}
            animate={{ y: [0, -60, 0], opacity: [0.12, 0.5, 0.12] }}
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
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.div
          className="relative mb-8 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-rose-gold/30 blur-3xl" />
          <motion.span
            className="absolute inset-0 rounded-full border border-rose-gold/40"
            animate={{ scale: [1, 1.45], opacity: [0.65, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-2 rounded-full border border-champagne/20"
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.8, ease: "easeOut" }}
          />
          <Heart
            size={64}
            fill="currentColor"
            className={`relative transition-colors duration-300 drop-shadow-[0_0_25px_rgba(183,110,121,0.75)] ${
              error ? "text-deep-pink" : "text-rose-gold"
            }`}
          />
          <motion.span
            className="absolute -right-1 top-0 text-champagne"
            animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={26} />
          </motion.span>
        </motion.div>

        <p className="text-[10px] uppercase tracking-[0.45em] text-champagne/70">
          A private surprise
        </p>
        <h1 className="mt-4 font-serif text-5xl text-rose-gold drop-shadow-[0_0_30px_rgba(183,110,121,0.35)] sm:text-6xl">
          {config.passwordScreen.heading}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-pink-100/85 sm:text-lg">
          {config.passwordScreen.subtitle}
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 mt-9 w-full max-w-md"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <motion.form
          animate={shakeControls}
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="rounded-[2rem] bg-gradient-to-br from-rose-gold/70 via-champagne/25 to-deep-pink/50 p-px shadow-[0_30px_90px_-30px_rgba(183,110,121,0.8)]">
            <div className="rounded-[calc(2rem-1px)] bg-[#0d0b0c]/90 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-champagne/60">
              <Lock size={13} />
              Password protected
            </div>

            <label htmlFor="birthday-password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-gold/80"
              />
              <input
                ref={inputRef}
                id="birthday-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                disabled={unlocked}
                placeholder={config.passwordScreen.placeholder}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "password-error" : undefined}
                className="w-full rounded-2xl border border-rose-gold/25 bg-black/45 py-4 pl-12 pr-14 text-base text-champagne placeholder:text-white/30 outline-none transition focus:border-rose-gold focus:bg-black/60 focus:ring-2 focus:ring-rose-gold/25 disabled:opacity-70"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                disabled={unlocked}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-champagne/60 transition hover:bg-white/5 hover:text-champagne disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  id="password-error"
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-3 text-center text-sm text-deep-pink"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={unlocked}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rose-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-champagne disabled:cursor-default"
              whileHover={unlocked ? undefined : { scale: 1.02 }}
              whileTap={unlocked ? undefined : { scale: 0.97 }}
            >
              {unlocked ? (
                <>
                  <Heart size={18} fill="currentColor" />
                  {config.passwordScreen.success}
                </>
              ) : (
                <>
                  <Unlock size={18} />
                  {config.passwordScreen.button}
                </>
              )}
            </motion.button>

            {config.passwordScreen.hint && !unlocked && (
              <p className="mt-4 text-center text-[11px] tracking-wide text-white/35">
                {config.passwordScreen.hint}
              </p>
            )}
          </div>
        </div>
      </motion.form>
      </motion.div>

      <p className="relative z-10 mt-8 text-[10px] uppercase tracking-[0.35em] text-white/25">
        Made with love, only for {config.name}
      </p>
    </motion.section>
  );
}

export default PasswordGate;
