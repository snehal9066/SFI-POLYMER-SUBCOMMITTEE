export default function NotificationsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E60000]">
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600 mt-2">
            Latest announcements from the Department, University, and SFI.
          </p>
        </header>

        <section className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-[#E60000] border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-slate-800">SFI Freshers Welcome Meet</h3>
              <span className="text-xs bg-[#E60000] text-white font-medium px-2 py-1 rounded-sm">SFI</span>
            </div>
            <p className="text-slate-600 text-sm">Join us for the fresher's orientation program this Friday at the department seminar hall.</p>
            <p className="text-xs text-slate-400 mt-4">Posted 2 days ago</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-600 border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-slate-800">S7 Examination Schedule Published</h3>
              <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-sm">EXAM</span>
            </div>
            <p className="text-slate-600 text-sm">The timetable for the 7th semester regular examinations has been published on the CUSAT exam portal.</p>
            <p className="text-xs text-slate-400 mt-4">Posted today</p>
          </div>
        </section>
      </div>
    </main>
  );
}
