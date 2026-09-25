"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

export default function GrievancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    studentName: "",
    semester: "",
    subject: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit grievance");
      }

      setSuccess(true);
      setFormData({
        studentName: "",
        semester: "",
        subject: "",
        description: ""
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#E60000] px-6 py-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Student Grievance Cell</h1>
            <p className="text-red-100 max-w-lg mx-auto">
              Facing any issues in your class or department? Let us know. We are here to help.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {success ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Grievance Submitted</h2>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. We have received your grievance and will review it shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="studentName" className="block text-sm font-medium text-slate-700">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="semester" className="block text-sm font-medium text-slate-700">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      required
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white"
                    >
                      <option value="" disabled>Select Semester</option>
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
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                    Subject/Topic (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Polymer Processing Lab, Internal Exams..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                  <p className="text-xs text-slate-500">If your issue is related to a specific subject, please mention it.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                    Grievance Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe the issue you are facing in detail..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E60000] text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Grievance
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
