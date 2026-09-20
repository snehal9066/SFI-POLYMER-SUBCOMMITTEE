export default function FresherGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Fresher's Guide</h1>
          <p className="text-slate-600 mt-2">
            Welcome to the Department of Polymer Science and Rubber Technology!
          </p>
        </header>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Campus Survival 101</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-blue-700">1. Department Location</h3>
              <p className="text-slate-600 mt-1">PSRT is located near the main library in the CUSAT campus. The labs are on the ground floor and classrooms on the first floor.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-blue-700">2. Academic Structure</h3>
              <p className="text-slate-600 mt-1">The B.Tech program follows an 8-semester system. Attendance of 75% is strictly enforced. Internal marks carry significant weight in the final grade.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-blue-700">3. SFI Unit</h3>
              <p className="text-slate-600 mt-1">The SFI Polymer Subcommittee is here to help you with academic resources, grievances, and organizing department events. Reach out to the committee members for any assistance.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
