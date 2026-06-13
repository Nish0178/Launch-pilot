"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useProject } from "@/hooks/useProject";
import { useAuth } from "@clerk/nextjs";
import { Loader2, TrendingUp, DollarSign, Activity, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

export default function DigitalTwinPage() {
  const { project } = useProject();
  const { getToken } = useAuth();
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
          <div className="p-2 bg-blue-600 rounded-lg">
            <Activity className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Startup Digital Twin</h1>
            <p className="text-sm text-slate-500">AI forecasted metrics and trajectories.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center border border-slate-200 bg-slate-50/50 rounded-2xl">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : !data || data.error || !data.revenueProjection ? (
          <div className="flex h-64 items-center justify-center border border-slate-200 bg-slate-50/50 rounded-2xl text-slate-500">
            Failed to load Digital Twin data. {data?.error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Stats */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Growth Probability</h3>
              </div>
              <div className="text-5xl font-black text-slate-900 mb-2">{data?.growthProbability}%</div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data?.growthProbability || 0}%` }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-3">Likelihood of reaching Series A milestones within 24 months.</p>
            </div>

            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <DollarSign className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Revenue Projection</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">6 Months</div>
                  <div className="text-2xl font-bold text-slate-900">{data?.revenueProjection?.sixMonth}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">12 Months</div>
                  <div className="text-2xl font-bold text-slate-900">{data?.revenueProjection?.twelveMonth}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl md:col-span-2">
              <h3 className="font-semibold text-slate-900 mb-6">User Adoption Forecast</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.adoptionForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                      itemStyle={{ color: '#818cf8' }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Forecast */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Risk Decay Forecast</h3>
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
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">{item.month}</div>
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
