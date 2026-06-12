"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { 
  Users, 
  Target, 
  MapPin, 
  DollarSign, 
  AlertCircle
} from "lucide-react";

export default function PersonasPage() {
  const { project } = useProject();

  if (!project) return null;

  const personas = (project.validationReport as any)?.personas || [];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Customer Personas</h1>
        <p className="text-slate-400">Detailed profiles of your ideal target audience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {personas.map((persona: any, i: number) => (
          <Card key={i} className="bg-slate-900/50 border-white/5 overflow-hidden group hover:border-indigo-500/30 transition-all">
            <CardHeader className="bg-white/5 border-b border-white/5 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-lg shadow-indigo-500/20">
                  {persona.name?.charAt(0) || "U"}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">{persona.name}</CardTitle>
                  <p className="text-sm text-indigo-400 font-medium">{persona.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Demographics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <Users className="w-3 h-3" />
                    Age
                   </div>
                   <p className="text-sm font-bold text-white">{persona.demographics?.age || "N/A"}</p>
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <DollarSign className="w-3 h-3" />
                    Income
                   </div>
                   <p className="text-sm font-bold text-white">{persona.demographics?.income || "N/A"}</p>
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <MapPin className="w-3 h-3" />
                    Locale
                   </div>
                   <p className="text-sm font-bold text-white">{persona.demographics?.location || "N/A"}</p>
                </div>
              </div>

              {/* Goals & Pain Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <div className="space-y-3">
                   <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    Primary Goals
                   </h4>
                   <ul className="space-y-2">
                     {persona.goals?.map((goal: string, j: number) => (
                       <li key={j} className="text-xs text-slate-300 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                         <span>{goal}</span>
                       </li>
                     )) || <p className="text-xs text-slate-500">No goals identified.</p>}
                   </ul>
                </div>
                <div className="space-y-3">
                   <h4 className="text-xs font-bold text-rose-400 flex items-center gap-2 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    Pain Points
                   </h4>
                   <ul className="space-y-2">
                     {persona.painPoints?.map((pain: string, j: number) => (
                       <li key={j} className="text-xs text-slate-300 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                         <span>{pain}</span>
                       </li>
                     )) || <p className="text-xs text-slate-500">No pain points identified.</p>}
                   </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
