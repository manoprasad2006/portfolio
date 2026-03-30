"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "LANGUAGES",
    layer: "INPUT LAYER",
    color: "#f97316",
    glow: "rgba(249,115,22,0.5)",
    skills: [
      { name: "Python",     level: 95, logo: "https://cdn.simpleicons.org/python" },
      { name: "SQL",        level: 80, logo: "https://cdn.simpleicons.org/postgresql" },
      { name: "JavaScript", level: 65, logo: "https://cdn.simpleicons.org/javascript" },
      { name: "C",          level: 55, logo: "https://cdn.simpleicons.org/c" },
    ],
  },
  {
    title: "ML / DL FRAMEWORKS",
    layer: "HIDDEN L1",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.5)",
    skills: [
      { name: "TensorFlow / Keras", level: 90, logo: "https://cdn.simpleicons.org/tensorflow" },
      { name: "PyTorch",            level: 88, logo: "https://cdn.simpleicons.org/pytorch" },
      { name: "YOLO v5/v8",         level: 85, logo: null },
      { name: "HuggingFace",        level: 80, logo: "https://cdn.simpleicons.org/huggingface" },
      { name: "LangChain",          level: 78, logo: "https://cdn.simpleicons.org/langchain" },
      { name: "OpenCV",             level: 88, logo: "https://cdn.simpleicons.org/opencv" },
    ],
  },
  {
    title: "VECTOR & RAG",
    layer: "HIDDEN L2",
    color: "#a3e635",
    glow: "rgba(163,230,53,0.5)",
    skills: [
      { name: "FAISS",      level: 85, logo: null },
      { name: "ChromaDB",   level: 75, logo: null },
      { name: "LlamaIndex", level: 72, logo: null },
    ],
  },
  {
    title: "CLOUD & DEVOPS",
    layer: "OUTPUT LAYER",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.5)",
    skills: [
      { name: "Google Cloud (GCP)", level: 78, logo: "https://cdn.simpleicons.org/googlecloud" },
      { name: "Docker",             level: 75, logo: "https://cdn.simpleicons.org/docker" },
      { name: "FastAPI",            level: 85, logo: "https://cdn.simpleicons.org/fastapi" },
      { name: "Git & GitHub",       level: 88, logo: "https://cdn.simpleicons.org/git" },
    ],
  },
];


function NetworkCanvas({ inView }: { inView: boolean }) {
  const NODE_SPACING_Y = 92;
  const LAYER_WIDTH = 160;
  const CONN_WIDTH = 110;
  const PADDING_TOP = 80;
  const PADDING_BOTTOM = 50;

  const layerHeights = skillCategories.map((c) => c.skills.length * NODE_SPACING_Y);
  const maxHeight = Math.max(...layerHeights);
  const svgHeight = maxHeight + PADDING_TOP + PADDING_BOTTOM;
  const totalWidth = skillCategories.length * LAYER_WIDTH + (skillCategories.length - 1) * CONN_WIDTH;

  // Node centers
  const nodeCenters: { x: number; y: number; ci: number; si: number }[] = [];
  skillCategories.forEach((cat, ci) => {
    const x = ci * (LAYER_WIDTH + CONN_WIDTH) + LAYER_WIDTH / 2;
    const totalH = cat.skills.length * NODE_SPACING_Y;
    const startY = PADDING_TOP + (maxHeight - totalH) / 2 + NODE_SPACING_Y / 2;
    cat.skills.forEach((_, si) => {
      nodeCenters.push({ x, y: startY + si * NODE_SPACING_Y, ci, si });
    });
  });

  // Connections
  const connections: { d: string; fromColor: string; toColor: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let ci = 0; ci < skillCategories.length - 1; ci++) {
    const fromNodes = nodeCenters.filter((n) => n.ci === ci);
    const toNodes = nodeCenters.filter((n) => n.ci === ci + 1);
    fromNodes.forEach((from) => {
      toNodes.forEach((to) => {
        const mx = (from.x + to.x) / 2;
        const d = `M ${from.x} ${from.y} C ${mx - 10} ${from.y}, ${mx + 10} ${to.y}, ${to.x} ${to.y}`;
        connections.push({
          d, x1: from.x, y1: from.y, x2: to.x, y2: to.y,
          fromColor: skillCategories[ci].color,
          toColor: skillCategories[ci + 1].color,
        });
      });
    });
  }

  return (
    <div className="relative overflow-x-auto">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)`,
        }}
      />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <svg width={totalWidth} height={svgHeight} style={{ minWidth: totalWidth, display: "block" }}>
        <defs>
          {skillCategories.map((cat) => (
            <filter key={cat.color} id={`glow-${cat.color.replace("#", "")}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
          {skillCategories.map((cat) => (
            <radialGradient key={cat.title} id={`node-${cat.color.replace("#", "")}`} cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="40%" stopColor={cat.color} stopOpacity="0.7" />
              <stop offset="100%" stopColor={cat.color} stopOpacity="0.08" />
            </radialGradient>
          ))}
          {connections.map((_, i) => (
            <linearGradient key={i} id={`cg-${i}`}
              x1={connections[i].x1} y1={connections[i].y1}
              x2={connections[i].x2} y2={connections[i].y2}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={connections[i].fromColor} stopOpacity="0.22" />
              <stop offset="50%" stopColor={connections[i].toColor} stopOpacity="0.12" />
              <stop offset="100%" stopColor={connections[i].toColor} stopOpacity="0.22" />
            </linearGradient>
          ))}
          {skillCategories.map((cat) => (
            <radialGradient key={`halo-${cat.color}`} id={`halo-${cat.color.replace("#", "")}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={cat.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={cat.color} stopOpacity="0" />
            </radialGradient>
          ))}
          {/* Per-node clipPath definitions */}
          {nodeCenters.map(({ x, y, ci, si }) => {
            const skill = skillCategories[ci].skills[si];
            const r = 18 + (skill.level / 100) * 12;
            return (
              <clipPath key={`clip-${ci}-${si}`} id={`clip-${ci}-${si}`}>
                <circle cx={x} cy={y} r={r * 0.72} />
              </clipPath>
            );
          })}
        </defs>

        {/* Layer header lines */}
        {skillCategories.map((cat, ci) => {
          const x = ci * (LAYER_WIDTH + CONN_WIDTH) + LAYER_WIDTH / 2;
          return (
            <g key={`header-${ci}`}>
              <motion.line
                x1={x - 40} y1={28} x2={x + 40} y2={28}
                stroke={cat.color} strokeWidth="0.6" strokeOpacity="0.4"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ delay: ci * 0.1 + 0.1, duration: 0.5 }}
              />
              {/* Layer badge */}
              <motion.rect
                x={x - 38} y={6} width={76} height={14} rx={2}
                fill={cat.color} fillOpacity="0.08"
                stroke={cat.color} strokeOpacity="0.3" strokeWidth="0.5"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: ci * 0.1 }}
              />
              <motion.text x={x} y={16} textAnchor="middle"
                fill={cat.color} fontSize="7.5" fontFamily="'Courier New', monospace"
                letterSpacing="2" fillOpacity="0.9"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: ci * 0.1 + 0.1 }}
              >
                {cat.layer}
              </motion.text>
              <motion.text x={x} y={44} textAnchor="middle"
                fill={cat.color} fontSize="9" fontFamily="'Courier New', monospace"
                fontWeight="bold" letterSpacing="1" fillOpacity="0.95"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: ci * 0.1 + 0.2 }}
              >
                {cat.title}
              </motion.text>
            </g>
          );
        })}

        {/* Connection paths */}
        {connections.map((conn, i) => (
          <motion.path
            key={`conn-${i}`}
            d={conn.d}
            fill="none"
            stroke={`url(#cg-${i})`}
            strokeWidth="0.9"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.007, duration: 0.9, ease: "easeInOut" }}
          />
        ))}

        {/* Pulse particles on connections */}
        {inView && connections
          .filter((_, i) => i % 3 === 0)
          .map((conn, i) => (
            <motion.circle
              key={`pulse-${i}`}
              r={2}
              fill={conn.fromColor}
              opacity={0.85}
              filter={`url(#glow-${conn.fromColor.replace("#", "")})`}
              style={{ offsetPath: `path("${conn.d}")` } as any}
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 1.6 + (i % 5) * 0.3,
                delay: 1.2 + i * 0.25,
                repeat: Infinity,
                repeatDelay: 1.5 + (i % 4),
                ease: "linear",
              }}
            />
          ))}

        {/* Nodes — logos only, no bg circles */}
        {nodeCenters.map(({ x, y, ci, si }) => {
          const cat = skillCategories[ci];
          const skill = cat.skills[si];
          const r = 18 + (skill.level / 100) * 12;
          const logoSize = r * 2;
          const delay = ci * 0.12 + si * 0.09 + 0.3;

          return (
            <g key={`node-${ci}-${si}`}>
              {/* Logo or text abbr — no background */}
              {skill.logo ? (
                <motion.image
                  href={skill.logo}
                  x={x - logoSize / 2}
                  y={y - logoSize / 2}
                  width={logoSize}
                  height={logoSize}
                  preserveAspectRatio="xMidYMid meet"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay, duration: 0.4, type: "spring", stiffness: 160 }}
                />
              ) : (
                <motion.text
                  x={x} y={y + r * 0.35}
                  textAnchor="middle"
                  fill={cat.color}
                  fontSize={r * 0.7}
                  fontFamily="'Courier New', monospace"
                  fontWeight="bold"
                  fillOpacity="0.9"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: delay + 0.2 }}
                >
                  {skill.name.replace(" v5/v8", "").split(" ")[0].slice(0, 5).toUpperCase()}
                </motion.text>
              )}

              {/* Skill name label */}
              <motion.text x={x} y={y + logoSize / 2 + 14} textAnchor="middle"
                fill={cat.color} fontSize="9.5" fontFamily="'Courier New', monospace"
                fillOpacity="0.85"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: delay + 0.5 }}
              >
                {skill.name.split(" / ")[0].split(" (")[0]}
              </motion.text>
              {(skill.name.includes("/") || skill.name.includes("(")) && (
                <motion.text x={x} y={y + logoSize / 2 + 26} textAnchor="middle"
                  fill={cat.color} fontSize="8.5" fontFamily="'Courier New', monospace"
                  fillOpacity="0.45"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: delay + 0.6 }}
                >
                  {skill.name.includes("/")
                    ? skill.name.split(" / ")[1]
                    : skill.name.match(/\(([^)]+)\)/)?.[1]}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const totalConnections = skillCategories
    .slice(0, -1)
    .reduce((a, c, i) => a + c.skills.length * skillCategories[i + 1].skills.length, 0);

  return (
    <section id="skills" className="py-28 border-t border-[#1c1c1c] overflow-hidden relative" ref={ref}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {skillCategories.map((cat, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: 500, height: 500,
              background: cat.color,
              opacity: 0.04,
              filter: "blur(100px)",
              top: "0%",
              left: `${i * 27}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-3"
        >
          <span className="pixel pixel-sm text-[#fbbf24]">02.</span>
          <h2 className="pixel pixel-xl text-[#e8e0d0]">SKILLS</h2>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-[9px] text-[#333] mb-14 tracking-[0.3em] uppercase"
        >
          ◈ Synaptic architecture — node radius encodes proficiency · animated pulses = active signal propagation
        </motion.p>

        {/* Terminal window */}
        <div className="border border-[#1a1a1a] rounded overflow-hidden"
          style={{ background: "rgba(0,3,0,0.9)", backdropFilter: "blur(8px)" }}
        >
          {/* Terminal top bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#141414]"
            style={{ background: "rgba(0,5,0,0.95)" }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: "#f43f5e", opacity: 0.8 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#fbbf24", opacity: 0.8 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#a3e635", opacity: 0.8 }} />
            <span className="font-mono text-[9px] text-[#2e2e2e] ml-4 tracking-widest">
              ~/portfolio/skills $ python neural_skill_map.py --render
            </span>
            <motion.span
              className="font-mono text-[9px] ml-1"
              style={{ color: "#a3e635" }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ▌
            </motion.span>
          </div>

          <div className="p-6 pt-8 pb-6">
            <NetworkCanvas inView={inView} />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-8 flex flex-wrap gap-10 border-t border-[#030703] pt-6"
        >
          {[
            { label: "TOTAL NODES", value: skillCategories.reduce((a, c) => a + c.skills.length, 0) },
            { label: "NETWORK LAYERS", value: skillCategories.length },
            { label: "SYNAPTIC CONNECTIONS", value: totalConnections },
            { label: "DOMAINS", value: "4 × ACTIVE" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#333]">{s.label}</span>
              <span className="font-mono text-2xl font-bold text-[#e8e0d0]">{s.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}