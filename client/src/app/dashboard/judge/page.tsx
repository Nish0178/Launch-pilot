"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Terminal, Database, Server, BrainCircuit, Activity, Cpu, Bot, Rocket, Code2, Network } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HackathonJudgePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-indigo-900/50 to-slate-900/50 border border-blue-500/20 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          <div className="p-3 bg-blue-500/20 rounded-full mb-4">
            <BrainCircuit className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Hackathon Judge View</h1>
          <p className="text-slate-500 max-w-2xl">
            A behind-the-scenes look at the multi-agent AI architecture powering LaunchPilot.
            This demonstrates real-time integration with Gemini 2.5 Pro using structured JSON prompts.
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            System Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 relative z-10 hover:border-blue-500/50 transition-colors">
              <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Step 1</div>
              <Terminal className="w-8 h-8 text-slate-700 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-1">User Input</h3>
              <p className="text-xs text-slate-500">Captures startup idea, budget, and market via Next.js client.</p>
            </div>

            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

            {/* Step 2 */}
            <div className="bg-slate-50/80 border border-blue-500/30 rounded-2xl p-6 relative z-10 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <div className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">Step 2</div>
              <Code2 className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-1">Prompt Builder</h3>
              <p className="text-xs text-slate-500">Express.js constructs robust, role-playing prompt files.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-indigo-900/40 border border-blue-500/50 rounded-2xl p-6 relative z-10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <div className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">Step 3</div>
              <Cpu className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-1">Gemini 2.5 Pro</h3>
              <p className="text-xs text-slate-500">Processes prompt and returns deterministic JSON schema.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50/80 border border-blue-500/30 rounded-2xl p-6 relative z-10">
              <div className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">Step 4</div>
              <Bot className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-1">Multi-Agent</h3>
              <p className="text-xs text-slate-500">Simulates VC, Mentor, and Competitor personas simultaneously.</p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50/80 border border-emerald-500/30 rounded-2xl p-6 relative z-10">
              <div className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wider">Step 5</div>
              <Database className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-1">JSON Parsing</h3>
              <p className="text-xs text-slate-500">Stores report in SQLite via Prisma for client consumption.</p>
            </div>
          </div>
        </div>

        {/* Prompt File Showcase */}
        <div className="max-w-5xl mx-auto space-y-6 pt-8">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            Backend Prompt Builders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0D1117] border border-slate-200 rounded-2xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-500 ml-2">founderBoardroomPrompt.ts</span>
              </div>
              <div className="text-emerald-400">export function buildFounderBoardroomPrompt(...) {'{'}</div>
              <div className="text-indigo-300 ml-4 mt-2">return \`You are an elite AI Co-Founder...</div>
              <div className="text-indigo-300 ml-4">Your goal is to simulate a high-stakes meeting.</div>
              <div className="text-indigo-300 ml-4">1. YC Partner / Mentor</div>
              <div className="text-indigo-300 ml-4">2. Venture Capitalist</div>
              <div className="text-indigo-300 ml-4">3. Competitor...</div>
              <div className="text-emerald-400 mt-2">{'}'}</div>
            </div>

            <div className="bg-[#0D1117] border border-slate-200 rounded-2xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-500 ml-2">digitalTwinPrompt.ts</span>
              </div>
              <div className="text-emerald-400">export function buildDigitalTwinPrompt(...) {'{'}</div>
              <div className="text-amber-300 ml-4 mt-2">return \`You are an advanced AI predictive engine.</div>
              <div className="text-amber-300 ml-4">Generate a forecast for {"${name}"}.</div>
              <div className="text-amber-300 ml-4">Your response must be a single valid JSON object.</div>
              <div className="text-slate-700 ml-4 mt-2">{'{'}</div>
              <div className="text-slate-700 ml-8">"growthProbability": number (0-100),</div>
              <div className="text-slate-700 ml-8">"revenueProjection": {'{'}...{'}'}</div>
              <div className="text-slate-700 ml-4">{'}'}</div>
              <div className="text-emerald-400 mt-2">{'}'}</div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
