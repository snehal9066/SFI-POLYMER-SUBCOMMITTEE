"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Clock,
  Filter,
  Megaphone,
  BookOpen,
  Building2,
  CalendarDays,
  Info,
  Inbox,
} from "lucide-react";

type NotificationType = "SFI" | "EXAM" | "DEPARTMENT" | "EVENT" | "GENERAL";

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  postedAt: string;
}

const sampleNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "SFI Freshers Welcome & Department Orientation 2026",
    content:
      "Join us for the annual orientation program and interactive session organized by the SFI Polymer Subcommittee at the department seminar hall. Meet seniors, faculty members, and discover academic and career support initiatives.",
    type: "SFI",
    postedAt: "2 hours ago",
  },
  {
    id: "notif-2",
    title: "S7 B.Tech Polymer Tech Examination Timetable Published",
    content:
      "The official examination schedule for Seventh Semester B.Tech Polymer Science & Rubber Technology regular and supplementary examinations has been published on the CUSAT exam portal. Hall tickets are available for download.",
    type: "EXAM",
    postedAt: "Yesterday",
  },
  {
    id: "notif-3",
    title: "Polymer Processing & Testing Lab Schedule Update",
    content:
      "Due to routine calibration of the Universal Testing Machine (UTM) and Brabender Plasticorder, laboratory sessions for batches S5 & S7 are rescheduled to this coming Thursday. Please review revised lab rosters.",
    type: "DEPARTMENT",
    postedAt: "3 days ago",
  },
  {
    id: "notif-4",
    title: "Annual National Polymer Symposium: 'PolyVision 2026'",
    content:
      "Registrations and student paper submissions are now open for PolyVision 2026. Keynote sessions will be conducted by senior polymer scientists from VSSC-ISRO and leading tyre manufacturing research teams.",
    type: "EVENT",
    postedAt: "5 days ago",
  },
  {
    id: "notif-5",
    title: "Central Library Semester Book Issue & Renewal Deadline",
    content:
      "All students holding semester reference books from the departmental or central library must renew or return their copies by Friday. For book-bank assistance, connect with your SFI batch representative.",
    type: "GENERAL",
    postedAt: "1 week ago",
  },
];

const typeConfig: Record<
  NotificationType,
  {
    borderClass: string;
    badgeClass: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }
> = {
  SFI: {
    borderClass: "border-l-[#E60000]",
    badgeClass: "bg-red-50 text-[#E60000] border-red-200",
    icon: Megaphone,
    label: "SFI",
  },
  EXAM: {
    borderClass: "border-l-blue-600",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    icon: BookOpen,
    label: "EXAM",
  },
  DEPARTMENT: {
    borderClass: "border-l-green-600",
    badgeClass: "bg-green-50 text-green-700 border-green-200",
    icon: Building2,
    label: "DEPARTMENT",
  },
  EVENT: {
    borderClass: "border-l-purple-600",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    icon: CalendarDays,
    label: "EVENT",
  },
  GENERAL: {
    borderClass: "border-l-gray-500",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
    icon: Info,
    label: "GENERAL",
  },
};

const filterTabs = [
  { label: "All", value: "ALL" },
  { label: "SFI", value: "SFI" },
  { label: "Exam", value: "EXAM" },
  { label: "Department", value: "DEPARTMENT" },
  { label: "Event", value: "EVENT" },
  { label: "General", value: "GENERAL" },
];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredNotifications = sampleNotifications.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.type === activeFilter;
  });

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Animated Page Header with border-l-4 border-[#E60000], fade-in from left */}
        <motion.header
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-[#E60000]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E60000] flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Notifications
            </h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Stay informed with the latest official announcements, examination updates, departmental notices, and student initiatives from the SFI Polymer Subcommittee, PSRT CUSAT.
          </p>
        </motion.header>

        {/* Filter Tabs as pill buttons with active state in red */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter</span>
          </div>
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            const count =
              tab.value === "ALL"
                ? sampleNotifications.length
                : sampleNotifications.filter((n) => n.type === tab.value).length;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#E60000] text-white shadow-md shadow-red-500/20 hover:bg-[#CC0000]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notifications List with Staggered Animations */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item, index) => {
                const config = typeConfig[item.type];
                const IconComponent = config.icon;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.012 }}
                    className={`bg-white p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 border-l-4 ${config.borderClass} transition-shadow duration-300 group`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${config.badgeClass}`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Posted {item.postedAt}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-slate-800 group-hover:text-slate-950 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2.5">
                      {item.content}
                    </p>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Inbox className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">
                    No notifications found
                  </h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                    There are currently no announcements matching the selected filter category.
                  </p>
                </div>
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className="mt-2 text-sm font-semibold text-[#E60000] hover:text-[#CC0000] underline underline-offset-4"
                >
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
