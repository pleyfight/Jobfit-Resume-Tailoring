'use client';

import { Download, RefreshCw, Edit } from 'lucide-react';

interface ResumeViewerProps {
  resume: any;
}

export function ResumeViewer({ resume }: ResumeViewerProps) {
  const handleDownload = () => {
    // Create a formatted text version of the resume
    let content = '';
    
    // Header
    content += '='.repeat(80) + '\n';
    content += 'TAILORED RESUME\n';
    content += '='.repeat(80) + '\n\n';
    
    // Summary
    if (resume.summary) {
      content += 'PROFESSIONAL SUMMARY\n';
      content += '-'.repeat(80) + '\n';
      content += resume.summary + '\n\n';
    }
    
    // Work Experience
    if (resume.workExperiences && resume.workExperiences.length > 0) {
      content += 'WORK EXPERIENCE\n';
      content += '-'.repeat(80) + '\n';
      resume.workExperiences.forEach((exp: any) => {
        content += `\n${exp.jobTitle} at ${exp.company}\n`;
        if (exp.location) content += `${exp.location}\n`;
        content += `${exp.startDate} - ${exp.endDate}\n\n`;
        if (exp.highlights && exp.highlights.length > 0) {
          exp.highlights.forEach((highlight: string) => {
            content += `• ${highlight}\n`;
          });
        }
        content += '\n';
      });
    }
    
    // Skills
    if (resume.skills) {
      content += '\nSKILLS\n';
      content += '-'.repeat(80) + '\n';
      if (resume.skills.technical && resume.skills.technical.length > 0) {
        content += `Technical: ${resume.skills.technical.join(', ')}\n`;
      }
      if (resume.skills.tools && resume.skills.tools.length > 0) {
        content += `Tools: ${resume.skills.tools.join(', ')}\n`;
      }
      if (resume.skills.soft && resume.skills.soft.length > 0) {
        content += `Soft Skills: ${resume.skills.soft.join(', ')}\n`;
      }
      content += '\n';
    }
    
    // Education
    if (resume.education && resume.education.length > 0) {
      content += '\nEDUCATION\n';
      content += '-'.repeat(80) + '\n';
      resume.education.forEach((edu: any) => {
        content += `\n${edu.degree} in ${edu.field}\n`;
        content += `${edu.institution}\n`;
        content += `Graduated: ${edu.graduationDate}\n`;
      });
    }
    
    // Match Score & Insights
    if (resume.matchScore) {
      content += '\n\n' + '='.repeat(80) + '\n';
      content += `MATCH SCORE: ${resume.matchScore}%\n`;
      content += '='.repeat(80) + '\n';
      
      if (resume.keyStrengths && resume.keyStrengths.length > 0) {
        content += '\nKEY STRENGTHS:\n';
        resume.keyStrengths.forEach((strength: string) => {
          content += `✓ ${strength}\n`;
        });
      }
      
      if (resume.recommendations && resume.recommendations.length > 0) {
        content += '\nRECOMMENDATIONS:\n';
        resume.recommendations.forEach((rec: string) => {
          content += `→ ${rec}\n`;
        });
      }
    }
    
    // Create download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tailored-resume-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-[#E5E5E5] overflow-hidden">
      {/* Header Actions */}
      <div className="flex items-center justify-between p-4 border-b border-[#E5E5E5] bg-[#F7F5F3]">
        <h3 className="font-serif text-lg font-semibold text-[#2D2D2D]">
          Generated Resume
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="px-3 py-2 text-sm bg-white border border-[#D1D1D1] rounded-lg hover:bg-[#F7F5F3] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Resume Content - A4 Aspect Ratio */}
      <div className="p-8 max-h-[800px] overflow-y-auto bg-white">
        {/* Match Score Badge */}
        {resume.matchScore && (
          <div className="mb-6 flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <p className="text-sm text-green-700 font-medium">Match Score</p>
              <p className="text-2xl font-bold text-green-900">{resume.matchScore}%</p>
            </div>
            {resume.keyStrengths && resume.keyStrengths.length > 0 && (
              <div className="text-right">
                <p className="text-xs text-green-700 mb-1">Top Strengths:</p>
                <div className="flex flex-wrap gap-1 justify-end">
                  {resume.keyStrengths.slice(0, 3).map((strength: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Professional Summary */}
        {resume.summary && (
          <div className="mb-6">
            <h4 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-2 border-b-2 border-[#2D2D2D] pb-1">
              Professional Summary
            </h4>
            <p className="text-[#2D2D2D] leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperiences && resume.workExperiences.length > 0 && (
          <div className="mb-6">
            <h4 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 border-b-2 border-[#2D2D2D] pb-1">
              Work Experience
            </h4>
            <div className="space-y-4">
              {resume.workExperiences.map((exp: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#D1D1D1] pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-semibold text-[#2D2D2D]">{exp.jobTitle}</h5>
                    <span className="text-sm text-[#6B6B6B]">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-[#6B6B6B] mb-2">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight: string, hIdx: number) => (
                        <li key={hIdx} className="text-sm text-[#2D2D2D] flex gap-2">
                          <span className="text-[#6B6B6B] mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills && (
          <div className="mb-6">
            <h4 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 border-b-2 border-[#2D2D2D] pb-1">
              Skills
            </h4>
            <div className="space-y-2">
              {resume.skills.technical && resume.skills.technical.length > 0 && (
                <div>
                  <span className="font-medium text-[#2D2D2D]">Technical:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {resume.skills.technical.map((skill: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#F7F5F3] text-[#2D2D2D] rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills.tools && resume.skills.tools.length > 0 && (
                <div>
                  <span className="font-medium text-[#2D2D2D]">Tools:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {resume.skills.tools.map((tool: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#F7F5F3] text-[#2D2D2D] rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills.soft && resume.skills.soft.length > 0 && (
                <div>
                  <span className="font-medium text-[#2D2D2D]">Soft Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {resume.skills.soft.map((skill: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#F7F5F3] text-[#2D2D2D] rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div className="mb-6">
            <h4 className="font-serif text-lg font-semibold text-[#2D2D2D] mb-3 border-b-2 border-[#2D2D2D] pb-1">
              Education
            </h4>
            <div className="space-y-3">
              {resume.education.map((edu: any, idx: number) => (
                <div key={idx}>
                  <h5 className="font-semibold text-[#2D2D2D]">{edu.degree} in {edu.field}</h5>
                  <p className="text-[#6B6B6B]">{edu.institution} • {edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {resume.recommendations && resume.recommendations.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h5 className="font-semibold text-amber-900 mb-2">Recommendations</h5>
            <ul className="space-y-1">
              {resume.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="text-sm text-amber-800 flex gap-2">
                  <span>→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
