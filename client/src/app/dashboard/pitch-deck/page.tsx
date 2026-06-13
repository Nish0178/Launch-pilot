"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useProject } from "@/hooks/useProject";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Presentation, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];

export default function PitchDeckPage() {
  const { project } = useProject();
  const { getToken } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (project) {
      const fetchPitchDeck = async () => {
        try {
          const token = await getToken();
          const headers: Record<string, string> = { "Content-Type": "application/json" };
          if (token) headers["Authorization"] = `Bearer ${token}`;

          const res = await fetch(`http://localhost:5000/api/projects/${project.id}/pitch-deck`, { 
            method: 'POST',
            headers
          });
          const d = await res.json();
          let parsed = d;
          if (typeof d === 'string') {
            try { parsed = JSON.parse(d); } catch(e){}
          }
          setData(parsed);
          setLoading(false);
        } catch (error) {
          console.error("Failed to load pitch deck data", error);
          setLoading(false);
        }
      };
      fetchPitchDeck();
    }
  }, [project, getToken]);

  if (!project) return null;

  const handleNext = () => {
    if (data && currentSlide < data.slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const exportPDF = async () => {
    if (!data || !data.slides) return;
    setExporting(true);
    try {
      const element = document.getElementById("pdf-export-container");
      if (!element) return;
      
      element.style.display = "block";
      
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1920, 1080] });
      const slideElements = element.querySelectorAll(".export-slide");
      
      for (let i = 0; i < slideElements.length; i++) {
        const canvas = await html2canvas(slideElements[i] as HTMLElement, { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        if (i > 0) pdf.addPage([1920, 1080], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, 1920, 1080);
      }
      
      pdf.save(`${project.name.replace(/\s+/g, '_')}_PitchDeck.pdf`);
      element.style.display = "none";
    } catch (e) {
      console.error("Export failed", e);
    } finally {
      setExporting(false);
    }
  };

  const renderSlideContent = (slide: any, isExport = false) => {
    return (
      <div className="flex-1 flex flex-col justify-center max-w-4xl relative z-10 w-full h-full">
        <h2 className={cn("font-black text-zinc-900 leading-tight flex-shrink-0", isExport ? "text-6xl mb-8" : "text-3xl md:text-4xl mb-4")}>
          {slide.title}
        </h2>
        
        <p className={cn("text-zinc-700 leading-relaxed whitespace-pre-wrap flex-shrink-0", isExport ? "text-3xl mb-8" : "text-base md:text-lg mb-4")}>
          {slide.content}
        </p>

        {slide.bullets && slide.bullets.length > 0 && (
          <ul className={cn("list-disc list-inside text-zinc-700 flex-shrink-0", isExport ? "text-3xl space-y-6 mb-8" : "text-base md:text-lg space-y-2 mb-4")}>
            {slide.bullets.map((bullet: string, i: number) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}

        {slide.metrics && slide.metrics.length > 0 && (
          <div className={cn("grid grid-cols-2 flex-shrink-0 w-full", isExport ? "gap-6 mb-8" : "gap-4 mb-4")}>
            {slide.metrics.map((metric: any, i: number) => (
              <div key={i} className="bg-zinc-500/50 border border-zinc-200 rounded-2xl p-4 text-center">
                <div className={cn("text-zinc-500 mb-1 uppercase tracking-widest font-bold", isExport ? "text-2xl" : "text-xs")}>{metric.label}</div>
                <div className={cn("font-black text-amber-500", isExport ? "text-6xl" : "text-2xl md:text-3xl")}>{metric.value}</div>
              </div>
            ))}
          </div>
        )}

        {slide.chart && (
          <div className={cn("w-full bg-zinc-500/30 border border-zinc-200 rounded-2xl flex flex-col flex-1 min-h-[150px]", isExport ? "p-6" : "p-4")}>
            <h4 className={cn("font-bold text-zinc-900 mb-2 text-center", isExport ? "text-2xl" : "text-sm")}>{slide.chart.title}</h4>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                {slide.chart.type === 'pie' ? (
                  <PieChart>
                    <Pie data={slide.chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isExport ? 150 : 60} label>
                      {slide.chart.data.map((entry: any, index: number) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <BarChart data={slide.chart.data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={isExport ? 20 : 12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={isExport ? 20 : 12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: '#f4f4f5'}} />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg">
              <Presentation className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Pitch Deck Generator</h1>
              <p className="text-sm text-zinc-500">Export-ready investor slides based on your validation report.</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={exportPDF}
            disabled={exporting || !data || !data.slides}
            className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
          >
            {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            {exporting ? "Generating PDF..." : "Export PDF"}
          </Button>
        </div>

        {loading ? (
          <div className="flex h-[500px] items-center justify-center border border-zinc-200 bg-zinc-50/50 rounded-2xl">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        ) : !data || data.error || !data.slides ? (
          <div className="flex h-[500px] items-center justify-center border border-zinc-200 bg-zinc-50/50 rounded-2xl text-zinc-500">
            Failed to load Pitch Deck data. {data?.error}
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            
            {/* Slide Viewer */}
            <div className="w-full min-h-[500px] h-auto lg:h-[600px] bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col p-6 md:p-12 transition-all duration-500 animate-in fade-in zoom-in-95 pb-16">
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              {/* Header */}
              <div className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 flex-shrink-0">
                Slide {currentSlide + 1} / {data.slides.length}
              </div>

              {/* Content */}
              {renderSlideContent(data.slides[currentSlide])}

              {/* Footer */}
              <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-sm font-medium text-zinc-500">
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
                disabled={currentSlide === 0 || exporting}
                className="rounded-full w-12 h-12 border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-amber-500 hover:border-amber-500 disabled:opacity-30 disabled:hover:bg-zinc-50/50"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <div className="flex gap-2 flex-wrap justify-center max-w-xs">
                {data.slides.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    disabled={exporting}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      idx === currentSlide ? "bg-amber-500 w-8" : "bg-zinc-300 hover:bg-zinc-400"
                    )}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext} 
                disabled={currentSlide === data.slides.length - 1 || exporting}
                className="rounded-full w-12 h-12 border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-amber-500 hover:border-amber-500 disabled:opacity-30 disabled:hover:bg-zinc-50/50"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Hidden Container for PDF Export */}
            <div id="pdf-export-container" style={{ display: 'none', position: 'absolute', top: '-9999px', left: '-9999px', width: '1920px' }}>
              {data.slides.map((slide: any, idx: number) => (
                <div 
                  key={idx} 
                  className="export-slide w-[1920px] h-[1080px] bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden flex flex-col p-24 justify-center"
                >
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                  <div className="text-2xl font-bold text-amber-500 uppercase tracking-widest mb-8 flex-shrink-0">
                    Slide {idx + 1} / {data.slides.length}
                  </div>

                  {renderSlideContent(slide, true)}

                  <div className="absolute bottom-16 left-24 right-24 flex justify-between items-center text-3xl font-medium text-zinc-500">
                    <span>{project.name}</span>
                    <span>Confidential</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
