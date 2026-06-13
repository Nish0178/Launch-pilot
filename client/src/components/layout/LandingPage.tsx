"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProject } from "@/hooks/useProject";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import OnboardingForm from "@/components/layout/OnboardingForm";
import { 
  ArrowRight, 
  Rocket, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Play, 
  Lightbulb, 
  Check, 
  Flame, 
  Loader2,
  Calendar,
  Briefcase,
  HelpCircle,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { loadDemoProject, validateNewProject } = useProject();
  const { isLoaded, userId } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledIdea, setPrefilledIdea] = useState("");
  const [heroInput, setHeroInput] = useState("");
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [demoLoadingPhaseIdx, setDemoLoadingPhaseIdx] = useState(0);

  const DEMO_PHASES = [
    "Establishing secure sandbox connection...",
    "Seeding database with EcoStream AI schema...",
    "Compiling SWOT grid & competitor gaps...",
    "Generating go-to-market milestones...",
    "Connecting YC Co-Founder agent...",
    "Redirecting to validation workspace..."
  ];

  useEffect(() => {
    if (!isDemoLoading) return;
    const interval = setInterval(() => {
      setDemoLoadingPhaseIdx((prev) => {
        if (prev < DEMO_PHASES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [isDemoLoading]);

  const handleQuickValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroInput.trim()) return;
    setPrefilledIdea(heroInput);
    setIsModalOpen(true);
  };

  const handleLaunchValidation = () => {
    setPrefilledIdea("");
    setIsModalOpen(true);
  };

  const handleLoadDemo = async () => {
    try {
      setIsDemoLoading(true);
      setDemoLoadingPhaseIdx(0);
      
      const demoProj = await loadDemoProject();
      
      // Run the premium simulation loader for at least 2.4 seconds
      await new Promise((resolve) => setTimeout(resolve, 2400));
      
      if (demoProj) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load demo report. Is the backend server running?");
      setIsDemoLoading(false);
    }
  };

  const handleOnboardingSubmit = async (formData: any) => {
    const res = await validateNewProject(formData);
    if (res) {
      setIsModalOpen(false);
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-800 overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />
      
      {/* Glowing background spotlights */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute top-[20%] right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-1/3 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -z-10" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 border-b border-slate-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="LaunchPilot AI Logo" className="h-16 w-auto object-contain" />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
              <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
              <button 
                onClick={handleLoadDemo} 
                className="hover:text-blue-600 text-slate-700 font-medium transition-colors bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs"
              >
                Launch Demo Report
              </button>
              
              {isLoaded && !userId && (
                <>
                  <Link href="/sign-in" className="hover:text-slate-900 transition-colors">Sign In</Link>
                  <Link href="/sign-up">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-xl shadow-lg shadow-blue-600/20">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              
              {isLoaded && userId && (
                <>
                  <Link href="/dashboard">
                    <Button className="bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-9 h-9 border border-slate-300"
                      }
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero & Split Layout */}
      <main className="pt-24 pb-16">
        <section className="relative px-6 max-w-7xl mx-auto py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left side text and forms */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Validate Ideas In 60 Seconds</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 bg-clip-text text-transparent">
                Validate Your Startup <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  Before You Build It
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
                Skip the guesswork. Enter your startup idea to receive an instant, database-backed validation dashboard. Competitor intel, SWOT matrices, Business Model Canvas, GTM timeline, and investor pitch ready in 60s.
              </p>

              {/* Quick Validation input box */}
              <form onSubmit={handleQuickValidate} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                    <Sparkles className="w-4 h-4 text-blue-500/80" />
                  </div>
                  <input
                    type="text"
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    placeholder="Enter your startup concept (e.g. peer-to-peer camper rental)..."
                    className="w-full h-12 pl-10 pr-4 bg-slate-50/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600 text-slate-900"
                  />
                </div>
                <Button 
                  type="submit"
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl gap-2 shadow-lg shadow-blue-600/20"
                >
                  Quick Start
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Hero Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={handleLaunchValidation}
                  size="lg"
                  className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 font-bold rounded-xl gap-2 shadow-lg shadow-blue-600/10"
                >
                  Launch Validation Wizard
                  <ArrowRight className="w-4.5 h-4.5" />
                </Button>
                <Button
                  onClick={handleLoadDemo}
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold rounded-xl gap-2"
                >
                  <Play className="w-4 h-4 text-blue-600 fill-blue-600/20" />
                  View Demo Report
                </Button>
              </div>
            </div>

            {/* Right side interactive floating mockup */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-blue-500/10 blur-3xl -z-10 rounded-full" />
              
              {/* Premium Dashboard Floating Mockup Card */}
              <div className="w-full max-w-[380px] bg-slate-50/70 border border-slate-200 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full" />
                
                {/* Mock header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                    SIMULATION MODE
                  </span>
                </div>

                {/* Concept name */}
                <div className="mb-6 space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Validated Startup</span>
                  <h3 className="font-extrabold text-slate-900 text-lg">EcoStream AI</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">AI-driven energy management and optimization software for green homes.</p>
                </div>

                {/* Success Score circle */}
                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Success Score</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl font-black text-emerald-400">82</span>
                      <span className="text-[10px] text-slate-500">/100</span>
                    </div>
                  </div>
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-900/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-emerald-500" strokeWidth="3" strokeDasharray="82, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <Zap className="w-4 h-4 text-emerald-400 absolute" />
                  </div>
                </div>

                {/* Score breakdown metrics */}
                <div className="space-y-3.5 mb-6">
                  {[
                    { label: "Market Demand", val: "85%", col: "bg-blue-500" },
                    { label: "Scalability potential", val: "92%", col: "bg-blue-500" },
                    { label: "Competitor spacing", val: "65%", col: "bg-emerald-500" }
                  ].map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">{m.label}</span>
                        <span className="text-slate-900">{m.val}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full ${m.col}`} style={{ width: m.val }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Chat snippet */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">AI Persona Idea</span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-relaxed italic">
                    "Sustainable Sarah (Eco-conscious homeowner): High utility bills feel out of my control. I need automated efficiency recommendations."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-6 relative border-t border-slate-200 bg-slate-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Complete Startup Intelligence</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              We compile and map a total validation system in less than a minute. Everything is structured database-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Dynamic Scorecard Engines", desc: "Automated evaluations of market demand, competition strength, scalability thresholds, and overall probability of success.", icon: Zap },
              { title: "Competitor Intelligence Gaps", desc: "Detailed breakdown of competitor strengths, pricing architectures, market segments, and where your distinct advantage lies.", icon: ShieldCheck },
              { title: "GTM Milestones & Roadmaps", desc: "Actionable roadmap schedules divided into six custom phases, including immediate launch tactics (Day 1 - Month 12).", icon: Calendar },
              { title: "Business Model Canvas", desc: "Instantly mapped keys including partners, value propositions, resource structures, cost allocations, and revenue flow channels.", icon: Briefcase },
              { title: "Customer Personas", desc: "AI-profiled core buying customer groups with specific pain points, age ranges, income brackets, and core goals.", icon: Users },
              { title: "YC Advisor Chat Integration", desc: "Full real-time chat with a YC-style AI Co-Founder trained directly on your validation metrics to help guide decisions.", icon: MessageSquare },
            ].map((f, i) => (
              <div 
                key={i} 
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section id="how-it-works" className="py-24 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The 60-Second Process</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              We've consolidated hours of market research into three seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <div className="hidden lg:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-slate-50 -z-10" />
            
            {[
              { step: "01", title: "Submit Startup Details", desc: "Provide your startup name, idea concept, industry, and budget range via our multi-step validation modal." },
              { step: "02", title: "Wait 6 Seconds", desc: "Our engine triggers dynamic analysis APIs, scraping models, and mapping SWOT details in real time." },
              { step: "03", title: "Explore Workspace", desc: "Review 12 interactive dashboard views, consult your AI co-founder, or download a printable business plan." }
            ].map((s, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 text-blue-600 text-xl font-extrabold flex items-center justify-center mx-auto shadow-xl">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Call to Action Section */}
      <section className="py-24 px-6 border-t border-slate-200 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Stop Guessing. <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
              Start Validating.
            </span>
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Get instant reports that verify whether your startup concept holds market viability before committing capital.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleLaunchValidation}
              size="lg"
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
            >
              Validate Startup Idea
            </Button>
            <Button
              onClick={handleLoadDemo}
              variant="outline"
              size="lg"
              className="h-12 px-8 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold rounded-xl"
            >
              Explore Demo Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="LaunchPilot AI Logo" className="h-12 w-auto object-contain" />
          </Link>
          <p className="text-slate-500 text-xs">© 2026 LaunchPilot AI. Formulate startup validation reports in 60 seconds.</p>
          <div className="flex gap-6 text-slate-500 text-xs">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Onboarding Wizard Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl border-slate-200 bg-white text-slate-900 rounded-3xl p-0 overflow-hidden shadow-2xl backdrop-blur-2xl">
          <div className="sr-only">
            <DialogTitle>Startup Onboarding Wizard</DialogTitle>
            <DialogDescription>Submit your startup details to analyze viability.</DialogDescription>
          </div>
          <OnboardingForm 
            key={prefilledIdea} 
            initialIdea={prefilledIdea} 
            onSubmit={handleOnboardingSubmit} 
          />
        </DialogContent>
      </Dialog>

      {/* Full-Screen Immersive Demo Seeding Loader */}
      {isDemoLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md text-slate-900 animate-in fade-in duration-300">
          {/* Glowing central orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full -z-10" />
          
          <div className="flex flex-col items-center gap-6 max-w-sm text-center px-6">
            <div className="relative">
              {/* Spinner */}
              <div className="w-20 h-20 rounded-full border-4 border-blue-500/10 border-t-blue-600 animate-spin flex items-center justify-center shadow-lg shadow-blue-500/20" />
              <Sparkles className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight">Compiling Demo Intelligence</h3>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] h-4">
                {DEMO_PHASES[demoLoadingPhaseIdx]}
              </p>
            </div>
            
            <p className="text-slate-500 text-xs leading-relaxed">
              We are seeding the Postgres sandbox database with EcoStream AI telemetry and generating marketing charts.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
