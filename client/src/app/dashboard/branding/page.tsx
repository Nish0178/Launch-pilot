"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useProject } from "@/hooks/useProject";
import { Loader2, Paintbrush, Copy, Check, Hexagon, Type, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BrandingStudioPage() {
  const { project } = useProject();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      fetch(`http://localhost:5000/api/projects/${project.id}/branding`, { method: 'POST' })
        .then(res => res.json())
        .then(d => {
          let parsed = d;
          if (typeof d === 'string') {
            try { parsed = JSON.parse(d); } catch(e){}
          }
          setData(parsed);
          setLoading(false);
        })
    }
  }, [project]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!project) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Paintbrush className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Branding Studio</h1>
            <p className="text-sm text-slate-500">Identity, naming, and visual style concepts.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[400px] items-center justify-center border border-slate-200 bg-slate-50/50 rounded-2xl">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : !data || data.error || !data.names ? (
          <div className="flex h-[400px] items-center justify-center border border-slate-200 bg-slate-50/50 rounded-2xl text-slate-500">
            Failed to load Branding data. {data?.error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Naming Concepts */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl lg:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-blue-600">
                <Type className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Startup Name Suggestions</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.names?.map((name: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-500 border border-slate-200 rounded-xl group hover:border-blue-500/50 transition-colors">
                    <span className="font-bold text-lg text-slate-900">{name}</span>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(name)} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-900">
                      {copied === name ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Personality */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6 text-blue-600">
                <Hash className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Brand Voice</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.personality?.map((trait: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-full text-sm font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Taglines */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl lg:col-span-2">
              <h3 className="font-semibold text-slate-900 mb-6">Tagline Concepts</h3>
              <div className="space-y-3">
                {data.taglines?.map((tagline: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-500 border border-slate-200 rounded-xl group hover:border-blue-500/50 transition-colors">
                    <span className="text-slate-700 font-medium italic">"{tagline}"</span>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(tagline)} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-900">
                      {copied === tagline ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 backdrop-blur-xl lg:col-span-3">
              <div className="flex items-center gap-2 mb-6 text-cyan-400">
                <Hexagon className="w-5 h-5" />
                <h3 className="font-semibold text-slate-900">Suggested Color Palette</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.colors?.map((color: any, i: number) => (
                  <div key={i} className="group cursor-pointer" onClick={() => copyToClipboard(color.hex)}>
                    <div 
                      className="h-32 w-full rounded-2xl shadow-inner mb-3 transition-transform group-hover:-translate-y-1 group-hover:shadow-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{color.name}</div>
                        <div className="text-xs text-slate-500 uppercase">{color.hex}</div>
                      </div>
                      {copied === color.hex ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
