// src/components/Confetti.jsx
import React, { useEffect, useRef } from "react";

const COLORS = ["#b76e79", "#f7e7ce", "#ff5e78", "#ffd6e0", "#e8c4c9", "#ffffff"];

function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = [];
    const viewport = { width: 0, height: 0 };
    const spawnClock = { last: 0 };
    const animation = { frame: 0 };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const spawn = (time) => {
      if (time - spawnClock.last < 90) return;
      spawnClock.last = time;
      for (let index = 0; index < 4 && particles.length < 170; index += 1) {
        particles.push({
          x: Math.random() * viewport.width,
          y: -14,
          velocityY: 1.3 + Math.random() * 2.3,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: 0.02 + Math.random() * 0.03,
          size: 5 + Math.random() * 6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.14,
          shape: Math.random() > 0.5 ? "rect" : "circle",
        });
      }
    };

    const draw = (time) => {
      context.clearRect(0, 0, viewport.width, viewport.height);
      spawn(time);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.sway += particle.swaySpeed;
        particle.x += Math.sin(particle.sway) * 1.15;
        particle.y += particle.velocityY;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > viewport.height + 24) {
          particles.splice(index, 1);
          continue;
        }

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.globalAlpha = 0.92;
        context.fillStyle = particle.color;
        if (particle.shape === "rect") {
          context.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
        } else {
          context.beginPath();
          context.arc(0, 0, particle.size / 2.6, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }

      animation.frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      animation.frame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animation.frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
    />
  );
}

export default Confetti;
