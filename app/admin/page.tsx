"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("RESOURCES"); // RESOURCES, NOTIFICATIONS, CONTENT

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("QUESTION_BANK");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Notification State
  const [notifTitle, setNotifTitle] = useState("");
  const [notifContent, setNotifContent] = useState("");
  const [notifType, setNotifType] = useState("INFO");
  const [isPostingNotif, setIsPostingNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  // Page Content State
  const [contentSlug, setContentSlug] = useState("fresher-guide");
  const [pageContent, setPageContent] = useState("");
  const [structuredData, setStructuredData] = useState<any>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [contentMessage, setContentMessage] = useState("");

  const [filesList, setFilesList] = useState<any[]>([]);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const [grievancesList, setGrievancesList] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch content when slug changes
  useEffect(() => {
    if (activeTab === "CONTENT") {
      fetch(`/api/content?slug=${contentSlug}`)
        .then(res => res.json())
        .then(data => {
          setPageContent(data.content || "");
          setStructuredData(data.data || null);
        })
        .catch(err => console.error(err));
    } else if (activeTab === "RESOURCES") {
      fetch("/api/admin/files")
        .then(res => res.json())
        .then(data => setFilesList(data.files || []))
        .catch(err => console.error(err));
    } else if (activeTab === "NOTIFICATIONS") {
      fetch("/api/notifications")
        .then(res => res.json())
        .then(data => setNotificationsList(Array.isArray(data) ? data : []))
        .catch(err => console.error(err));
    } else if (activeTab === "GRIEVANCES") {
      fetch("/api/admin/grievances")
        .then(res => res.json())
        .then(data => setGrievancesList(data.grievances || []))
        .catch(err => console.error(err));
    }
  }, [activeTab, contentSlug]);

  if (status === "loading") {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadMessage("");

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
        const data = await res.json();
        setUploadMessage("File uploaded successfully!");
        setFile(null);
        setSubject("");
        setDescription("");
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
        if (data.file) {
          setFilesList([data.file, ...filesList]);
        }
      } else {
        const data = await res.json();
        setUploadMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePostNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifContent) return;

    setIsPostingNotif(true);
    setNotifMessage("");

    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: notifTitle, content: notifContent, type: notifType }),
      });

      if (res.ok) {
        const data = await res.json();
        setNotifMessage("Notification posted successfully!");
        setNotifTitle("");
        setNotifContent("");
        if (data.notification) {
          setNotificationsList([data.notification, ...notificationsList]);
        }
      } else {
        const data = await res.json();
        setNotifMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setNotifMessage("Failed to post notification.");
    } finally {
      setIsPostingNotif(false);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingContent(true);
    setContentMessage("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: contentSlug, content: pageContent, data: structuredData }),
      });

      if (res.ok) {
        setContentMessage("Page content saved successfully!");
      } else {
        const data = await res.json();
        setContentMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setContentMessage("Failed to save content.");
    } finally {
      setIsSavingContent(false);
    }
  };

  const handleDeleteFile = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const res = await fetch(`/api/admin/files?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFilesList(filesList.filter(f => f.id !== id));
      } else {
        alert("Failed to delete file.");
      }
    } catch (e) {
      alert("Error deleting file.");
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;
    try {
      const res = await fetch(`/api/admin/notifications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotificationsList(notificationsList.filter(n => n.id !== id));
      } else {
        alert("Failed to delete notification.");
      }
    } catch (e) {
      alert("Error deleting notification.");
    }
  };

  const handleUpdateGrievanceStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/grievances`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setGrievancesList(grievancesList.map(g => g.id === id ? { ...g, status } : g));
      } else {
        alert("Failed to update grievance status.");
      }
    } catch (e) {
      alert("Error updating status.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#E60000]">
          <div>
            <h1 className="text-2xl font-bold">Admin CMS</h1>
            <p className="text-slate-500">Manage resources, notifications, site content, and grievances.</p>
          </div>
        </header>

        <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
          {["RESOURCES", "NOTIFICATIONS", "CONTENT", "GRIEVANCES"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab ? "bg-[#E60000] text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {activeTab === "RESOURCES" && (
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

              {uploadMessage && (
                <div className={`p-3 rounded-md text-sm ${uploadMessage.includes("Error") || uploadMessage.includes("failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                  {uploadMessage}
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

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-lg mb-4 text-slate-800">Manage Uploaded Files</h3>
              {filesList.length === 0 ? (
                <p className="text-sm text-slate-500">No files uploaded yet.</p>
              ) : (
                <div className="space-y-3">
                  {filesList.map(f => (
                    <div key={f.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-slate-50">
                      <div>
                        <p className="font-medium text-sm text-slate-800">{f.filename}</p>
                        <p className="text-xs text-slate-500">{f.category} {f.semester ? `· ${f.semester}` : ''}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteFile(f.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium px-3 py-1 border border-red-200 bg-white rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "NOTIFICATIONS" && (
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-[#E60000]">Post New Notification</h2>
            
            <form onSubmit={handlePostNotification} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Notification Type</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                  value={notifType}
                  onChange={(e) => setNotifType(e.target.value)}
                >
                  <option value="INFO">General Info</option>
                  <option value="URGENT">Urgent Alert</option>
                  <option value="EVENT">Event</option>
                  <option value="EXAM">Exam</option>
                  <option value="DEPARTMENT">Department</option>
                  <option value="SFI">SFI</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Title *</label>
                <input 
                  type="text" 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Content / Description *</label>
                <textarea 
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                  value={notifContent}
                  onChange={(e) => setNotifContent(e.target.value)}
                  required
                />
              </div>

              {notifMessage && (
                <div className={`p-3 rounded-md text-sm ${notifMessage.includes("Error") || notifMessage.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                  {notifMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isPostingNotif || !notifTitle || !notifContent}
                className="px-6 py-2 bg-[#E60000] text-white rounded-md font-medium hover:bg-[#CC0000] transition-colors disabled:opacity-50"
              >
                {isPostingNotif ? "Posting..." : "Post Notification"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-lg mb-4 text-slate-800">Manage Notifications</h3>
              {notificationsList.length === 0 ? (
                <p className="text-sm text-slate-500">No notifications posted yet.</p>
              ) : (
                <div className="space-y-3">
                  {notificationsList.map(n => (
                    <div key={n.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-slate-50">
                      <div>
                        <p className="font-medium text-sm text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500">{n.type} · {new Date(n.postedAt).toLocaleDateString()}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteNotification(n.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium px-3 py-1 border border-red-200 bg-white rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "CONTENT" && (
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-[#E60000]">Edit Page Content</h2>
            
            <form onSubmit={handleSaveContent} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Page to Edit</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000]"
                  value={contentSlug}
                  onChange={(e) => setContentSlug(e.target.value)}
                >
                  <option value="fresher-guide">Fresher Guide (Main Content)</option>
                  <option value="higher-studies">Higher Studies (Main Content)</option>
                  <option value="placements">Placements (Main Content)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Content (Markdown supported)</label>
                <textarea 
                  rows={8}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#E60000] font-mono text-sm"
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                  placeholder="# Welcome to SFI Polymer..."
                />
              </div>

              {(contentSlug === "placements" || contentSlug === "higher-studies" || contentSlug === "fresher-guide") && (
                <div className="space-y-4 border-t border-slate-200 pt-6 mt-6">
                  <h3 className="font-bold text-lg text-slate-800">Advanced Template Data (JSON)</h3>
                  <p className="text-sm text-slate-500">Edit the underlying structured data for the interactive grids and accordions here.</p>
                  
                  <div className="space-y-2">
                    <textarea 
                      rows={12}
                      className={`w-full border rounded-md px-3 py-2 outline-none font-mono text-sm ${
                        structuredData !== null && typeof structuredData !== 'object' ? 'border-red-500' : 'focus:border-[#E60000]'
                      }`}
                      value={typeof structuredData === 'string' ? structuredData : JSON.stringify(structuredData || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setStructuredData(parsed);
                        } catch (err) {
                          setStructuredData(e.target.value); // keep raw string so they can fix it
                        }
                      }}
                    />
                    {typeof structuredData === 'string' && (
                      <p className="text-xs text-red-500 font-medium">Invalid JSON format. Please fix any syntax errors before saving.</p>
                    )}
                  </div>
                </div>
              )}

              {contentMessage && (
                <div className={`p-3 rounded-md text-sm ${contentMessage.includes("Error") || contentMessage.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                  {contentMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSavingContent}
                className="px-6 py-2 bg-[#E60000] text-white rounded-md font-medium hover:bg-[#CC0000] transition-colors disabled:opacity-50"
              >
                {isSavingContent ? "Saving..." : "Save Content"}
              </button>
            </form>
          </section>
        )}

        {activeTab === "GRIEVANCES" && (
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-[#E60000]">Student Grievances</h2>
            
            {grievancesList.length === 0 ? (
              <p className="text-sm text-slate-500">No grievances submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {grievancesList.map((g) => (
                  <div key={g.id} className="border border-slate-200 rounded-lg p-5 bg-slate-50 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-800">
                          {g.studentName || "Anonymous Student"}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {g.semester} {g.subject ? `· ${g.subject}` : ""} · {new Date(g.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        g.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        g.status === "REVIEWED" ? "bg-blue-100 text-blue-800 border-blue-200" :
                        "bg-green-100 text-green-800 border-green-200"
                      }`}>
                        {g.status}
                      </span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border border-slate-200 mb-4 text-slate-700 text-sm whitespace-pre-wrap">
                      {g.description}
                    </div>

                    <div className="flex gap-2 justify-end pt-2 border-t border-slate-200">
                      {g.status !== "PENDING" && (
                        <button 
                          onClick={() => handleUpdateGrievanceStatus(g.id, "PENDING")}
                          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200"
                        >
                          Mark Pending
                        </button>
                      )}
                      {g.status !== "REVIEWED" && (
                        <button 
                          onClick={() => handleUpdateGrievanceStatus(g.id, "REVIEWED")}
                          className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {g.status !== "RESOLVED" && (
                        <button 
                          onClick={() => handleUpdateGrievanceStatus(g.id, "RESOLVED")}
                          className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}
