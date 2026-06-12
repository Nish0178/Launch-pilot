"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardOverview() {
  const { project, resetProject } = useProject();

  const scores = project ? (project.validationReport as any)?.scores : null;

  return (
    <DashboardLayout>
      {project ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Dashboard Overview</h1>
              <p className="text-slate-400">Welcome back! Here's the latest analysis for <span className="text-indigo-400 font-medium">{project.name}</span>.</p>
            </div>
            <Button onClick={resetProject} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              <Plus className="w-4 h-4" />
              New Validation
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Overall Score", value: scores?.overall || 0, icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10" },
              { label: "Market Demand", value: scores?.demand || 0, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { label: "Scalability", value: scores?.scalability || 0, icon: Target, color: "text-indigo-400", bg: "bg-indigo-400/10" },
              { label: "Risk Factor", value: scores?.risk || 0, icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-400/10" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 border-white/10 overflow-hidden group hover:border-white/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={stat.bg + " p-2 rounded-lg"}>
                      <stat.icon className={"w-5 h-5 " + stat.color} />
                    </div>
                    <div className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded uppercase">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      Live
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                      <span className="text-sm text-slate-500 font-medium">/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Startup Summary */}
            <Card className="lg:col-span-2 bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-indigo-400" />
                  Startup Concept
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-300 leading-relaxed italic">
                  "{project.idea}"
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Industry</p>
                    <p className="text-sm font-medium text-white">{project.industry}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Market</p>
                    <p className="text-sm font-medium text-white">{project.country}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Model</p>
                    <p className="text-sm font-medium text-white">{project.businessModel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Budget</p>
                    <p className="text-sm font-medium text-white">{project.budget}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Review Market Demand breakdown",
                  "Check competitor gap analysis",
                  "Download business plan PDF",
                  "Consult AI Co-Founder on pricing"
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-indigo-500 group-hover:bg-indigo-500/20 transition-all">
                      <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{task}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </DashboardLayout>
  );
}
