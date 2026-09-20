import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
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
          <Navbar />

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
