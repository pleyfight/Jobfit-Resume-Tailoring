'use client';

import { useState } from 'react';
import { IngestionForm } from '@/components/IngestionForm';
import { JobTargetInput } from '@/components/JobTargetInput';
import { ResumeViewer } from '@/components/ResumeViewer';

export default function DashboardPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDocuments, setUseDocuments] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          useDocuments,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate resume');
      }

      setGeneratedResume(data.tailoredResume);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate resume');
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

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Ingestion Form */}
          <div className="col-span-12 lg:col-span-5">
            <IngestionForm 
              onContextTypeChange={setUseDocuments}
              useDocuments={useDocuments}
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
