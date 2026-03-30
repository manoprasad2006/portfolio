"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";

const experiences = [
  {
    title: "AI/ML Engineering Intern",
    company: "VISKAMNIX TECHNOLOGIES",
    period: "JUL'25 - AUG'25",
    location: "Chennai,India",
    color: "#f97316",
    description: "Deployed production-grade computer vision models. Built face liveness detection and optimized model inference pipelines for real-time deployment on cloud infrastructure.",
    highlights: [
      "Deployed YOLO-based real-time detection pipeline",
      "30+ FPS inference on edge devices",
      "Integrated AI with existing authentication stack",
      "Reduced false positive rate by 60% via fine-tuning",
    ],
  },
];

const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Affiliated College",
    period: "2023 – 2027",
    color: "#fbbf24",
    highlights: ["CGPA: 8.0", "Specialisation: AI & ML", "Deep Learning, CV, NLP, Cloud"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 border-t border-[#1c1c1c]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="pixel pixel-sm text-[#f43f5e]">04.</span>
          <h2 className="pixel pixel-xl text-[#e8e0d0]">EXPERIENCE</h2>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        {/* Work */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase size={13} className="text-[#f97316]" />
            <span className="pixel pixel-sm text-[#f97316]">WORK</span>
          </div>

          {experiences.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative pl-8 pb-10 timeline-item"
            >
              <div className="absolute left-0 top-1 w-3 h-3 border-2"
                style={{ borderColor: exp.color, background: exp.color + "33" }} />

              <div className="f-card p-6" style={{ borderColor: exp.color + "33" }}>
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-mono font-bold text-[#e8e0d0]">{exp.title}</h4>
                    <p className="text-xs font-mono mt-1" style={{ color: exp.color }}>{exp.company}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a7065] font-mono">
                      <Calendar size={10} /> {exp.period}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#7a7065] font-mono">
                      <MapPin size={10} /> {exp.location}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#7a7065] leading-7 mb-4">{exp.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={11} style={{ color: exp.color }} />
                  <span className="pixel pixel-sm" style={{ color: exp.color }}>WINS</span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-xs text-[#7a7065] font-mono">
                      <span style={{ color: exp.color }}>▶</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-sm">🎓</span>
            <span className="pixel pixel-sm text-[#fbbf24]">EDUCATION</span>
          </div>

          {education.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="relative pl-8 timeline-item"
            >
              <div className="absolute left-0 top-1 w-3 h-3 border-2"
                style={{ borderColor: edu.color, background: edu.color + "33" }} />
              <div className="f-card p-6" style={{ borderColor: edu.color + "33" }}>
                <h4 className="text-sm font-mono font-bold text-[#e8e0d0] mb-1">{edu.degree}</h4>
                <p className="text-xs font-mono mb-2" style={{ color: edu.color }}>{edu.institution}</p>
                <p className="text-[10px] text-[#7a7065] font-mono mb-4 flex items-center gap-1">
                  <Calendar size={10} /> {edu.period}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h) => (
                    <span key={h} className="text-xs px-2 py-0.5 font-mono"
                      style={{ background: edu.color + "22", color: edu.color }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
