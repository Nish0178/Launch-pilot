# LaunchPilot AI

AI-powered startup validation platform that helps entrepreneurs validate ideas, analyze markets, identify risks, generate pitch decks, and receive investor-ready insights.

Features
- AI Startup Validation
- Market Research
- SWOT Analysis
- Investor Readiness Score
- AI Co-Founder
- Digital Twin Simulation
- Pitch Deck Generation
- Branding Generator
- Business Plan Generator
-
- # 🏗️ System Architecture

```text
┌─────────────────────────────────────────┐
│                User Browser             │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│          Frontend (Next.js)             │
│                                         │
│ • Next.js 15                            │
│ • TypeScript                            │
│ • Tailwind CSS                          │
│ • Clerk Authentication                  │
│ • Dashboard & Analytics UI              │
└─────────────────┬───────────────────────┘
                  │ REST API
                  ▼
┌─────────────────────────────────────────┐
│         Backend (Express.js)            │
│                                         │
│ • Node.js                               │
│ • Express.js                            │
│ • Prisma ORM                            │
│ • Business Logic Layer                  │
│ • AI Orchestration Layer                │
└─────────────────┬───────────────────────┘
                  │
         ┌────────┴────────┐
         ▼                 ▼

┌─────────────────┐   ┌──────────────────┐
│ SQLite Database │   │ Google Gemini AI │
│                 │   │                  │
│ • Users         │   │ • Validation     │
│ • Projects      │   │ • Market Research│
│ • Reports       │   │ • SWOT Analysis  │
│ • AI Outputs    │   │ • Pitch Deck     │
└─────────────────┘   │ • Business Plan  │
                      │ • AI Co-Founder  │
                      │ • Digital Twin   │
                      └──────────────────┘


Deployment Architecture

Frontend
│
├── Vercel
│
▼
https://launch-pilot-eta.vercel.app

Backend
│
├── Render
│
▼
https://launch-pilot-cyex.onrender.com

Database
│
└── SQLite + Prisma ORM

AI Engine
│
└── Google Gemini 2.5 Flash
```

## Architecture Flow

1. User submits a startup idea through the LaunchPilot AI dashboard.
2. Next.js frontend sends requests to the Express.js backend.
3. Backend validates and stores project data using Prisma ORM.
4. AI orchestration layer communicates with Google Gemini.
5. Gemini generates:

   * Startup Validation Report
   * Market Research
   * Competitor Analysis
   * SWOT Analysis
   * Customer Personas
   * Investor Readiness Score
   * Business Plan
   * Pitch Deck
   * Branding Strategy
   * AI Co-Founder Insights
   * Digital Twin Simulations
6. Results are stored in SQLite.
7. Frontend displays interactive dashboards and reports to the user.

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Clerk Authentication

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* SQLite

### AI

* Google Gemini 2.5 Flash

### Deployment

* Vercel
* Render

```
```
