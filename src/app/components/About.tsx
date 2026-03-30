"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { label: "Specialty", value: "COMPUTER\nVISION", color: "#f97316" },
  { label: "Domain", value: "NLP /\nRAG", color: "#fbbf24" },
  { label: "Tools", value: "PyTorch TF\n& GCP", color: "#a3e635" },
  { label: "Leetcode (DSA)", value: "100+", color: "#f43f5e" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 border-t border-[#1c1c1c]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="pixel pixel-sm text-[#f97316]">01.</span>
          <h2 className="pixel pixel-xl text-[#e8e0d0]">ABOUT</h2>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Text col */}
          <div className="lg:col-span-3 space-y-5">
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#e8e0d0] text-sm leading-8">
              I&apos;m <span className="text-[#f97316] font-bold">Mano Prasad V</span>, an AI/ML Engineer
              passionate about closing the gap between cutting-edge research and real-world deployment.
            </motion.p>
            <motion.p custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#7a7065] text-sm leading-8">
              Currently B.Tech with <span className="text-[#fbbf24]">GPA 8.0+</span>. I specialize in
              Computer Vision, NLP, and building Retrieval-Augmented Generation pipelines.
              Every model I build is designed for the real world — not just a benchmark.
            </motion.p>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#7a7065] text-sm leading-8">
              My stack covers everything from YOLO-based real-time detection to domain-specific
              legal AI assistants. I care about fast inference, clean APIs, and explainable outputs.
            </motion.p>
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#7a7065] text-sm leading-8">
              I also have a strong foundation in Data Structures & Algorithms. Active on{" "}
              <a href="https://leetcode.com/u/saybye_/" target="_blank" rel="noreferrer" className="text-[#f97316] hover:underline underline-offset-4 decoration-[#f97316]/30">LeetCode</a>{" "}
              with 110+ problems solved, constantly sharpening my problem-solving and algorithmic thinking.
            </motion.p>

            {/* Tags */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap gap-2 pt-2">
              {["COMPUTER VISION", "NLP", "MLOPS", "GCP", "REAL-TIME AI", "RAG", "DSA"].map((tag) => (
                <span key={tag} className="tag-dim px-3 py-1 text-xs font-mono tracking-wide">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stat cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="f-card p-5 group"
                style={{ borderColor: item.color + "44" }}
              >
                <div className="pixel pixel-xl leading-tight mb-3" style={{ color: item.color }}>
                  {item.value.split("\n").map((line, li) => (
                    <div key={li}>{line}</div>
                  ))}
                </div>
                <div className="text-xs text-[#7a7065] font-mono tracking-widest">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
