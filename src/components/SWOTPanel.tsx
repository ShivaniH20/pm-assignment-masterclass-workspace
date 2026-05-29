/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CompanyTeardown } from '../types';
import { Shield, Target, AlertTriangle, Lightbulb, Users, HelpCircle, ArrowUpRight } from 'lucide-react';

interface SWOTPanelProps {
  company: CompanyTeardown;
}

export function SWOTPanel({ company }: SWOTPanelProps) {
  const [activeTab, setActiveTab] = useState<'swot' | 'porter' | 'icp'>('swot');
  const [swotData, setSwotData] = useState(company.swot);

  // Allow custom edits to strength/weaknesses during assignment crafting
  const handleAddItem = (type: 'strengths' | 'weaknesses' | 'opportunities' | 'threats') => {
    const newItem = prompt(`Add custom ${type.slice(0, -1)}:`);
    if (newItem && newItem.trim()) {
      setSwotData(prev => ({
        ...prev,
        [type]: [...prev[type], newItem.trim()]
      }));
    }
  };

  const handleRemoveItem = (type: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', index: number) => {
    setSwotData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-hidden" id="swot-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-sans font-semibold text-white tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            Strategic Framework Analysis
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Analyzing {company.name} utilizing core PM diagnostic grids
          </p>
        </div>

        <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 mt-4 md:mt-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab('swot')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'swot' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            SWOT Matrix
          </button>
          <button
            onClick={() => setActiveTab('porter')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'porter' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Porter's 5 Forces
          </button>
          <button
            onClick={() => setActiveTab('icp')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'icp' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            ICP target map
          </button>
        </div>
      </div>

      {activeTab === 'swot' && (
        <div>
          <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
            Configure or enrich the SWOT parameters by clicking items or adding customized strategic views. This provides excellent depth to your candidate submittals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* STRENGTHS */}
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-5 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3 mb-3">
                <span className="text-emerald-400 font-sans font-semibold text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Strengths
                </span>
                <button
                  onClick={() => handleAddItem('strengths')}
                  className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-1 rounded hover:bg-emerald-900/30 transition-all"
                >
                  + Add Item
                </button>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {swotData.strengths.map((item, id) => (
                  <li key={id} className="flex gap-2 group items-start leading-relaxed">
                    <span className="text-emerald-500 font-mono select-none">•</span>
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={() => handleRemoveItem('strengths', id)}
                      className="text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-mono"
                      title="Remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* WEAKNESSES */}
            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-5 hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between border-b border-amber-900/40 pb-3 mb-3">
                <span className="text-amber-400 font-sans font-semibold text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Weaknesses
                </span>
                <button
                  onClick={() => handleAddItem('weaknesses')}
                  className="text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800/60 px-2 py-1 rounded hover:bg-amber-900/30 transition-all"
                >
                  + Add Item
                </button>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {swotData.weaknesses.map((item, id) => (
                  <li key={id} className="flex gap-2 group items-start leading-relaxed">
                    <span className="text-amber-500 font-mono select-none">•</span>
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={() => handleRemoveItem('weaknesses', id)}
                      className="text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-mono"
                      title="Remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* OPPORTUNITIES */}
            <div className="bg-sky-950/20 border border-sky-900/30 rounded-xl p-5 hover:border-sky-500/30 transition-all">
              <div className="flex items-center justify-between border-b border-sky-900/40 pb-3 mb-3">
                <span className="text-sky-400 font-sans font-semibold text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Opportunities
                </span>
                <button
                  onClick={() => handleAddItem('opportunities')}
                  className="text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-800/60 px-2 py-1 rounded hover:bg-sky-900/30 transition-all"
                >
                  + Add Item
                </button>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {swotData.opportunities.map((item, id) => (
                  <li key={id} className="flex gap-2 group items-start leading-relaxed">
                    <span className="text-sky-500 font-mono select-none">•</span>
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={() => handleRemoveItem('opportunities', id)}
                      className="text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-mono"
                      title="Remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* THREATS */}
            <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-5 hover:border-rose-500/30 transition-all">
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-3 mb-3">
                <span className="text-rose-400 font-sans font-semibold text-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Threats
                </span>
                <button
                  onClick={() => handleAddItem('threats')}
                  className="text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-800/60 px-2 py-1 rounded hover:bg-rose-900/30 transition-all"
                >
                  + Add Item
                </button>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {swotData.threats.map((item, id) => (
                  <li key={id} className="flex gap-2 group items-start leading-relaxed">
                    <span className="text-rose-500 font-mono select-none">•</span>
                    <span className="flex-1">{item}</span>
                    <button
                      onClick={() => handleRemoveItem('threats', id)}
                      className="text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-mono"
                      title="Remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'porter' && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed mb-4">
            Analyzing operational forces within the high-stakes Indian startup framework:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-sans hover:border-zinc-700 transition">
              <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-semibold mb-1">Rivalry Intensity</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{company.porter.rivalry}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-sans hover:border-zinc-700 transition">
              <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-semibold mb-1">New Entrants</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{company.porter.entrants}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-sans hover:border-zinc-700 transition">
              <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-semibold mb-1">Substitutes</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{company.porter.substitutes}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-sans hover:border-zinc-700 transition">
              <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-semibold mb-1">Buyer Power</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{company.porter.buyers}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-sans hover:border-zinc-700 transition">
              <div className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-semibold mb-1">Supplier Power</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{company.porter.suppliers}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'icp' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Ideal Customer Profiles (ICPs) Identified</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            These targeted cohorts present the highest conversion potential and account lifetime value (LTV):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {company.icps.map((icp, index) => (
              <div key={index} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition duration-150 p-4 rounded-lg flex items-start gap-3">
                <span className="font-mono text-zinc-500 text-xs bg-zinc-900 border border-zinc-800 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-xs text-zinc-100 font-sans font-medium mb-1">
                    ICP Segment Variant
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{icp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
