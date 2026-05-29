/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CompanyTeardown } from '../types';
import { Clipboard, Download, FileText, CheckCircle } from 'lucide-react';

interface ExportDocProps {
  company: CompanyTeardown;
}

export function ExportDoc({ company }: ExportDocProps) {
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    let md = `# Product Intern Teardown Assignment: ${company.name}\n`;
    md += `**Target Industry**: ${company.industry}\n\n`;

    md += `## 1. Executive Summary & Core Moats\n`;
    company.moats.forEach(moat => {
      md += `- ${moat}\n`;
    });
    md += `\n`;

    md += `## 2. Strategic Strategic SWOT Analysis\n`;
    md += `### Strengths\n`;
    company.swot.strengths.forEach(s => {
      md += `- ${s}\n`;
    });
    md += `\n### Weaknesses\n`;
    company.swot.weaknesses.forEach(w => {
      md += `- ${w}\n`;
    });
    md += `\n### Opportunities\n`;
    company.swot.opportunities.forEach(o => {
      md += `- ${o}\n`;
    });
    md += `\n### Threats\n`;
    company.swot.threats.forEach(t => {
      md += `- ${t}\n`;
    });
    md += `\n`;

    md += `## 3. Five Sharp Product Feedbacks\n\n`;
    company.feedbacks.forEach((fb, idx) => {
      md += `### Feedback #${idx + 1}: ${fb.title} [Pillar: ${fb.pillar}]\n`;
      md += `- **Impact**: ${fb.impact} | **Complexity**: ${fb.effort}\n`;
      md += `- **(a) Observed**: ${fb.observed}\n`;
      md += `- **(b) Problem**: ${fb.problem}\n`;
      md += `- **(c) Ship instead**: ${fb.shipInstead}\n\n`;
    });

    md += `## 4. Prioritisation Matrix conclusion\n`;
    md += `Highly recommended roadmap splits are outlined inside the interactive presentation interface.\n\n`;
    md += `*Drafted on Product Assignment Suite - hawaldarshivani14@gmail.com*\n`;
    return md;
  };

  const copyToClipboard = () => {
    const text = generateMarkdown();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const downloadFile = () => {
    const text = generateMarkdown();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${company.id}_product_teardown_assignment.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6" id="export-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 mb-5 gap-3">
        <div>
          <h2 className="text-xl font-sans font-semibold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Formatted Portfolio Exporter
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Recompile the strategic frameworks into high-fidelity markdown blocks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-80 px-3.5 py-1.8 rounded-lg text-xs font-semibold text-zinc-300 border border-zinc-800 transition duration-150 cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Copied block!
              </>
            ) : (
              <>
                <Clipboard className="w-3.5 h-3.5 text-zinc-400" />
                Copy Markdown
              </>
            )}
          </button>

          <button
            onClick={downloadFile}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.8 rounded-lg text-xs font-semibold text-white transition duration-150 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download .MD
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 h-72 overflow-y-auto font-mono text-zinc-400 text-xs leading-relaxed select-all">
        <pre className="whitespace-pre-wrap">{generateMarkdown()}</pre>
      </div>
    </div>
  );
}
