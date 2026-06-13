"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  ShieldAlert, 
  Rocket, 
  Award,
  ArrowUpRight,
  HelpCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ValidationScorePage() {
  const { project } = useProject();

  if (!project) return null;

  const scores = (project.validationReport as any)?.scores;

  const scoreDetails = [
    { label: "Market Demand", value: scores?.demand || 0, color: "bg-emerald-500", icon: TrendingUp, desc: `Strength of market traction and audience demand in ${project.country}.` },
    { label: "Competition Score", value: scores?.competition || 0, color: "bg-amber-500", icon: ShieldAlert, desc: "Level of market overcrowding and rival positioning." },
    { label: "Scalability", value: scores?.scalability || 0, color: "bg-amber-500", icon: Target, desc: "Potential of system architecture to expand globally with minimal marginal cost." },
    { label: "Innovation", value: scores?.innovation || 0, color: "bg-amber-500", icon: Zap, desc: "Uniqueness of startup solution and IP defensibility." },
    { label: "Execution Risk", value: scores?.risk || 0, color: "bg-rose-500", icon: Award, desc: "Potential operational, technical, or regulatory hurdles." },
  ];

  const getInvestorGrade = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 85) return "A-";
    if (score >= 80) return "B+";
    if (score >= 75) return "B";
    return "C+";
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Validation Score</h1>
        <p className="text-zinc-500">Comprehensive breakdown of your startup's success probability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Gauge */}
        <Card className="lg:col-span-1 bg-zinc-50/50 border-zinc-200 flex flex-col items-center justify-center p-8 text-center">
          <div className="relative w-48 h-48 mb-6">
             <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-zinc-900/5"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-amber-500"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - (scores?.overall || 0) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-zinc-900">{scores?.overall || 0}</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Success Prob.</span>
              </div>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Investor Grade: {getInvestorGrade(scores?.overall || 0)}</h2>
          <p className="text-sm text-zinc-500">
            Validated for the {project.industry} industry on a budget of {project.budget}.
          </p>
          <div className="mt-6 w-full pt-6 border-t border-zinc-200 space-y-4 text-left">
            <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">Market Fit</span>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Optimized</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">Scalability</span>
                <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">High</span>
            </div>
          </div>
        </Card>

        {/* Breakdown List */}
        <Card className="lg:col-span-2 bg-zinc-50/50 border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Rocket className="w-5 h-5 text-amber-500" />
              Factor Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {scoreDetails.map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-bold text-zinc-900">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-zinc-900">{item.value}/100</span>
                </div>
                <Progress value={item.value} className="h-2 bg-zinc-50" indicatorClassName={item.color} />
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Investor Sentiment */}
      <Card className="mt-8 bg-amber-500/10 border border-amber-500/20">
        <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500 text-zinc-900 shrink-0">
                <Award className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-1">Investor Readiness Insight</h3>
                <p className="text-sm text-zinc-700 leading-relaxed">
                    "{(project.validationReport as any)?.investorReadiness?.investmentPotential || `The project shows strong fundamentals. The budget of ${project.budget} matches requirements for testing an MVP.`}"
                </p>
                <div className="mt-4 flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-200">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Bullish</span>
                    </div>
                     <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-200">
                        <ArrowUpRight className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase">Growth Potential</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
      {/* Reality Check / Cross Questions */}
      {project.validationReport && (project.validationReport as any).crossQuestions && (
        <Card className="mt-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              Reality Check: Founder Cross-Examination
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-400 mb-2">
              Our AI analysis flagged these tough questions based on your pros and cons. You must be able to answer these before seeking investment or launching.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(project.validationReport as any).crossQuestions.map((q: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                  <div className="mt-0.5 p-1.5 rounded-md bg-rose-500/20 text-rose-500 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-sm text-zinc-200 font-bold leading-relaxed block">{q.question || q}</span>
                    {q.explanation && (
                      <span className="text-xs text-zinc-400 leading-relaxed block">
                        {q.explanation}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
