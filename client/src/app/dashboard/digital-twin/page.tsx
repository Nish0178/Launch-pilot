"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useProject } from "@/hooks/useProject";
import { Loader2, TrendingUp, DollarSign, Activity, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DigitalTwinPage() {
  const { project } = useProject();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project) {
      fetch(`http://localhost:5000/api/projects/${project.id}/digital-twin`, { method: 'POST' })
        .then(res => res.json())
        .then(d => {
          let parsed = d;
          if (typeof d === 'string') {
            try { parsed = JSON.parse(d); } catch(e){}
          }
          setData(parsed);
          setLoading(false);
        })
    }
  }, [project]);

  if (!project) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Startup Digital Twin</h1>
            <p className="text-sm text-slate-400">AI forecasted metrics and trajectories.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center border border-white/5 bg-slate-900/50 rounded-2xl">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : !data || data.error || !data.revenueProjection ? (
          <div className="flex h-64 items-center justify-center border border-white/5 bg-slate-900/50 rounded-2xl text-slate-400">
            Failed to load Digital Twin data. {data?.error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Stats */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 text-indigo-400">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold text-white">Growth Probability</h3>
              </div>
              <div className="text-5xl font-black text-white mb-2">{data?.growthProbability}%</div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${data?.growthProbability || 0}%` }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-3">Likelihood of reaching Series A milestones within 24 months.</p>
            </div>

            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <DollarSign className="w-5 h-5" />
                <h3 className="font-semibold text-white">Revenue Projection</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">6 Months</div>
                  <div className="text-2xl font-bold text-white">{data?.revenueProjection?.sixMonth}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">12 Months</div>
                  <div className="text-2xl font-bold text-white">{data?.revenueProjection?.twelveMonth}</div>
                </div>
              </div>
            </div>

            {/* Adoption Chart (CSS based for simplicity & premium look) */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl md:col-span-2">
              <h3 className="font-semibold text-white mb-6">User Adoption Forecast</h3>
              <div className="flex items-end h-40 gap-2 w-full">
                {data?.adoptionForecast?.map((item: any, i: number) => {
                  const maxUsers = Math.max(...data.adoptionForecast.map((d: any) => d.users));
                  const heightPct = (item.users / maxUsers) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative bg-slate-800/50 rounded-t-sm flex items-end justify-center group-hover:bg-slate-800 transition-colors h-full">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-600/20 to-indigo-500 rounded-t-sm transition-all duration-1000 group-hover:from-indigo-500 group-hover:to-purple-400" 
                          style={{ height: `${heightPct}%` }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold bg-white text-slate-900 px-2 py-1 rounded">
                            {item.users}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">{item.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Forecast */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold text-white">Risk Decay Forecast</h3>
              </div>
              <div className="flex items-center justify-between relative pt-8">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -z-10" />
                {data?.riskForecast?.map((item: any, i: number) => (
                  <div key={i} className="flex flex-col items-center gap-2 relative">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-900",
                      item.riskLevel > 50 ? "bg-rose-500/20 text-rose-400" : item.riskLevel > 35 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                    )}>
                      {item.riskLevel}%
                    </div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-widest">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
