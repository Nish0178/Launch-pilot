"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { Button } from "@/components/ui/button";
import { Globe, Copy, Check, Star, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPageGenerator() {
  const { project } = useProject();
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const lp = (project.validationReport as any)?.landingPage;

  const handleCopy = () => {
    if (!lp) return;
    const textToCopy = `
# LANDING PAGE COPY FOR: ${project.name}

## HERO SECTION
- Title: ${lp.hero?.title}
- Tagline: ${lp.hero?.tagline}
- CTA Button: ${lp.hero?.ctaText}

## FEATURES
${lp.features?.map((f: any, idx: number) => `${idx + 1}. ${f.title}: ${f.description}`).join("\n")}

## KEY BENEFITS
${lp.benefits?.map((b: string) => `- ${b}`).join("\n")}

## TESTIMONIALS
${lp.testimonials?.map((t: any) => `"${t.quote}" \n  -- ${t.author}, ${t.role}`).join("\n\n")}

## PRICING TIERS
${lp.pricing?.map((p: any) => `- ${p.tier}: ${p.price}\n  Features: ${p.features.join(", ")}`).join("\n\n")}

## BOTTOM CTA SECTION
- Title: ${lp.ctaSection?.title}
- Description: ${lp.ctaSection?.description}
- Button: ${lp.ctaSection?.buttonText}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">AI Landing Page Generator</h1>
          <p className="text-zinc-500">Pre-written copy and sections ready for website deployment.</p>
        </div>
        <Button onClick={handleCopy} className="bg-amber-500 hover:bg-amber-600 gap-2 font-bold h-10">
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied to Clipboard" : "Copy All Copy"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Copy preview/wireframe builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Wireframe Preview */}
          <Card className="bg-zinc-50/40 border-zinc-200 overflow-hidden p-8 text-center relative border-dashed border-2">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/5 blur-[50px] rounded-full" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mb-4 inline-block">
              Hero Section Preview
            </span>
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-4 leading-tight">
              {lp?.hero?.title || `Launch ${project.name} today`}
            </h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto mb-6 leading-relaxed">
              {lp?.hero?.tagline || `Transform operations in the ${project.industry} space instantly.`}
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 gap-2 h-11 px-6 font-bold rounded-xl shadow-lg shadow-amber-500/20">
              {lp?.hero?.ctaText || "Get Started"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>

          {/* Features section preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Key Features Copy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lp?.features?.map((f: any, i: number) => (
                <Card key={i} className="bg-zinc-50/50 border-zinc-200 p-6">
                  <Star className="w-5 h-5 text-amber-500 mb-3" />
                  <h4 className="font-bold text-zinc-900 mb-2 text-sm">{f.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Social Proof / Testimonials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lp?.testimonials?.map((t: any, i: number) => (
                <Card key={i} className="bg-zinc-50/50 border-zinc-200 p-6 italic text-zinc-700 leading-relaxed text-xs flex flex-col justify-between">
                  <p className="mb-4">"{t.quote}"</p>
                  <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider not-italic">
                    -- {t.author}, <span className="text-zinc-500">{t.role}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits & Pricing */}
        <div className="lg:col-span-1 space-y-6">
          {/* Key Benefits */}
          <Card className="bg-zinc-50/50 border-zinc-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                Key Benefits Copy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lp?.benefits?.map((b: string, i: number) => (
                <div key={i} className="flex gap-2 text-xs text-zinc-700 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{b}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pricing cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Pricing Strategy Copy</h3>
            {lp?.pricing?.map((p: any, i: number) => (
              <Card key={i} className={`bg-zinc-50/50 border-zinc-200 p-6 relative ${
                p.tier.toLowerCase().includes("pro") ? "border-amber-500/30" : ""
              }`}>
                {p.tier.toLowerCase().includes("pro") && (
                  <span className="absolute right-4 top-4 text-[8px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase">
                    Recommended
                  </span>
                )}
                <h4 className="font-bold text-zinc-900 text-sm mb-1">{p.tier}</h4>
                <div className="text-2xl font-black text-zinc-900 mb-4">{p.price}</div>
                <div className="space-y-2 pt-4 border-t border-zinc-200">
                  {p.features?.map((f: string, j: number) => (
                    <div key={j} className="text-[10px] text-zinc-500 flex items-center gap-1.5 leading-tight">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
