// src/components/MusicPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Disc3,
  Music2,
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { config } from "../birthdayConfig";
import { useAssetStatus } from "../hooks/useAssetStatus";

function formatTime(value) {
  if (!Number.isFinite(value) || value <= 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function Equalizer({ playing }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <motion.span
          key={bar}
          className="w-[3px] rounded-full bg-rose-gold"
          animate={
            playing
              ? { height: ["30%", "100%", "45%", "85%", "30%"] }
              : { height: "30%" }
          }
          transition={
            playing
              ? {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: bar * 0.18,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
          style={{ height: "30%" }}
        />
      ))}
    </span>
  );
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const assetStatus = useAssetStatus(config.music);
  const [loadError, setLoadError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.45);
  const [muted, setMuted] = useState(false);
  const ready = assetStatus === "ready" && !loadError;
  const unavailable = assetStatus === "missing" || loadError;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false);
          if (audio.error) setLoadError(true);
        });
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleCompactPlay = () => {
    if (!ready) {
      setExpanded(true);
      return;
    }
    togglePlay();
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);
    if (!audio || !ready || !duration) return;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    if (muted || volume === 0) {
      setVolume(volume === 0 ? 0.45 : volume);
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  };

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const volumePercent = muted ? 0 : Math.round(volume * 100);
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <audio
        ref={audioRef}
        src={assetStatus === "ready" ? config.music : undefined}
        preload="metadata"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onError={() => {
          setLoadError(true);
          setPlaying(false);
          setDuration(0);
        }}
      />

      <AnimatePresence initial={false} mode="wait">
        {expanded ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-[min(21.5rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-rose-gold/35 bg-[#0d0b0c]/95 p-4 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            aria-label={`${config.musicTitle} player`}
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-gold/30 bg-rose-gold/10 text-rose-gold"
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  playing
                    ? { duration: 5, repeat: Infinity, ease: "linear" }
                    : { duration: 0.3 }
                }
              >
                {unavailable ? <Music2 size={20} /> : <Disc3 size={20} />}
              </motion.span>

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-serif text-sm text-champagne">
                  {config.musicTitle}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-white/35">
                  {unavailable
                    ? "Song not added"
                    : !ready
                      ? "Tuning in…"
                      : playing
                        ? "Now playing"
                        : "Ready when you are"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Collapse music player"
                className="flex h-8 w-8 items-center justify-center rounded-full text-champagne/60 transition hover:bg-white/5 hover:text-champagne"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {unavailable ? (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-deep-pink/25 bg-deep-pink/10 p-3 text-left">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-deep-pink" />
                <div>
                  <p className="text-sm text-champagne">The music is still a surprise.</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    Place your MP3 at{" "}
                    <span className="break-all text-rose-gold/90">{config.music}</span>{" "}
                    to bring this player to life.
                  </p>
                </div>
              </div>
            ) : !ready ? (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-rose-gold/20 bg-white/[0.03] p-3 text-left">
                <motion.span
                  className="shrink-0 text-rose-gold/70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                >
                  <Disc3 size={18} />
                </motion.span>
                <p className="text-[11px] text-white/40">Warming up your song…</p>
              </div>
            ) : (
              <>
                <div className="mt-4">
                  <input
                    type="range"
                    min={0}
                    max={duration > 0 ? duration : 1}
                    step="0.1"
                    value={Math.min(currentTime, duration || 0)}
                    onChange={handleSeek}
                    disabled={!duration}
                    aria-label="Seek through the song"
                    className="music-range w-full disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      background: `linear-gradient(to right, #b76e79 ${progress}%, rgba(255,255,255,0.12) ${progress}%)`,
                    }}
                  />
                  <div className="mt-1.5 flex items-center justify-between text-[10px] tabular-nums text-white/40">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? "Pause music" : "Play music"}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-gold text-black shadow-[0_8px_24px_rgba(183,110,121,0.45)] transition hover:bg-champagne"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {playing ? (
                      <Pause size={20} fill="currentColor" />
                    ) : (
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute music" : "Mute music"}
                    className="text-champagne/60 transition hover:text-champagne"
                  >
                    <VolumeIcon size={18} />
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={muted ? 0 : volume}
                    onChange={handleVolume}
                    aria-label="Music volume"
                    className="music-range w-full"
                    style={{
                      background: `linear-gradient(to right, #b76e79 ${volumePercent}%, rgba(255,255,255,0.12) ${volumePercent}%)`,
                    }}
                  />
                  <span className="w-7 shrink-0 text-right text-[10px] tabular-nums text-white/40">
                    {volumePercent}%
                  </span>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="flex items-center gap-1.5 rounded-full border border-rose-gold/40 bg-[#0d0b0c]/95 p-1.5 pr-3 shadow-[0_16px_45px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <motion.button
              type="button"
              onClick={handleCompactPlay}
              aria-label={
                unavailable ? "Music unavailable" : playing ? "Pause music" : "Play music"
              }
              aria-pressed={playing}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-rose-gold text-black disabled:cursor-not-allowed disabled:opacity-60"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {playing && ready && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-rose-gold"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {unavailable ? (
                <VolumeX size={19} />
              ) : playing ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="ml-0.5" />
              )}
            </motion.button>

            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Open music controls"
              className="flex items-center gap-2 rounded-full py-1 pl-1 text-left transition hover:opacity-90"
            >
              <Equalizer playing={playing && ready} />
              <span className="hidden min-w-0 sm:block">
                <span className="block max-w-[7rem] truncate text-[10px] uppercase tracking-[0.24em] text-champagne/85">
                  {config.musicTitle}
                </span>
                <span className="block text-[10px] tabular-nums text-white/35">
                  {unavailable
                    ? "Song not added"
                    : !ready
                      ? "Tuning in…"
                      : playing
                        ? formatTime(currentTime)
                        : "Tap to play"}
                </span>
              </span>
              <ChevronUp size={16} className="text-champagne/50" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MusicPlayer;
