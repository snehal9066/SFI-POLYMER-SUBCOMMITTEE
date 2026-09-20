"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Floating decorative particle items
const floatingParticles = [
  { id: 1, char: "★", size: "text-2xl", top: "12%", left: "8%", delay: 0, duration: 6, xRange: [0, 14, 0], yRange: [0, -22, 0] },
  { id: 2, char: "✦", size: "text-sm", top: "20%", left: "88%", delay: 1.2, duration: 7, xRange: [0, -12, 0], yRange: [0, -18, 0] },
  { id: 3, char: "★", size: "text-xl", top: "68%", left: "10%", delay: 0.8, duration: 8, xRange: [0, 10, 0], yRange: [0, -24, 0] },
  { id: 4, char: "✧", size: "text-base", top: "26%", left: "76%", delay: 2, duration: 6.5, xRange: [0, -16, 0], yRange: [0, 18, 0] },
  { id: 5, char: "★", size: "text-sm", top: "62%", left: "86%", delay: 1.5, duration: 7.5, xRange: [0, 12, 0], yRange: [0, -15, 0] },
  { id: 6, char: "•", size: "text-2xl", top: "38%", left: "16%", delay: 0.4, duration: 5.2, xRange: [0, 8, 0], yRange: [0, -14, 0] },
  { id: 7, char: "✦", size: "text-xs", top: "16%", left: "36%", delay: 2.2, duration: 6.2, xRange: [0, -10, 0], yRange: [0, 16, 0] },
  { id: 8, char: "•", size: "text-xl", top: "78%", left: "74%", delay: 1.8, duration: 5.6, xRange: [0, -14, 0], yRange: [0, -20, 0] },
  { id: 9, char: "★", size: "text-lg", top: "82%", left: "30%", delay: 0.6, duration: 7.2, xRange: [0, 16, 0], yRange: [0, -18, 0] },
  { id: 10, char: "✧", size: "text-sm", top: "48%", left: "92%", delay: 2.5, duration: 6.4, xRange: [0, -9, 0], yRange: [0, 22, 0] },
  { id: 11, char: "•", size: "text-lg", top: "10%", left: "64%", delay: 1.1, duration: 5.9, xRange: [0, 11, 0], yRange: [0, -16, 0] },
  { id: 12, char: "✦", size: "text-base", top: "55%", left: "5%", delay: 1.7, duration: 8.2, xRange: [0, 9, 0], yRange: [0, -26, 0] },
];

// Counter component for stats bar
function StatCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView) return;

    let startTime: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo function for smooth slowing down at end
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [mounted, isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {mounted ? count : target}
      {suffix}
    </span>
  );
}

// 6 Cards specification
const cardsData = [
  {
    title: "Academics",
    href: "/academics",
    emoji: "📚",
    badge: "Syllabus & PYQs",
    desc: "Explore previous year question banks, complete course schemes, semester syllabi, and curated study notes for PSRT.",
    isLink: true,
  },
  {
    title: "Notifications",
    href: "/notifications",
    emoji: "🔔",
    badge: "Live Notices",
    desc: "Stay updated with official department announcements, examination circulars, timetable schedules, and university news.",
    isLink: true,
  },
  {
    title: "Higher Studies",
    href: "/higher-studies",
    emoji: "🎓",
    badge: "GATE & Research",
    desc: "Discover preparation pathways for GATE, premier M.Tech programs, Ph.D. positions abroad, and research fellowships.",
    isLink: true,
  },
  {
    title: "Placements",
    href: "/placements",
    emoji: "💼",
    badge: "Career Guidance",
    desc: "Access recruiter profiles, past placement statistics, core tyre & polymer interview experiences, and career insights.",
    isLink: true,
  },
  {
    title: "Fresher Guide",
    href: "/fresher-guide",
    emoji: "🗺️",
    badge: "PSRT Orientation",
    desc: "Essential department introduction for first years: laboratory protocols, campus navigation, faculty advice, and survival tips.",
    isLink: true,
  },
  {
    title: "Join the Movement",
    href: null,
    emoji: "✊",
    badge: "Student Unity",
    desc: "Stand together with the SFI Polymer Subcommittee to protect student welfare, academic rights, and progressive campus democracy.",
    isLink: false,
  },
];

export default function Home() {
  // Staggered animations container for Hero
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.12,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-slate-50 text-slate-800 selection:bg-[#E60000] selection:text-white">
      {/* ----------------- Hero Section ----------------- */}
      <section className="relative w-full bg-gradient-to-br from-[#E60000] via-[#CC0000] to-[#990000] text-white pt-20 pb-28 sm:pt-24 sm:pb-32 md:pt-28 md:pb-36 px-6 flex flex-col items-center justify-center overflow-hidden shadow-xl">
        {/* Animated Radial Ambient Glows */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-red-400/35 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Floating Particle / Star Decorations */}
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute pointer-events-none select-none text-white/35 font-light ${p.size}`}
            style={{ top: p.top, left: p.left }}
            animate={{
              x: p.xRange,
              y: p.yRange,
              opacity: [0.2, 0.75, 0.2],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            {p.char}
          </motion.div>
        ))}

        {/* Hero Content Container */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl w-full text-center space-y-6 md:space-y-8"
        >
          {/* Glowing Badge */}
          <motion.div variants={heroItemVariants} className="flex justify-center">
            <div className="relative group inline-block">
              {/* Pulsing ambient glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/70 via-red-200/50 to-white/70 blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

              {/* Glass badge pill */}
              <div className="relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-[0_0_25px_rgba(255,255,255,0.45)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] transition-all">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white drop-shadow-sm">
                  Student Resource Platform
                </span>
                <span className="text-white text-xs">★</span>
              </div>
            </div>
          </motion.div>

          {/* Large Bold Title */}
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md"
          >
            Empowering Polymer Students
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroItemVariants}
            className="text-lg sm:text-xl md:text-2xl text-red-50 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-sm"
          >
            Department of Polymer Science & Rubber Technology, CUSAT. Access question banks, comprehensive syllabi, official circulars, and career pathways all in one unified space.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/academics"
              className="bg-white text-[#E60000] hover:bg-red-50 hover:text-[#CC0000] font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              Browse Academics
            </Link>
            <Link
              href="/notifications"
              className="bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl backdrop-blur-md transition-all duration-200 shadow-md text-sm sm:text-base"
            >
              Latest Notifications
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ----------------- Stats Bar ----------------- */}
      <section className="-mt-12 sm:-mt-14 md:-mt-16 relative z-20 max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-100 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* 500+ Resources */}
            <div className="flex flex-col items-center text-center px-4 pt-2 md:pt-0">
              <div className="text-4xl sm:text-5xl font-black text-[#E60000] tracking-tight mb-1">
                <StatCounter target={500} suffix="+" />
              </div>
              <div className="font-bold text-slate-800 text-lg sm:text-xl">
                Resources
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-[220px]">
                Question banks, lecture notes, textbook references & schemes
              </p>
            </div>

            {/* 85% Placement */}
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <div className="text-4xl sm:text-5xl font-black text-[#E60000] tracking-tight mb-1">
                <StatCounter target={85} suffix="%" />
              </div>
              <div className="font-bold text-slate-800 text-lg sm:text-xl">
                Placement
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-[220px]">
                Strong recruitment record across leading tyre & polymer industries
              </p>
            </div>

            {/* 8 Semesters */}
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <div className="text-4xl sm:text-5xl font-black text-[#E60000] tracking-tight mb-1">
                <StatCounter target={8} suffix="" />
              </div>
              <div className="font-bold text-slate-800 text-lg sm:text-xl">
                Semesters
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-[220px]">
                Structured module coverage from S1 through S8 for B.Tech PSRT
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ----------------- Navigation Cards Grid ----------------- */}
      <section className="max-w-6xl w-full px-6 py-16 sm:py-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Student Resources
          </h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Everything curated to assist PSRT students throughout their academic and professional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cardsData.map((card) => {
            if (card.isLink && card.href) {
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E60000] rounded-2xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow hover:shadow-xl border border-slate-200/80 hover:border-[#E60000]/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Top gradient accent line on hover */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#E60000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-red-50 text-3xl flex items-center justify-center shadow-xs border border-red-100 group-hover:bg-red-100/70 group-hover:scale-110 transition-all duration-300">
                          <span role="img" aria-label={card.title}>
                            {card.emoji}
                          </span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#E60000] bg-red-50 px-3 py-1 rounded-full border border-red-100">
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E60000] transition-colors mb-2.5">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom action bar with sliding 'Explore →' text */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                        Resource
                      </span>
                      <div className="flex items-center gap-1 font-bold text-sm text-[#E60000] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <span>Explore →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            }

            // Card 6: "Join the Movement" (not a link)
            return (
              <div key={card.title} className="group block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow hover:shadow-xl border border-red-200/90 hover:border-[#E60000] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-white/90 via-red-50/40 to-red-100/30"
                >
                  {/* SFI Red highlight bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#E60000] via-[#CC0000] to-[#990000]" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-red-100/90 text-3xl flex items-center justify-center shadow-xs border border-red-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <span role="img" aria-label={card.title}>
                          {card.emoji}
                        </span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#E60000] px-3 py-1 rounded-full shadow-xs">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E60000] transition-colors mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom bar with sliding 'Explore →' text */}
                  <div className="mt-8 pt-4 border-t border-red-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E60000] flex items-center gap-1">
                      ★ SFI CUSAT
                    </span>
                    <div className="flex items-center gap-1 font-bold text-sm text-[#E60000] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>Explore →</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- Community / Contribution Section ----------------- */}
      <section className="max-w-6xl w-full px-6 pb-20 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl bg-gradient-to-r from-[#990000] via-[#CC0000] to-[#E60000] text-white p-8 sm:p-10 md:p-12 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/25">
                <span>★</span> SFI PSRT Unit
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Have study materials or notes to contribute?
              </h2>
              <p className="text-red-100 text-sm sm:text-base max-w-xl">
                Help your fellow classmates by sharing previous year questions, lecture notes, or lab guides with the subcommittee.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/academics"
                className="text-center bg-white text-[#E60000] hover:bg-red-50 hover:text-[#CC0000] font-bold px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-100 text-sm"
              >
                Access Academics
              </Link>
              <Link
                href="/notifications"
                className="text-center bg-white/15 hover:bg-white/25 border border-white/35 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm backdrop-blur-md"
              >
                View Circulars
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
