'use client';

import { useState, useCallback, useEffect } from 'react';
import { Upload, Plus, Trash2, CheckCircle, X } from 'lucide-react';

interface IngestionFormProps {
  onContextTypeChange: (useDocuments: boolean) => void;
  useDocuments: boolean;
  onFormDataChange?: (data: FormData) => void;
}

interface WorkExp {
  company: string;
  job_title: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  duties: string;
  achievements: string;
}

interface Education {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
}

interface Skill {
  name: string;
  category: 'Hard' | 'Soft' | 'Tool';
  proficiency: number;
}

interface FormData {
  profile: {
    full_name: string;
    date_of_birth: string;
    phone: string;
    email: string;
    linkedin_url: string;
    portfolio_url: string;
    summary_bio: string;
  };
  work_experiences: WorkExp[];
  educations: Education[];
  skills: Skill[];
}

export function IngestionForm({ onContextTypeChange, useDocuments, onFormDataChange }: IngestionFormProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('manual');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Manual entry state
  const [profile, setProfile] = useState({
    full_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    linkedin_url: '',
    portfolio_url: '',
    summary_bio: '',
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExp[]>([{
    company: '',
    job_title: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    duties: '',
    achievements: '',
  }]);

  const [educations, setEducations] = useState<Education[]>([{
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
  }]);

  const [skills, setSkills] = useState<Skill[]>([{
    name: '',
    category: 'Hard',
    proficiency: 50,
  }]);

  // Notify parent of form data changes
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange({
        profile,
        work_experiences: workExperiences,
        educations,
        skills,
      });
    }
  }, [profile, workExperiences, educations, skills, onFormDataChange]);

  // Auto-dismiss toast after 20 seconds
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  const handleTabChange = (tab: 'upload' | 'manual') => {
    setActiveTab(tab);
    onContextTypeChange(tab === 'upload');
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setUploadProgress(30);

    const formData = new window.FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/ingest/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(70);

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setUploadProgress(100);
      
      // Show success toast instead of alert
      setToastMessage(` Upload Complete: ${file.name}`);
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Upload error:', error);
      setToastMessage(` Upload Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowSuccessToast(true);
      setUploadProgress(0);
      setUploadedFile(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleFileUpload(file);
    } else {
      setToastMessage(' Please upload a PDF or DOCX file');
      setShowSuccessToast(true);
    }
  }, []);

  const handleSaveManual = async () => {
    try {
      const response = await fetch('/api/ingest/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile,
          work_experiences: workExperiences,
          educations,
          skills,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save data');
      }

      setToastMessage(' Information saved successfully!');
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Save error:', error);
      setToastMessage(` Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowSuccessToast(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E5E5E5] overflow-hidden relative">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="absolute top-4 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="bg-white border border-green-200 shadow-lg rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-[#2D2D2D]">{toastMessage}</span>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E5E5E5]">
        <button
          onClick={() => handleTabChange('manual')}
          className={`flex-1 px-6 py-4 font-medium transition-colors ${
            activeTab === 'manual'
              ? 'text-[#2D2D2D] border-b-2 border-[#2D2D2D]'
              : 'text-[#999] hover:text-[#6B6B6B]'
          }`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => handleTabChange('upload')}
          className={`flex-1 px-6 py-4 font-medium transition-colors ${
            activeTab === 'upload'
              ? 'text-[#2D2D2D] border-b-2 border-[#2D2D2D]'
              : 'text-[#999] hover:text-[#6B6B6B]'
          }`}
        >
          Upload Resume
        </button>
      </div>

      <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
        {activeTab === 'upload' ? (
          <div className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-[#2D2D2D] bg-[#F7F5F3]'
                  : 'border-[#D1D1D1] hover:border-[#999]'
              }`}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#999]" />
              <p className="text-[#2D2D2D] font-medium mb-2">
                Drop your resume here, or click to browse
              </p>
              <p className="text-sm text-[#999] mb-4">
                Supports PDF and DOCX files
              </p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-[#2D2D2D] text-white rounded-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors"
              >
                Choose File
              </label>
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">{uploadedFile?.name}</span>
                  <span className="text-[#2D2D2D] font-medium">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D2D2D] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basic Info Accordion */}
            <details className="group" open>
              <summary className="flex justify-between items-center cursor-pointer list-none font-serif text-lg font-semibold text-[#2D2D2D] mb-4">
                Basic Information
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="px-4 py-2 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="px-4 py-2 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                  />
                </div>
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={profile.linkedin_url}
                  onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                />
                <input
                  type="url"
                  placeholder="Portfolio URL"
                  value={profile.portfolio_url}
                  onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                />
                <textarea
                  placeholder="Professional Summary"
                  value={profile.summary_bio}
                  onChange={(e) => setProfile({ ...profile, summary_bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D] resize-none"
                />
              </div>
            </details>

            {/* Work Experience Accordion */}
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none font-serif text-lg font-semibold text-[#2D2D2D] mb-4">
                Work Experience
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <div className="space-y-4">
                {workExperiences.map((exp, index) => (
                  <div key={index} className="p-4 border border-[#E5E5E5] rounded-lg space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#6B6B6B]">Position {index + 1}</span>
                      {workExperiences.length > 1 && (
                        <button
                          onClick={() => setWorkExperiences(workExperiences.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...workExperiences];
                        updated[index].company = e.target.value;
                        setWorkExperiences(updated);
                      }}
                      className="w-full px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.job_title}
                      onChange={(e) => {
                        const updated = [...workExperiences];
                        updated[index].job_title = e.target.value;
                        setWorkExperiences(updated);
                      }}
                      className="w-full px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) => {
                        const updated = [...workExperiences];
                        updated[index].location = e.target.value;
                        setWorkExperiences(updated);
                      }}
                      className="w-full px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        placeholder="Start Date"
                        value={exp.start_date}
                        onChange={(e) => {
                          const updated = [...workExperiences];
                          updated[index].start_date = e.target.value;
                          setWorkExperiences(updated);
                        }}
                        className="px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        value={exp.end_date}
                        onChange={(e) => {
                          const updated = [...workExperiences];
                          updated[index].end_date = e.target.value;
                          setWorkExperiences(updated);
                        }}
                        disabled={exp.is_current}
                        className="px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D] disabled:bg-[#F7F5F3]"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={exp.is_current}
                        onChange={(e) => {
                          const updated = [...workExperiences];
                          updated[index].is_current = e.target.checked;
                          if (e.target.checked) updated[index].end_date = '';
                          setWorkExperiences(updated);
                        }}
                        className="rounded"
                      />
                      <span className="text-[#6B6B6B]">I currently work here</span>
                    </label>
                    <textarea
                      placeholder="Duties (What you did on a daily basis)"
                      value={exp.duties}
                      onChange={(e) => {
                        const updated = [...workExperiences];
                        updated[index].duties = e.target.value;
                        setWorkExperiences(updated);
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D] resize-none"
                    />
                    <textarea
                      placeholder=" Key Achievements (I increased X by Y%, Led Z initiative...)"
                      value={exp.achievements}
                      onChange={(e) => {
                        const updated = [...workExperiences];
                        updated[index].achievements = e.target.value;
                        setWorkExperiences(updated);
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border-2 border-amber-300 bg-amber-50 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none placeholder:text-amber-700"
                    />
                  </div>
                ))}
                <button
                  onClick={() => setWorkExperiences([...workExperiences, {
                    company: '',
                    job_title: '',
                    location: '',
                    start_date: '',
                    end_date: '',
                    is_current: false,
                    duties: '',
                    achievements: '',
                  }])}
                  className="w-full py-2 border-2 border-dashed border-[#D1D1D1] rounded-lg text-[#6B6B6B] hover:border-[#2D2D2D] hover:text-[#2D2D2D] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Position
                </button>
              </div>
            </details>

            {/* Education & Skills */}
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none font-serif text-lg font-semibold text-[#2D2D2D] mb-4">
                Education & Skills
                <span className="text-[#999] group-open:rotate-180 transition-transform"></span>
              </summary>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-[#2D2D2D]">Education</h4>
                  {educations.map((edu, index) => (
                    <div key={index} className="p-4 border border-[#E5E5E5] rounded-lg space-y-3">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educations];
                          updated[index].institution = e.target.value;
                          setEducations(updated);
                        }}
                        className="w-full px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[index].degree = e.target.value;
                            setEducations(updated);
                          }}
                          className="px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Field of Study"
                          value={edu.field_of_study}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[index].field_of_study = e.target.value;
                            setEducations(updated);
                          }}
                          className="px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[#2D2D2D]">Skills</h4>
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[index].name = e.target.value;
                          setSkills(updated);
                        }}
                        className="flex-1 px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                      />
                      <select
                        value={skill.category}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[index].category = e.target.value as 'Hard' | 'Soft' | 'Tool';
                          setSkills(updated);
                        }}
                        className="px-3 py-2 border border-[#D1D1D1] rounded focus:outline-none focus:ring-2 focus:ring-[#2D2D2D]"
                      >
                        <option value="Hard">Technical</option>
                        <option value="Tool">Tool</option>
                        <option value="Soft">Soft</option>
                      </select>
                    </div>
                  ))}
                  <button
                    onClick={() => setSkills([...skills, { name: '', category: 'Hard', proficiency: 50 }])}
                    className="w-full py-2 border-2 border-dashed border-[#D1D1D1] rounded-lg text-[#6B6B6B] hover:border-[#2D2D2D] hover:text-[#2D2D2D] transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </button>
                </div>
              </div>
            </details>

            <button
              onClick={handleSaveManual}
              className="w-full py-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
            >
              Save Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
