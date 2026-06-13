"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { Calendar, Rocket, Users, Target, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
  const { project } = useProject();
  const [activePhase, setActivePhase] = useState(0);

  if (!project) return null;

  const gtm = (project.validationReport as any)?.gtmStrategy;
  const roadmap = (project.validationReport as any)?.roadmap || [];

  const timelineSteps = [
    { label: "Day 1", content: gtm?.timeline?.day1 },
    { label: "Week 1", content: gtm?.timeline?.week1 },
    { label: "Month 1", content: gtm?.timeline?.month1 },
    { label: "Month 3", content: gtm?.timeline?.month3 },
    { label: "Month 6", content: gtm?.timeline?.month6 },
    { label: "Month 12", content: gtm?.timeline?.month12 }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Go-To-Market & Roadmap</h1>
        <p className="text-zinc-500">Step-by-step user acquisition plan and interactive launch timeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* User Acquisition Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-zinc-50/50 border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-500">
                <Target className="w-5 h-5" />
                Launch Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-zinc-700 leading-relaxed italic">
                "{gtm?.launchStrategy || "No launch strategy details generated."}"
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Marketing Channels</p>
                <div className="flex flex-wrap gap-2">
                  {gtm?.marketingChannels?.map((ch: string, i: number) => (
                    <span key={i} className="text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-50/50 border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-emerald-400">
                <Users className="w-5 h-5" />
                User Acquisition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong>Plan:</strong> {gtm?.acquisitionPlan || "TBD"}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong>Growth:</strong> {gtm?.growthStrategy || "TBD"}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong>Community:</strong> {gtm?.communityBuilding || "TBD"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 12-Month GTM Timeline */}
        <Card className="lg:col-span-2 bg-zinc-50/50 border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              12-Month GTM Launch Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="relative pl-6 border-l border-zinc-200 space-y-6">
            {timelineSteps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border border-amber-500 flex items-center justify-center text-[8px] font-black text-amber-500 shadow-md">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 group-hover:text-amber-500 transition-colors">
                    {step.label}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {step.content || "TBD"}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Interactive Phase-by-Phase Timeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-zinc-900">Interactive Development Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Phase sidebar navigator */}
          <div className="lg:col-span-1 space-y-2">
            {roadmap.map((phase: any, i: number) => (
              <div 
                key={i}
                onClick={() => setActivePhase(i)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group",
                  activePhase === i 
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30" 
                    : "bg-zinc-50/30 text-zinc-500 border-zinc-200 hover:border-zinc-200"
                )}
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Phase {i + 1}</h4>
                  <span className="text-sm font-bold text-zinc-900 group-hover:text-amber-500 transition-colors">
                    {phase.title.replace(/^Phase \d+:\s*/, "")}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </div>
            ))}
          </div>

          {/* Active Phase Details */}
          {roadmap[activePhase] && (
            <Card className="lg:col-span-3 bg-zinc-50/50 border-amber-500/20">
              <CardHeader className="border-b border-zinc-200">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-extrabold text-zinc-900">
                    {roadmap[activePhase].title}
                  </CardTitle>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {roadmap[activePhase].duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Key Deliverables & Tasks</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmap[activePhase].tasks?.map((task: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-amber-500/20 transition-all">
                      <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-700 leading-relaxed">{task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
