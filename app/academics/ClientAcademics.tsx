"use client";

import { useState } from "react";

type FileRecord = {
  id: string;
  filename: string;
  url: string;
  category: string;
  semester: string | null;
  subject: string | null;
  uploadedAt: Date;
};

export default function ClientAcademics({ initialFiles }: { initialFiles: FileRecord[] }) {
  const [semesterFilter, setSemesterFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = initialFiles.filter((file) => {
    const matchesSemester = semesterFilter ? file.semester === semesterFilter : true;
    const matchesCategory = categoryFilter ? file.category === categoryFilter : true;
    const matchesSearch = searchQuery 
      ? (file.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         file.filename.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesSemester && matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="border rounded-md px-3 py-2 text-sm w-full md:w-auto outline-none focus:border-[#E60000]"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        >
          <option value="">All Semesters</option>
          <option value="S1">Semester 1</option>
          <option value="S2">Semester 2</option>
          <option value="S3">Semester 3</option>
          <option value="S4">Semester 4</option>
          <option value="S5">Semester 5</option>
          <option value="S6">Semester 6</option>
          <option value="S7">Semester 7</option>
          <option value="S8">Semester 8</option>
        </select>
        <select 
          className="border rounded-md px-3 py-2 text-sm w-full md:w-auto outline-none focus:border-[#E60000]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="QUESTION_BANK">Question Bank</option>
          <option value="SYLLABUS">Syllabus</option>
          <option value="SCHEME">Scheme</option>
        </select>
        <input 
          type="text" 
          placeholder="Search subjects or filenames..." 
          className="border rounded-md px-3 py-2 text-sm flex-grow outline-none focus:border-[#E60000]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <div className="text-4xl text-slate-300 mb-2">📄</div>
          <p>No documents found matching your filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file) => (
            <div key={file.id} className="border border-slate-200 p-4 rounded-lg hover:border-[#E60000]/40 transition-colors shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-sm uppercase">
                  {file.category.replace("_", " ")}
                </span>
                {file.semester && (
                  <span className="text-xs font-bold text-[#E60000]">{file.semester}</span>
                )}
              </div>
              <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2" title={file.subject || file.filename}>
                {file.subject || file.filename}
              </h3>
              <p className="text-xs text-slate-400 mb-4 truncate">{file.filename}</p>
              
              <div className="mt-auto flex gap-2">
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-1.5 rounded-md text-sm transition-colors"
                >
                  View
                </a>
                <a 
                  href={file.url} 
                  download
                  className="flex-1 text-center bg-[#E60000] hover:bg-[#CC0000] text-white font-medium py-1.5 rounded-md text-sm transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
