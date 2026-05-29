/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TeardownFeedback } from '../types';
import { Sparkles, Shield, AlertCircle, Compass, RefreshCw, BarChart2 } from 'lucide-react';

interface FeedbackCardProps {
  key?: string;
  feedback: TeardownFeedback;
  companyId: 'vocallabs' | 'subspace';
  onUpdateFeedback: (updated: TeardownFeedback) => void;
}

export function FeedbackCard({ feedback, companyId, onUpdateFeedback }: FeedbackCardProps) {
  const [isRefining, setIsRefining] = useState(false);
  const [showRefined, setShowRefined] = useState(false);
  const [refinedData, setRefinedData] = useState<any>(null);

  const triggerRefinement = async () => {
    setIsRefining(true);
    setShowRefined(true);

    try {
      const response = await fetch('/api/copilot/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentFeedback: {
            observed: feedback.observed,
            problem: feedback.problem,
            shipInstead: feedback.shipInstead
          },
          focusPillar: feedback.pillar
        })
      });

      const data = await response.json();
      setIsRefining(false);

      if (response.ok) {
        setRefinedData(data);
      } else {
        throw new Error(data.error || 'Refined callback crashed');
      }
    } catch (err) {
      setIsRefining(false);
      alert('Refinement failed. Verify server environment parameters.');
    }
  };

  const applyRefinedOutput = () => {
    if (!refinedData) return;
    onUpdateFeedback({
      ...feedback,
      observed: refinedData.refinedFeedback.observed,
      problem: refinedData.refinedFeedback.problem,
      shipInstead: refinedData.refinedFeedback.shipInstead
    });
    setShowRefined(false);
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-850 hover:border-zinc-800 transition rounded-xl p-5 space-y-4" id={`fb-card-${feedback.id}`}>
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-90 w-full pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs bg-zinc-900 border border-zinc-805 px-2.5 py-1 rounded text-zinc-300">
            {feedback.pillar} Pillar
          </span>
          <h4 className="text-sm font-sans font-bold text-white tracking-tight">
            {feedback.title}
          </h4>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className={`px-2 py-0.5 rounded ${
            feedback.impact === 'High' ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-900/30' : 'bg-zinc-900 text-zinc-500'
          }`}>
            Impact: {feedback.impact}
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">
            Effort: {feedback.effort}
          </span>
          
          <button
            onClick={triggerRefinement}
            disabled={isRefining}
            className="flex items-center gap-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-900/40 px-2 py-1 rounded transition duration-150 cursor-pointer disabled:opacity-50"
          >
            {isRefining ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-indigo-400" />}
            AI Polish
          </button>
        </div>
      </div>

      {/* DETAILED CONTENT BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs text-zinc-300">
        
        {/* OBSERVED */}
        <div className="space-y-1 bg-zinc-950/20 p-3.5 rounded-lg border border-zinc-900/40 hover:border-zinc-800/30 transition">
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            (a) Observed
          </div>
          <p className="leading-relaxed text-zinc-300">{feedback.observed}</p>
        </div>

        {/* PROBLEM */}
        <div className="space-y-1 bg-zinc-950/20 p-3.5 rounded-lg border border-zinc-900/40 hover:border-zinc-800/30 transition">
          <div className="flex items-center gap-1.5 text-rose-450/80 font-mono text-[10px] uppercase font-bold tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            (b) Problem (Pain Metric)
          </div>
          <p className="leading-relaxed text-zinc-400">{feedback.problem}</p>
        </div>

        {/* ACTION / SHIP */}
        <div className="space-y-1 bg-zinc-950/20 p-3.5 rounded-lg border border-zinc-900/40 hover:border-zinc-800/30 transition">
          <div className="flex items-center gap-1.5 text-emerald-450/80 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            (c) Ship instead
          </div>
          <p className="leading-relaxed text-zinc-300 font-medium">{feedback.shipInstead}</p>
        </div>

      </div>

      {/* TOGGLED AI COPILOT REFINEMENT BOARD */}
      {showRefined && (
        <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl mt-3 space-y-4 animate-fade-in font-sans text-xs">
          <div className="flex justify-between items-center border-b border-zinc-90 pb-2">
            <span className="font-mono text-[10px] text-indigo-400 flex items-center gap-1.5 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              AI Copilot Refinement suggestions
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={applyRefinedOutput}
                disabled={isRefining || !refinedData}
                className="bg-emerald-950 border border-emerald-900 text-emerald-300 px-2.5 py-1 rounded text-[10px] hover:bg-emerald-900/20 transition cursor-pointer"
              >
                Apply AI Draft
              </button>
              <button
                onClick={() => setShowRefined(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono"
              >
                Dismiss
              </button>
            </div>
          </div>

          {isRefining ? (
            <div className="flex items-center justify-center py-6 text-zinc-500 font-mono text-[10px] gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              Applying advanced PM rigor analyses. Syncing metadata pipelines...
            </div>
          ) : (
            refinedData && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-zinc-400 bg-zinc-900/25 p-3 rounded-lg border border-zinc-900">
                  <div>
                    <span className="block font-mono text-[9px] uppercase font-bold text-zinc-650 mb-0.5">Refined Observation</span>
                    <p className="leading-relaxed">{refinedData.refinedFeedback.observed}</p>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase font-bold text-zinc-650 mb-0.5">Refined Problem</span>
                    <p className="leading-relaxed">{refinedData.refinedFeedback.problem}</p>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase font-bold text-zinc-650 mb-0.5">Refined Solution</span>
                    <p className="leading-relaxed text-zinc-200">{refinedData.refinedFeedback.shipInstead}</p>
                  </div>
                </div>

                {refinedData.tradeoffAnalysis && (
                  <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg space-y-2">
                    <span className="font-mono text-[10px] text-indigo-400 uppercase font-bold flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      Implementation Tradeoffs & Metrics Analysis
                    </span>
                    <div className="text-zinc-400 text-xs font-sans leading-relaxed whitespace-pre-line bg-zinc-950/60 p-3 rounded border border-zinc-850">
                      {refinedData.tradeoffAnalysis}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
