'use client';

import { useState, useCallback } from 'react';
import { IngestionForm } from '@/components/IngestionForm';
import { JobTargetInput } from '@/components/JobTargetInput';
import { ResumeViewer } from '@/components/ResumeViewer';

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
  work_experiences: any[];
  educations: any[];
  skills: any[];
}

export default function DashboardPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDocuments, setUseDocuments] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormDataChange = useCallback((data: FormData) => {
    setFormData(data);
  }, []);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setErrorMessage('Please enter a job description');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          useDocuments,
          demoData: formData ? {
            profile: formData.profile,
            work_experiences: formData.work_experiences,
            educations: formData.educations,
            skills: formData.skills,
          } : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to generate resume');
      }

      setGeneratedResume(data.tailoredResume);
    } catch (error) {
      console.error('Error generating resume:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-[#2D2D2D] mb-2">
            Resume Tailor
          </h1>
          <p className="text-[#6B6B6B]">
            Create a tailored resume optimized for your target job
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Ingestion Form */}
          <div className="col-span-12 lg:col-span-5">
            <IngestionForm 
              onContextTypeChange={setUseDocuments}
              useDocuments={useDocuments}
              onFormDataChange={handleFormDataChange}
            />
          </div>

          {/* Right Panel - Job Input & Preview */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="sticky top-6 space-y-6">
              <JobTargetInput
                value={jobDescription}
                onChange={setJobDescription}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
              
              {generatedResume && (
                <ResumeViewer resume={generatedResume} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
