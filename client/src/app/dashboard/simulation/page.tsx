"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useProject } from "@/hooks/useProject";
import { Loader2, FlaskConical, Play, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SimulationLabPage() {
  const { project } = useProject();
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState("Freemium");
  const [market, setMarket] = useState("US Market");
  const [segment, setSegment] = useState("Enterprise");
  const [result, setResult] = useState<any>(null);

  const runSimulation = async () => {
    if (!project) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${project.id}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pricing, market, segment })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!project) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Simulation Lab</h1>
            <p className="text-sm text-slate-400">Test different Go-To-Market scenarios and see AI predictions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl lg:col-span-1 h-fit">
            <h3 className="font-semibold text-white mb-4">Simulation Parameters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2 block">Pricing Model</label>
                <Input value={pricing} onChange={(e) => setPricing(e.target.value)} className="bg-slate-950/50 border-white/10 text-white" placeholder="e.g. Freemium, Enterprise Sales" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2 block">Target Market</label>
                <Input value={market} onChange={(e) => setMarket(e.target.value)} className="bg-slate-950/50 border-white/10 text-white" placeholder="e.g. US Market, Europe, Global" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2 block">Customer Segment</label>
                <Input value={segment} onChange={(e) => setSegment(e.target.value)} className="bg-slate-950/50 border-white/10 text-white" placeholder="e.g. Enterprise, SMB, B2C" />
              </div>
            </div>

            <Button 
              onClick={runSimulation}
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl group"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2">
            {!result ? (
              <div className="h-full min-h-[400px] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-slate-900/20">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <FlaskConical className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Awaiting Parameters</h3>
                <p className="text-sm text-slate-400 max-w-sm">Adjust the pricing, market, and customer segment parameters on the left to see how it impacts your validation score and metrics.</p>
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Simulation Complete</div>
                    <h2 className="text-2xl font-bold text-white">{result.scenarioName}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Validation Shift</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-slate-500 line-through">{result.originalScore}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                      <span className={cn(
                        "text-3xl font-black",
                        result.newScore > result.originalScore ? "text-emerald-400" : "text-rose-400"
                      )}>{result.newScore}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-slate-400 mb-1">Predicted CAC</div>
                    <div className="text-xl font-bold text-white">{result.metrics.cac}</div>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-slate-400 mb-1">Predicted LTV</div>
                    <div className="text-xl font-bold text-white">{result.metrics.ltv}</div>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-xs text-slate-400 mb-1">Time to Profit</div>
                    <div className="text-xl font-bold text-white">{result.metrics.timeToProfit}</div>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-4">AI Strategic Insights</h3>
                <div className="space-y-3">
                  {result.insights.map((insight: string, idx: number) => (
                    <div key={idx} className="flex gap-3 bg-white/5 p-4 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                      <p className="text-sm text-slate-200 leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
