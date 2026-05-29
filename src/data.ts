/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyTeardown } from './types';

export const vocallabsData: CompanyTeardown = {
  id: 'vocallabs',
  name: 'Vocallabs.ai',
  tagline: 'AI voice agents automating business calls with human-like fluency',
  industry: 'Conversational AI / Enterprise SaaS',
  moats: [
    'Full-stack ownership (Design → Execution → Analytics) eliminating multi-vendor lag.',
    'India-first focus: Highly optimized for localized dialect blend, accents, and multilingual Hinglish workflows.',
    'Data flywheel: Proprietary conversation intelligence database growing exponentially with scale.',
    'Continuous dynamic feedback loop capturing acoustic biomarkers (sentiment, fatigue) beyond standard speech-to-text.'
  ],
  features: [
    'Natural, unscripted AI voice agents for Sales, Customer Support, and Appointment Booking.',
    'Intelligent Call Flow Builder with canvas-based node arrangements for personalized AI call transcripts.',
    'Workflow Automation Integrations: Developer SDKs, custom n8n nodes, and structured Chrome extensions.',
    'Hybrid Human Transfer Protocol: Zero-latency, seamless handshake from AI agent to active human desk.',
    'Advanced Audio Analytics Engine: Capturing emotion, pacing, user interrupt signals, and ambient noise levels.'
  ],
  icps: [
    'Indian e-commerce D2C brands: Outbound cart recovery & verification calls.',
    'Hyperlocal Logistics & On-Demand Booking: Ride/delivery confirmations & dynamic ETA support.',
    'Consumer Fintech & Micro-Lending: Multi-dialect outbound collections, verification & payment alerts.',
    'SME Enterprise Services (Salons, Clinics): Automated booking, reminders, and off-hour response desks.'
  ],
  swot: {
    strengths: [
      'Stellar low-latency response (<1.2s) in native Indian accents.',
      'Canvas call-flow builder makes visual scripting non-technical.',
      'Hybrid model retains high CSAT by allowing human-failover.'
    ],
    weaknesses: [
      'Friction in outbound calling APIs due to regional carrier whitelisting rules.',
      'Analytics dashboard separates vocal markers from text-based triggers.',
      'SME self-onboarding flow is missing a template library.'
    ],
    opportunities: [
      'Deep prebuilt integrations with local Indian CRM/ERP portals (Vyapar, Petpooja, Dukaan).',
      'Dynamic Hinglish Translation layer minimizing transcription cloud compute overhead.',
      'Voice-to-action APIs triggered directly on WhatsApp Business channels.'
    ],
    threats: [
      'Hyperscaler competition (Google CCAPI, Twilio AI) pricing down voice minutes.',
      'Aggressive regulatory intervention regarding automated outbound cold-calling.',
      'Rapidly falling API costs leading to low vendor-switching resistance.'
    ]
  },
  porter: {
    rivalry: 'High. Scores of early-stage voice AI players are competing on per-minute pricing.',
    entrants: 'High. Wrapper platforms can build basic Twilio + Gemini voice setups in days.',
    substitutes: 'Medium. Standard IVR systems or text-based conversational WhatsApp bots.',
    buyers: 'High. Enterprises have strong negotiation power and demand customized SLAs.',
    suppliers: 'Medium. Underneath, reliance on telecom APIs and core whisper/TTS models.'
  },
  feedbacks: [
    {
      id: 'vocal-1',
      pillar: 'GTM',
      title: 'Local Language Accent Clashing in Sandbox Onboarding',
      observed: 'In the web product sandbox, selecting "English (India)" or local languages triggers standard, generic US-trained TTS nodes. The default voice struggles to blend English nouns with Hindi verbs (Hinglish), resulting in a robotic cadence during live trials.',
      problem: 'High immediate dropoff from trial users (local SME owners, D2C operators) who expect instant regional fluency. It creates a perceived lack of the "India-first" moat, discouraging self-serve expansion.',
      shipInstead: 'Implement a "Hinglish Phoneme Mapper" within the sandbox builder. This lets users type common colloquial phrase maps (e.g., "aapka refund send ho chuka hai") which are phonetically tuned in real-time. Introduce three distinct, hyper-relatable regional voice nodes: a Mumbai-corporate accent, a North-Indian Hinglish accent, and a South-Indian neutral accent.',
      impact: 'High',
      effort: 'Medium'
    },
    {
      id: 'vocal-2',
      pillar: 'UX',
      title: 'Visual Script Bottleneck in Canvas Builder',
      observed: 'The Intelligent Call Flow Builder enforces a visual node hierarchy, but lacks inline node execution. To test even a minor copy adjustment inside Node #12, a creator must launch a mock simulated outbound call and go through the entire script.',
      problem: 'Iteration friction is immense. Script design cycle times stretch from minutes to hours. This high UX drag leads to customer churn in the setup phase, where creators feel building AI voice agents is too tedious.',
      shipInstead: 'Introduce "Instant Node Playground" (Fast Branch Tracing). Users can double-click any visual node on the builder canvas and instantly trigger a text-based conversational exchange or a quick audio playback mimicking precisely *that* node\'s response criteria, bypassing the need to dial out.',
      impact: 'High',
      effort: 'Low'
    },
    {
      id: 'vocal-3',
      pillar: 'Features',
      title: 'Context-Blind Human Agent Handover',
      observed: 'The hybrid voice transition from AI agent to live representative occurs in complete silence. The live human agent joins cold, possessing zero historical context on what the customer said or selected in the first 2 minutes of the call.',
      problem: 'Leads to severe customer frustration because they must repeat their verification details or issue description. It inflates Average Handling Time (AHT) and completely dilutes the speed savings of using an AI agent initially.',
      shipInstead: 'Build an "Active Agent Screen-Pop API" that pushes a 3-bullet semantic brief drafted by server-side summary models (e.g., "Client verification: Success; Issue: Failed refund; Emotion: High irritation") to the live agent\'s ticketing feed the exact second the call is routed.',
      impact: 'High',
      effort: 'High'
    },
    {
      id: 'vocal-4',
      pillar: 'UX',
      title: 'Dysfunctional Transcription-Emotion Heatmaps',
      observed: 'The voice analytics dashboard displays generic emotional categories (e.g., "Frustrated", "Neutral") as static column metadata sitting opposite a clean, monochromatic text transcription block.',
      problem: 'Call quality auditors must listen to the complete 5-minute audio file anyway because they cannot pinpoint when the frustration peaked, rendering the "AI analysis" feature a passive aesthetic decoration.',
      shipInstead: 'Overlay the voice waveform directly onto the transcription view. Color-code the transcription text itself based on vocal frequency spikes (e.g., highlights of Red for anger peaks, Yellow for hesitation pauses, and Green for resolution). Clicking any red word immediately seeks the media player to that audio millisecond.',
      impact: 'Medium',
      effort: 'Medium'
    },
    {
      id: 'vocal-5',
      pillar: 'Collaborations',
      title: 'Unexploited Indian SME Ledger/POS Integrations',
      observed: 'Vocallabs currently relies on generic Zapier webhook triggers, custom GraphQL API setups, or n8n nodes for workflow automation.',
      problem: 'Local Indian micro-merchants (kiranas, salons, cloud kitchens, dentists) who handle high-volume outbound reminder and confirmation calling do not have the technical skills to build APIs or configure cloud workflows. They manage their entire business via dedicated applications like Vyapar, Khatabook, or Petpooja.',
      shipInstead: 'Form strategic GTM integration alliances with Khatabook and Petpooja. Package Vocallabs as a 1-click add-on within their POS dashboard. For example, a restaurant owner on Petpooja can toggle "Automate Reservation Calls", auto-synergizing client tables without configuring a single API payload.',
      impact: 'High',
      effort: 'High'
    }
  ]
};

export const subspaceData: CompanyTeardown = {
  id: 'subspace',
  name: 'Subspace.money',
  tagline: 'Subscribe to anything, delivered in minutes — Subscriptions · Sharing · Rentals',
  industry: 'Fintech / Subscription Marketplace',
  moats: [
    'Bootstrapped & profitable (Rs. 36.5 Cr ARR in FY25) showing incredible unit economics.',
    'Social lock-in effect: Group financial splitting for premium accounts becomes sticky and viral.',
    'Negotiate API: Automated price bargaining engine representing hard-to-replicate behavioral logic.',
    'AI-native operations running on autonomous systems, resulting in incredibly low overhead.'
  ],
  features: [
    'Cohesive Subscription Management, split budgets, and joint cost trackers.',
    'Instant Auto-Detection & Categorization of recurring payment histories via SMS-reading banking APIs.',
    'India-first digital subscription marketplace for local, regional, and national utility bundles.',
    '90%+ operational workflows fully managed by responsive AI-powered system agents.',
    'Group share marketplace reducing the cost of luxury SaaS and premium digital media.'
  ],
  icps: [
    'Urban Gen-Z & College Cohorts: Group-sharing digital media accounts (Spotify, Netflix).',
    'Young Tech Professionals: Tracking SaaS spending, fitness cohorts, and work-related remote utilities.',
    'Modern Indian Households: Consolidating and automating regional utilities (broadband, milk, gym passes).',
    'Solo Freelancers & Creators: Optimizing software spend and running automatic price negotiation filters.'
  ],
  swot: {
    strengths: [
      'Bootstrapped profitability enables long-term product decisions without VCs.',
      'Group split mechanism creates strong network effects and organic growth.',
      'Automated price bargaining API reduces checkout friction.'
    ],
    weaknesses: [
      'High onboarding barrier due to sensitive bank SMS permissions.',
      'Manual UPI settlement collection causes group debt leaks.',
      'Slightly cluttered mobile layout attempts to solve too many consumer flows at once.'
    ],
    opportunities: [
      'SSO-integration with Corporate HR portals for custom employee wellness allowances.',
      'Hyperlocal subscriptions (delivery cards, local dairy, local gyms) as a direct GTM portal.',
      'Incentivizing on-time UPI settlements via UPI-autopay mandate hooks.'
    ],
    threats: [
      'NPCI guidelines cracking down on recurring digital payments/mandates.',
      'Aggressive streaming platform updates blocking password/family sharing structures.',
      'Primary banking apps copying automated subscription tracking dashboards.'
    ]
  },
  porter: {
    rivalry: 'Medium. Minimal direct subscription sharing marketplace competitors, but intense indirect ones.',
    entrants: 'High. Neo-banks can easily include passive subscription trackers inside their primary feeds.',
    substitutes: 'High. Informal excel sheets, Splitwise groups, or manual diary ledgers.',
    buyers: 'High. Gen-Z consumers are highly price-elastic and will churn for Rs. 50 differences.',
    suppliers: 'High. Relying on streaming channels not enforcing heavy geographic sharing bans.'
  },
  feedbacks: [
    {
      id: 'sub-1',
      pillar: 'UX',
      title: 'SMS Permission Wall Friction',
      observed: 'To use the automated recurring bill tracker, the app presents a massive permission dialog requesting full SMS-reading capabilities on initial login, with minimal background context.',
      problem: 'Severe top-of-funnel dropoffs. Indian consumers are hyper-sensitive of SMS permissions due to spam and bank security anxieties. Requesting this major access blindly before proving value breaks trust.',
      shipInstead: 'Implement an interactive "Permissions Sandbox Preview". Let the user experience how it works by inputting a dry copy-pasted invoice or clicking a mock transaction card. Show exactly how the app redacts all 6-digit OTPs and personal identifiers, isolating ONLY subscription billing metadata. Provide a 1-click manual-entry option for anxious users.',
      impact: 'High',
      effort: 'Low'
    },
    {
      id: 'sub-2',
      pillar: 'Features',
      title: 'Manual Settlement Request Deadlocks',
      observed: 'The group splitting console creates automated expense splits, but relies on users sending manual UPI links or passive chat reminders to prompt actual reimbursement.',
      problem: 'High "Social Debt Friction". People feel extremely awkward badgering peer groups for small sums (Rs 40-80). Splits regularly languish unpaid, creating negative NPS and driving down long-term utility ratings.',
      shipInstead: 'Embed "UPI Autopay Mandates" (using e-mandates or UPI Lite) during core group subscription signups. When a user joins a group subscription, they authorize a recurring monthly micro-debit. If auto-debit fails, build a gamified "Karma Rating" system that applies a soft access lock to the shared service if defaults surpass 5 days.',
      impact: 'High',
      effort: 'High'
    },
    {
      id: 'sub-3',
      pillar: 'GTM',
      title: 'Digital SaaS Satiation vs. Local Hyperlocal Spends',
      observed: 'The subscription marketplace concentrates almost exclusively on digital commodities (Netflix, YouTube Premium), categorizing local everyday subscriptions (newspaper, gym, water, milk) as manual entries.',
      problem: 'Digital entertainment represents less than ~15% of an Indian household\'s recurring monthly wallet. Focusing solely on cheap digital tools limits total transaction value (GTV) and lowers daily utilization relevance.',
      shipInstead: 'Move GTM focus to highly stable Local/Hyperlocal Providers. Build a basic "Local Provider Hub" where neighborhood gyms, milkmen, and water suppliers can list recurring UPI monthly card plans. Use Subspace to consolidate both premium digital and essential physical recurring expenses.',
      impact: 'High',
      effort: 'High'
    },
    {
      id: 'sub-4',
      pillar: 'UX',
      title: 'Negotiate API Blindspot Anxieties',
      observed: 'When activating the automated price negotiation feature, the app displays a static, uninformative spinner saying "Negotiator active... Please wait" with no real-time status details.',
      problem: 'User feels disconnected, assuming the app is frozen, and exits early. Devaluing one of Subspace\'s main intellectual properties due to a lack of feedback loops.',
      shipInstead: 'Create an "Agent Live Conversation Ticker". Display a fast, visual conversation layout showcasing the autonomous negotiator agent checking alternative bundle offers, analyzing competitor subscriptions, and securing discounts (e.g., "[14:02:10] Agent matched alternate Youtube plan... [14:02:12] Claiming student rebate... [14:02:15] Secured Rs 60 monthly saving!").',
      impact: 'Medium',
      effort: 'Low'
    },
    {
      id: 'sub-5',
      pillar: 'Collaborations',
      title: 'Corporate Employee Benefit API Integrations',
      observed: 'Subspace operates strictly in a consumer retail structure, acquiring individual split users manually through organic social sharing.',
      problem: 'Extremely high consumer marketing CAC (Customer Acquisition Cost) with relatively high churn risks due to shifting platform rules. Missing the high-value, organized employee expense wallet.',
      shipInstead: 'Build is a lightweight corporate SSO API integration ("Subspace Benefits"). HR departments can utilize Subspace to distribute structured, tax-exempt monthly skill/wellness budgets (e.g. tracking gym, education, broadband subscriptions) automatically verified via Subspace\'s tracker, lowering custom acquisition costs to zero.',
      impact: 'High',
      effort: 'Medium'
    }
  ]
};

export const smsTemplates = [
  {
    id: 'sms-netflix',
    label: 'Netflix Recurring Debit Info',
    text: 'ALERT: Your account ending xx4828 is debited for Rs 649 on 2026-05-28 for recurring transaction at NETFLIX IND.'
  },
  {
    id: 'sms-milkbasket',
    label: 'Milkbasket Daily Topup',
    text: 'DEBIT: Rs 2000 has been debited from your SBI wallet for MILK_BASKET_SERVICES monthly ledger on 2026-05-15.'
  },
  {
    id: 'sms-spotify',
    label: 'Spotify Duo Auto Splitting App',
    text: 'Txn notification: UPI auto-pay mandate of Rs.179 to SPOTIFY INDIA has been processed successfully. Ref:UPI84021.'
  },
  {
    id: 'sms-rent',
    label: 'Apartment Monthly Rent Transfer',
    text: 'HDFC Bank: Rs.18000.00 transferred to A/c xx9102 towards Rent payment on 2026-05-01. Available Bal: Rs.45100.00.'
  }
];

export const flowTemplates = [
  {
    id: 'flow-sales',
    label: 'E-commerce Outbound Cart Recovery',
    persona: 'sales',
    accent: 'hinglish',
    toneVelocity: 7,
    text: 'Hi customer, we saw you left some beautiful items in your cart. Aaj buying check karein? We can offer you an extra 10% coupon code if you checkout today!'
  },
  {
    id: 'flow-support',
    label: 'SME Tech Support — Failed Transaction refund',
    persona: 'support',
    accent: 'south-indian',
    toneVelocity: 4,
    text: 'Welcome to Vocallabs support. I understand your UPI transaction of Rs.850 failed but amount is cut from bank layout. Don\'t worry, refund copy generate ho chuka hai. It will be credited in 3 days.'
  },
  {
    id: 'flow-booking',
    label: 'Doctor Consultation Appointment Slot Booking',
    persona: 'booking',
    accent: 'neutral',
    toneVelocity: 5,
    text: 'Hello, I can help you secure an appointment with Dr. Gupta tomorrow at 4:30 PM. Shall I lock this slot for you?'
  }
];
