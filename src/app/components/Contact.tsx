"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, GitBranch, Link2, Send, MapPin, Clock } from "lucide-react";

const contactLinks = [
  { icon: Mail, label: "EMAIL", value: "manoprasadvs@gmail.com", href: "mailto:manoprasadvs@gmail.com", color: "#f97316" },
  { icon: GitBranch, label: "GITHUB", value: "github.com/manoprasad2006", href: "https://github.com/manoprasad2006", color: "#fbbf24" },
  { icon: Link2, label: "LINKEDIN", value: "linkedin.com/in/mano-prasad-v", href: "https://www.linkedin.com/in/mano-prasad-v-3191782a2/", color: "#a3e635" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = `mailto:manoprasadvs@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(link);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-28 border-t border-[#1c1c1c]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="pixel pixel-sm text-[#f97316]">06.</span>
          <h2 className="pixel pixel-xl text-[#e8e0d0]">CONTACT</h2>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="f-card p-5 mb-6" style={{ borderColor: "#f97316" + "33" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[#a3e635] animate-pulse" />
                <span className="text-xs font-mono text-[#e8e0d0]">AVAILABLE FOR OPPORTUNITIES</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#7a7065] font-mono mb-1.5">
                <MapPin size={12} className="mt-0.5" /> Tamil Nadu, India
              </div>
              <div className="flex items-start gap-2 text-xs text-[#7a7065] font-mono">
                <Clock size={12} className="mt-0.5" /> IST (UTC +5:30) — replies within 24h
              </div>
            </div>

            {contactLinks.map((l) => (
              <motion.a key={l.label} href={l.href}
                target={l.label !== "EMAIL" ? "_blank" : undefined}
                rel={l.label !== "EMAIL" ? "noopener noreferrer" : undefined}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 f-card p-4 group"
                style={{ borderColor: l.color + "33" }}
              >
                <div className="p-2.5" style={{ background: l.color + "22" }}>
                  <l.icon size={16} style={{ color: l.color }} />
                </div>
                <div>
                  <div className="pixel pixel-sm mb-0.5" style={{ color: l.color }}>{l.label}</div>
                  <div className="text-xs font-mono text-[#7a7065] group-hover:text-[#e8e0d0] transition-colors">{l.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="f-card p-7 space-y-5"
            style={{ borderColor: "#f97316" + "33" }}
          >
            {[
              { label: "NAME", key: "name", type: "text", placeholder: "Your name" },
              { label: "EMAIL", key: "email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.key}>
                <label className="pixel pixel-sm text-[#7a7065] block mb-2">{field.label}</label>
                <input type={field.type} required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] px-4 py-3 text-[#e8e0d0] text-xs font-mono placeholder-[#0a1f0a] focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="pixel pixel-sm text-[#7a7065] block mb-2">MESSAGE</label>
              <textarea rows={5} required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full bg-[#1c1c1c] border border-[#2a2a2a] px-4 py-3 text-[#e8e0d0] text-xs font-mono placeholder-[#0a1f0a] focus:outline-none focus:border-[#f97316] transition-colors resize-none"
              />
            </div>
            <motion.button type="submit"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#f97316] text-[#0c0c0c] pixel pixel-sm font-bold flex items-center justify-center gap-2 hover:bg-[#a3e635] transition-colors px-border"
            >
              {sent ? "✓ SENT!" : <><Send size={13} /> SEND MESSAGE</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
