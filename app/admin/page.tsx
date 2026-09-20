"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("QUESTION_BANK");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("description", description);

    try {
      const res = await fetch("/api/admin/files", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("File uploaded successfully!");
        setFile(null);
        setSubject("");
        setDescription("");
        // @ts-ignore - reset form file input
        document.getElementById("fileInput").value = "";
      } else {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E60000]">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome, {session?.user?.email}</p>
          </div>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-[#E60000]">Upload Academic Resource</h2>
          
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category *</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="QUESTION_BANK">Question Bank</option>
                  <option value="SYLLABUS">Syllabus</option>
                  <option value="SCHEME">Scheme</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Semester</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select Semester (Optional)</option>
                  <option value="S1">Semester 1</option>
                  <option value="S2">Semester 2</option>
                  <option value="S3">Semester 3</option>
                  <option value="S4">Semester 4</option>
                  <option value="S5">Semester 5</option>
                  <option value="S6">Semester 6</option>
                  <option value="S7">Semester 7</option>
                  <option value="S8">Semester 8</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Subject Name</label>
              <input 
                type="text" 
                placeholder="e.g. Polymer Chemistry"
                className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">File *</label>
              <input 
                id="fileInput"
                type="file" 
                className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000] bg-slate-50"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            {message && (
              <div className={`p-3 rounded-md text-sm ${message.includes("Error") || message.includes("failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isUploading || !file}
              className="px-6 py-2 bg-[#E60000] text-white rounded-md font-medium hover:bg-[#CC0000] transition-colors disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
