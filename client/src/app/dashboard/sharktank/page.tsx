"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useProject";
import { ShieldAlert, Flame, Skull, Ghost, AlertTriangle, Play, Award, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function RealityCheckModule() {
  const [isActive, setIsActive] = useState(false);
  const { project } = useProject();

  if (!project) return null;

  const readiness = (project.validationReport as any)?.investorReadiness;
  const threats = readiness?.threats || [];
  const investorScore = readiness?.investorScore || 70;

  const metrics = [
    { label: "Investment Potential", desc: readiness?.investmentPotential || "Moderate outlook." },
    { label: "Scalability Potential", desc: readiness?.scalabilityPotential || "High scalability." },
    { label: "Revenue Potential", desc: readiness?.revenuePotential || "Strong ARR metrics." },
    { label: "Market Opportunity", desc: readiness?.marketOpportunity || "Addresses a clear market gap." },
    { label: "Founder Readiness", desc: readiness?.founderReadiness || "Clear awareness of constraints." }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Investor Readiness & Reality Check</h1>
        <p className="text-zinc-500">Evaluate investor readiness scores and enter the brutal gauntlet check.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Score Card */}
        <Card className="bg-zinc-50/50 border-zinc-200 flex flex-col items-center justify-center p-8 text-center">
          <Award className="w-12 h-12 text-amber-500 mb-4 animate-bounce" />
          <h2 className="text-lg font-bold text-zinc-700">Attractiveness Score</h2>
          <div className="text-6xl font-black text-zinc-900 my-4">
            {investorScore}<span className="text-lg text-zinc-500 font-medium">/100</span>
          </div>
          <Progress value={investorScore} className="h-2 w-full bg-zinc-50" indicatorClassName="bg-amber-500" />
          <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
            Calculated across market fit, scalability potential, and financial viability.
          </p>
        </Card>

        {/* Investment Readiness Details */}
        <Card className="lg:col-span-2 bg-zinc-50/50 border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-amber-500" />
              Readiness Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-zinc-200 last:border-0 last:pb-0">
                <span className="text-sm font-bold text-zinc-900 mb-1 md:mb-0">{metric.label}</span>
                <span className="text-xs text-zinc-500 text-right max-w-md italic">"{metric.desc}"</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Investment Recommendations */}
      <Card className="bg-zinc-50/50 border-zinc-200 mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-500">
            <CheckCircle2 className="w-5 h-5" />
            Strategic Recommendations for Funding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {readiness?.recommendations?.map((rec: string, i: number) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
              <span className="text-sm text-zinc-700">{rec}</span>
            </div>
          )) || <p className="text-xs text-zinc-500">No recommendations generated.</p>}
        </CardContent>
      </Card>

      {/* Reality Check Gauntlet */}
      <div className="max-w-4xl mx-auto border-t border-zinc-200 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Reality Check</h2>
            <p className="text-zinc-500">Brutally honest feedback on your startup idea. No sugar-coating.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-500">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider italic">Gauntlet Mode: Active</span>
          </div>
        </div>

        {!isActive ? (
          <Card className="bg-zinc-50 border-zinc-200 py-12 text-center border-dashed border-2">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto border border-rose-500/20">
                <Flame className="w-10 h-10 text-rose-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900">Enter the Gauntlet</h3>
                <p className="text-zinc-500 max-w-md mx-auto text-sm">
                  Our AI will drop the 'polite consultant' persona and list the brutal reasons why {project.name} might fail. Are you ready for the reality check?
                </p>
              </div>
              <Button 
                onClick={() => setIsActive(true)}
                className="bg-rose-600 hover:bg-rose-700 h-12 px-8 text-lg font-bold gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Reality Check
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in duration-500">
            {threats.map((fact: any, i: number) => {
              const iconMap: Record<string, any> = {
                "Market Reality": Ghost,
                "Competition": Flame,
                "Monetization": Skull
              };
              const IconComponent = iconMap[fact.type] || AlertTriangle;
              
              return (
                <Card key={i} className="bg-zinc-50/50 border-zinc-200 group hover:border-rose-500/30 transition-all">
                  <CardContent className="p-6 flex gap-6">
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-200 flex items-center justify-center group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-all">
                      <IconComponent className="w-8 h-8 text-zinc-500 group-hover:text-rose-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded uppercase tracking-widest">{fact.type}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest",
                          fact.severity === "Critical" ? "text-rose-400 bg-rose-400/10" : "text-yellow-400 bg-yellow-400/10"
                        )}>
                          {fact.severity} Severity
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900">{fact.title}</h3>
                      <p className="text-zinc-500 leading-relaxed italic">
                        {fact.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4 mt-6">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-500">How to handle this feedback?</h4>
                <p className="text-xs text-zinc-500">
                  Don't get discouraged. Use these 'brutal' insights to pivot your strategy. The best founders are the ones who solve the hardest problems.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
               <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900" onClick={() => setIsActive(false)}>
                Reset Reality Check
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
  );
}
