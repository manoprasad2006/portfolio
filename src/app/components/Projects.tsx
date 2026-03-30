"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Leaf Disease Classifier",
    category: "COMPUTER VISION",
    tagClass: "tag-orange",
    accentColor: "#f97316",
    borderClass: "px-border",
    summary: "CNN model classifying 38 plant diseases from leaf images for early agricultural intervention.",
    description: "Developed a CNN system to classify 38 types of plant leaf diseases from images. Trained on the PlantVillage dataset, deployed as a FastAPI web service. Enables farmers to detect crop diseases via smartphone photos for timely treatment.",
    tech: ["Python", "TensorFlow", "Keras", "CNN", "FastAPI", "OpenCV"],
    achievements: [
      "97.8% accuracy on test set",
      "38 disease categories / 14 plant species",
      "Real-time inference < 200ms",
      "Deployed as REST API",
    ],
    github: "https://github.com/manoprasad2006",
    emoji: "🌿",
  },
  {
    id: 2,
    title: "Face Liveness Detection",
    category: "CV & SECURITY",
    tagClass: "tag-amber",
    accentColor: "#fbbf24",
    borderClass: "px-border-amber",
    summary: "Anti-spoofing system distinguishing real faces from photos/screens at 30 FPS.",
    description: "Anti-spoofing system to prevent fraudulent authentication. Uses YOLO for face detection with a custom liveness classification model analyzing texture, micro-expressions, and depth cues to spot printed photos, screen replays, or 3D masks.",
    tech: ["Python", "PyTorch", "YOLO v8", "OpenCV", "FastAPI", "GCP"],
    achievements: [
      "Deployed on Google Cloud Platform",
      "Real-time at 30 FPS",
      "98.2% liveness detection accuracy",
      "Integrated with production auth pipeline",
    ],
    github: "https://github.com/manoprasad2006",
    emoji: "🔐",
  },
  {
    id: 3,
    title: "LawGPT — AI Legal Assistant",
    category: "NLP & RAG",
    tagClass: "tag-lime",
    accentColor: "#a3e635",
    borderClass: "px-border-lime",
    summary: "Domain-specific AI legal chatbot using RAG + FAISS for Indian law queries.",
    description: "AI-powered legal assistant tailored for Indian law using Retrieval-Augmented Generation. FAISS vector store enables semantic search across 10,000+ legal documents. LangChain orchestrates the retrieval-generation pipeline for accurate, grounded responses.",
    tech: ["Python", "LangChain", "FAISS", "HuggingFace", "RAG", "FastAPI", "ChromaDB"],
    achievements: [
      "Indexed 10,000+ legal documents",
      "Semantic search < 100ms latency",
      "Grounded responses with citations",
      "Smart India Hackathon Project",
    ],
    github: "https://github.com/manoprasad2006",
    emoji: "⚖️",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sel, setSel] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="py-28 border-t border-[#1c1c1c]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="pixel pixel-sm text-[#a3e635]">03.</span>
          <h2 className="pixel pixel-xl text-[#e8e0d0]">PROJECTS</h2>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              onClick={() => setSel(p)}
              className="f-card p-6 cursor-pointer group"
              style={{ borderColor: p.accentColor + "33" }}
            >
              <div className="text-3xl mb-4 floating">{p.emoji}</div>
              <span className={`${p.tagClass} text-xs px-2 py-0.5 font-mono inline-block mb-4`}>
                {p.category}
              </span>
              <h3 className="text-sm font-mono font-bold text-[#e8e0d0] mb-3 group-hover:text-[#f97316] transition-colors leading-6">
                {p.title}
              </h3>
              <p className="text-xs text-[#7a7065] leading-6 mb-4">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="tag-dim text-xs px-2 py-0.5">{t}</span>
                ))}
                {p.tech.length > 4 && (
                  <span className="tag-dim text-xs px-2 py-0.5">+{p.tech.length - 4}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#2a2a2a] group-hover:text-[#7a7065] transition-colors font-mono">
                <ExternalLink size={11} /> CLICK TO EXPAND
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {sel && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="modal-overlay"
              onClick={() => setSel(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#141414] border max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative"
                style={{ borderColor: sel.accentColor }}>
                <button onClick={() => setSel(null)}
                  className="absolute top-4 right-4 text-[#7a7065] hover:text-[#e8e0d0] p-1"
                  aria-label="Close">
                  <X size={18} />
                </button>

                <div className="text-4xl mb-4">{sel.emoji}</div>
                <span className={`${sel.tagClass} text-xs px-2 py-0.5 font-mono inline-block mb-4`}>
                  {sel.category}
                </span>
                <h3 className="text-base font-mono font-bold text-[#e8e0d0] mt-3 mb-4">{sel.title}</h3>
                <p className="text-xs text-[#7a7065] leading-7 mb-6">{sel.description}</p>

                <div className="mb-5">
                  <div className="pixel pixel-sm text-[#e8e0d0] mb-3" style={{ color: sel.accentColor }}>
                    KEY ACHIEVEMENTS
                  </div>
                  <ul className="space-y-2">
                    {sel.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-xs text-[#7a7065] font-mono">
                        <span style={{ color: sel.accentColor }}>▶</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="pixel pixel-sm mb-3" style={{ color: sel.accentColor }}>TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {sel.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 font-mono border"
                        style={{ borderColor: sel.accentColor + "55", color: sel.accentColor }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a href={sel.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono border border-[#2a2a2a] text-[#e8e0d0] hover:border-[#f97316] hover:text-[#f97316] transition-colors">
                  <GitBranch size={14} /> VIEW ON GITHUB
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
