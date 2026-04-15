import React, { useState, useRef } from 'react';
import { Briefcase, Plus, X, Upload, FileText, CheckCircle } from 'lucide-react';

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please upload a resume first!");
    
    console.log("Uploading:", selectedFile.name);
    setIsSubmitted(true);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      
      {/* 1. APPLY BUTTON / EMPTY STATE */}
      {!isSubmitted && !isModalOpen && (
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-[32px] p-12 flex flex-col items-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
            <Briefcase size={32} />
          </div>
          
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Ready to apply?</h2>
          <p className="text-slate-500 mb-8 text-center">Click below to upload your resume and start your application.</p>
          
          {/* THE NAVIGATE BUTTON: Opens the Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#1A69FF] text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus size={20} /> Apply Now
          </button>
        </div>
      )}

      {/* 2. UPLOAD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Upload Internship Resume</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden" 
              />

              <div 
                onClick={handleUploadClick}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
                  ${selectedFile ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'}`}
              >
                {selectedFile ? (
                  <>
                    <FileText size={40} className="text-green-500 mb-2" />
                    <p className="text-sm font-medium text-slate-700 text-center truncate w-full px-4">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">File selected! Click to change.</p>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Click to upload from manager</p>
                    <p className="text-xs text-slate-400 mt-1">PDF or DOCX (Max 5MB)</p>
                  </>
                )}
              </div>

              <button 
                type="submit" 
                disabled={!selectedFile}
                className={`w-full font-bold py-4 rounded-2xl transition shadow-lg
                  ${selectedFile ? 'bg-[#1A69FF] text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. SUCCESS STATE */}
      {isSubmitted && (
        <div className="flex flex-col items-center animate-in zoom-in duration-300">
          <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Application Submitted!</h2>
          <p className="text-slate-500 mt-2">Your resume has been received.</p>
          <button 
            onClick={() => { setIsSubmitted(false); setSelectedFile(null); }}
            className="mt-6 text-blue-600 font-semibold hover:underline"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Resume;