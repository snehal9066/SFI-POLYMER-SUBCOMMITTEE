"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  GraduationCap,
  Microscope,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Clock,
  Layers,
  School,
  FileText,
  Compass,
  HelpCircle,
} from "lucide-react";

export default function HigherStudiesPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [pageContent, setPageContent] = useState("");
  const [structuredData, setStructuredData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content?slug=higher-studies")
      .then(res => res.json())
      .then(data => {
        if (data.content) setPageContent(data.content);
        if (data.data) setStructuredData(data.data);
      })
      .catch(err => console.error("Failed to load content", err));
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const MTECH = [
    "Polymer Processing & Tool/Mould Engineering",
    "Rubber Compounding & Tyre Manufacturing Technology",
    "Advanced Polymer Nanocomposites & Hybrid Blends",
    "Polymer Rheology, Viscoelasticity & Morphology",
    "Sustainable Bioplastics & Polymer Circularity",
    "Surface Coatings, Adhesives & Specialty Sealants",
  ];

  const PHD = [
    { name: "Nanocomposites & Carbon Nanotubes", code: "NC-01" },
    { name: "Smart & Stimuli-Responsive Polymers", code: "SP-02" },
    { name: "Rubber Technology & Green Elastomers", code: "RT-03" },
    { name: "Biomaterials & Tissue Scaffolds", code: "BM-04" },
    { name: "Conductive Polymers & Energy Storage", code: "CP-05" },
    { name: "Polymer Recycling & Upcycling", code: "PR-06" },
    { name: "Hydrogels & Targeted Drug Delivery", code: "HG-07" },
    { name: "Aerospace Composites & High-Temp Resins", code: "AC-08" },
  ];

  const SCHOLARSHIPS = [
    {
      emoji: "🏆",
      title: "CSIR-UGC NET JRF",
      badge: "National Fellowship",
      stipend: "₹37,000 / mo + HRA",
      tenure: "5 Years (JRF to SRF)",
      description:
        "Premier national fellowship awarded through the Joint CSIR-UGC NET Chemical Sciences / Physical Sciences exam. Eligible for Ph.D. scholars in central universities and institutes with an additional ₹20,000 annual contingency grant.",
      criteria: "Qualified CSIR-NET (JRF) in Chemical Sciences",
    },
    {
      emoji: "⚡",
      title: "GATE PG & Doctoral Stipend",
      badge: "MoE / AICTE Approved",
      stipend: "₹12,400 / mo (M.Tech) | ₹37,000 / mo (Ph.D.)",
      tenure: "24 Months (M.Tech) | 5 Years (Ph.D.)",
      description:
        "Funded by the Ministry of Education (MoE) for all candidates securing admission through a valid GATE score in XE (Engineering Sciences), CY (Chemistry), or CH (Chemical Engineering). Direct Ph.D. pathways also available.",
      criteria: "Valid GATE Score in XE, CY, or CH discipline",
    },
    {
      emoji: "🏛️",
      title: "Institutional & Project Grants",
      badge: "CUSAT URF & Industry",
      stipend: "₹25,000 - ₹40,000 / mo",
      tenure: "Project Tenure / 3-4 Years",
      description:
        "University Research Fellowships (CUSAT URF) and funded research grants under DST-SERB, DRDO, CSIR, and tyre industry partners (MRF, Apollo, CEAT, Reliance) for departmental research scholars.",
      criteria: "CUSAT DAT rank or interview-based project appointment",
    },
  ];

  const EXAMTIPS = [
    {
      title: "GATE Strategy: Choosing XE vs CY Discipline",
      summary:
        "Understand whether Engineering Sciences (XE) or Chemistry (CY) aligns best with your strengths and dream institutions.",
      details: [
        "GATE XE is widely considered the highest-yield stream for Polymer students. You can choose XE-A (Engineering Mathematics - mandatory 15 marks) + XE-F (Polymer Science & Engineering - 35 marks) + XE-D (Materials Science - 35 marks) or XE-C (Thermodynamics).",
        "Recommended Literature: 'Textbook of Polymer Science' by F.W. Billmeyer, 'Polymer Science' by V.R. Gowariker, and 'Rubber Technology' by Maurice Morton.",
        "Solve the last 10 years of GATE XE-F and XE-D papers to identify high-weightage questions on glass transition temperature (Tg), molecular weight distribution, and kinetics of step/chain polymerization.",
      ],
    },
    {
      title: "CUSAT DAT (Department Admission Test) Preparation",
      summary:
        "Comprehensive roadmap for acing the department-level entrance exam for M.Tech & Ph.D.",
      details: [
        "The CUSAT DAT tests core undergraduate polymer chemistry, polymer physics, compounding, and basic chemical engineering fundamentals.",
        "Focus on: Rubber vulcanization systems, compounding ingredients, injection molding cycles, extrusion defect troubleshooting, and polymer testing standards (ASTM/ISO).",
        "Refer to previous DAT question papers archived in the SFI Academics Question Bank section of this portal.",
      ],
    },
    {
      title: "Ph.D. Proposal & Research Interview Mastery",
      summary:
        "How to prepare an impactful synopsis and excel before the doctoral interview board.",
      details: [
        "Formulate a concise 2-3 page research synopsis demonstrating clarity in problem statement, state-of-the-art literature review, and proposed characterization techniques.",
        "Be thoroughly prepared to explain your B.Tech or M.Tech final year project, including synthesis pathways, instrumentation used (FTIR, DSC, TGA, Universal Testing Machine), and industrial significance.",
        "Familiarize yourself with ongoing faculty research themes at PSRT to pitch aligned doctoral proposals.",
      ],
    },
    {
      title: "Higher Studies Abroad (MS / Ph.D. in Germany, US, Japan)",
      summary:
        "Global universities renowned for polymer science and required prerequisites.",
      details: [
        "Top global hubs: University of Akron (USA), University of Massachusetts Amherst (USA), Max Planck Institute for Polymer Research (Germany), ESPCI Paris (France), and Kyushu University (Japan).",
        "Prerequisites: GRE (selected US universities), TOEFL/IELTS with band 7.0+, strong statement of purpose, and 2-3 academic recommendation letters.",
        "Look out for fully-funded fellowships such as DAAD (Germany), Erasmus Mundus (Europe), and Monbukagakusho MEXT (Japan).",
      ],
    },
    {
      title: "Balancing B.Tech Academics with Entrance Preparation",
      summary:
        "Actionable timeline for 3rd and 4th-year PSRT students to stay ahead without burnout.",
      details: [
        "Semester 5 & 6: Finish foundational concepts in Polymer Chemistry and Processing; start practicing basic engineering mathematics.",
        "Semester 7: Intensive GATE syllabus completion by November; dedicate December and January entirely to full-length test series and previous year papers.",
        "Form peer study groups through the SFI Polymer Subcommittee academic wing for weekly mock discussions and question-solving sessions.",
      ],
    },
  ];

  const roadmapSteps = [
    {
      stage: "B.Tech",
      role: "Undergraduate Core",
      duration: "4 Years (8 Semesters)",
      institution: "PSRT CUSAT",
      description:
        "Strong foundation in polymer synthesis, chemical thermodynamics, processing operations, and final capstone project.",
      milestone: "Gateway: GATE (XE/CY/CH) / DAT",
      accent: "border-slate-300",
      pillBg: "bg-slate-100 text-slate-800",
    },
    {
      stage: "M.Tech",
      role: "Advanced Specialization",
      duration: "2 Years (4 Semesters)",
      institution: "CUSAT / IITs / NITs",
      description:
        "In-depth research on polymer blends, tyre compounding, rheological simulation, and 1-year master's dissertation.",
      milestone: "Gateway: CSIR-NET JRF / GATE Ph.D.",
      accent: "border-[#E60000]",
      pillBg: "bg-red-50 text-[#E60000]",
    },
    {
      stage: "Ph.D.",
      role: "Doctoral Innovation",
      duration: "3 - 5 Years",
      institution: "National & Global R&D Labs",
      description:
        "High-impact publications, patents, novel biomaterials, smart elastomeric devices, and academic or corporate R&D leadership.",
      milestone: "Gateway: Post-Doc / Chief Scientist",
      accent: "border-[#990000]",
      pillBg: "bg-red-900/10 text-[#990000]",
    },
  ];

  const mtechSpecializations = structuredData?.mtech || MTECH;
  const phdFocusAreas = structuredData?.phd || PHD;
  const scholarshipList = structuredData?.scholarships || SCHOLARSHIPS;
  const examTips = structuredData?.tips || EXAMTIPS;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/90 border-l-4 border-l-[#E60000] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-[#E60000] border border-red-100">
              <Sparkles className="w-3.5 h-3.5" />
              SFI Academic & Research Guidance
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              Department of PSRT, CUSAT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Higher Studies & Research Pathways
          </h1>
          <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-3xl leading-relaxed">
            Essential roadmap, eligibility criteria, entrance syllabi, and fellowship opportunities
            for students aspiring to pursue M.Tech, Ph.D., and international research in Polymer Science and Rubber Technology.
          </p>

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#E60000]" />
              <span>M.Tech & Ph.D. Admissions</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E60000]" />
              <span>Full-Time GATE & CSIR-NET Fellowships</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#E60000]" />
              <span>Global Research Scope</span>
            </div>
          </div>
        </motion.header>

        {/* Visual Roadmap / Timeline Section */}
        <section className="space-y-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
              <Layers className="w-3.5 h-3.5 text-[#E60000]" />
              Progressive Career Path
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Academic Progression Roadmap
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              From undergraduate fundamentals to doctoral innovations in polymer science.
            </p>
          </div>

          {/* Timeline Visual Container */}
          <div className="relative bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Desktop Connecting Line with Gradient */}
            <div className="hidden lg:block absolute top-[5.25rem] left-[15%] right-[15%] h-1 bg-gradient-to-r from-slate-200 via-[#E60000] to-[#990000] -z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {roadmapSteps.map((step, idx) => (
                <motion.div
                  key={step.stage}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col h-full bg-slate-50/90 rounded-xl p-5 border border-slate-200/90 hover:border-red-200 hover:shadow-md transition-all duration-300 relative group"
                >
                  {/* Step Header with Node Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Animated Node Dot */}
                      <div className="relative flex items-center justify-center">
                        <motion.span
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: idx * 0.4,
                          }}
                          className="absolute w-5 h-5 rounded-full bg-[#E60000]/30"
                        />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#E60000] ring-4 ring-white shadow-sm" />
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${step.pillBg}`}>
                        Step 0{idx + 1}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {step.duration}
                    </span>
                  </div>

                  {/* Step Title */}
                  <div className="mb-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      {step.stage}
                      <span className="text-xs font-semibold text-slate-500 font-normal">
                        ({step.role})
                      </span>
                    </h3>
                    <p className="text-xs font-semibold text-[#E60000] mt-0.5 flex items-center gap-1">
                      <School className="w-3.5 h-3.5" />
                      {step.institution}
                    </p>
                  </div>

                  {/* Step Body */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                    {step.description}
                  </p>

                  {/* Milestone Badge */}
                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-medium text-slate-700">
                    <span className="text-slate-800 font-semibold">{step.milestone}</span>
                    {idx < 2 && (
                      <ArrowRight className="w-4 h-4 text-[#E60000] transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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

        {/* Two Main Sections: M.Tech Programs & Ph.D. Research Cards */}
        <section className="space-y-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-[#E60000] mb-2 border border-red-100">
              <BookOpen className="w-3.5 h-3.5" />
              Degree Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Postgraduate & Doctoral Programs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Curated department specs, admission criteria, and modern polymer research domains.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Card 1: M.Tech Programs Card (Glass effect bg) */}
            <motion.div
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E60000]" />

              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E60000] shadow-sm">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        M.Tech in Polymer Technology
                      </h3>
                      <p className="text-xs text-[#E60000] font-semibold uppercase tracking-wider">
                        Master of Technology • 2 Years Full-Time
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  The M.Tech program at the Department of Polymer Science and Rubber Technology (PSRT),
                  CUSAT, equips engineers and scientists with state-of-the-art expertise in polymer processing,
                  product engineering, mould design, and advanced elastomeric compounding.
                </p>

                {/* Eligibility & Entrance Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Eligibility
                    </span>
                    <p className="text-slate-600 leading-normal">
                      B.Tech / B.E. in Polymer, Chemical, Mechanical, Materials, or M.Sc. Chemistry with min 60% marks.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Entrance Route
                    </span>
                    <p className="text-slate-600 leading-normal">
                      Valid <strong className="text-[#E60000]">GATE score</strong> (XE / CY / CH) or qualifying the{" "}
                      <strong className="text-slate-800">CUSAT DAT</strong> (Department Admission Test).
                    </p>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="font-bold text-slate-700">Financial Assistance:</span>
                    <span className="font-semibold text-[#E60000]">
                      ₹12,400/month AICTE PG GATE Scholarship
                    </span>
                  </div>
                </div>

                {/* Specializations List with animated items */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E60000]" />
                    Key Specializations & Course Modules
                  </h4>
                  <motion.ul
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    {mtechSpecializations.map((spec: any, index: number) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-2 p-2 rounded-lg bg-white border border-slate-100 shadow-2xs hover:border-red-200 hover:bg-red-50/30 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                        <span className="leading-snug">{spec}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">
                  Comprehensive 1-year industrial dissertation in Year 2
                </span>
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-1.5 text-[#E60000] hover:text-[#CC0000] font-bold transition-colors"
                >
                  View Syllabus & Schemes
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Ph.D. Research Card (Glass effect bg & Animated tags/chips) */}
            <motion.div
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E60000] to-[#990000]" />

              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E60000] shadow-sm">
                      <Microscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        Ph.D. Research Programs
                      </h3>
                      <p className="text-xs text-[#E60000] font-semibold uppercase tracking-wider">
                        Doctor of Philosophy • Doctoral Research Wing
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  PSRT CUSAT is recognized as an international pioneer in polymer research.
                  Equipped with premier instrumentation including FTIR, DSC, TGA, DMA, Rheometers,
                  and Rubber Process Analyzers (RPA), scholars publish in top Q1 Elsevier, ACS, and RSC journals.
                </p>

                {/* Animated Tags / Chips with Red Accent */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#E60000]" />
                      Core Research Focus Areas
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">Clickable domains</span>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap gap-2"
                  >
                    {phdFocusAreas.map((area: any, index: number) => (
                      <motion.span
                        key={index}
                        variants={tagVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-default inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200 hover:border-[#E60000] hover:bg-red-50/60 hover:text-[#E60000] transition-all duration-200 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" />
                        {area.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Admission & Laboratory Highlights */}
                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                    <p>
                      <strong>Admission Routes:</strong> Direct entrance through CSIR-UGC NET (JRF/LS),
                      valid GATE score, or CUSAT DAT followed by research presentation & interview.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                    <p>
                      <strong>Fellowship Coverage:</strong> Eligible scholars receive CSIR-JRF, GATE fellowship,
                      or University Research Fellowships (URF) with contingency grants.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E60000] shrink-0 mt-0.5" />
                    <p>
                      <strong>Collaborations:</strong> Active joint projects with IIT Madras, IISc Bangalore,
                      Rubber Research Institute of India (RRII), and tyre conglomerates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">
                  Full-time and Part-time (Industry Sponsored) slots available
                </span>
                <a
                  href="#fellowships"
                  className="inline-flex items-center gap-1.5 text-[#E60000] hover:text-[#CC0000] font-bold transition-colors"
                >
                  Explore Fellowships
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Scholarship & Fellowship Section: Grid of 3 Cards */}
        <section id="fellowships" className="space-y-6 scroll-mt-24">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-[#E60000] mb-2 border border-red-100">
              <Award className="w-3.5 h-3.5" />
              Financial Support
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Scholarships & Research Fellowships
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              National and institutional funding opportunities available for Master's and Doctoral candidates.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {scholarshipList.map((item: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#E60000]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon Emoji & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-[#E60000] border border-red-100">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E60000] transition-colors">
                    {item.title}
                  </h3>

                  {/* Stipend Highlight */}
                  <div className="mt-3 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-semibold block">
                      Estimated Financial Aid
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {item.stipend}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      Tenure: {item.tenure}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Criteria Footer */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Primary Eligibility
                  </span>
                  <p className="text-xs font-semibold text-slate-700">
                    {item.criteria}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Tips Section with Accordion-style Items for Exam Preparation */}
        <section className="space-y-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-[#E60000]" />
              Strategic Advisory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Exam Preparation & Guidance Playbook
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Actionable advice compiled by SFI Polymer Subcommittee alumni for GATE, DAT, and Ph.D. interviews.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-3"
          >
            {examTips.map((tip: any, index: number) => {
              const isOpen = openAccordion === index;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-colors hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E60000]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                          isOpen
                            ? "bg-[#E60000] text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                        }`}
                      >
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                          {tip.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                          {tip.summary}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-red-50 text-[#E60000]" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/60"
                      >
                        <div className="p-5 sm:p-6 space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                          {tip.details.map((point: any, pIdx: number) => (
                            <div key={pIdx} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E60000] mt-2 shrink-0" />
                              <p>{point}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* SFI Support & Mentorship CTA Banner */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E60000]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E60000] text-white shadow-sm">
              ★ SFI Student Support Wing
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need One-on-One Mentorship for GATE or Ph.D. Applications?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The SFI Polymer Subcommittee connects current students with PSRT alumni pursuing Masters
              and Ph.D. programs across top IITs, IISc, European universities, and the US. Access curated
              notes, previous DAT papers, and mock interview panels.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/academics"
                className="px-5 py-2.5 rounded-xl bg-[#E60000] hover:bg-[#CC0000] text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Access Academics Question Bank
              </Link>
              <Link
                href="/notifications"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Latest Department Notifications
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
