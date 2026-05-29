/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { vocallabsData, subspaceData } from './data';
import { CompanyTeardown, TeardownFeedback } from './types';
import { SWOTPanel } from './components/SWOTPanel';
import { FeedbackCard } from './components/FeedbackCard';
import { VoiceSimulator } from './components/VoiceSimulator';
import { SmsParser } from './components/SmsParser';
import { SlidePresenter } from './components/SlidePresenter';
import { ExportDoc } from './components/ExportDoc';
import { Layers, Presentation, Shield, FileOutput, Bot, Calendar, Sparkles, Building2, HelpCircle } from 'lucide-react';

export default function App() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<'vocallabs' | 'subspace'>('vocallabs');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'slides' | 'feedbacks' | 'swot' | 'sandbox' | 'export'>('slides');

  // Custom modification states to allow candidate editing
  const [vocallabs, setVocallabs] = useState<CompanyTeardown>(vocallabsData);
  const [subspace, setSubspace] = useState<CompanyTeardown>(subspaceData);

  const activeCompany = selectedCompanyId === 'vocallabs' ? vocallabs : subspace;

  const handleUpdateFeedback = (updated: TeardownFeedback) => {
    if (selectedCompanyId === 'vocallabs') {
      setVocallabs(prev => ({
        ...prev,
        feedbacks: prev.feedbacks.map(f => f.id === updated.id ? updated : f)
      }));
    } else {
      setSubspace(prev => ({
        ...prev,
        feedbacks: prev.feedbacks.map(f => f.id === updated.id ? updated : f)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* HEADER HERO BAR */}
      <header className="bg-zinc-900/60 border-b border-zinc-805 backdrop-blur py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-900/50 px-2.5 py-0.5 rounded uppercase font-semibold">
                Vocallabs.ai · Subspace.money
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              Product Intern Portfolio Workspace
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              An interactive product evaluation and teardown platform developed by **hawaldarshivani14@gmail.com**. Compare competitive moats, strategically analyze frameworks, and simulate actionable product optimizations live.
            </p>
          </div>

          <div className="flex flex-col text-right font-mono text-[10px] text-zinc-500 bg-zinc-950 p-3 rounded-xl border border-zinc-850">
            <div>APPLICANT: hawaldarshivani14@gmail.com</div>
            <div className="mt-1">STATUS: COMPLETED & EXPORT-READY</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* COMPANY SELECTOR SWITCH */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5" id="company-selector-section">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-400">
                1. Select Teardown Company Focus
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Toggle between the conversational voice SaaS framework or the consumer split-billing fintech dashboard.
              </p>
            </div>

            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 font-sans text-xs w-full md:w-auto">
              <button
                onClick={() => setSelectedCompanyId('vocallabs')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all cursor-pointer ${
                  selectedCompanyId === 'vocallabs'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Vocallabs.ai
              </button>
              <button
                onClick={() => setSelectedCompanyId('subspace')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all cursor-pointer ${
                  selectedCompanyId === 'subspace'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Subspace.money
              </button>
            </div>
          </div>

          {/* ACTIVE COMPANY SNAPSHOT OVERLAY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-850 mt-5 pt-5 text-xs text-zinc-400">
            <div>
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-500">Core Proposition</span>
              <p className="font-medium text-zinc-100 mt-1 font-sans">{activeCompany.tagline}</p>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-500">Market Segment</span>
              <p className="font-medium text-zinc-200 mt-1 font-sans">{activeCompany.industry}</p>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase font-bold text-zinc-550">Identified Moat Flywheels</span>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {selectedCompanyId === 'vocallabs' ? (
                  <span className="bg-indigo-950/40 text-indigo-300 border border-indigo-900/30 text-[9px] font-mono px-2 py-0.5 rounded">
                    India-first Accent models
                  </span>
                ) : (
                  <span className="bg-emerald-950/40 text-emerald-300 border border-emerald-900/30 text-[9px] font-mono px-2 py-0.5 rounded">
                    Profitable (ARR Rs 36.5Cr)
                  </span>
                )}
                <span className="bg-zinc-950 border border-zinc-850 text-[9px] font-mono px-2 py-0.5 rounded">
                  Autonomous AI-Ops
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex border-b border-zinc-800 pb-px overflow-x-auto space-x-6 font-mono text-xs text-zinc-500">
          <button
            onClick={() => setActiveWorkspaceTab('slides')}
            className={`flex items-center gap-2 pb-4 border-b-2 hover:text-zinc-300 transition shrink-0 cursor-pointer ${
              activeWorkspaceTab === 'slides' ? 'border-indigo-500 text-white font-bold' : 'border-transparent'
            }`}
          >
            <Presentation className="w-4 h-4" />
            01 // Present Pitch Slide Deck
          </button>
          <button
            onClick={() => setActiveWorkspaceTab('swot')}
            className={`flex items-center gap-2 pb-4 border-b-2 hover:text-zinc-300 transition shrink-0 cursor-pointer ${
              activeWorkspaceTab === 'swot' ? 'border-indigo-500 text-white font-bold' : 'border-transparent'
            }`}
          >
            <Layers className="w-4 h-4" />
            02 // Strategic SWOT Grids
          </button>
          <button
            onClick={() => setActiveWorkspaceTab('feedbacks')}
            className={`flex items-center gap-2 pb-4 border-b-2 hover:text-zinc-300 transition shrink-0 cursor-pointer ${
              activeWorkspaceTab === 'feedbacks' ? 'border-indigo-500 text-white font-bold' : 'border-transparent'
            }`}
          >
            <Shield className="w-4 h-4" />
            03 // 5 Sharpest Feedbacks
          </button>
          <button
            onClick={() => setActiveWorkspaceTab('sandbox')}
            className={`flex items-center gap-2 pb-4 border-b-2 hover:text-zinc-300 transition shrink-0 cursor-pointer ${
              activeWorkspaceTab === 'sandbox' ? 'border-indigo-500 text-white font-bold' : 'border-transparent'
            }`}
          >
            <Bot className="w-4 h-4 animate-bounce" />
            04 // Interactive AI Sandbox (Proof-of-Concept)
          </button>
          <button
            onClick={() => setActiveWorkspaceTab('export')}
            className={`flex items-center gap-2 pb-4 border-b-2 hover:text-zinc-300 transition shrink-0 cursor-pointer ${
              activeWorkspaceTab === 'export' ? 'border-indigo-500 text-white font-bold' : 'border-transparent'
            }`}
          >
            <FileOutput className="w-4 h-4" />
            05 // Formatted Document Exporter
          </button>
        </div>

        {/* ACTIVE MODULE CONTAINER */}
        <section className="transition-all duration-200">
          {activeWorkspaceTab === 'slides' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
                <span className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Candidate Slide Pitch Presentation
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                  This presentation mode aggregates the core analysis, swot structures, and five sharp product feedbacks into a consulting-style deck. Play through this slide deck to review your assignment format before export.
                </p>
              </div>
              <SlidePresenter company={activeCompany} />
            </div>
          )}

          {activeWorkspaceTab === 'swot' && (
            <div className="space-y-4 animate-fade-in animate-slide-up">
              <SWOTPanel company={activeCompany} />
            </div>
          )}

          {activeWorkspaceTab === 'feedbacks' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
                <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  Observation → Problem → Solution Feedback Matrices
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                  Structured feedback modules tracking specific screens, flows, or copywriting blocks. Click **'AI Polish'** on any card to invoke server-side Gemini intelligence to refine writing copy with PM metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-2">
                {activeCompany.feedbacks.map(fb => (
                  <FeedbackCard
                    key={fb.id}
                    feedback={fb}
                    companyId={selectedCompanyId}
                    onUpdateFeedback={handleUpdateFeedback}
                  />
                ))}
              </div>
            </div>
          )}

          {activeWorkspaceTab === 'sandbox' && (
            <div className="space-y-4 animate-fade-in">
              {selectedCompanyId === 'vocallabs' ? (
                <VoiceSimulator />
              ) : (
                <SmsParser />
              )}
            </div>
          )}

          {activeWorkspaceTab === 'export' && (
            <div className="space-y-4 animate-fade-in">
              <ExportDoc company={activeCompany} />
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
