"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { 
  Printer, 
  Download,
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BusinessPlanPage() {
  const { project } = useProject();

  if (!project) return null;

  const plan = (project.validationReport as any)?.businessPlan;

  const sections = [
    { title: "Executive Summary", content: plan?.summary || "Executive summary not generated." },
    { title: "The Problem", content: plan?.problem || "Problem statement not generated." },
    { title: "Our Solution", content: plan?.solution || "Solution description not generated." },
    { title: "Market Analysis", content: plan?.marketAnalysis || "Market analysis not generated." },
    { title: "Revenue & Monetization", content: plan?.revenueModel || "Revenue model details not generated." },
    { title: "Marketing & Acquisition", content: plan?.marketingStrategy || "Marketing strategy not generated." },
    { title: "Financial Forecast Overview", content: plan?.financialPlan || "Financial forecast not generated." },
    { title: "Growth & Expansion Roadmap", content: plan?.growthPlan || "Growth plan not generated." },
  ];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <DashboardLayout>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          aside, header, nav, button, .no-print {
            display: none !important;
          }
          body, main, html {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card {
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
          }
          .print-title {
            color: black !important;
          }
          .print-text {
            color: #333 !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-between mb-8 no-print">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">AI Business Plan</h1>
          <p className="text-zinc-500">Professional, investor-ready executive summary and operational plan.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" className="border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 h-10">
                <Printer className="w-4 h-4 mr-2" />
                Print / Save PDF
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Document Content */}
        <div className="lg:col-span-3 space-y-6">
            <Card className="print-card bg-white text-zinc-900 shadow-2xl overflow-hidden border-none min-h-[1000px] p-12">
                <div className="flex justify-between items-start mb-16 border-b border-zinc-100 pb-8">
                    <div>
                        <h2 className="print-title text-4xl font-black tracking-tighter text-zinc-900 mb-2">LaunchPilot AI</h2>
                        <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Generated Business Strategy v1.0</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-amber-500">{project.name}</p>
                        <p className="text-sm text-zinc-500">{project.industry}</p>
                    </div>
                </div>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-4">
                            <h3 className="print-title text-xl font-bold text-zinc-800 border-l-4 border-amber-500 pl-4">{section.title}</h3>
                            <p className="print-text text-zinc-600 leading-relaxed text-lg">
                                {section.content}
                            </p>
                        </div>
                    ))}

                    <div className="pt-12 border-t border-zinc-100">
                         <h3 className="print-title text-xl font-bold text-zinc-800 mb-6">Initial Milestones</h3>
                         <div className="grid grid-cols-1 gap-4">
                            {[
                                `Launch MVP Development: stay within ${project.budget} budget.`,
                                `Begin Customer Onboarding in ${project.country}.`,
                                `Implement Primary Monetization: ${project.businessModel} setups.`,
                            ].map((milestone, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span className="print-text text-zinc-700 font-medium">{milestone}</span>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-zinc-50 text-center">
                    <p className="text-zinc-700 text-xs italic">Confidentially prepared by LaunchPilot AI for {project.name}</p>
                </div>
            </Card>
        </div>

        {/* Sidebar Actions/Insights */}
        <div className="lg:col-span-1 space-y-6 no-print">
            <Card className="bg-amber-500/10 border-amber-500/20">
                <CardHeader>
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-500">
                        <Sparkles className="w-4 h-4" />
                        AI Refinement
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        I've optimized this plan for **Venture Capital** standards. You can download this strategy report directly or print it as a PDF.
                    </p>
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-between text-xs h-9 border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 cursor-default">
                            Tone: Professional / VC
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-50/50 border-zinc-200">
                <CardContent className="p-6">
                    <h4 className="text-sm font-bold text-zinc-900 mb-2">Plan Health Score</h4>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xs font-black text-zinc-900">
                            96%
                        </div>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest leading-tight">
                            Ready for <br /> submission
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
