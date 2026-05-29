/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeardownFeedback {
  id: string;
  pillar: 'GTM' | 'Competitor' | 'Features' | 'UX' | 'Collaborations';
  title: string;
  observed: string;
  problem: string;
  shipInstead: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
}

export interface SWOTMetric {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface PorterForces {
  rivalry: string;
  entrants: string;
  substitutes: string;
  buyers: string;
  suppliers: string;
}

export interface CompanyTeardown {
  id: 'vocallabs' | 'subspace';
  name: string;
  tagline: string;
  industry: string;
  moats: string[];
  features: string[];
  icps: string[];
  feedbacks: TeardownFeedback[];
  swot: SWOTMetric;
  porter: PorterForces;
}

export interface CallTurn {
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  emotion?: string;
  intent?: string;
}

export interface VoiceSimulationConfig {
  voicePersona: 'sales' | 'support' | 'booking';
  accent: 'hinglish' | 'south-indian' | 'neutral';
  toneVelocity: number; // 1 to 10
  customRules: string;
}
