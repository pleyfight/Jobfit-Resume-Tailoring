'use client';

import { Sparkles } from 'lucide-react';

interface JobTargetInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function JobTargetInput({ value, onChange, onGenerate, isGenerating }: JobTargetInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E5E5E5] p-6">
      <div className="mb-4">
        <h3 className="font-serif text-xl font-semibold text-[#2D2D2D] mb-2">
          Target Job Description
        </h3>
        <p className="text-sm text-[#6B6B6B]">
          Paste the full job description to tailor your resume
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here...

Example:
We're looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and AWS. The ideal candidate will have led teams, shipped products at scale, and demonstrated strong problem-solving abilities..."
        rows={12}
        className="w-full px-4 py-3 border border-[#D1D1D1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D2D2D] resize-none text-[#2D2D2D] placeholder:text-[#999]"
      />

      <button
        onClick={onGenerate}
        disabled={isGenerating || !value.trim()}
        className="w-full mt-4 py-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium disabled:bg-[#D1D1D1] disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating Resume...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Tailored Resume
          </>
        )}
      </button>
    </div>
  );
}
