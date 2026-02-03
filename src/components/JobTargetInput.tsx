'use client';

import { Sparkles, ArrowUpRight } from 'lucide-react';

interface JobTargetInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function JobTargetInput({ value, onChange, onGenerate, isGenerating }: JobTargetInputProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Step 02</p>
          <h3 className="font-serif text-2xl text-white">Target job</h3>
          <p className="text-sm text-white/40 mt-2">
            Paste the job description you're applying for
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-white/20" />
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here...

Example:
We're looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and AWS..."
        rows={10}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 transition-colors resize-none"
      />

      <button
        onClick={onGenerate}
        disabled={isGenerating || !value.trim()}
        className="group w-full mt-6 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all font-medium disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Resume
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </div>
  );
}
