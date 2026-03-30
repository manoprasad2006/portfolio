import type { Metadata } from "next";
import { Space_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mano Prasad V | AI/ML Engineer",
  description:
    "Portfolio of Mano Prasad V — AI/ML Engineer specializing in Computer Vision, NLP, and RAG Systems. Building intelligent systems that make an impact.",
  keywords: ["AI Engineer", "ML Engineer", "Computer Vision", "RAG Systems", "Deep Learning"],
  openGraph: {
    title: "Mano Prasad V | AI/ML Engineer",
    description: "Building intelligent systems that make an impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0c0c0c] text-[#e8e0d0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
