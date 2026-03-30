"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Star, Zap } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon — Finalist",
    subtitle: "Top 5 Nationally",
    description: "Reached national finals with LawGPT — an AI legal assistant that democratizes access to Indian law.",
    color: "#f97316",
    tagClass: "tag-orange",
    year: "2024",
    badge: "TOP 5",
  },
  {
    icon: Award,
    title: "Workato Automation Pro I & II",
    subtitle: "Enterprise Automation Certified",
    description: "Dual-certified in Workato Automation Pro I and Pro II — covering enterprise workflow automation, API integrations, and building production-grade automation recipes.",
    color: "#fbbf24",
    tagClass: "tag-amber",
    year: "2024",
    badge: "CERTIFIED",
  },
  {
    icon: Star,
    title: "Deep Learning Specialization",
    subtitle: "Coursera — deeplearning.ai",
    description: "5-course DL Specialization by Andrew Ng: CNNs, RNNs, sequence models, optimization.",
    color: "#a3e635",
    tagClass: "tag-lime",
    year: "2023",
    badge: "CERTIFIED",
  },
  {
    icon: Zap,
    title: "Pals Innowah — Kaggle Competition",
    subtitle: "Organized by IIT Madras",
    description: "Secured 2nd place in the Pals Innowah Kaggle competition organized by IIT-M, competing against teams across the country with a real-time agricultural disease detection model.",
    color: "#f43f5e",
    tagClass: "tag-red",
    year: "2023",
    badge: "2ND PLACE",
  },
  {
    icon: Star,
    title: "Google ML Professional Certificate",
    subtitle: "Google — Machine Learning",
    description: "Currently pursuing the Google Machine Learning Professional Certificate — covering supervised/unsupervised learning, MLOps, model evaluation, and production deployment on Google Cloud.",
    color: "#a3e635",
    tagClass: "tag-lime",
    year: "2025",
    badge: "ONGOING",
  },
];

const stats = [
  { label: "PROJECTS", value: "10+" },
  { label: "GPA", value: "8.0+" },
  { label: "HACKATHONS", value: "10+" },
  { label: "CERTS", value: "4+" },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="py-28 border-t border-[#1c1c1c]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="pixel pixel-sm text-[#f43f5e]">05.</span>
          <h2 className="pixel pixel-xl text-[#e8e0d0]">ACHIEVEMENTS</h2>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {achievements.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="f-card p-6 relative"
              style={{ borderColor: item.color + "33" }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: item.color }} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 flex-shrink-0" style={{ background: item.color + "22" }}>
                    <item.icon size={16} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#e8e0d0]">{item.title}</h3>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: item.color }}>{item.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`${item.tagClass} text-[10px] px-2 py-0.5 font-mono`}>{item.badge}</span>
                  <span className="text-[10px] text-[#7a7065] font-mono">{item.year}</span>
                </div>
              </div>
              <p className="text-xs text-[#7a7065] leading-6">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="f-card p-5 text-center"
              style={{ borderColor: ["#f97316", "#fbbf24", "#a3e635", "#f43f5e"][i] + "33" }}>
              <div className="pixel pixel-xl mb-2" style={{ color: ["#f97316", "#fbbf24", "#a3e635", "#f43f5e"][i] }}>
                {s.value}
              </div>
              <div className="pixel pixel-sm text-[#7a7065]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
