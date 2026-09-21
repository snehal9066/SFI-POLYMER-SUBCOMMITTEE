"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const floatingParticles = [
  { id: 1, char: "?", size: "text-2xl", top: "15%", left: "10%", delay: 0, duration: 4, xRange: [0, 15, 0], yRange: [0, -25, 0] },
  { id: 2, char: "??", size: "text-sm", top: "25%", left: "85%", delay: 1.2, duration: 5, xRange: [0, -15, 0], yRange: [0, -20, 0] },
  { id: 3, char: "?", size: "text-xl", top: "70%", left: "12%", delay: 0.8, duration: 6, xRange: [0, 12, 0], yRange: [0, -30, 0] },
  { id: 4, char: "??", size: "text-base", top: "30%", left: "75%", delay: 2, duration: 4.5, xRange: [0, -20, 0], yRange: [0, 20, 0] },
  { id: 5, char: "?", size: "text-sm", top: "65%", left: "88%", delay: 1.5, duration: 5.5, xRange: [0, 15, 0], yRange: [0, -20, 0] },
  { id: 6, char: "??", size: "text-2xl", top: "40%", left: "18%", delay: 0.4, duration: 4.2, xRange: [0, 10, 0], yRange: [0, -15, 0] },
];

const cardsData = [
  {
    title: "Academics",
    href: "/academics",
    emoji: "??",
    badge: "Syllabus & PYQs",
    desc: "Explore previous year question banks, complete course schemes, semester syllabi, and curated study notes for PSRT.",
    isLink: true,
  },
  {
    title: "Notifications",
    href: "/notifications",
    emoji: "??",
    badge: "Live Notices",
    desc: "Stay updated with official department announcements, examination circulars, timetable schedules, and university news.",
    isLink: true,
  },
  {
    title: "Higher Studies",
    href: "/higher-studies",
    emoji: "??",
    badge: "GATE & Research",
    desc: "Discover preparation pathways for GATE, premier M.Tech programs, Ph.D. positions abroad, and research fellowships.",
    isLink: true,
  },
  {
    title: "Placements",
    href: "/placements",
    emoji: "??",
    badge: "Career Guidance",
    desc: "Access recruiter profiles, past placement statistics, core tyre & polymer interview experiences, and career insights.",
    isLink: true,
  },
  {
    title: "Fresher Guide",
    href: "/fresher-guide",
    emoji: "??",
    badge: "PSRT Orientation",
    desc: "Essential department introduction for first years: laboratory protocols, campus navigation, faculty advice, and survival tips.",
    isLink: true,
  },
  {
    title: "Join the Movement",
    href: null,
    emoji: "?",
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-slate-50 text-slate-800 selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      <section className="relative w-full bg-slate-900 text-white pt-20 pb-28 sm:pt-28 sm:pb-32 md:pt-36 md:pb-40 px-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#E60000] blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] -left-[20%] w-[50%] h-[50%] rounded-full bg-rose-600 blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.4, 1], x: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-orange-500 blur-[120px]" 
          />
        </div>

        {/* Floating Particles */}
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: p.xRange,
              y: p.yRange,
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className={`absolute ${p.size} text-white/40 pointer-events-none select-none`}
            style={{ top: p.top, left: p.left }}
          >
            {p.char}
          </motion.div>
        ))}

        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <motion.div variants={heroItemVariants} whileHover={{ scale: 1.05 }} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs tracking-widest uppercase shadow-lg shadow-[#E60000]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E60000]"></span>
            </span>
            Official CUSAT Platform
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-6 leading-[1.05] drop-shadow-2xl"
          >
            SFI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E60000] to-orange-400">Polymer</span>
            <br />
            Subcommittee
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-sm"
          >
            Empowering students of Polymer Science and Rubber Technology (PSRT) 
            with premier academic resources, placement insights, and a unified voice.
          </motion.p>

          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4 justify-center">
            <Link href="/academics">
               <motion.div
                 whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(230, 0, 0, 0.6)" }}
                 whileTap={{ scale: 0.95 }}
                 className="px-8 py-3.5 bg-gradient-to-r from-[#E60000] to-[#CC0000] text-white text-sm font-bold rounded-full shadow-lg border border-red-500/50 transition-all duration-300"
               >
                 Explore Academics
               </motion.div>
            </Link>
            <Link href="/placements">
               <motion.div
                 whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                 whileTap={{ scale: 0.95 }}
                 className="px-8 py-3.5 bg-white/5 backdrop-blur-md text-white text-sm font-bold rounded-full shadow-sm border border-white/20 transition-all duration-300"
               >
                 Placement Data
               </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-slate-50 py-20 sm:py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
              Department Resources
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Everything you need to succeed in B.Tech & M.Tech PSRT, centralized in one open-access platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cardsData.map((card, idx) => {
              if (card.isLink && card.href) {
                return (
                  <Link key={card.title} href={card.href} className="group block h-full focus:outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      transition={{ duration: 0.4, delay: idx * 0.1, type: "spring" as const, stiffness: 100 }}
                      className="h-full bg-white rounded-2xl shadow-md hover:shadow-2xl border border-slate-200 hover:border-[#E60000]/50 p-7 sm:p-8 flex flex-col justify-between transition-all relative overflow-hidden"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#E60000] to-transparent" 
                      />
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <motion.div 
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            className="w-14 h-14 rounded-2xl bg-red-50 text-3xl flex items-center justify-center shadow-sm border border-red-100 group-hover:bg-red-100 group-hover:text-[#E60000]"
                          >
                            <span role="img" aria-label={card.title}>
                              {card.emoji}
                            </span>
                          </motion.div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#E60000] group-hover:border-red-200 transition-colors">
                            {card.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[#E60000] transition-colors flex items-center gap-1.5">
                          {card.title}
                          <motion.svg 
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="w-4 h-4 text-[#E60000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
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
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.4, delay: idx * 0.1, type: "spring" as const, stiffness: 100 }}
                    className="h-full bg-gradient-to-br from-[#E60000] to-[#990000] rounded-2xl shadow-xl hover:shadow-2xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                  >
                    <motion.div 
                       animate={{ rotate: 360 }} 
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" 
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <motion.div 
                          whileHover={{ scale: 1.15, rotate: -10 }}
                          className="w-14 h-14 rounded-2xl bg-white/20 text-3xl flex items-center justify-center shadow-sm border border-white/30 backdrop-blur-sm"
                        >
                          <span role="img" aria-label={card.title}>
                            {card.emoji}
                          </span>
                        </motion.div>
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
         <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4 text-sm text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} SFI Polymer Subcommittee, CUSAT. All rights reserved.</p>
         </div>
      </footer>
    </main>
  );
}

