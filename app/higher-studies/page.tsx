export default function HigherStudiesPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E60000]">
          <h1 className="text-3xl font-bold text-slate-900">Higher Studies</h1>
          <p className="text-slate-600 mt-2">
            Information and guidance for pursuing M.Tech and Ph.D. in Polymer Science.
          </p>
        </header>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 text-[#E60000]">M.Tech Programs</h2>
            <p className="text-slate-700 leading-relaxed">
              The department offers specialized M.Tech programs in Polymer Technology.
              Eligibility criteria usually include a B.Tech degree with a valid GATE score or qualifying the DAT (Department Admission Test).
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 text-[#E60000]">Ph.D. Research</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Focus areas for Ph.D. research include Nanocomposites, Smart Polymers, Rubber Technology, and Biomaterials.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 marker:text-[#E60000]">
              <li>Admission through DAT or valid NET/JRF score.</li>
              <li>Fellowship opportunities available.</li>
              <li>State-of-the-art laboratory facilities.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
