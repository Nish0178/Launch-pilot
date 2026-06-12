"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProject } from "@/hooks/useProject";
import { 
  Swords, 
  TrendingDown, 
  TrendingUp, 
  AlertCircle,
  PlusCircle,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompetitorsPage() {
  const { project } = useProject();

  if (!project) return null;

  const competitors = (project.validationReport as any)?.competitors || [];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Competitor Intelligence</h1>
          <p className="text-slate-400">Analysis of existing players and market gap opportunities.</p>
        </div>
        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/5 px-4 py-1">
          {competitors.length} Key Competitors Found
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Comparison Table */}
        <Card className="bg-slate-900/50 border-white/5 overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Swords className="w-5 h-5 text-indigo-400" />
              Direct Market Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-slate-300 font-bold">Competitor</TableHead>
                  <TableHead className="text-slate-300 font-bold">Key Strengths</TableHead>
                  <TableHead className="text-slate-300 font-bold">Major Weaknesses</TableHead>
                  <TableHead className="text-slate-300 font-bold">Pricing Model</TableHead>
                  <TableHead className="text-slate-300 font-bold">Winning Edge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((comp: any, i: number) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-bold text-white py-6">
                      <div className="flex items-center gap-2">
                        {comp.name}
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {comp.strengths.map((s: string, j: number) => (
                          <Badge key={j} variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px] py-0 px-2 uppercase tracking-tighter">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {comp.weaknesses.map((w: string, j: number) => (
                          <Badge key={j} variant="secondary" className="bg-rose-500/10 text-rose-400 border-none text-[10px] py-0 px-2 uppercase tracking-tighter">
                            {w}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">{comp.pricing}</TableCell>
                    <TableCell className="text-indigo-400 text-sm italic font-medium">"{comp.advantage}"</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Market Gap Analysis */}
          <Card className="bg-slate-900/50 border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                Identified Market Gaps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Universal Interoperability", desc: `Most competitors focus on localized, proprietary configurations. A hardware-agnostic product like ${project.name} targets a massive gap.` },
                { title: "Transparent Pricing", desc: `Direct SaaS structures like ${project.businessModel} appeal heavily to users tired of opaque pricing setups.` },
                { title: "Personalized Telemetry", desc: "Our product's adaptive scoring provides granular optimizations that competitors ignore." }
              ].map((gap, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-emerald-400" />
                    {gap.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{gap.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="bg-slate-900/50 border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-rose-400">
                <TrendingDown className="w-5 h-5" />
                Competitive Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Acquisition & Kill", desc: "Large corporate entities often acquire innovative toolsets only to shelve them and protect core business models." },
                { title: "Aggressive Ads", desc: "Well-funded incumbents can artificially inflate ad auction costs (CPC) to price out early-stage entrants." },
                { title: "Enterprise Lock-in", desc: "Many enterprise clients prefer buying bundles, making standalone product adoption difficult." }
              ].map((risk, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    {risk.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{risk.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
