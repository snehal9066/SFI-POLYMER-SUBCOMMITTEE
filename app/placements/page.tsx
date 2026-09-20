export default function PlacementsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E60000]">
          <h1 className="text-3xl font-bold text-slate-900">Placements & Internships</h1>
          <p className="text-slate-600 mt-2">
            Career opportunities, recruiter information, and placement statistics for PSRT students.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#E60000]/30 transition-colors">
            <h2 className="text-xl font-bold mb-4 text-[#E60000]">Placement Statistics</h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Top Recruiters</p>
                <p className="font-medium text-slate-800">MRF, Apollo Tyres, CEAT, Reliance Industries</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Placement Rate</p>
                <p className="font-medium text-slate-800 text-2xl">~85% <span className="text-sm font-normal text-slate-500">(Last Year)</span></p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#E60000]/30 transition-colors">
            <h2 className="text-xl font-bold mb-4 text-[#E60000]">Preparation Resources</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
              <li>Interview Preparation Guides</li>
              <li>Past Company Questions</li>
              <li>Resume Templates</li>
            </ul>
            <button className="mt-6 px-4 py-2 bg-[#E60000] hover:bg-[#CC0000] text-white font-medium rounded-md text-sm transition-colors shadow-sm">
              View Resources
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
