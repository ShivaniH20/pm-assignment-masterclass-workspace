<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Vocallabs.ai & Subspace.money — Product Intern Teardown Assignment Portfolio

An interactive, high-fidelity portfolio workspace designed to strategically analyze, refine, and teardown core frameworks for **Vocallabs.ai** and **Subspace.money** as part of the Product Intern Assignment.

This repository features structured **Observation → Problem → Actionable Solution** feedback modules across all major product pillars (UX, Features, GTM, Competitor Analysis, and Collaborations) combined with custom live-interactive terminal sandboxes powered by Google Gemini 3.5.

View your app in AI Studio: [[https://ai.studio/apps/d0df9f46-54e7-40fd-91ce-865a8826ee0a](https://aistudio.google.com/apps/d0df9f46-54e7-40fd-91ce-865a8826ee0a?showAssistant=true&showPreview=true&fullscreenApplet=true)]

---

## Workspace Features

- 🖥️ **Interactive Slide Presentation**: Synthesizes strategic matrices and all 5 sharp PM feedbacks into a clean, presentation-ready slide layout.
- 📊 **Dynamic SWOT & Porter's 5 Forces Matrices**: High-fidelity strategic diagnostic grids complete with options for on-the-fly parameter customization.
- 🤖 **Copilot Feedback Refiner**: Integrates server-side Gemini 3.5 Intelligence to dynamically refine draft bullet points into metric-driven, professional PM insights with built-in engineering tradeoff evaluations.
- 🎙️ **Vocallabs.ai Acoustic Sandbox**: Simulates interactive voice agent workflows under custom accent nodes (Hinglish/English), emotion waveforms, and dynamic Human Handover popups.
- 💳 **Subspace.money Automations Scanner**: Parses real conversational bank SMS text transactions into structured subscription statuses, displaying split recommendations and price negotiation threads on-the-fly.
- 📄 **Export-Ready Deck Formatter**: Instantly compiles refined SWOT parameters and feedback modules into beautiful, copyable markdown chunks or down-loadable files.

---

## Run Locally

**Prerequisites:** Node.js (v18+)

Follow these steps to setup and boot the interactive teardown portfolio environment locally:

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Configure Environment Secrets
Create a `.env` file in the root directory (or update the provided template `.env.example`) and append your Gemini Developer API key:
```env
GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY"
```

### 3. Start Development Server
Launches the full-stack system backend powered by Express + TSX alongside the frontend Vite build compiler:
```bash
npm run dev
```

The terminal will boot, and your application will be available at: http://localhost:3000

---

## Design & Architecture Highlights

- **Tailwind CSS Utility Design**: High-density Slate visual system providing stellar spacing rhythm, responsive layouts, and cursor feedback.
- **Micro-interactions**: Embedded physics visualizers, auto-scrolling chat terminals, and dynamic popup alerts rendering mock state changes with instant accuracy.
- **Server-Side Security**: Dedicated API router tunnels for dynamic transcription and SMS-parsing blocks, securing secret API tokens server-side away from client-side inspectors.

*Drafted for Product Intern Assignment Evaluation — Portfolio crafted with extreme PM rigor and technical polish.*
