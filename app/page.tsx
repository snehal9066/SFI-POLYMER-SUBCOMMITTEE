import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#E60000] to-[#990000] text-white py-20 px-6 flex justify-center shadow-inner">
        <div className="max-w-4xl w-full text-center space-y-6">
          <div className="inline-block bg-white text-[#E60000] px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-2 shadow-sm">
            Student Resource Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
            Empowering Polymer Students
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto font-light leading-relaxed">
            Access question banks, syllabi, department notifications, and career guidance all in one place.
          </p>
        </div>
      </section>

      {/* Grid Navigation */}
      <section className="max-w-6xl w-full px-6 py-16 -mt-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            title="Academics" 
            href="/academics" 
            desc="Explore our extensive collection of previous year Question Banks, complete Syllabi, and Scheme documents." 
            icon="A"
          />
          <Card 
            title="Notifications" 
            href="/notifications" 
            desc="Stay updated with the latest announcements regarding exams, university news, and SFI events." 
            icon="N"
          />
          <Card 
            title="Higher Studies" 
            href="/higher-studies" 
            desc="Discover pathways for M.Tech and Ph.D., including eligibility criteria and research areas." 
            icon="H"
          />
          <Card 
            title="Placements" 
            href="/placements" 
            desc="View career opportunities, past recruiter statistics, and essential interview preparation resources." 
            icon="P"
          />
          <Card 
            title="Fresher Guide" 
            href="/fresher-guide" 
            desc="New to PSRT? Get your bearings with our comprehensive department introduction and campus guide." 
            icon="F"
          />
          <div className="bg-[#fff5f5] p-8 rounded-2xl border-2 border-red-100 flex flex-col items-center justify-center text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
             <div className="text-[#E60000] text-4xl font-black mb-2">*</div>
             <h3 className="font-bold text-slate-800 text-lg">Join the Movement</h3>
             <p className="text-sm text-slate-600">Get involved with the SFI Polymer Subcommittee to make a difference on campus.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ title, href, desc, icon }: { title: string, href: string, desc: string, icon: string }) {
  return (
    <Link href={href} className="block group h-full">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#E60000]/30 h-full flex flex-col">
        <div className="text-3xl font-black text-[#E60000] mb-4 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform group-hover:bg-red-50 shadow-sm border border-slate-100">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-slate-800 group-hover:text-[#E60000] transition-colors mb-2">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed flex-grow text-sm">
          {desc}
        </p>
        <div className="mt-6 text-[#E60000] font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 transform duration-300">
          Explore -{'>'}
        </div>
      </div>
    </Link>
  )
}
