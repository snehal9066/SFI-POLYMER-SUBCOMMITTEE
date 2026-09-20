import prisma from "@/lib/prisma";
import ClientAcademics from "./ClientAcademics";

// Opt out of caching so new uploads appear immediately
export const dynamic = 'force-dynamic';

export default async function AcademicsPage() {
  let files: any[] = [];

  try {
    // Fetch files from the DB that belong in Academics
    files = await prisma.file.findMany({
      where: {
        category: {
          in: ["QUESTION_BANK", "SYLLABUS", "SCHEME"],
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch academic files:", error);
    // On Vercel (serverless), SQLite won't work — show empty state
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E60000]">
          <h1 className="text-3xl font-bold text-slate-900">Academics</h1>
          <p className="text-slate-600 mt-2">
            Browse and download Question Banks, Syllabi, and Scheme documents.
          </p>
        </header>

        <ClientAcademics initialFiles={files} />
      </div>
    </main>
  );
}
