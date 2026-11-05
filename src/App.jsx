// src/App.jsx
import React, { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import PasswordGate from "./components/PasswordGate";
import Intro from "./components/Intro";
import MainScreen from "./components/MainScreen";
import LoveStory from "./components/LoveStory";
import Gallery from "./components/Gallery";
import StorySlideshow from "./components/StorySlideshow";
import Slideshow from "./components/Slideshow";
import LoveLetters from "./components/LoveLetters";
import Letter from "./components/Letter";
import Surprise from "./components/Surprise";
import FinalScreen from "./components/FinalScreen";
import MusicPlayer from "./components/MusicPlayer";

const sections = [
  "gate",
  "intro",
  "main",
  "loveStory",
  "gallery",
  "storySlideshow",
  "slideshow",
  "letters",
  "letter",
  "surprise",
  "final",
];

function App() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current]);

  const goNext = () => {
    setCurrent((previous) => Math.min(previous + 1, sections.length - 1));
  };

  const renderSection = () => {
    switch (sections[current]) {
      case "gate":
        return <PasswordGate onUnlock={goNext} />;
      case "intro":
        return <Intro onEnter={goNext} />;
      case "main":
        return <MainScreen onCelebrate={goNext} />;
      case "loveStory":
        return <LoveStory onNext={goNext} />;
      case "gallery":
        return <Gallery onNext={goNext} />;
      case "storySlideshow":
        return <StorySlideshow onNext={goNext} />;
      case "slideshow":
        return <Slideshow onNext={goNext} />;
      case "letters":
        return <LoveLetters onNext={goNext} />;
      case "letter":
        return <Letter onNext={goNext} />;
      case "surprise":
        return <Surprise onNext={goNext} />;
      case "final":
        return <FinalScreen onReplay={() => setCurrent(1)} />;
      default:
        return null;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden bg-lux-black font-serif text-white">
        {renderSection()}
        <MusicPlayer />
      </div>
    </MotionConfig>
  );
}

export default App;
