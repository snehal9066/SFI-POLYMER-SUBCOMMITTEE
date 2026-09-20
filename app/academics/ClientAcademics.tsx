"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Download, FileText, X } from "lucide-react";

export type FileRecord = {
  id: string;
  filename: string;
  url: string;
  category: string;
  semester: string | null;
  subject: string | null;
  uploadedAt: Date | string;
};

interface ClientAcademicsProps {
  initialFiles: FileRecord[];
}

const SEMESTERS = [
  { label: "All", value: "" },
  { label: "S1", value: "S1" },
  { label: "S2", value: "S2" },
  { label: "S3", value: "S3" },
  { label: "S4", value: "S4" },
  { label: "S5", value: "S5" },
  { label: "S6", value: "S6" },
  { label: "S7", value: "S7" },
  { label: "S8", value: "S8" },
];

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Question Bank", value: "QUESTION_BANK" },
  { label: "Syllabus", value: "SYLLABUS" },
  { label: "Scheme", value: "SCHEME" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function ClientAcademics({ initialFiles }: ClientAcademicsProps) {
  const [semesterFilter, setSemesterFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = useMemo(() => {
    return initialFiles.filter((file) => {
      const matchesSemester = semesterFilter ? file.semester === semesterFilter : true;
      const matchesCategory = categoryFilter ? file.category === categoryFilter : true;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q
        ? (file.subject?.toLowerCase().includes(q) ||
           file.filename.toLowerCase().includes(q))
        : true;

      return matchesSemester && matchesCategory && matchesSearch;
    });
  }, [initialFiles, semesterFilter, categoryFilter, searchQuery]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "QUESTION_BANK":
        return {
          label: "Question Bank",
          badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
          dotClass: "bg-blue-500",
        };
      case "SYLLABUS":
        return {
          label: "Syllabus",
          badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dotClass: "bg-emerald-500",
        };
      case "SCHEME":
        return {
          label: "Scheme",
          badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
          dotClass: "bg-purple-500",
        };
      default:
        return {
          label: category.replace(/_/g, " "),
          badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
          dotClass: "bg-slate-500",
        };
    }
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const hasActiveFilters = Boolean(semesterFilter || categoryFilter || searchQuery.trim());

  return (
    <div className="space-y-6">
      {/* Glass-morphic Filter Bar */}
      <section className="bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search subjects or filenames..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white/90 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E60000] focus:border-[#E60000] transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Clear search"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pill Groups */}
        <div className="flex flex-col gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:w-20 shrink-0">
              Category:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = categoryFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategoryFilter(cat.value)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none ${
                      isSelected
                        ? "text-white font-semibold"
                        : "text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 rounded-full bg-[#E60000] shadow-sm"
                        transition={{ type: "spring" as const, stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Semester Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:w-20 shrink-0">
              Semester:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {SEMESTERS.map((sem) => {
                const isSelected = semesterFilter === sem.value;
                return (
                  <button
                    key={sem.value}
                    type="button"
                    onClick={() => setSemesterFilter(sem.value)}
                    className={`relative px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none ${
                      isSelected
                        ? "text-white font-semibold"
                        : "text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSemesterPill"
                        className="absolute inset-0 rounded-full bg-[#E60000] shadow-sm"
                        transition={{ type: "spring" as const, stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{sem.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results count & Clear filters indicator */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{filteredFiles.length}</strong> of{" "}
            {initialFiles.length} documents
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSemesterFilter("");
                setCategoryFilter("");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1 text-[#E60000] hover:text-[#CC0000] font-medium transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* Files Grid / Empty State */}
      <AnimatePresence mode="wait">
        {filteredFiles.length === 0 ? (
          /* Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 px-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300 shadow-sm"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="text-5xl mb-4 select-none inline-block"
            >
              📄
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-lg font-bold text-slate-800 mb-1"
            >
              No documents found
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-slate-500 max-w-sm mx-auto mb-4"
            >
              No documents match your chosen semester, category, or search query.
            </motion.p>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                type="button"
                onClick={() => {
                  setSemesterFilter("");
                  setCategoryFilter("");
                  setSearchQuery("");
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E60000] hover:text-[#CC0000] bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-full transition-colors border border-red-200"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </motion.button>
            )}
          </motion.div>
        ) : (
          /* Cards Grid with layout and staggered entrance */
          <motion.div
            key="files-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredFiles.map((file) => {
                const badge = getCategoryBadge(file.category);
                return (
                  <motion.div
                    key={file.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    whileHover={{ y: -3 }}
                    className="group relative bg-white/90 backdrop-blur rounded-xl p-5 border border-slate-200 hover:border-[#E60000] shadow-xs hover:shadow-md transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Category & Semester Badges */}
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider inline-flex items-center gap-1.5 ${badge.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                          {badge.label}
                        </span>
                        {file.semester && (
                          <span className="text-xs font-bold text-[#E60000] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                            {file.semester}
                          </span>
                        )}
                      </div>

                      {/* Subject / Filename Header */}
                      <h3
                        className="font-bold text-slate-800 group-hover:text-[#E60000] transition-colors line-clamp-2 text-base leading-snug mb-1.5"
                        title={file.subject || file.filename}
                      >
                        {file.subject || file.filename}
                      </h3>

                      {/* Filename Subtitle */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate" title={file.filename}>
                          {file.filename}
                        </span>
                      </div>

                      {/* Upload Date if available */}
                      {file.uploadedAt && (
                        <p className="text-[11px] text-slate-400">
                          Added {formatDate(file.uploadedAt)}
                        </p>
                      )}
                    </div>

                    {/* View and Download Action Buttons */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2.5">
                      <motion.a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-slate-500" />
                        <span>View</span>
                      </motion.a>
                      <motion.a
                        href={file.url}
                        download={file.filename}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#E60000] hover:bg-[#CC0000] text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors shadow-xs cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
