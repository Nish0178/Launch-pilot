"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react";

export default function SWOTAnalysisPage() {
  const { project } = useProject();

  if (!project) return null;

  const swot = (project.validationReport as any)?.swot;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">SWOT Analysis</h1>
        <p className="text-slate-400">Strategic evaluation of Internal and External factors affecting your startup.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="bg-slate-900/50 border-white/5 border-t-4 border-t-emerald-500">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              Strengths (Internal)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {swot?.strengths?.map((s: string, i: number) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300">{s}</p>
              </div>
            )) || <p className="text-xs text-slate-500">No strengths generated yet.</p>}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="bg-slate-900/50 border-white/5 border-t-4 border-t-rose-500">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-rose-400">
              <XCircle className="w-5 h-5" />
              Weaknesses (Internal)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {swot?.weaknesses?.map((w: string, i: number) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300">{w}</p>
              </div>
            )) || <p className="text-xs text-slate-500">No weaknesses generated yet.</p>}
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card className="bg-slate-900/50 border-white/5 border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-400">
              <TrendingUp className="w-5 h-5" />
              Opportunities (External)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {swot?.opportunities?.map((o: string, i: number) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300">{o}</p>
              </div>
            )) || <p className="text-xs text-slate-500">No opportunities generated yet.</p>}
          </CardContent>
        </Card>

        {/* Threats */}
        <Card className="bg-slate-900/50 border-white/5 border-t-4 border-t-amber-500">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
              Threats (External)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {swot?.threats?.map((t: string, i: number) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300">{t}</p>
              </div>
            )) || <p className="text-xs text-slate-500">No threats generated yet.</p>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
