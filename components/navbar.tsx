"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 bg-[#E60000]/95 backdrop-blur-xl text-white shadow-lg border-b border-red-500/30 z-50">
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
        <div className="hidden md:flex gap-6 items-center font-medium text-sm">
          <Link href="/" className="hover:text-red-200 transition-colors">Home</Link>
          <Link href="/academics" className="hover:text-red-200 transition-colors">Academics</Link>
          <Link href="/notifications" className="hover:text-red-200 transition-colors">Notifications</Link>
          <Link href="/higher-studies" className="hover:text-red-200 transition-colors">Higher Studies</Link>
          <Link href="/placements" className="hover:text-red-200 transition-colors">Placements</Link>
          <Link href="/login" className="bg-white text-[#E60000] px-4 py-1.5 rounded-full hover:bg-slate-100 transition-colors shadow-sm">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white hover:bg-red-700 rounded-md transition-colors" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#E60000] border-t border-red-700 shadow-xl py-4 px-6 flex flex-col gap-4">
          <Link href="/" onClick={toggleMenu} className="block font-medium hover:text-red-200 transition-colors">Home</Link>
          <Link href="/academics" onClick={toggleMenu} className="block font-medium hover:text-red-200 transition-colors">Academics</Link>
          <Link href="/notifications" onClick={toggleMenu} className="block font-medium hover:text-red-200 transition-colors">Notifications</Link>
          <Link href="/higher-studies" onClick={toggleMenu} className="block font-medium hover:text-red-200 transition-colors">Higher Studies</Link>
          <Link href="/placements" onClick={toggleMenu} className="block font-medium hover:text-red-200 transition-colors">Placements</Link>
          <div className="pt-2 border-t border-red-700">
            <Link href="/login" onClick={toggleMenu} className="inline-block bg-white text-[#E60000] px-5 py-2 rounded-full font-medium shadow-sm">
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
