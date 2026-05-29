/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { CreditCard, ScanLine, Share2, Sparkles, RefreshCw, Layers, CheckCircle, Flame } from 'lucide-react';
import { smsTemplates } from '../data';

export function SmsParser() {
  const [smsInput, setSmsInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [negotiating, setNegotiating] = useState(false);
  const [negotiationTicks, setNegotiationTicks] = useState<string[]>([]);
  const [autopayEnabled, setAutopayEnabled] = useState(false);

  const handleTemplateClick = (text: string) => {
    setSmsInput(text);
    setScanResult(null);
    setNegotiationTicks([]);
    setNegotiating(false);
  };

  const handleScanInvoices = async () => {
    if (!smsInput.trim() || isScanning) return;

    setIsScanning(true);
    setScanResult(null);
    setNegotiationTicks([]);
    setNegotiating(false);

    try {
      const response = await fetch('/api/sandbox/subspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smsText: smsInput.trim() })
      });

      const data = await response.json();
      setIsScanning(false);

      if (response.ok) {
        setScanResult(data);
      } else {
        throw new Error(data.error || 'Scan endpoint failed');
      }
    } catch (err) {
      setIsScanning(false);
      alert('Scanning failed. Please verify server status.');
    }
  };

  const triggerNegotiator = () => {
    if (negotiating || !scanResult) return;
    setNegotiating(true);
    setNegotiationTicks([]);

    const ticks = [
      '🔍 Initializing Subspace Negotiate API agent...',
      `📊 Analyzing competitor price grids for ${scanResult.merchant}...`,
      '💡 Checking corporate subscription bundles & active family tier seats...',
      '🤝 Presenting 3-month split slot commitment to provider database APIs...',
      '🏆 Success! Secured optimized margin group split.'
    ];

    ticks.forEach((tick, idx) => {
      setTimeout(() => {
        setNegotiationTicks(prev => [...prev, tick]);
        if (idx === ticks.length - 1) {
          setNegotiating(false);
        }
      }, (idx + 1) * 1200);
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-805 rounded-xl p-6" id="subspace-parser-section">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* INPUT COLUMN (LEFT) */}
        <div className="w-full lg:w-2/5 space-y-4">
          <div>
            <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 rounded">
              Subspace.money
            </span>
            <h3 className="text-lg font-sans font-semibold text-white mt-2">
              Autonomous Auto-Detection Simulator
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1">
              Select or paste bank transaction SMS lines below. Witness how Subspace transforms SMS friction into elegant, secure automated management.
            </p>
          </div>

          {/* TEMPLATE BUTTONS */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              Select Indian Bank SMS Templates
            </label>
            <div className="space-y-1.5 pt-1">
              {smsTemplates.map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateClick(tmpl.text)}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-white transition font-sans text-zinc-300 truncate"
                >
                  <span className="font-mono text-[9px] text-zinc-550 border border-zinc-900 px-1 py-0.2 rounded mr-1.5 shrink-0">
                    {tmpl.label.toUpperCase()}
                  </span>
                  {tmpl.text}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT FORM */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5">
              <ScanLine className="w-3.5 h-3.5 text-zinc-400" />
              Raw SMS / Transaction Input Terminal
            </label>
            <textarea
              className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono resize-none"
              placeholder="Paste custom Indian bank transaction SMS here..."
              value={smsInput}
              onChange={e => setSmsInput(e.target.value)}
            />
            <button
              onClick={handleScanInvoices}
              disabled={!smsInput.trim() || isScanning}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-sans font-semibold text-xs py-2.5 px-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Extracting Recurrency Parameters...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Scan Transaction SMS
                </>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS GRID / CARD (RIGHT) */}
        <div className="flex-1 min-h-[460px] bg-zinc-950 border border-zinc-890 rounded-xl overflow-hidden flex flex-col relative pt-4 pb-4">
          {scanResult ? (
            <div className="px-6 flex-1 flex flex-col justify-between space-y-5">

              {/* DETECTION METADATA CONTAINER */}
              <div className="border border-zinc-850/60 bg-zinc-900/20 rounded-xl p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Auto-Detected Merchant</span>
                    <h4 className="text-xl font-sans font-bold text-white mt-1">
                      {scanResult.merchant}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Classified Sum</span>
                    <p className="text-xl font-mono font-black text-emerald-400 mt-1">
                      ₹{scanResult.amount}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4 border-t border-zinc-800/80 pt-3">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-zinc-500">Category Tag</span>
                    <p className="text-xs font-semibold text-zinc-300 mt-0.5">{scanResult.category}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono text-zinc-500">Pattern Status</span>
                    <p className="text-xs font-semibold text-zinc-300 mt-0.5">
                      {scanResult.isRecurring ? '🔄 Recurring Bill' : '✖ One-Time Pay'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono text-zinc-500">Confidence Scale</span>
                    <p className="text-xs font-bold text-indigo-400 mt-0.5">{scanResult.confidence}% Confidence</p>
                  </div>
                </div>
              </div>

              {/* DEBT-BLOCK SPLITTING CONTROLS */}
              {scanResult.isRecurring && (
                <div className="border border-zinc-850/60 bg-zinc-900/20 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <h4 className="text-xs font-sans font-bold text-zinc-100">
                          Group split Allocation
                        </h4>
                      </div>
                      <p className="text-[10px] text-zinc-550 leading-relaxed mt-0.5">
                        Solve social invoice debt (Feedback #2) utilizing auto UPI mandate triggers
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id="autoUPI"
                        checked={autopayEnabled}
                        onChange={e => setAutopayEnabled(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="autoUPI" className="text-[10px] font-mono text-zinc-400 cursor-pointer">
                        UPI Autopay Split
                      </label>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans bg-zinc-950/80 p-3 rounded-lg border border-zinc-900">
                    {scanResult.groupSplitRecommendation}
                  </p>

                  {autopayEnabled && (
                    <div className="bg-emerald-950/30 border border-emerald-900/50 p-2.5 rounded-lg text-[10px] font-sans text-emerald-300 flex items-center gap-2 animate-fade-in">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>**SPLIT LOCKED**: Members pre-authorized automated UPI e-mandates. No manual messaging splits are required!</span>
                    </div>
                  )}
                </div>
              )}

              {/* INTERACTIVE NEGOTIATING CONSOLE */}
              <div className="border border-zinc-850/60 bg-zinc-950 rounded-xl p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 justify-between">
                    <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                      Negotiator Live-Feed Ticker
                    </span>
                    <button
                      onClick={triggerNegotiator}
                      disabled={negotiating}
                      className="text-[9px] font-mono bg-zinc-900 text-indigo-400 border border-zinc-800 hover:border-zinc-700 px-2 py-0.5 rounded transition cursor-pointer"
                    >
                      {negotiating ? 'Negotiating...' : 'Trigger AI Bargain'}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-550 mb-3 block">
                    Secures targeted pricing (Feedback #4) transparently via real-time conversational logs:
                  </p>

                  <div className="space-y-1.5 font-mono text-[10px] text-zinc-300 overflow-y-auto max-h-[140px] pt-1">
                    {negotiationTicks.length === 0 ? (
                      <div className="text-zinc-600 italic py-2 text-center text-[9px]">
                        Click 'Trigger AI Bargain' to watch Subspace's Negotiation Agent negotiate pricing structures...
                      </div>
                    ) : (
                      negotiationTicks.map((tick, idx) => (
                        <div key={idx} className="flex gap-2 items-start leading-relaxed animate-fade-in">
                          <span className="text-indigo-400 font-bold">»</span>
                          <span>{tick}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {negotiationTicks.length === 5 && !negotiating && (
                  <div className="bg-indigo-950/20 border border-indigo-900/30 text-indigo-300 rounded-lg p-3 text-xs leading-relaxed font-sans mt-3">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 inline-block mr-1" />
                    <span className="font-semibold">Bargain Outcome estimate</span>: {scanResult.negotiateSavingsEstimate}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <Layers className="w-10 h-10 text-zinc-700 animate-pulse mb-3" />
              <h4 className="text-sm font-sans font-medium text-zinc-400">Sandbox Extraction Terminal</h4>
              <p className="text-xs text-zinc-650 max-w-sm mt-1">
                Select an Indian Bank SMS template on the left or paste a bank confirmation, then click 'Scan Transaction' to generate interactive categorization matrices instantly.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
