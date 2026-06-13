"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Rocket, Target, DollarSign, Briefcase, Globe, ArrowRight, Loader2, CheckCircle2, Sparkles } from "lucide-react";

interface OnboardingFormProps {
  initialIdea?: string;
  onSubmit: (data: {
    name: string;
    idea: string;
    industry: string;
    country: string;
    budget: string;
    businessModel: string;
  }) => Promise<any>;
}

const STEPS = [
  { title: "Core Identity", desc: "Define your startup name and sector." },
  { title: "The Vision", desc: "Describe your concept and target geography." },
  { title: "Economics", desc: "Specify your model and initial resources." }
];

const LOADING_PHASES = [
  "Analyzing market demand patterns...",
  "Scraping competitor pricing & positions...",
  "Evaluating scalability & execution risks...",
  "Drafting customer persona profiles...",
  "Formulating go-to-market timeline...",
  "Assembling Business Model Canvas...",
  "Finalizing investment readiness metrics..."
];

export default function OnboardingForm({ onSubmit, initialIdea = "" }: OnboardingFormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [form, setForm] = useState({
    name: "",
    idea: initialIdea,
    industry: "",
    country: "India",
    budget: "$10,000 - $50,000",
    businessModel: "SaaS Subscription"
  });

  // Cycle through loading messages to feel premium & realistic
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev < LOADING_PHASES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.idea || !form.industry) {
      alert("Please fill in the Name, Idea, and Industry fields!");
      return;
    }
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    if (step === 0) return form.name.trim() !== "" && form.industry.trim() !== "";
    if (step === 1) return form.idea.trim() !== "";
    return true;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center max-w-lg mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-amber-500/10 border-t-amber-500 animate-spin flex items-center justify-center shadow-lg shadow-amber-500/10" />
          <Sparkles className="w-8 h-8 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center justify-center gap-2">
            Running AI Validation Engine
          </h2>
          <p className="text-amber-500 font-bold uppercase tracking-widest text-[10px] h-4">
            {LOADING_PHASES[currentPhase]}
          </p>
          <p className="text-zinc-500 text-xs max-w-sm mx-auto pt-2 leading-relaxed">
            We are analyzing database endpoints, mapping unit economics, and compiling reports. This will take less than 10 seconds.
          </p>
        </div>

        {/* Visual progress bar */}
        <div className="w-full bg-zinc-50 h-1.5 rounded-full overflow-hidden border border-zinc-200">
          <div 
            className="bg-amber-500 h-full transition-all duration-1000 ease-out" 
            style={{ width: `${((currentPhase + 1) / LOADING_PHASES.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-xl mx-auto bg-zinc-50/40 border-zinc-200 backdrop-blur-2xl shadow-2xl p-8 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-[80px] rounded-full -z-10" />
      
      <CardHeader className="px-0 pt-0 pb-6 border-b border-zinc-200">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="w-6 h-6 text-amber-500" />
          <span className="font-extrabold text-zinc-900 tracking-tight text-xl">Validate Your Startup Idea</span>
        </div>
        <CardDescription className="text-zinc-500 text-sm">
          Complete the 3 quick steps to generate your dynamic startup intelligence report.
        </CardDescription>
        
        {/* Step indicator */}
        <div className="flex gap-2 mt-6">
          {STEPS.map((s, idx) => (
            <div key={idx} className="flex-1 space-y-1.5">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx <= step ? "bg-amber-500" : "bg-zinc-100"
                }`}
              />
              <span className={`text-[10px] font-bold block transition-colors ${
                idx === step ? "text-amber-500" : "text-zinc-600"
              }`}>
                Step {idx + 1}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-8 space-y-6">
        {step === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Startup Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. EcoStream AI or FitPath"
                className="bg-white/60 border-zinc-200 text-zinc-900 rounded-xl h-11 focus-visible:ring-amber-500 placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Industry Sector</label>
              <Input
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                placeholder="e.g. CleanTech, EdTech, SaaS, FinTech"
                className="bg-white/60 border-zinc-200 text-zinc-900 rounded-xl h-11 focus-visible:ring-amber-500 placeholder:text-zinc-600"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Startup Concept & Idea</label>
              <textarea
                value={form.idea}
                onChange={(e) => setForm({ ...form, idea: e.target.value })}
                placeholder="Describe what your startup does, who it is for, and how it solves their problem in detail..."
                className="w-full min-h-[120px] bg-white/60 border border-zinc-200 text-zinc-900 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm placeholder:text-zinc-600 resize-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Target Market</label>
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full bg-white/60 border border-zinc-200 text-zinc-900 rounded-xl h-11 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm transition-all"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="UAE">UAE</option>
                <option value="Global">Global</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Estimated Launch Budget</label>
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full bg-white/60 border border-zinc-200 text-zinc-900 rounded-xl h-11 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm transition-all"
              >
                <option value="Under $10,000">Under $10,000</option>
                <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                <option value="$50,000 - $150,000">$50,000 - $150,000</option>
                <option value="$150,000+">$150,000+</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Revenue Model</label>
              <select
                value={form.businessModel}
                onChange={(e) => setForm({ ...form, businessModel: e.target.value })}
                className="w-full bg-white/60 border border-zinc-200 text-zinc-900 rounded-xl h-11 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm transition-all"
              >
                <option value="SaaS Subscription">SaaS Subscription</option>
                <option value="Marketplace Commission">Marketplace Commission</option>
                <option value="Transactional Fee">Transactional Fee</option>
                <option value="Ad-supported/Freemium">Ad-supported/Freemium</option>
                <option value="Direct Sales / E-commerce">Direct Sales / E-commerce</option>
              </select>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-zinc-200">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 rounded-xl h-11 flex-1 font-bold text-sm"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-amber-500 hover:bg-amber-600 text-zinc-900 rounded-xl h-11 flex-[2] font-bold text-sm gap-2"
          >
            {step === STEPS.length - 1 ? "Generate Report" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
