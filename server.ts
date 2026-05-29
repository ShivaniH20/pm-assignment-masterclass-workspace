/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Vocallabs Dynamic voice simulation endpoint
app.post('/api/sandbox/vocal', async (req: Request, res: Response): Promise<void> => {
  const { config, chatHistory, userMessage } = req.body;
  const persona = config?.voicePersona || 'support';
  const accent = config?.accent || 'hinglish';
  const toneVelocity = config?.toneVelocity || 5;
  const customRules = config?.customRules || '';

  const mappedHistory = (chatHistory || []).map((t: any) => `${t.sender === 'user' ? 'Customer' : 'AI Agent'}: ${t.text}`).join('\n');

  if (!ai) {
    // Elegant fallback simulation if no API key is present
    const isHumanRequested = userMessage.toLowerCase().includes('human') ||
                             userMessage.toLowerCase().includes('agent') ||
                             userMessage.toLowerCase().includes('staff') ||
                             userMessage.toLowerCase().includes('manager');

    let responseText = "Haanji, I hear you. Let me check that transaction status for you right away. Ek minute hold kijiye please.";
    if (persona === 'sales') {
      responseText = `Achha suniye, our catalog has the best premium models available. Let's book a trial slot for you today, what do you say? Only 2 spots left!`;
    } else if (persona === 'support') {
      responseText = `I understand you might be stressed. Under my rules, let's verify your identity. Kya aap apna transaction ID bata sakte hain? Quick check kar lete hain.`;
    } else if (persona === 'booking') {
      responseText = `Sure, we can schedule that booking. Kal 4:00 PM confirm kar dein aapke liye? Please let me know if that works.`;
    }

    if (accent === 'south-indian') {
      responseText += " Mind you, it will reflect very soon.";
    }

    const estimatedEmotion = userMessage.toLowerCase().includes('bad') || userMessage.toLowerCase().includes('fail') || userMessage.toLowerCase().includes('angry') ? 'Frustrated' : 'Calm';

    res.json({
      agentMessage: responseText,
      transcription: responseText,
      analysis: {
        emotion: estimatedEmotion,
        intent: `Query related to ${persona} services`,
        cadenceScale: toneVelocity,
        liveAgentTrigger: isHumanRequested,
      },
      apiKeyFound: false,
    });
    return;
  }

  try {
    const prompt = `
You are simulating a phone intelligence call system built by Vocallabs.ai.
System Configuration:
- Persona: ${persona} (sales, support, or booking)
- Target accent style: ${accent} (hinglish: mix of hindi and english, south-indian: South Indian English dialect, or neutral: clean global tone)
- Tone energy scale: ${toneVelocity}/10
- Merchant custom behavior notes: ${customRules}

Previous context logs:
${mappedHistory}

The customer dynamic vocal prompt is: "${userMessage}"

You must respond with the next turn spoken by the AI agent. Keep the greeting or prompt spoken extremely short, conversational, and direct, suitable for a phone line (strictly max 2-3 sentences).
Also analyze the user message's tonal emotion (choose exactly one: "Calm", "Frustrated", "Anxious", "Satisfied"), classify their short core intent, and decide if a live human agent trigger is requested (e.g. user demands "talk to human", "manager", "support desk", or highlights severe distress).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            agentMessage: {
              type: Type.STRING,
              description: 'The spoken response of the AI call simulator. Match the localized accent guidelines and persona.',
            },
            emotion: {
              type: Type.STRING,
              description: ' Tonal sentiments: Calm, Frustrated, Anxious, Satisfied',
            },
            intent: {
              type: Type.STRING,
              description: 'A 3-5 word categorization of user Intent',
            },
            liveAgentTrigger: {
              type: Type.BOOLEAN,
              description: 'True if customer explicitly demands human backup or is highly agitated',
            },
          },
          required: ['agentMessage', 'emotion', 'intent', 'liveAgentTrigger'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json({
      agentMessage: parsedData.agentMessage,
      transcription: parsedData.agentMessage,
      analysis: {
        emotion: parsedData.emotion || 'Calm',
        intent: parsedData.intent || 'General Query',
        cadenceScale: toneVelocity,
        liveAgentTrigger: !!parsedData.liveAgentTrigger,
      },
      apiKeyFound: true,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// 2. Subspace API Recurring Auto-detection Bill Parser simulation endpoint
app.post('/api/sandbox/subspace', async (req: Request, res: Response): Promise<void> => {
  const { smsText } = req.body;

  if (!smsText) {
    res.status(400).json({ error: 'Missing smsText in request parameters' });
    return;
  }

  if (!ai) {
    // Static local rules fallback if Gemini key is missing
    const textLower = smsText.toLowerCase();
    let merchant = 'Unknown Merchant';
    let amount = 0;
    let confidence = 50;
    let category = 'Utilities';
    let isRecurring = false;
    let savings = 'Save up to 15% through group negotiations';
    let splitTip = 'Recommended split: Rs. 0.00 split 3-ways.';

    if (textLower.includes('netflix')) {
      merchant = 'Netflix India';
      amount = 649;
      confidence = 95;
      category = 'Entertainment';
      isRecurring = true;
      savings = 'Secured alternative 4-screen splits saves Rs. 400/month';
      splitTip = 'Split with 3 friends on Subspace: Rs 162.25 per member!';
    } else if (textLower.includes('milkbasket')) {
      merchant = 'Milkbasket Services';
      amount = 2000;
      confidence = 90;
      category = 'Groceries & Foods';
      isRecurring = true;
      savings = 'Subscription bundle coupon saves Rs 150 wallet topups';
      splitTip = 'Monthly ledger can be auto-debited with family balance shares.';
    } else if (textLower.includes('spotify')) {
      merchant = 'Spotify Premium';
      amount = 179;
      confidence = 98;
      category = 'Entertainment';
      isRecurring = true;
      savings = 'Spotify family split slots reduce personal recurring to Rs 59/month';
      splitTip = 'Automated UPI Autopay setup is perfect for this Duo split.';
    } else if (textLower.includes('rent')) {
      merchant = 'Rent payment';
      amount = 18000;
      confidence = 80;
      category = 'Rent & Housing';
      isRecurring = true;
      savings = 'Standard rent payments do not support discounts, but you can secure credit-card points.';
      splitTip = 'Equally divided bills saves group follow-ups: split is Rs. 9,000 each.';
    }

    res.json({
      isRecurring,
      merchant,
      amount,
      category,
      confidence,
      groupSplitRecommendation: splitTip,
      negotiateSavingsEstimate: savings,
      apiKeyFound: false,
    });
    return;
  }

  try {
    const prompt = `
You are Subspace.money's AI recurring billing agent parser engine.
Your task is to analyze the following transactional SMS or payment confirmation notification text from a client's inbox:
"${smsText}"

Please identify:
1. Is it a recurring subscription payment? (e.g. netflix, milk delivery, gym, spotify, rent, broadband utilities). Return true/false.
2. The Merchant name. Clean up standard Indian bank notification garbage (e.g. NETFLIX IND should become "Netflix India").
3. Debited transaction amount in Rs. (as an Integer).
4. Category of of expenses (e.g. Entertainment, Utilities, Groceries, Rent & Housing, Health & Fitness).
5. Confidence percentage of this analysis (integer from 0 to 100).
6. A group splitting tip customized based on this cost (e.g. "Recommend splitting 4-ways on Subspace Marketplace for Rs. X per user").
7. A smart Negotiation saving quote (how Subspace can negotiate or optimize this split price).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isRecurring: { type: Type.BOOLEAN },
            merchant: { type: Type.STRING },
            amount: { type: Type.INTEGER },
            category: { type: Type.STRING },
            confidence: { type: Type.INTEGER },
            groupSplitRecommendation: { type: Type.STRING },
            negotiateSavingsEstimate: { type: Type.STRING },
          },
          required: ['isRecurring', 'merchant', 'amount', 'category', 'confidence', 'groupSplitRecommendation', 'negotiateSavingsEstimate'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json({
      ...parsedData,
      apiKeyFound: true,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// 3. Teardown Copilot refiner helper endpoint
app.post('/api/copilot/refine', async (req: Request, res: Response): Promise<void> => {
  const { currentFeedback, focusPillar } = req.body;
  const observed = currentFeedback?.observed || '';
  const problem = currentFeedback?.problem || '';
  const shipInstead = currentFeedback?.shipInstead || '';

  if (!ai) {
    // Quality fallback text if no API key is available
    res.json({
      refinedFeedback: {
        observed: observed + ' (Enhanced offline with PM rigor checks)',
        problem: problem + ' This increases conversion dropoffs by affecting trust scores.',
        shipInstead: 'Deploy a lightweight visual demo block beforehand. ' + shipInstead,
      },
      tradeoffAnalysis: `### Offline Tradeoff Metric Checks\n- **Dev Effort vs Impact**: Low setup complexity, solves the immediate dropoff problem.\n- **Risk**: Minimal change to primary codebase. User trust gains are highly valuable.`,
      apiKeyFound: false,
    });
    return;
  }

  try {
    const prompt = `
You are a Principal Product Manager helping a candidate refine their product teardown feedback for their application.
The focus pillar is: ${focusPillar}

Current Candidate Draft:
(a) Observed: ${observed}
(b) Problem: ${problem}
(c) Ship instead: ${shipInstead}

Please:
1. Refine the copywriting of the 3 sections to make them sound extremely smart, precise, metric-oriented, and professional. Avoid fluffy or generic PM jargon. Make sure the Problem focuses on actual business/user pain (conversion, active engagement, NPS, friction) and the "Ship instead" provides a concrete, highly actionable product design solution.
2. Provide a short, direct PM "Tradeoff Analysis" outlining exactly the implementation tradeoffs (engineering complexity, conversion upsides, potential friction risks) of shipping this suggestion.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedObserved: { type: Type.STRING },
            refinedProblem: { type: Type.STRING },
            refinedShipInstead: { type: Type.STRING },
            tradeoffAnalysis: { type: Type.STRING, description: 'Markdown list of tradeoffs, engineering difficulty vs user metrics impact.' },
          },
          required: ['refinedObserved', 'refinedProblem', 'refinedShipInstead', 'tradeoffAnalysis'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json({
      refinedFeedback: {
        observed: parsedData.refinedObserved,
        problem: parsedData.refinedProblem,
        shipInstead: parsedData.refinedShipInstead,
      },
      tradeoffAnalysis: parsedData.tradeoffAnalysis,
      apiKeyFound: true,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// -------------------------------------------------------------
// Vite or Static file serving setup
// -------------------------------------------------------------
async function bootstrapServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ProdTeardownServer] Express container running locally on http://localhost:${PORT}`);
  });
}

bootstrapServer().catch((err) => {
  console.error('[ProdTeardownServer] Startup failed with error:', err);
});
