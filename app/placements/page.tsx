"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Briefcase,
  TrendingUp,
  Building2,
  Download,
  ChevronDown,
  CheckCircle2,
  FileText,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  FileCheck,
  Check,
} from "lucide-react";

// Stagger Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Smooth Counter Component that animates numbers on view
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(ease * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums font-black">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// Recruiters Data
interface Recruiter {
  name: string;
  sector: string;
  tag: string;
  roles: string[];
  initials: string;
}

const RECRUITERS: Recruiter[] = [
  {
    name: "MRF",
    sector: "Tyres & Rubber Technology",
    tag: "Core Industrial Giant",
    roles: ["Graduate Engineer Trainee", "Rubber Compounding", "R&D Technologist"],
    initials: "MRF",
  },
  {
    name: "Apollo Tyres",
    sector: "Automotive & Tyre Manufacturing",
    tag: "Global MNC",
    roles: ["Tire Engineering", "Process Development", "Quality Assurance"],
    initials: "APO",
  },
  {
    name: "CEAT",
    sector: "Tyre Solutions & Elastomers",
    tag: "Premier Recruiter",
    roles: ["Technical Services Trainee", "Materials Evaluation", "Plant Operations"],
    initials: "CEA",
  },
  {
    name: "Reliance Industries",
    sector: "Petrochemicals & Polymers",
    tag: "Fortune Global 500",
    roles: ["Petrochemical Operations", "Polymer Characterization", "Production Trainee"],
    initials: "RIL",
  },
  {
    name: "Pidilite",
    sector: "Adhesives & Specialty Chemicals",
    tag: "Market Leader",
    roles: ["Formulation Scientist", "Technical Marketing", "Polymer Synthesis"],
    initials: "PID",
  },
  {
    name: "Asian Paints",
    sector: "Coatings, Resins & Polymers",
    tag: "Chemicals & Paints",
    roles: ["Coatings Technologist", "Resin R&D", "Supply Chain & QA"],
    initials: "APL",
  },
];

// Preparation Resources Data
interface ResourceItem {
  id: string;
  title: string;
  emoji: string;
  tag: string;
  description: string;
  details: string[];
  downloadLabel: string;
}

const RESOURCES: ResourceItem[] = [
  {
    id: "interview-guides",
    title: "Interview Guides",
    emoji: "💼",
    tag: "Core & HR Mastery",
    description:
      "Comprehensive interview roadmaps covering technical polymer concepts, rubber compounding questions, and HR behavioral frameworks.",
    details: [
      "Department-curated viva & technical round questionnaires (Vulcanization kinetics, Polymer physics, Rheology, Glass transition).",
      "Behavioral and HR frameworks with STAR method responses specific to factory shopfloor and R&D roles.",
      "MRF & Apollo specialized interview round insights recorded from previous batch selections.",
      "Dos and don'ts during technical panel interviews with senior industry directors.",
    ],
    downloadLabel: "View Core Interview Blueprint",
  },
  {
    id: "past-questions",
    title: "Past Questions",
    emoji: "📝",
    tag: "Archive 2019-2025",
    description:
      "Authentic previous years' written test questions, technical screening papers, and aptitude rounds from top recruiting companies.",
    details: [
      "MRF written technical screening test papers with worked solution explanations.",
      "Apollo Tyres domain aptitude & mechanical-chemical blend question banks.",
      "Reliance Industries polymer domain technical test archives.",
      "Shortlisting criteria breakdown and past cut-off trends for core PSRT intake.",
    ],
    downloadLabel: "Browse Question Archives",
  },
  {
    id: "resume-templates",
    title: "Resume Templates",
    emoji: "📄",
    tag: "ATS-Optimized Formats",
    description:
      "ATS-compliant CV templates custom-crafted for polymer science and rubber technology undergraduates and postgraduates.",
    details: [
      "Single-page high-impact format highlighting industrial training (MRF, HLL, VSSC, Rubber Board).",
      "Standardized project description formulas: Problem statement, Polymer formulation, Mechanical testing results, Optimization metric.",
      "Available in clean Microsoft Word (.docx) and Overleaf LaTeX editable formats.",
      "Keywords dictionary tailored for Polymer, Elastomer, Plastics, and Chemical recruitment ATS scanners.",
    ],
    downloadLabel: "Download LaTeX & Word Formats",
  },
  {
    id: "aptitude-practice",
    title: "Aptitude Practice",
    emoji: "🎯",
    tag: "Curated Mock Sets",
    description:
      "Targeted modules for quantitative problem solving, logical reasoning, data interpretation, and core polymer mock assessments.",
    details: [
      "150+ topic-wise quantitative problems (Speed math, Proportions, Probability, Industrial unit conversions).",
      "Logical deduction and mechanical reasoning visual sets frequently tested in core manufacturing rounds.",
      "Timed online mock tests simulated in the standard 60-minute placement exam pattern.",
      "Detailed answer rationales and shortcut methods curated by high-scoring seniors.",
    ],
    downloadLabel: "Access Aptitude Modules",
  },
];

export default function PlacementsPage() {
  const [expandedResource, setExpandedResource] = useState<string | null>("interview-guides");
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "downloaded">("idle");
  const [pageContent, setPageContent] = useState("");
  const [structuredData, setStructuredData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content?slug=placements")
      .then(res => res.json())
      .then(data => {
        if (data.content) setPageContent(data.content);
        if (data.data) setStructuredData(data.data);
      })
      .catch(err => console.error("Failed to load content", err));
  }, []);

  const toggleResource = (id: string) => {
    setExpandedResource((prev) => (prev === id ? null : id));
  };

  const handleBrochureDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("downloading");
    setTimeout(() => {
      setDownloadState("downloaded");
      setTimeout(() => {
        setDownloadState("idle");
      }, 3500);
    }, 1200);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50/60 pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative ambient gradients for glassmorphism backdrop */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#E60000]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[28rem] h-[28rem] rounded-full bg-rose-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 left-1/4 w-[32rem] h-[32rem] rounded-full bg-red-600/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 border-l-4 border-l-[#E60000] relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-[#E60000] border border-red-100">
                  <Sparkles className="w-3.5 h-3.5 text-[#E60000]" />
                  PSRT Career & Placements
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
                  CUSAT • SFI Polymer Subcommittee
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Placements & Internships
              </h1>
              <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                Empowering PSRT students with core industrial recruitment data, verified previous
                placement records, company profiles, and structured career preparation resources.
              </p>
            </div>

            {/* Quick Action in Header */}
            <div className="flex-shrink-0 flex items-center">
              <motion.button
                onClick={handleBrochureDownload}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  downloadState === "idle"
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(230, 0, 0, 0.35)",
                          "0 0 0 10px rgba(230, 0, 0, 0)",
                          "0 0 0 0 rgba(230, 0, 0, 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#E60000] hover:bg-[#CC0000] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
              >
                {downloadState === "idle" && (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Placement Brochure</span>
                  </>
                )}
                {downloadState === "downloading" && (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Brochure...</span>
                  </>
                )}
                {downloadState === "downloaded" && (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Brochure Downloaded!</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Stats Section with 3 Animated Counters */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            Key Placement Statistics
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Stat Card 1: 85% Placement Rate */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#E60000]/40 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none group-hover:bg-[#E60000]/10 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Placement Rate
                </span>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E60000] flex items-center justify-center border border-red-100">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  <AnimatedCounter value={85} suffix="%" />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Consistent core department track record</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  High percentage of eligible candidates placed across core tyre, polymer
                  processing, and chemical conglomerates.
                </p>
              </div>
            </motion.div>

            {/* Stat Card 2: 12+ Top Recruiters */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#E60000]/40 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none group-hover:bg-[#E60000]/10 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Top Recruiters
                </span>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E60000] flex items-center justify-center border border-red-100">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  <AnimatedCounter value={12} suffix="+" />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#E60000]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Tier-1 Rubber & Polymer Leaders</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Regular hiring footprint by market-defining multinationals visiting CUSAT for
                  campus selection and tech rounds.
                </p>
              </div>
            </motion.div>

            {/* Stat Card 3: 6 LPA Average Package */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#E60000]/40 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none group-hover:bg-[#E60000]/10 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Average Package
                </span>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E60000] flex items-center justify-center border border-red-100">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  <AnimatedCounter value={6} suffix=" LPA" />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#E60000]" />
                  <span>Highest packages exceeding 10+ LPA</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Competitive remuneration for Graduate Engineer Trainees with rapid progression into
                  managerial and R&D ranks.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {pageContent && (
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
            <div className="prose prose-slate prose-red max-w-none prose-headings:font-bold prose-a:text-[#E60000]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {pageContent}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Top Recruiters Section */}
        <section aria-labelledby="recruiters-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E60000]">
                <span>Industrial Association</span>
              </div>
              <h2 id="recruiters-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
                Top Core Recruiters
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Premier organizations partnering with the Department of Polymer Science & Rubber
                Technology for graduate engineering intake.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium self-start sm:self-auto bg-slate-100 px-3 py-1 rounded-full">
              Hover to inspect roles
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(structuredData?.recruiters || RECRUITERS.map(r => r.name)).map((companyName: string) => {
              // Find matching hardcoded data to preserve styles/roles if it exists, otherwise generate basic style
              const matched = RECRUITERS.find(r => r.name === companyName);
              const company = matched || {
                name: companyName,
                sector: "Core Industry Partner",
                tag: "Recruiting Partner",
                roles: ["Engineer", "R&D", "Trainee"],
                initials: companyName.substring(0, 3).toUpperCase()
              };

              return (
                <motion.div
                  key={company.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring" as const, stiffness: 350, damping: 22 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#E60000] transition-all flex flex-col justify-between group cursor-default relative overflow-hidden"
                >
                {/* Top Accent Strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E60000] to-rose-400 opacity-80 group-hover:h-1.5 transition-all" />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    {/* Monogram Badge with Red Accent */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900 group-hover:bg-[#E60000] text-white font-black text-sm tracking-wider flex items-center justify-center shadow-sm transition-colors duration-300">
                      {company.initials}
                    </div>
                    <span className="text-[11px] font-semibold text-[#E60000] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      {company.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E60000] transition-colors flex items-center justify-between">
                    {company.name}
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#E60000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {company.sector}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Typical Hiring Profiles
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {company.roles.map((role) => (
                        <span
                          key={role}
                          className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-700 group-hover:bg-red-50/70 group-hover:text-slate-800 transition-colors"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-[#E60000]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Campus Partner
                  </span>
                  <span>PSRT Alumni Network</span>
                </div>
              </motion.div>
            ); })}
          </motion.div>
        </section>

        {/* Preparation Resources Section (Accordion Style) */}
        <section aria-labelledby="resources-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E60000]">
                <span>Student Support Archive</span>
              </div>
              <h2 id="resources-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
                Preparation Resources
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Handcrafted material, previous company assessments, and interview strategies prepared
                by the SFI Polymer Subcommittee.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium self-start sm:self-auto bg-slate-100 px-3 py-1 rounded-full">
              Click to expand details
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {RESOURCES.map((resource) => {
              const isExpanded = expandedResource === resource.id;

              return (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  className={`bg-white/80 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                    isExpanded
                      ? "border-[#E60000] ring-1 ring-[#E60000]/20 shadow-md"
                      : "border-slate-200/80 hover:border-[#E60000]/40"
                  }`}
                >
                  <button
                    onClick={() => toggleResource(resource.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Emoji Icon Container */}
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        {resource.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            {resource.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-[#E60000] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            {resource.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-1 sm:line-clamp-none">
                          {resource.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-300 flex-shrink-0 ${
                        isExpanded
                          ? "rotate-180 bg-[#E60000] text-white border-[#E60000]"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-slate-100/80 bg-slate-50/40">
                          <div className="mt-3">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                              Module Highlights & Materials Included:
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {resource.details.map((point, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-normal"
                                >
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#E60000] flex-shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FileCheck className="w-4 h-4 text-emerald-600" />
                              <span>Regularly updated by Subcommittee Academic Wing</span>
                            </div>
                            <button
                              onClick={() => alert(`Opening resource: ${resource.title}`)}
                              className="px-4 py-2 bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>{resource.downloadLabel}</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Placement Brochure Call-To-Action Banner */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-3xl overflow-hidden shadow-xl border border-red-200/50 bg-gradient-to-br from-slate-900 via-slate-900 to-[#990000] text-white p-8 sm:p-12"
        >
          {/* Decorative SFI Star Watermark */}
          <div
            className="pointer-events-none absolute -right-8 -bottom-10 text-white/5 text-[14rem] font-black select-none"
            aria-hidden="true"
          >
            ★
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-red-200 border border-white/10 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5" />
              Department Placement Cell
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Download the Official Placement Brochure
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore comprehensive batch demographics, laboratory capabilities, curriculum details,
              and recruiter guidelines for the Department of Polymer Science and Rubber Technology, CUSAT.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <motion.button
                onClick={handleBrochureDownload}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  downloadState === "idle"
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(230, 0, 0, 0.6)",
                          "0 0 0 16px rgba(230, 0, 0, 0)",
                          "0 0 0 0 rgba(230, 0, 0, 0)",
                        ],
                        scale: [1, 1.02, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E60000] hover:bg-[#CC0000] text-white font-bold text-sm shadow-lg transition-colors cursor-pointer border border-red-400/30"
              >
                {downloadState === "idle" && (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Placement Brochure</span>
                  </>
                )}
                {downloadState === "downloading" && (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Downloading PDF...</span>
                  </>
                )}
                {downloadState === "downloaded" && (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Brochure Ready (PDF)</span>
                  </>
                )}
              </motion.button>

              <div className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-[#E60000]" />
                <span>PDF Format • 2.4 MB • Updated Batch Profile</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
