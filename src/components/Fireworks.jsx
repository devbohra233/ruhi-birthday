// src/components/Fireworks.jsx
import React, { useEffect, useRef } from "react";

const COLORS = ["#b76e79", "#f7e7ce", "#ff5e78", "#ffd6e0", "#ffffff", "#e8c4c9"];

function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = [];
    const viewport = { width: 0, height: 0 };
    const burstClock = { last: 0 };
    const animation = { frame: 0 };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      viewport.width = Math.max(1, bounds.width);
      viewport.height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const burst = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 44 + Math.floor(Math.random() * 24);
      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count + Math.random() * 0.07;
        const speed = 1.1 + Math.random() * 3.1;
        particles.push({
          x,
          y,
          previousX: x,
          previousY: y,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          color,
          size: 1 + Math.random() * 1.5,
        });
      }
    };

    const draw = (time) => {
      context.clearRect(0, 0, viewport.width, viewport.height);

      if (time - burstClock.last > 1000 + Math.random() * 900) {
        burst(
          viewport.width * (0.16 + Math.random() * 0.68),
          viewport.height * (0.12 + Math.random() * 0.3)
        );
        burstClock.last = time;
      }

      context.globalCompositeOperation = "lighter";
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.previousX = particle.x;
        particle.previousY = particle.y;
        particle.velocityX *= 0.985;
        particle.velocityY = particle.velocityY * 0.985 + 0.028;
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        context.globalAlpha = Math.max(particle.life, 0);
        context.strokeStyle = particle.color;
        context.lineWidth = particle.size;
        context.shadowBlur = 10;
        context.shadowColor = particle.color;
        context.beginPath();
        context.moveTo(particle.previousX, particle.previousY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      context.globalCompositeOperation = "source-over";

      animation.frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (!reduceMotion) {
      burst(viewport.width * 0.5, viewport.height * 0.26);
      burstClock.last = performance.now();
      animation.frame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animation.frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}

export default Fireworks;
