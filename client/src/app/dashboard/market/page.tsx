"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { 
  Globe, 
  TrendingUp, 
  MapPin, 
  PieChart, 
  ArrowRightCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MarketResearchPage() {
  const { project } = useProject();

  if (!project) return null;

  const market = (project.validationReport as any)?.marketResearch;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Market Research</h1>
          <p className="text-slate-400">Deep dive into industry size, trends, and growth trajectory.</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="secondary" className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 py-1">
                Market: {project.country}
            </Badge>
            <Badge variant="secondary" className="bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-3 py-1">
                {project.industry}
            </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Size Card */}
        <Card className="lg:col-span-1 bg-slate-900/50 border-white/5 overflow-hidden">
            <div className="h-2 bg-indigo-600 w-full" />
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-400" />
                    Market Size & Overview
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Addressable Market</p>
                    <h3 className="text-3xl font-black text-white">{market?.size || "N/A"}</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4 py-1">
                    "{market?.overview || "No market overview available."}"
                </p>
                <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Current Penetration Target</span>
                        <span className="text-white font-bold">2.5% - 5.0%</span>
                    </div>
                     <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Geographic Scope</span>
                        <span className="text-white font-bold">{project.country}</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Trends & Opportunities */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-white/5">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        Emerging Trends
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {market?.trends?.map((trend: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-all cursor-default">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                             <span className="text-sm text-slate-300 group-hover:text-white">{trend}</span>
                        </div>
                    )) || <p className="text-xs text-slate-500">No trends identified yet.</p>}
                </CardContent>
            </Card>

             <Card className="bg-slate-900/50 border-white/5">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                        <MapPin className="w-5 h-5" />
                        Market Opportunities
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {market?.opportunities?.map((opp: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-all cursor-default">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                             <span className="text-sm text-slate-300 group-hover:text-white">{opp}</span>
                        </div>
                    )) || <p className="text-xs text-slate-500">No opportunities identified yet.</p>}
                </CardContent>
            </Card>
        </div>

        {/* Challenges & Risks */}
        <Card className="lg:col-span-3 bg-slate-900/50 border-white/5">
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-rose-400">
                    <PieChart className="w-5 h-5" />
                    Industry Challenges
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {market?.challenges?.map((challenge: string, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                             <p className="text-sm text-slate-200 font-medium mb-4">{challenge}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-tighter">
                                <ArrowRightCircle className="w-3 h-3" />
                                Critical Barrier
                             </div>
                        </div>
                    )) || <p className="text-xs text-slate-500 col-span-3">No challenges identified yet.</p>}
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
