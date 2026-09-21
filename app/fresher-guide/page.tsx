"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AccordionItem {
  id: number;
  icon: string;
  title: string;
  shortDesc: string;
  content: {
    badge?: string;
    points: { label: string; detail: string }[];
    note?: string;
  };
}

const ACCORDION_DATA: AccordionItem[] = [
  {
    id: 1,
    icon: "🏛️",
    title: "Department Location & Layout",
    shortDesc: "PSRT near main library, labs ground floor, classrooms first floor",
    content: {
      badge: "Campus Landmark",
      points: [
        {
          label: "Prime Location",
          detail:
            "The Department of Polymer Science and Rubber Technology (PSRT) is located right behind the CUSAT Main Central Library and adjacent to the Seminar Complex.",
        },
        {
          label: "Ground Floor",
          detail:
            "Houses the state-of-the-art Polymer Processing Lab, Rubber Testing Lab, Polymer Chemistry Lab, Characterization Facilities, Department Workshop, and the Administrative Office.",
        },
        {
          label: "First Floor",
          detail:
            "Features B.Tech and M.Tech lecture halls, Smart Seminar Hall, Departmental Reference Library, and Faculty Cabins.",
        },
        {
          label: "Research Annexe",
          detail:
            "Accommodates advanced instrumentation including FTIR, DSC, TGA, Universal Testing Machines (UTM), and research scholar cubicles.",
        },
      ],
      note: "Tip: If arriving from Kalamassery Metro Station or CUSAT main gate, take the central avenue road leading towards the university library.",
    },
  },
  {
    id: 2,
    icon: "📖",
    title: "Academic Structure & Evaluation",
    shortDesc: "8 semester system, 75% attendance, internal marks important",
    content: {
      badge: "Academics 101",
      points: [
        {
          label: "8-Semester Curriculum",
          detail:
            "The B.Tech program is structured over 4 years (8 semesters), combining foundational engineering, organic & polymer chemistry, rubber compounding, mold design, and nanocomposites.",
        },
        {
          label: "75% Mandatory Attendance",
          detail:
            "Strictly enforced by university regulations across both theory classes and laboratory sessions. Maintaining high attendance ensures exam eligibility and avoids condonation hurdles.",
        },
        {
          label: "Internal Assessment Matters",
          detail:
            "Continuous internal evaluation (two series tests, assignments, seminar presentations, and day-to-day lab performance) forms up to 40-50% of the aggregate grade.",
        },
        {
          label: "Lab Records & Vivas",
          detail:
            "Get your rough lab observations verified and fair records signed every week without delay; lab viva marks directly influence your GPA.",
        },
      ],
      note: "Explore our Academics tab for downloadable previous year question banks and complete syllabus schemes.",
    },
  },
  {
    id: 3,
    icon: "✊",
    title: "SFI Unit - Your Support System",
    shortDesc: "Committee helps with resources, grievances, events",
    content: {
      badge: "Student Solidarity",
      points: [
        {
          label: "Resource Distribution",
          detail:
            "SFI Polymer Subcommittee curates and distributes previous year question papers, handwritten lecture summaries, lab manuals, and exam guides free of charge.",
        },
        {
          label: "Grievance Redressal",
          detail:
            "We stand shoulder-to-shoulder with every student. Whether you encounter issues with hostel allotment, fee waivers, academic grievances, or bus concessions, we are here to support you.",
        },
        {
          label: "Department & Campus Events",
          detail:
            "From Freshers' Welcome and technical workshops to cultural fests, sports tournaments, and thought-provoking discussions, the committee keeps campus life vibrant and inclusive.",
        },
        {
          label: "Anti-Ragging Support",
          detail:
            "CUSAT maintains a zero-tolerance policy towards ragging. SFI committee members are accessible 24/7 to ensure a safe, dignified, and welcoming environment for all freshers.",
        },
      ],
      note: "Never hesitate to reach out to any SFI comrade on campus. Independence, Democracy, and Socialism.",
    },
  },
  {
    id: 4,
    icon: "🍽️",
    title: "Campus Facilities & Amenities",
    shortDesc: "Canteen, library, sports, hostel info",
    content: {
      badge: "Campus Life",
      points: [
        {
          label: "Canteens & Food Courts",
          detail:
            "The PSRT departmental cafeteria and CUSAT Central Canteen offer hygienic, pocket-friendly Kerala breakfast, lunch meals, tea, and quick snacks.",
        },
        {
          label: "University Central Library",
          detail:
            "A magnificent multi-storey repository of engineering books, scientific journals, air-conditioned reading halls, and 24/7 digital access to research papers.",
        },
        {
          label: "Sports & Fitness",
          detail:
            "Features the university athletic stadium, indoor badminton courts, gymnasium, basketball courts, and inter-department sports leagues.",
        },
        {
          label: "Hostels & Accommodation",
          detail:
            "University hostels for boys and girls provide economical mess and accommodation inside campus. Vetted private hostels and paying guest options are also available nearby.",
        },
      ],
      note: "Student amenity centre houses stationery shops, DTP/photocopy centers, bank branches, and ATM booths within walking distance.",
    },
  },
  {
    id: 5,
    icon: "📱",
    title: "Important Contacts & Helpdesk",
    shortDesc: "Department office, HOD, SFI committee",
    content: {
      badge: "Quick Directory",
      points: [
        {
          label: "Department Office",
          detail:
            "PSRT Administrative Wing, Ground Floor. Handles enrollment, certificates, ID verification, and circulars. Phone: 0484-2575723 | Email: psrt@cusat.ac.in",
        },
        {
          label: "Head of the Department (HOD)",
          detail:
            "Available for academic approvals, mentoring, and official consultations during office hours (Mon-Fri, 10:00 AM - 4:00 PM).",
        },
        {
          label: "SFI Polymer Subcommittee Convener",
          detail:
            "Direct student helpdesk for academic resources, notes, and general assistance. Available 24/7 for fresher orientation and campus navigation.",
        },
        {
          label: "Anti-Ragging Squad & Security",
          detail:
            "CUSAT Round-the-Clock Security Control Room: 0484-2575396. Dedicated student counselors and faculty grievance cell.",
        },
      ],
      note: "Save these key phone numbers and emails on your phone during your first week on campus.",
    },
  },
];

const INITIAL_CHECKLIST = [
  { id: 1, title: "Get your ID card", desc: "Issued by the university office; vital for library access, bus concessions, and semester exams." },
  { id: 2, title: "Join department WhatsApp", desc: "Connect with your batchmates and official SFI channel for timely circulars, notes, and updates." },
  { id: 3, title: "Collect syllabus", desc: "Download the 8-semester course scheme and subject breakdown from our Academics section." },
  { id: 4, title: "Meet your seniors", desc: "Get practical advice on subjects, lab records, professors, and future placement opportunities." },
  { id: 5, title: "Explore the campus", desc: "Visit the PSRT labs, CUSAT central library, student amenity centre, and sports ground." },
];

const PRO_TIPS = [
  {
    icon: "💡",
    tag: "High Yield",
    title: "Master the Lab Routine Early",
    text: "Polymer practicals and vivas carry high weightage. Complete your rough records on the same day and secure faculty signatures promptly. Don't let lab backlogs snowball.",
  },
  {
    icon: "📚",
    tag: "Exam Strategy",
    title: "Question Banks are Your Goldmine",
    text: "CUSAT semester exams regularly repeat conceptual question patterns. Check our Academics page for previous 5-year question papers before every series exam.",
  },
  {
    icon: "🤝",
    tag: "Networking",
    title: "Bond Across Batches",
    text: "PSRT is a tight-knit department. Senior comrades can share handwritten notes, project ideas, placement insights, and guidance for gate/higher studies.",
  },
  {
    icon: "🚌",
    tag: "Savings",
    title: "Grab Bus Concessions Early",
    text: "Submit your student travel concession forms to the department office in your first month to travel on KSRTC and private buses at student rates.",
  },
  {
    icon: "💻",
    tag: "Skills",
    title: "Learn Industry Software",
    text: "Pick up basics of CAD/AutoCAD, Python, or mold design packages during semester breaks. Polymer & rubber industries actively reward design software proficiency.",
  },
  {
    icon: "⭐",
    tag: "Holistic",
    title: "Balance Academics & Activism",
    text: "Engage in department technical events, sports, and student council activities. Active campus involvement builds leadership, public speaking, and teamwork.",
  },
];

export default function FresherGuidePage() {
  const [openSections, setOpenSections] = useState<number[]>([1]); // First section open by default
  const [checkedItems, setCheckedItems] = useState<number[]>([1]); // First item checked by default
  const [pageContent, setPageContent] = useState("");
  const [structuredData, setStructuredData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content?slug=fresher-guide")
      .then(res => res.json())
      .then(data => {
        if (data.content) setPageContent(data.content);
        if (data.data) setStructuredData(data.data);
      })
      .catch(err => console.error("Failed to load content", err));
  }, []);

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleChecklist = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const checklistData = structuredData?.checklist || INITIAL_CHECKLIST;
  const accordionData = structuredData?.accordion || ACCORDION_DATA;
  const tipsData = structuredData?.tips || PRO_TIPS;

  const toggleAllAccordions = () => {
    if (openSections.length === accordionData.length) {
      setOpenSections([]);
    } else {
      setOpenSections(accordionData.map((item: any) => item.id));
    }
  };

  const progressPercentage = Math.round(
    (checkedItems.length / checklistData.length) * 100
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Welcome Banner with Animated Gradient & Waving Hand */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E60000] via-[#CC0000] to-[#990000] text-white py-20 px-6 shadow-inner">
        {/* Decorative background glow spheres */}
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white text-[#E60000] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase shadow-md"
          >
            <span>★ SFI Polymer Subcommittee</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]"></span>
            <span>Batch 2024-2028 Handbook</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm flex items-center justify-center gap-3 flex-wrap"
          >
            <span>Welcome to PSRT!</span>
            <motion.span
              className="inline-block origin-[70%_70%] cursor-default text-4xl md:text-6xl"
              animate={{
                rotate: [0, 18, -12, 18, -6, 14, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
              aria-label="Waving hand"
            >
              👋
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-red-100 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Your ultimate companion for surviving and excelling in the Department
            of Polymer Science &amp; Rubber Technology, CUSAT.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <a
              href="#survival-checklist"
              className="px-6 py-3 bg-white text-[#E60000] hover:bg-red-50 font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              ✓ Survival Checklist
            </a>
            <a
              href="#faq-guide"
              className="px-6 py-3 bg-[#990000] text-white hover:bg-[#800000] border border-red-300/30 font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              📖 Essential Guide
            </a>
            <a
              href="#pro-tips"
              className="px-6 py-3 bg-black/20 hover:bg-black/30 backdrop-blur-xs text-white border border-white/20 font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              💡 Senior Pro Tips
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 mt-12 space-y-16">
        {pageContent && (
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
            <div className="prose prose-slate prose-red max-w-none prose-headings:font-bold prose-a:text-[#E60000]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {pageContent}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Survival Checklist Section */}
        <section
          id="survival-checklist"
          className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-block bg-red-50 text-[#E60000] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                Step-by-step Onboarding
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Fresher Survival Checklist
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Tick off these key tasks during your first few weeks at PSRT.
              </p>
            </div>

            {/* Progress Badge */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl min-w-[200px]">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-600">Completion Status</span>
                <span className="text-[#E60000]">
                  {checkedItems.length} of {checklistData.length} ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E60000] to-[#CC0000] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              {checkedItems.length === checklistData.length && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs font-bold text-emerald-600 mt-2 text-center"
                >
                  🎉 All set! You're ready to conquer CUSAT!
                </motion.p>
              )}
            </div>
          </div>

          {/* Staggered Checklist */}
          <motion.div
            className="mt-6 space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.15,
                },
              },
            }}
          >
            {checklistData.map((item, index) => {
              const isChecked = checkedItems.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, ease: "easeOut" },
                    },
                  }}
                  onClick={() => toggleChecklist(item.id)}
                  className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                    isChecked
                      ? "bg-red-50/40 border-red-200 shadow-xs"
                      : "bg-white border-slate-200 hover:border-red-200 hover:bg-slate-50/60"
                  }`}
                >
                  {/* Animated Checkbox Icon */}
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className={`mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isChecked
                        ? "bg-[#E60000] text-white shadow-sm"
                        : "bg-slate-100 border border-slate-300 text-transparent group-hover:border-[#E60000]/40"
                    }`}
                  >
                    {isChecked ? (
                      <motion.svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.path
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      </motion.svg>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">
                        {index + 1}
                      </span>
                    )}
                  </motion.div>

                  <div className="flex-1">
                    <h3
                      className={`text-base font-bold transition-colors ${
                        isChecked
                          ? "text-slate-500 line-through decoration-red-400/70"
                          : "text-slate-800 group-hover:text-[#E60000]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm mt-0.5 leading-relaxed transition-colors ${
                        isChecked ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all shrink-0 ${
                      isChecked
                        ? "bg-red-100 text-[#E60000]"
                        : "bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-[#E60000]"
                    }`}
                  >
                    {isChecked ? "Done" : "Tap to complete"}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Interactive FAQ / Accordion Section */}
        <section id="faq-guide" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-block bg-red-50 text-[#E60000] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                Essential Department Knowledge
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Department Guide &amp; FAQs
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Everything you need to know about PSRT, academics, facilities, and student life.
              </p>
            </div>

            <button
              onClick={toggleAllAccordions}
              className="text-xs font-bold text-[#E60000] hover:text-[#CC0000] bg-white hover:bg-red-50 px-4 py-2 rounded-xl border border-red-200 transition-colors shadow-xs w-fit cursor-pointer"
            >
              {openSections.length === accordionData.length
                ? "Collapse All"
                : "Expand All"}
            </button>
          </div>

          <div className="space-y-4">
            {accordionData.map((item) => {
              const isOpen = openSections.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                    isOpen
                      ? "border-[#E60000]/40 ring-2 ring-red-100 shadow-md"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 focus:outline-hidden group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                          isOpen
                            ? "bg-[#E60000] text-white shadow-md scale-105"
                            : "bg-red-50 text-[#E60000] group-hover:bg-red-100"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <h3
                          className={`text-lg md:text-xl font-bold transition-colors ${
                            isOpen
                              ? "text-[#E60000]"
                              : "text-slate-800 group-hover:text-[#E60000]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-500 mt-0.5 line-clamp-1">
                          {item.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Animated Chevron Indicator */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-red-100 text-[#E60000]"
                          : "bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-[#E60000]"
                      }`}
                    >
                      <motion.svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </div>
                  </button>

                  {/* Smooth Accordion Body with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] as const },
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 pt-2 border-t border-red-100/60 bg-gradient-to-b from-red-50/20 to-transparent">
                          {item.content.badge && (
                            <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-[#E60000] bg-red-100/70 px-2.5 py-0.5 rounded-full mb-3">
                              {item.content.badge}
                            </span>
                          )}

                          <div className="grid md:grid-cols-2 gap-4 mt-2">
                            {item.content.points.map((pt, idx) => (
                              <div
                                key={idx}
                                className="bg-white/80 p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-200 transition-colors"
                              >
                                <span className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]"></span>
                                  {pt.label}
                                </span>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                  {pt.detail}
                                </p>
                              </div>
                            ))}
                          </div>

                          {item.content.note && (
                            <div className="mt-4 p-3.5 bg-red-50 rounded-xl border border-red-200/80 text-xs text-[#990000] font-medium flex items-center gap-2">
                              <span className="text-base">📌</span>
                              <span>{item.content.note}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pro Tips Section with Highlighted Cards */}
        <section id="pro-tips" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-block bg-red-50 text-[#E60000] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Advice from Senior Comrades
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Senior Pro Tips &amp; Insights
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Field-tested advice to help you ace your tests, secure top grades, and make the most of campus life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipsData.map((tip, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#E60000] group-hover:text-white">
                      {tip.icon}
                    </div>
                    <span className="text-[11px] font-bold text-[#E60000] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      {tip.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#E60000] transition-colors mb-2">
                    {tip.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {tip.text}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#E60000] font-semibold transition-colors">
                  <span>Pro Tip #{idx + 1}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Help & Direct Navigation Banner */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-block bg-[#E60000] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Need Study Material?
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Access Syllabi &amp; Question Banks
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Explore our curated repository of previous year university question papers, semester scheme documents, and lecture references.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/academics"
              className="px-6 py-3 bg-[#E60000] hover:bg-[#CC0000] text-white font-bold rounded-xl shadow-md transition-all text-center text-sm md:text-base hover:scale-105"
            >
              Browse Academics
            </Link>
            <Link
              href="/notifications"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-center text-sm md:text-base hover:scale-105"
            >
              Latest Circulars
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
