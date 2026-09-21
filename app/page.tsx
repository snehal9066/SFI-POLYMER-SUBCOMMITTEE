"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

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
    emoji: "📢",
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
    emoji: "🧭",
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
    <main className="flex flex-col items-center w-full min-h-screen bg-slate-50 text-slate-800 selection:bg-red-200 selection:text-red-900">
      <section className="relative w-full bg-white text-slate-900 pt-20 pb-28 sm:pt-28 sm:pb-32 md:pt-36 md:pb-40 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-slate-200/60">
        
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-red-100/60 blur-[100px] animate-pulse duration-10000" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-rose-50/50 blur-[120px]" />
          <div className="absolute -bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-orange-50/50 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        </div>

        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <motion.div variants={heroItemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#E60000] font-semibold text-xs tracking-widest uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E60000]"></span>
            </span>
            Official CUSAT Platform
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-6 leading-[1.05] text-slate-900"
          >
            SFI <span className="text-[#E60000] drop-shadow-sm">Polymer</span>
            <br />
            Subcommittee
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mb-10 font-medium leading-relaxed"
          >
            Empowering students of Polymer Science and Rubber Technology (PSRT) 
            with premier academic resources, placement insights, and a unified voice.
          </motion.p>

          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/academics"
              className="px-8 py-3.5 bg-[#E60000] text-white text-sm font-bold rounded-full shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 hover:bg-[#CC0000] transition-all duration-300 ring-2 ring-transparent focus:ring-red-400"
            >
              Explore Academics
            </Link>
            <Link
              href="/placements"
              className="px-8 py-3.5 bg-white text-slate-700 text-sm font-bold rounded-full shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 hover:text-slate-900 transition-all duration-300 ring-2 ring-transparent focus:ring-slate-200"
            >
              Placement Data
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-slate-50 py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
              Department Resources
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Everything you need to succeed in B.Tech & M.Tech PSRT, centralized in one open-access platform.
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
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-[#E60000]/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#E60000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-red-50 text-3xl flex items-center justify-center shadow-sm border border-red-100 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
                            <span role="img" aria-label={card.title}>
                              {card.emoji}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#E60000] group-hover:border-red-200 transition-colors">
                            {card.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[#E60000] transition-colors flex items-center gap-1.5">
                          {card.title}
                          <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#E60000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700">
                          {card.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              }

              return (
                <div key={card.title} className="group block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full bg-gradient-to-br from-[#E60000] to-[#CC0000] rounded-2xl shadow-md hover:shadow-xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 text-3xl flex items-center justify-center shadow-sm border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-sm">
                          <span role="img" aria-label={card.title}>
                            {card.emoji}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E60000] bg-white px-3 py-1 rounded-full shadow-sm">
                          {card.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-1.5">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed font-medium">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <footer className="w-full bg-white border-t border-slate-200 py-12 px-6">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} SFI Polymer Subcommittee, CUSAT. All rights reserved.</p>
            <div className="flex gap-4">
               <span className="text-[#E60000] font-bold">Inquilab Zindabad!</span>
            </div>
         </div>
      </footer>
    </main>
  );
}
