import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SFI Polymer Subcommittee",
  description: "Student resource platform for Polymer Science and Rubber Technology, CUSAT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50 flex flex-col min-h-screen"}>
        <Providers>
          {/* SFI Red Navbar */}
          <nav className="bg-[#E60000] text-white shadow-md relative z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                {/* SFI Star Placeholder */}
                <div className="w-8 h-8 flex items-center justify-center bg-white text-[#E60000] rounded-full font-black text-xl">
                  ★
                </div>
                <div className="font-bold text-lg leading-tight tracking-wide">
                  SFI POLYMER <br/><span className="text-sm font-medium text-red-100">SUBCOMMITTEE PSRT</span>
                </div>
              </Link>
              
              <div className="hidden md:flex gap-6 font-medium text-sm">
                <Link href="/academics" className="hover:text-red-200 transition-colors">Academics</Link>
                <Link href="/notifications" className="hover:text-red-200 transition-colors">Notifications</Link>
                <Link href="/higher-studies" className="hover:text-red-200 transition-colors">Higher Studies</Link>
                <Link href="/placements" className="hover:text-red-200 transition-colors">Placements</Link>
                <Link href="/login" className="bg-white text-[#E60000] px-4 py-1.5 rounded-full hover:bg-slate-100 transition-colors shadow-sm">
                  Admin
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-grow">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Students' Federation of India - Polymer Subcommittee, CUSAT.</p>
            <p className="mt-2 text-slate-500">Independence • Democracy • Socialism</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
