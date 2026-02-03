'use client';

import { useState } from 'react';
import { Download, Copy, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ResumeViewerProps {
  resume: any;
}

export function ResumeViewer({ resume }: ResumeViewerProps) {
  const [copied, setCopied] = useState(false);

  const getPlainTextResume = () => {
    let content = '';
    
    // Name/Header (if available from profile)
    if (resume.name) {
      content += `${resume.name.toUpperCase()}\n`;
      content += ''.repeat(50) + '\n\n';
    }
    
    // Summary
    if (resume.summary) {
      content += 'PROFESSIONAL SUMMARY\n';
      content += ''.repeat(30) + '\n';
      content += resume.summary + '\n\n';
    }
    
    // Work Experience
    if (resume.workExperiences && resume.workExperiences.length > 0) {
      content += 'WORK EXPERIENCE\n';
      content += ''.repeat(30) + '\n';
      resume.workExperiences.forEach((exp: any) => {
        content += `\n${exp.jobTitle} | ${exp.company}\n`;
        if (exp.location) content += `${exp.location}\n`;
        content += `${exp.startDate} - ${exp.endDate}\n`;
        if (exp.highlights && exp.highlights.length > 0) {
          exp.highlights.forEach((highlight: string) => {
            content += ` ${highlight}\n`;
          });
        }
      });
      content += '\n';
    }
    
    // Skills
    if (resume.skills) {
      content += 'SKILLS\n';
      content += ''.repeat(30) + '\n';
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
      content += 'EDUCATION\n';
      content += ''.repeat(30) + '\n';
      resume.education.forEach((edu: any) => {
        content += `${edu.degree} in ${edu.field}\n`;
        content += `${edu.institution}\n`;
        if (edu.graduationDate) content += `Graduated: ${edu.graduationDate}\n`;
        content += '\n';
      });
    }
    
    return content;
  };

  const handleCopy = async () => {
    const text = getPlainTextResume();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 25;

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: number[] = [45, 45, 45]) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin, y);
        y += fontSize * 0.5;
      });
    };

    const addSectionHeader = (title: string) => {
      y += 5;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(45, 45, 45);
      doc.text(title, margin, y);
      y += 2;
      doc.setDrawColor(45, 45, 45);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    };

    // Header - Name
    if (resume.name) {
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(45, 45, 45);
      doc.text(resume.name.toUpperCase(), margin, y);
      y += 12;
    } else {
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(45, 45, 45);
      doc.text('PROFESSIONAL RESUME', margin, y);
      y += 12;
    }

    // Professional Summary
    if (resume.summary) {
      addSectionHeader('PROFESSIONAL SUMMARY');
      addText(resume.summary, 10);
      y += 5;
    }

    // Work Experience
    if (resume.workExperiences && resume.workExperiences.length > 0) {
      addSectionHeader('WORK EXPERIENCE');
      resume.workExperiences.forEach((exp: any) => {
        // Job Title and Company
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(45, 45, 45);
        doc.text(`${exp.jobTitle}`, margin, y);
        y += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 107, 107);
        doc.text(`${exp.company}${exp.location ? ' | ' + exp.location : ''} | ${exp.startDate} - ${exp.endDate}`, margin, y);
        y += 6;

        // Highlights
        if (exp.highlights && exp.highlights.length > 0) {
          exp.highlights.forEach((highlight: string) => {
            if (y > 280) {
              doc.addPage();
              y = 20;
            }
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(45, 45, 45);
            const bulletLines = doc.splitTextToSize(' ' + highlight, maxWidth - 5);
            bulletLines.forEach((line: string) => {
              doc.text(line, margin + 3, y);
              y += 5;
            });
          });
        }
        y += 3;
      });
    }

    // Skills
    if (resume.skills) {
      addSectionHeader('SKILLS');
      const allSkills = [];
      if (resume.skills.technical) allSkills.push(...resume.skills.technical);
      if (resume.skills.tools) allSkills.push(...resume.skills.tools);
      if (resume.skills.soft) allSkills.push(...resume.skills.soft);
      
      if (allSkills.length > 0) {
        addText(allSkills.join('  '), 10);
      }
      y += 3;
    }

    // Education
    if (resume.education && resume.education.length > 0) {
      addSectionHeader('EDUCATION');
      resume.education.forEach((edu: any) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(45, 45, 45);
        doc.text(`${edu.degree} in ${edu.field}`, margin, y);
        y += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 107, 107);
        doc.text(`${edu.institution}${edu.graduationDate ? ' | Graduated: ' + edu.graduationDate : ''}`, margin, y);
        y += 8;
      });
    }

    // Match Score Footer
    if (resume.matchScore) {
      y += 5;
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 139, 34);
      doc.text(`Match Score: ${resume.matchScore}%`, margin, y);
    }

    // Save the PDF
    doc.save(`tailored-resume-${Date.now()}.pdf`);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
      {/* Header Actions */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
        <h3 className="font-serif text-lg text-white">
          Generated Resume
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 text-white/70"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 text-sm bg-white text-black rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Match Score Banner */}
      {resume.matchScore && (
        <div className="p-4 bg-green-500/10 border-b border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-green-400/70">Match Score</span>
              <div className="flex items-center gap-3 mt-1">
                <div className="w-32 h-1.5 bg-green-500/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${resume.matchScore}%` }}
                  />
                </div>
                <span className="text-2xl font-serif text-green-400">{resume.matchScore}%</span>
              </div>
            </div>
            {resume.keyStrengths && resume.keyStrengths.length > 0 && (
              <div className="flex gap-2">
                {resume.keyStrengths.slice(0, 3).map((strength: string, idx: number) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resume Content */}
      <div className="p-6 space-y-6">
        {/* Summary */}
        {resume.summary && (
          <div>
            <h4 className="font-serif text-lg text-white mb-3 pb-2 border-b border-white/10">
              Professional Summary
            </h4>
            <p className="text-white/60 leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperiences && resume.workExperiences.length > 0 && (
          <div>
            <h4 className="font-serif text-lg text-white mb-3 pb-2 border-b border-white/10">
              Work Experience
            </h4>
            <div className="space-y-4">
              {resume.workExperiences.map((exp: any, idx: number) => (
                <div key={idx} className="border-l border-white/20 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-white">{exp.jobTitle}</h5>
                    <span className="text-xs text-white/40">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-2">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight: string, hIdx: number) => (
                        <li key={hIdx} className="text-white/60 text-sm flex gap-2">
                          <span className="text-white/30">•</span>
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
          <div>
            <h4 className="font-serif text-lg text-white mb-3 pb-2 border-b border-white/10">
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {resume.skills.technical && resume.skills.technical.map((skill: string, idx: number) => (
                <span key={`tech-${idx}`} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
              {resume.skills.tools && resume.skills.tools.map((skill: string, idx: number) => (
                <span key={`tool-${idx}`} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
              {resume.skills.soft && resume.skills.soft.map((skill: string, idx: number) => (
                <span key={`soft-${idx}`} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div>
            <h4 className="font-serif text-lg text-white mb-3 pb-2 border-b border-white/10">
              Education
            </h4>
            <div className="space-y-3">
              {resume.education.map((edu: any, idx: number) => (
                <div key={idx}>
                  <h5 className="font-medium text-white">{edu.degree} in {edu.field}</h5>
                  <p className="text-white/40">{edu.institution}</p>
                  {edu.graduationDate && (
                    <p className="text-sm text-white/30">Graduated: {edu.graduationDate}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {resume.recommendations && resume.recommendations.length > 0 && (
          <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <h4 className="text-sm uppercase tracking-wider text-amber-400/80 mb-3">AI Recommendations</h4>
            <ul className="space-y-2">
              {resume.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="text-sm text-amber-200/70 flex gap-2">
                  <span className="text-amber-400">→</span>
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
