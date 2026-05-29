/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Phone, PhoneOff, Send, Volume2, ShieldAlert, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { CallTurn, VoiceSimulationConfig } from '../types';
import { flowTemplates } from '../data';

export function VoiceSimulator() {
  const [config, setConfig] = useState<VoiceSimulationConfig>({
    voicePersona: 'support',
    accent: 'hinglish',
    toneVelocity: 6,
    customRules: 'User is querying about a failed billing transaction.'
  });

  const [isCalling, setIsCalling] = useState(false);
  const [chatHistory, setChatHistory] = useState<CallTurn[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>({
    emotion: 'Calm',
    intent: 'None detected',
    liveAgentTrigger: false
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const toggleCall = () => {
    if (isCalling) {
      setIsCalling(false);
      setChatHistory([]);
      setCurrentAnalysis({
        emotion: 'Calm',
        intent: 'None detected',
        liveAgentTrigger: false
      });
    } else {
      setIsCalling(true);
      // Trigger introductory greeting turn
      const introText = flowTemplates.find(f => f.persona === config.voicePersona)?.text ||
        "Hello! Kaise help kar sakte hain aapki aaj? Welcome to Vocallabs.";

      setChatHistory([
        {
          sender: 'agent',
          text: introText,
          timestamp: new Date().toLocaleTimeString(),
          emotion: 'Calm',
          intent: 'Greeting'
        }
      ]);
    }
  };

  const handleTemplateSelect = (template: typeof flowTemplates[0]) => {
    setConfig({
      voicePersona: template.persona as any,
      accent: template.accent as any,
      toneVelocity: template.toneVelocity,
      customRules: `Testing prebuilt flow: ${template.label}`
    });

    if (isCalling) {
      // Reboot call with new system intro
      setChatHistory([
        {
          sender: 'agent',
          text: template.text,
          timestamp: new Date().toLocaleTimeString(),
          emotion: 'Calm',
          intent: 'Restarted greeting'
        }
      ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || isTyping) return;

    const userTurn: CallTurn = {
      sender: 'user',
      text: inputMsg.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userTurn]);
    setInputMsg('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/sandbox/vocal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config,
          chatHistory: chatHistory.concat(userTurn),
          userMessage: userTurn.text
        })
      });

      const data = await response.json();
      setIsTyping(false);

      if (response.ok) {
        setChatHistory(prev => [...prev, {
          sender: 'agent',
          text: data.agentMessage,
          timestamp: new Date().toLocaleTimeString(),
          emotion: data.analysis.emotion,
          intent: data.analysis.intent
        }]);

        setCurrentAnalysis({
          emotion: data.analysis.emotion,
          intent: data.analysis.intent,
          liveAgentTrigger: data.analysis.liveAgentTrigger,
          // Extract highlights based on emotion peaks
          highlightColor: data.analysis.emotion === 'Frustrated' ? 'bg-rose-500/20 text-rose-300' :
                          data.analysis.emotion === 'Anxious' ? 'bg-amber-500/20 text-amber-300' :
                          data.analysis.emotion === 'Satisfied' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-300'
        });
      } else {
        throw new Error(data.error || 'Server call failed');
      }
    } catch (err) {
      setIsTyping(false);
      setChatHistory(prev => [...prev, {
        sender: 'system',
        text: 'Microphone timeout or API error. Please confirm your Secrets parameter configurations.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6" id="vocal-simulator-card">
      <div className="flex flex-col md:flex-row gap-6">

        {/* CONTROLS COLUMN (LEFT) */}
        <div className="w-full md:w-1/3 space-y-4 border-r border-zinc-800/80 pr-0 md:pr-6">
          <div>
            <span className="text-xs font-mono font-medium text-indigo-400 bg-indigo-950/60 border border-indigo-900/60 px-2 py-0.5 rounded">
              Vocallabs.ai
            </span>
            <h3 className="text-lg font-sans font-semibold text-white mt-2">
              AI Voice Agent Sandbox
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1">
              Test dynamic accents, emotion tracking filters, and our Human Handover protocol live.
            </p>
          </div>

          {/* TEMPLATE BUTTONS */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              Select Flow Templates
            </label>
            <div className="space-y-1.5 pt-1">
              {flowTemplates.map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateSelect(tmpl)}
                  className="w-full flex items-center justify-between text-left px-3 py-2 text-xs rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition font-sans text-zinc-300 group"
                >
                  <span className="truncate pr-2 font-medium group-hover:text-white transition">
                    {tmpl.label}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800/80 px-1.5 py-0.2 rounded capitalize shrink-0">
                    {tmpl.persona}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CONFIG SLIDERS */}
          <div className="space-y-3 bg-zinc-950 p-4 border border-zinc-850 rounded-xl">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold border-b border-zinc-90 w-full pb-1">
              Acoustic Parameters
            </h4>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-400">Accent Style</label>
              <select
                value={config.accent}
                onChange={e => setConfig(prev => ({ ...prev, accent: e.target.value as any }))}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-2 rounded-lg font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="hinglish">Hinglish Dialect Blend</option>
                <option value="south-indian">South Indian English Style</option>
                <option value="neutral">Neutral Global Tone</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-400">Persona Role</label>
              <select
                value={config.voicePersona}
                onChange={e => setConfig(prev => ({ ...prev, voicePersona: e.target.value as any }))}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-2 rounded-lg font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="sales">Sales & Outbound Cart Recovery</option>
                <option value="support">Active SME Tech Support</option>
                <option value="booking">Calendar Appointment Booking</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>Tone Cadence Energy</span>
                <span>{config.toneVelocity}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={config.toneVelocity}
                onChange={e => setConfig(prev => ({ ...prev, toneVelocity: parseInt(e.target.value) }))}
                className="w-full accent-indigo-500 bg-zinc-800 h-1.5 rounded cursor-pointer mt-1"
              />
            </div>
          </div>
        </div>

        {/* CALL INTERFACE COLUMN (RIGHT) */}
        <div className="flex-1 flex flex-col h-[520px] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden relative">

          {/* CALLING MONITOR HEADER */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isCalling ? 'bg-red-500 animate-pulse' : 'bg-zinc-650'}`} />
              <div>
                <span className="text-xs text-white font-sans font-semibold">
                  {isCalling ? 'Live Simulated Voice Line' : 'Voice Agent Offline'}
                </span>
                <p className="text-[10px] font-mono text-zinc-500">
                  {isCalling ? `Dialed In • Accent: ${config.accent.toUpperCase()}` : 'Click Dial to Initiate Onboarding Session'}
                </p>
              </div>
            </div>

            <button
              onClick={toggleCall}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition duration-150 border cursor-pointer ${
                isCalling
                  ? 'bg-rose-950 text-rose-300 border-rose-900 hover:bg-rose-900/30'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-900 hover:bg-emerald-900/30'
              }`}
            >
              {isCalling ? <PhoneOff className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
              {isCalling ? 'Hang Up' : 'Dial Sandbox'}
            </button>
          </div>

          {/* CONVERSATION BOX */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {!isCalling ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <Volume2 className="w-10 h-10 text-zinc-500 animate-bounce mb-3" />
                <h4 className="text-sm font-sans font-medium text-zinc-300">Intelligent Node Agent Simulator</h4>
                <p className="text-xs text-zinc-500 max-w-sm mt-1">
                  Click 'Dial Sandbox' to launch an inline conversation. Use this visual feedback flow to verify user's interactive journey, testing the absolute accuracy of our analytical moats!
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-sans text-xs">
                {chatHistory.map((turn, index) => {
                  const isAgent = turn.sender === 'agent';
                  const isSystem = turn.sender === 'system';

                  if (isSystem) {
                    return (
                      <div key={index} className="flex justify-center">
                        <span className="bg-amber-950/40 border border-amber-900/50 text-amber-300 px-3 py-1.5 rounded-lg text-center max-w-md font-mono text-[10px] flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {turn.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={index} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] rounded-xl px-4 py-3 leading-relaxed border ${
                        isAgent
                          ? 'bg-zinc-900 text-zinc-100 border-zinc-800'
                          : 'bg-indigo-950/40 text-indigo-100 border-indigo-900/50'
                      }`}>
                        <div className="flex items-center justify-between gap-6 mb-1 text-[9px] font-mono text-zinc-550">
                          <span className="font-semibold uppercase tracking-wider">
                            {isAgent ? 'AI Agent (Vocallabs)' : 'User Prompter'}
                          </span>
                          <span>{turn.timestamp}</span>
                        </div>
                        <p>{turn.text}</p>

                        {/* SHARP ACCENT EMOTION HIGHLITES */}
                        {isAgent && turn.emotion && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-2 border-t border-zinc-800/80 pt-2 font-mono text-[9px]">
                            <span className="text-zinc-500">Tonal Sentiments:</span>
                            <span className={`px-1 rounded font-medium ${
                              turn.emotion === 'Frustrated' ? 'bg-rose-950 text-rose-300 border border-rose-900/40' :
                              turn.emotion === 'Anxious' ? 'bg-amber-950 text-amber-300 border border-amber-900/40' :
                              turn.emotion === 'Satisfied' ? 'bg-emerald-950 text-emerald-300 border border-emerald-900/40' :
                              'bg-zinc-950 text-zinc-300'
                            }`}>
                              {turn.emotion}
                            </span>
                            {turn.intent && (
                              <>
                                <span className="text-zinc-550">| Intent:</span>
                                <span className="text-zinc-400 font-sans italic truncate max-w-[120px]">{turn.intent}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-3 text-zinc-400 flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 animate-bounce text-indigo-400" />
                      <span className="text-[10px] font-mono animate-pulse">Agent synthesizing voice outputs...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* DYNAMIC HANDOVER BANNER TRIGGERED LIVE */}
          {isCalling && currentAnalysis.liveAgentTrigger && (
            <div className="absolute top-[80px] left-4 right-4 bg-rose-950/95 border border-rose-800 rounded-xl p-4 shadow-xl z-10 animate-fade-in font-sans text-xs text-rose-100">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                <div className="flex-1">
                  <span className="font-bold block text-sm">PROTOTYPE: Active Human Handover Routed!</span>
                  <p className="text-[11px] text-rose-300 leading-relaxed mt-1">
                    Your suggested feature **Context-Pop human integration (Feedback #3)** has successfully intercepted the call! Pushing context-overlay parameters to the agent desk console instantly:
                  </p>
                  <div className="bg-zinc-950 border border-rose-900/40 rounded-lg p-2.5 mt-2 space-y-1 font-mono text-[10px] text-zinc-300">
                    <div><span className="text-emerald-400">⚡ Client Issue:</span> Failed UPI payment transaction loop</div>
                    <div><span className="text-rose-400">⚡ Irritation Peak detected:</span> {currentAnalysis.emotion || 'High'}</div>
                    <div><span className="text-indigo-400">⚡ Session Key:</span> VL_MOCK_SANDBOX_ID842</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAT INPUT FORM */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800 bg-zinc-900/40 flex items-center gap-2">
            <input
              type="text"
              disabled={!isCalling || isTyping}
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              placeholder={isCalling ? "Type what the customer says (e.g., 'My payment cut, refund send dalo please' or 'Let me speak to a human')" : "Click Dial Sandbox above to test..."}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!isCalling || !inputMsg.trim() || isTyping}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white p-2.5 rounded-lg transition shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
