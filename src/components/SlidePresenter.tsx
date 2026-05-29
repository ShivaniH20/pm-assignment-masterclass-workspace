/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CompanyTeardown, TeardownFeedback } from '../types';
import { ChevronLeft, ChevronRight, ScreenShare, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';

interface SlidePresenterProps {
  company: CompanyTeardown;
}

export function SlidePresenter({ company }: SlidePresenterProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define total slides
  // Slide 0: Title
  // Slide 1: Overview & Moats
  // Slides 2-6: Feedback 1-5
  // Slide 7: Strategics Portfolio Summary
  const totalSlides = 8;

  const nextSlide = () => {
    setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const getSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="h-full flex flex-col justify-between p-8 md:p-12 text-left bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Product Intern Assignment</span>
            </div>

            <div className="space-y-4 my-auto">
              <span className="text-sm font-semibold font-sans text-indigo-300">Teardown & Optimization Portfolio</span>
              <h1 className="text-4xl md:text-5xl font-sans font-black text-white tracking-tight leading-none">
                {company.name} <span className="text-indigo-400">Deep-Dive</span>
              </h1>
              <p className="text-base text-zinc-400 max-w-xl font-sans leading-relaxed">
                "{company.tagline}" — Analysis, strategic diagnostics, and five sharp product optimity implementations, drafted for immediate product execution.
              </p>
            </div>

            <div className="border-t border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="font-mono text-[10px] text-zinc-550 space-y-1">
                <div>CANDIDATE: hawaldarshivani14@gmail.com</div>
              </div>
              <span className="text-xs bg-zinc-900 border border-zinc-805 px-3 py-1.5 rounded-lg text-indigo-300 font-bold flex items-center gap-2">
                <Award className="w-4 h-4" />
                Teardown Pitch Deck
              </span>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="h-full flex flex-col justify-between p-8 md:p-12 text-left bg-zinc-950 border border-zinc-800 rounded-2xl relative">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-550 block mb-1">Company Overview</span>
              <h2 className="text-2xl font-bold text-white mb-6 font-sans">Moats & Scale Metrics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
              <div className="space-y-3">
                <span className="text-xs text-indigo-400 font-mono font-medium block">Core Industry context</span>
                <p className="text-sm text-zinc-350 leading-relaxed font-sans">
                  {company.name} operates as a high-frequency vendor in **{company.industry}**. Our teardown targets maximizing customer retention and scaling recurring revenue streams.
                </p>
              </div>

              <div className="space-y-3 bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl">
                <span className="text-xs text-zinc-400 font-mono block border-b border-zinc-800/60 pb-1 uppercase font-semibold">Active Moats Identified:</span>
                <ul className="space-y-2 text-xs text-zinc-400 font-sans">
                  {company.moats.map((moat, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-indigo-400 font-semibold shrink-0">✓</span>
                      <span>{moat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-850 pt-4 flex justify-between font-mono text-[10px] text-zinc-500">
              <span>Section: 01 // OVERVIEW</span>
              <span>Slide 2 of {totalSlides}</span>
            </div>
          </div>
        );

      default:
        // Slides 2 to 6 representing feedback 1 to 5
        const feedbackIndex = currentSlide - 2;
        if (feedbackIndex >= 0 && feedbackIndex < company.feedbacks.length) {
          const fb = company.feedbacks[feedbackIndex];
          return (
            <div className="h-full flex flex-col justify-between p-8 md:p-12 text-left bg-zinc-950 border border-zinc-800 rounded-2xl relative">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-2">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Feedback Module #{feedbackIndex + 1}</span>
                  <p className="text-xs font-semibold text-indigo-300 font-mono uppercase mt-0.5">{fb.pillar} PILLAR OPTIMIZATION</p>
                </div>
                <div className="flex gap-2 text-[10px] font-mono">
                  <span className={`px-2 py-0.5 rounded border ${
                    fb.impact === 'High' ? 'bg-indigo-950 text-indigo-300 border-indigo-900/40' : 'bg-zinc-900 text-zinc-400'
                  }`}>
                    Impact: {fb.impact}
                  </span>
                  <span className="px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">
                    Complexity: {fb.effort}
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight mb-4">
                {fb.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                {/* OBSERVED */}
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 space-y-1 hover:border-zinc-800 transition">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">
                    (a) Observed
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{fb.observed}</p>
                </div>

                {/* PROBLEM */}
                <div className="bg-rose-950/10 border border-rose-950/25 rounded-xl p-4 space-y-1 hover:border-rose-900/35 transition">
                  <span className="text-[9px] font-mono text-rose-400 uppercase font-bold tracking-widest block">
                    (b) Problem (Pain Metric)
                  </span>
                  <p className="text-xs text-zinc-450 leading-relaxed font-sans">{fb.problem}</p>
                </div>

                {/* SOLUTION */}
                <div className="bg-emerald-950/10 border border-emerald-950/25 rounded-xl p-4 space-y-1 hover:border-emerald-950/35 transition">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-widest block">
                    (c) Ship Instead
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans font-medium">{fb.shipInstead}</p>
                </div>
              </div>

              <div className="border-t border-zinc-850 pt-4 flex justify-between font-mono text-[10px] text-zinc-550">
                <span>Section: 02 // DETAILED TEARDOWN FEEDBACKS</span>
                <span>Slide {currentSlide + 1} of {totalSlides}</span>
              </div>
            </div>
          );
        }

        // Slide 7 (Final Strategics Map summary)
        return (
          <div className="h-full flex flex-col justify-between p-8 md:p-12 text-left bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-850 rounded-2xl relative">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-550 block mb-1">Conclusion Portfolio</span>
              <h2 className="text-2xl font-bold text-white mb-6 font-sans">Execution Prioritization Matrix</h2>
            </div>

            <div className="my-auto grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-xl space-y-1.5">
                <span className="font-mono text-[10px] text-indigo-400 block font-semibold uppercase">Quick Wins (Low Effort / High Impact)</span>
                <ul className="space-y-1 text-zinc-400 text-xs">
                  {company.feedbacks.filter(f => f.impact === 'High' && f.effort === 'Low').map((f, idx) => (
                    <li key={idx} className="flex gap-1.5 items-center">
                      <span className="text-emerald-500">•</span>
                      <span>{f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 border border-zinc-855 p-4 rounded-xl space-y-1.5">
                <span className="font-mono text-[10px] text-emerald-400 block font-semibold uppercase">Major Bets (High Effort / High Impact)</span>
                <ul className="space-y-1 text-zinc-400 text-xs">
                  {company.feedbacks.filter(f => f.impact === 'High' && f.effort === 'High').map((f, idx) => (
                    <li key={idx} className="flex gap-1.5 items-center">
                      <span className="text-indigo-400">•</span>
                      <span>{f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-xl space-y-1.5">
                <span className="font-mono text-[10px] text-zinc-500 block font-semibold uppercase">Secondary Optimizations</span>
                <ul className="space-y-1 text-zinc-400 text-xs">
                  {company.feedbacks.filter(f => f.impact !== 'High' || f.effort !== 'High' && f.effort !== 'Low').map((f, idx) => (
                    <li key={idx} className="flex gap-1.5 items-center">
                      <span className="text-zinc-650">•</span>
                      <span>{f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-850 pt-4 flex justify-between font-mono text-[10px] text-zinc-500">
              <span>Section: 03 // CONCLUSION</span>
              <span>Slide {totalSlides} of {totalSlides}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4" id="slide-presentation-module">
      <div className="flex justify-between items-center bg-zinc-950 px-4 py-2 border border-zinc-850 rounded-lg">
        <span className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
          <ScreenShare className="w-4 h-4 text-zinc-500" />
          Interactive presentation Mode • Slide Screen
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-80 border border-zinc-800 rounded bg-zinc-900/30 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[10px] text-zinc-300 min-w-[50px] text-center">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={nextSlide}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-80 border border-zinc-800 rounded bg-zinc-900/30 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-[430px] md:h-[390px] w-full" id="slide-container">
        {getSlideContent()}
      </div>
    </div>
  );
}
