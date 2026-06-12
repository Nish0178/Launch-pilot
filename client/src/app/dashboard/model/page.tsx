"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { Briefcase, DollarSign, RefreshCw, ShoppingCart, Layers, Info } from "lucide-react";

export default function BusinessModelPage() {
  const { project } = useProject();

  if (!project) return null;

  const model = (project.validationReport as any)?.businessModel;
  const canvas = model?.canvas;

  const canvasItems = [
    { title: "Key Partners", desc: "Who helps you build and distribute?", items: canvas?.keyPartners, span: "lg:col-span-2" },
    { title: "Key Activities", desc: "What core tasks do you perform?", items: canvas?.keyActivities, span: "lg:col-span-2" },
    { title: "Key Resources", desc: "What assets do you require?", items: canvas?.keyResources, span: "lg:col-span-2" },
    { title: "Value Propositions", desc: "What value do you deliver?", items: canvas?.valuePropositions, span: "lg:col-span-3 bg-indigo-600/5 border-indigo-500/20" },
    { title: "Customer Relationships", desc: "How do you interact?", items: canvas?.customerRelationships, span: "lg:col-span-2" },
    { title: "Channels", desc: "How do you reach customers?", items: canvas?.channels, span: "lg:col-span-2" },
    { title: "Customer Segments", desc: "Who are you building for?", items: canvas?.customerSegments, span: "lg:col-span-3" },
    { title: "Cost Structure", desc: "What are your major expenses?", items: canvas?.costStructure, span: "lg:col-span-6 border-rose-500/20" },
    { title: "Revenue Streams", desc: "How do you make money?", items: canvas?.revenueStreams, span: "lg:col-span-6 border-emerald-500/20" }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Business Model Generator</h1>
        <p className="text-slate-400">Unit economics, pricing suggestions, and Business Model Canvas.</p>
      </div>

      {/* Monetization & Pricing Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-400">
              <DollarSign className="w-4 h-4" />
              Revenue Streams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {model?.revenueStreams?.map((stream: string, i: number) => (
              <p key={i} className="text-xs text-slate-300 leading-relaxed">• {stream}</p>
            )) || <p className="text-xs text-slate-500">None defined.</p>}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-400">
              <Layers className="w-4 h-4" />
              Pricing Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {model?.pricingSuggestions?.map((price: string, i: number) => (
              <p key={i} className="text-xs text-slate-300 leading-relaxed">• {price}</p>
            )) || <p className="text-xs text-slate-500">None defined.</p>}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-400">
              <RefreshCw className="w-4 h-4" />
              Upsell & Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {model?.subscriptionOpportunities?.map((opp: string, i: number) => (
              <p key={i} className="text-xs text-slate-300 leading-relaxed">• Subscription: {opp}</p>
            ))}
            {model?.upsellingOpportunities?.map((opp: string, i: number) => (
              <p key={i} className="text-xs text-slate-300 leading-relaxed">• Upsell: {opp}</p>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Business Model Canvas Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-white">Business Model Canvas</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {canvasItems.map((item, idx) => (
            <Card key={idx} className={`${item.span} bg-slate-900/50 border-white/5 group hover:border-white/10 transition-all`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-white flex items-center justify-between">
                  {item.title}
                  <Info className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" title={item.desc} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {item.items?.map((li: string, i: number) => (
                  <div key={i} className="text-xs text-slate-300 bg-white/5 border border-white/5 p-2 rounded-lg leading-relaxed">
                    {li}
                  </div>
                )) || <p className="text-xs text-slate-500 italic">TBD</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
