"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";

type NotificationType = "SFI" | "EXAM" | "DEPARTMENT" | "EVENT" | "GENERAL";

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  createdAt: string;
}

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
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => {
        setNotifications(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.type === activeFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#E60000]" />
              <p>Loading latest notifications...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification, index) => {
                  const config = typeConfig[notification.type];
                  const Icon = config.icon;

                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                      className={`bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 ${config.borderClass}`}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <div className="hidden sm:flex flex-shrink-0 mt-1">
                          <div className={`p-3 rounded-xl ${config.badgeClass}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`px-3 py-1 text-xs font-bold tracking-wide rounded-full border ${config.badgeClass}`}
                            >
                              {config.label}
                            </span>
                            <div className="flex items-center text-slate-500 text-xs font-medium bg-slate-100 px-3 py-1 rounded-full">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              {formatDate(notification.createdAt)}
                            </div>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                            {notification.title}
                          </h2>

                          <p className="text-slate-600 leading-relaxed">
                            {notification.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-700">
                      No Notifications Found
                    </h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                      We couldn't find any announcements matching the selected category.
                    </p>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
