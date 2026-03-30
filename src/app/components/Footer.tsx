"use client";

import { GitBranch, Link2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c1c] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="pixel pixel-sm text-[#f97316]">MP://PORTFOLIO</span>
        <span className="text-xs font-mono text-[#7a7065]">
          © {new Date().getFullYear()} Mano Prasad V
        </span>
        <div className="flex items-center gap-4">
          {[
            { icon: GitBranch, href: "https://github.com/manoprasad2006", label: "GitHub" },
            { icon: Link2, href: "https://www.linkedin.com/in/mano-prasad-v-3191782a2/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:manoprasadvs@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-[#7a7065] hover:text-[#f97316] transition-colors"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
