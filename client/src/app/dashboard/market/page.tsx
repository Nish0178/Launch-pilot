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
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Market Research</h1>
          <p className="text-zinc-500">Deep dive into industry size, trends, and growth trajectory.</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1">
                Market: {project.country}
            </Badge>
            <Badge variant="secondary" className="bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-3 py-1">
                {project.industry}
            </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Size Card */}
        <Card className="lg:col-span-1 bg-zinc-50/50 border-zinc-200 overflow-hidden">
            <div className="h-2 bg-amber-500 w-full" />
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-500" />
                    Market Size & Overview
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Addressable Market</p>
                    <h3 className="text-3xl font-black text-zinc-900">{market?.size || "N/A"}</h3>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed italic border-l-2 border-amber-500/30 pl-4 py-1">
                    "{market?.overview || "No market overview available."}"
                </p>
                <div className="space-y-4 pt-4 border-t border-zinc-200">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Current Penetration Target</span>
                        <span className="text-zinc-900 font-bold">2.5% - 5.0%</span>
                    </div>
                     <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Geographic Scope</span>
                        <span className="text-zinc-900 font-bold">{project.country}</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Trends & Opportunities */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-zinc-50/50 border-zinc-200">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        Emerging Trends
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {market?.trends?.map((trend: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200 group hover:border-emerald-500/30 transition-all cursor-default">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                             <span className="text-sm text-zinc-700 group-hover:text-zinc-900">{trend}</span>
                        </div>
                    )) || <p className="text-xs text-zinc-500">No trends identified yet.</p>}
                </CardContent>
            </Card>

             <Card className="bg-zinc-50/50 border-zinc-200">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-500">
                        <MapPin className="w-5 h-5" />
                        Market Opportunities
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {market?.opportunities?.map((opp: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200 group hover:border-amber-500/30 transition-all cursor-default">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                             <span className="text-sm text-zinc-700 group-hover:text-zinc-900">{opp}</span>
                        </div>
                    )) || <p className="text-xs text-zinc-500">No opportunities identified yet.</p>}
                </CardContent>
            </Card>
        </div>

        {/* Challenges & Risks */}
        <Card className="lg:col-span-3 bg-zinc-50/50 border-zinc-200">
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-rose-400">
                    <PieChart className="w-5 h-5" />
                    Industry Challenges
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {market?.challenges?.map((challenge: string, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
                             <p className="text-sm text-zinc-800 font-medium mb-4">{challenge}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-tighter">
                                <ArrowRightCircle className="w-3 h-3" />
                                Critical Barrier
                             </div>
                        </div>
                    )) || <p className="text-xs text-zinc-500 col-span-3">No challenges identified yet.</p>}
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
