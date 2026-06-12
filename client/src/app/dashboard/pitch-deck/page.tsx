"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useProject } from "@/hooks/useProject";
import { Loader2, Presentation, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PitchDeckPage() {
  const { project } = useProject();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (project) {
      fetch(`http://localhost:5000/api/projects/${project.id}/pitch-deck`, { method: 'POST' })
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

  if (!project) return null;

  const handleNext = () => {
    if (data && currentSlide < data.slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Presentation className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Pitch Deck Generator</h1>
              <p className="text-sm text-slate-400">Export-ready investor slides based on your validation report.</p>
            </div>
          </div>
          <Button variant="outline" className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>

        {loading ? (
          <div className="flex h-[500px] items-center justify-center border border-white/5 bg-slate-900/50 rounded-2xl">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : !data || data.error || !data.slides ? (
          <div className="flex h-[500px] items-center justify-center border border-white/5 bg-slate-900/50 rounded-2xl text-slate-400">
            Failed to load Pitch Deck data. {data?.error}
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            
            {/* Slide Viewer */}
            <div className="w-full min-h-[300px] md:aspect-video bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col p-6 md:p-12 transition-all duration-500 animate-in fade-in zoom-in-95">
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              {/* Header */}
              <div className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 md:mb-12">
                Slide {currentSlide + 1} / {data.slides.length}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center max-w-2xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {data.slides[currentSlide]?.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {data.slides[currentSlide]?.content}
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-sm font-medium text-slate-500">
                <span>{project.name}</span>
                <span>Confidential</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-8">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrev} 
                disabled={currentSlide === 0}
                className="rounded-full w-12 h-12 border-white/10 bg-slate-900/50 text-white hover:bg-indigo-600 hover:border-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-900/50"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <div className="flex gap-2">
                {data.slides.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      idx === currentSlide ? "bg-indigo-500 w-8" : "bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext} 
                disabled={currentSlide === data.slides.length - 1}
                className="rounded-full w-12 h-12 border-white/10 bg-slate-900/50 text-white hover:bg-indigo-600 hover:border-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-900/50"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
