"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative bg-[#E60000]/95 backdrop-blur-xl text-white shadow-lg border-b border-red-500/30 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="bg-white px-2 py-1 rounded-md shadow-sm flex items-center justify-center">
            <Image src="/psrt-logo.webp" alt="PSRT Logo" width={80} height={30} className="h-8 w-auto object-contain" priority />
          </div>
          <div className="font-bold text-lg leading-tight tracking-wide">
            SFI POLYMER <br />
            <span className="text-sm font-medium text-red-100">SUBCOMMITTEE</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 xl:gap-6 items-center font-medium text-sm">
          <Link href="/" className="hover:text-red-200 transition-colors whitespace-nowrap">Home</Link>
          <Link href="/academics" className="hover:text-red-200 transition-colors whitespace-nowrap">Academics</Link>
          <Link href="/notifications" className="hover:text-red-200 transition-colors whitespace-nowrap">Notifications</Link>
          <Link href="/higher-studies" className="hover:text-red-200 transition-colors whitespace-nowrap">Higher Studies</Link>
          <Link href="/placements" className="hover:text-red-200 transition-colors whitespace-nowrap">Placements</Link>
          <Link href="/grievances" className="hover:text-red-200 transition-colors whitespace-nowrap">Grievances</Link>
          <Link href="/login" className="bg-white text-[#E60000] px-4 py-1.5 rounded-full hover:bg-slate-100 transition-colors shadow-sm whitespace-nowrap">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 text-white hover:bg-red-700 rounded-md transition-colors" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl py-4 px-4 flex flex-col gap-1 rounded-b-2xl text-slate-800">
          <Link href="/" onClick={toggleMenu} className="block font-semibold text-slate-700 hover:text-[#E60000] hover:bg-red-50 p-3 rounded-xl transition-all">Home</Link>
          <Link href="/academics" onClick={toggleMenu} className="block font-semibold text-slate-700 hover:text-[#E60000] hover:bg-red-50 p-3 rounded-xl transition-all">Academics</Link>
          <Link href="/notifications" onClick={toggleMenu} className="block font-semibold text-slate-700 hover:text-[#E60000] hover:bg-red-50 p-3 rounded-xl transition-all">Notifications</Link>
          <Link href="/higher-studies" onClick={toggleMenu} className="block font-semibold text-slate-700 hover:text-[#E60000] hover:bg-red-50 p-3 rounded-xl transition-all">Higher Studies</Link>
          <Link href="/placements" onClick={toggleMenu} className="block font-semibold text-slate-700 hover:text-[#E60000] hover:bg-red-50 p-3 rounded-xl transition-all">Placements</Link>
          <Link href="/grievances" onClick={toggleMenu} className="block font-semibold text-slate-700 hover:text-[#E60000] hover:bg-red-50 p-3 rounded-xl transition-all">Grievances</Link>
          <div className="pt-4 mt-2 border-t border-slate-100 flex">
            <Link href="/login" onClick={toggleMenu} className="w-full text-center bg-[#E60000] text-white px-5 py-3 rounded-xl font-bold shadow-md hover:bg-[#CC0000] transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
