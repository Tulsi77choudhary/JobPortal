import React, { useState, useRef } from 'react';
import { ArrowLeft, MapPin, DollarSign, Calendar, ShieldCheck, X, Upload, FileText, CheckCircle } from 'lucide-react';

const JobDetail = ({ job, onBack }) => {
  // --- NEW STATE FOR MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleResumeSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setSelectedFile(null);
      alert("Application sent successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen relative mt-15">
      {/* Back Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft size={18} /> Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <header>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{job?.title || "Job Detail"}</h1>
            <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
              <span className="flex items-center gap-1"><MapPin size={16}/> {job?.location || "Remote"}</span>
              <span className="flex items-center gap-1"><DollarSign size={16}/> {job?.salary || "Competitive"}</span>
              <span className="flex items-center gap-1"><Calendar size={16}/> Posted {job?.postedAt || "Recently"}</span>
            </div>
          </header>

          <hr className="border-slate-100" />

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4">About the Role</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {job?.description || "No description provided."}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Key Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
               {job?.responsibilities ? job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              )) : <li>No specific responsibilities listed.</li>}
            </ul>
          </section>
        </div>

        {/* Sidebar Actions */}
        <aside className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Interested in this role?</h3>
            <p className="text-indigo-100 text-sm mb-6">
              Applications are reviewed within 48 hours. Make sure your portfolio is up to date!
            </p>
            
            {/* --- UPDATED BUTTON --- */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition mb-3 active:scale-95"
            >
              Apply Now
            </button>
            
            <button className="w-full bg-transparent border border-indigo-300 text-white py-3 rounded-xl hover:bg-indigo-800 transition text-sm">
              Save for Later
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-500" /> Hiring Security
            </h4>
            <p className="text-xs text-slate-500">
              This employer has been verified. Never share your bank details or pay for a job application.
            </p>
          </div>
        </aside>
      </div>

      {/* --- RESUME UPLOAD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Upload Your Resume</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleResumeSubmit} className="p-6 space-y-6">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />

              <div 
                onClick={handleUploadClick}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
                  ${selectedFile ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'}`}
              >
                {selectedFile ? (
                  <div className="text-center">
                    <FileText size={40} className="text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-700 truncate w-48">{selectedFile.name}</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3"><Upload size={24} /></div>
                    <p className="text-sm font-semibold text-slate-700">Select Resume from Manager</p>
                  </>
                )}
              </div>

              <button 
                type="submit" 
                disabled={!selectedFile || isSubmitted}
                className={`w-full font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2
                  ${selectedFile ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400'}`}
              >
                {isSubmitted ? "Sending..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;