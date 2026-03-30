"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Minimal dot particles only
    const dots: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      dots.push({
        x: Math.random() * (canvas.width || 1200),
        y: Math.random() * (canvas.height || 800),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() > 0.7 ? 2 : 1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.fillStyle = `rgba(249, 115, 22, ${d.opacity})`;
        ctx.fillRect(Math.floor(d.x), Math.floor(d.y), d.size, d.size);
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const scrollToNext = () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-grid noise scanlines">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

      {/* top-left corner bracket */}
      <div className="absolute top-24 left-6 md:left-12 text-[#2a2a2a] pixel pixel-sm select-none hidden md:block">
        {"[ ROOT@PORTFOLIO ]"}
      </div>
      <div className="absolute bottom-6 right-6 text-[#2a2a2a] pixel pixel-sm select-none hidden md:block">
        {"v2.0.26 // READY"}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 border border-[#f97316] bg-[#f97316]/10"
        >
          <span className="w-1.5 h-1.5 bg-[#f97316] animate-pulse inline-block" />
          <span className="pixel pixel-sm text-[#f97316]">STATUS: AVAILABLE</span>
        </motion.div>

        {/* Name — pixel font, large */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pixel pixel-3xl md:text-[3.5rem] text-[#e8e0d0] mb-6 leading-tight"
        >
          MANO<br />
          <span className="text-[#f97316]">PRASAD V</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="pixel pixel-sm text-[#fbbf24] mb-10 h-10 flex items-center justify-center"
        >
          <span className="mr-2 text-[#7a7065]">$</span>
          <TypeAnimation
            sequence={[
              "AI/ML ENGINEER",
              2000,
              "COMPUTER VISION",
              2000,
              "RAG SYSTEMS",
              2000,
              "DEEP LEARNING",
              2000,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
          />
          <span className="ml-1 text-[#f97316] animate-pulse">_</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-[#7a7065] max-w-lg mx-auto mb-10 text-sm leading-7"
        >
          Building intelligent systems at the intersection of deep learning,
          computer vision, and NLP. Real research → real deployment.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={scrollToNext}
            className="px-7 py-3 bg-[#f97316] text-[#0c0c0c] pixel pixel-sm font-bold hover:bg-[#a3e635] transition-colors flex items-center gap-2 px-border"
          >
            VIEW WORK <ArrowDown size={14} />
          </button>
          <a
            href="mailto:manoprasadvs@gmail.com"
            className="px-7 py-3 border border-[#2a2a2a] text-[#e8e0d0] pixel pixel-sm hover:border-[#f97316] hover:text-[#f97316] transition-colors"
          >
            CONTACT
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-[#2a2a2a] hover:text-[#f97316] transition-colors"
      >
        <div className="pixel pixel-sm">↓</div>
      </motion.div>
    </section>
  );
}
