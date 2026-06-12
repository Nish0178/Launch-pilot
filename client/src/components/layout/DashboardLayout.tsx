"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  ShieldAlert, 
  Search, 
  TrendingUp, 
  Swords, 
  Lightbulb, 
  Target,
  MessageSquare,
  FileText,
  Menu,
  X,
  Briefcase,
  Globe,
  Calendar,
  Sparkles,
  PlusCircle,
  Loader2,
  Activity,
  FlaskConical,
  Presentation,
  Paintbrush
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProject } from "@/hooks/useProject";
import OnboardingForm from "./OnboardingForm";

const sidebarItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Validation Score", icon: Target, href: "/dashboard/validation" },
  { name: "Digital Twin", icon: Activity, href: "/dashboard/digital-twin" },
  { name: "Simulation Lab", icon: FlaskConical, href: "/dashboard/simulation" },
  { name: "Market Research", icon: BarChart3, href: "/dashboard/market" },
  { name: "Business Model", icon: Briefcase, href: "/dashboard/model" },
  { name: "Competitors", icon: Swords, href: "/dashboard/competitors" },
  { name: "SWOT Analysis", icon: ShieldAlert, href: "/dashboard/swot" },
  { name: "Customer Personas", icon: Users, href: "/dashboard/personas" },
  { name: "Branding Studio", icon: Paintbrush, href: "/dashboard/branding" },
  { name: "Pitch Deck", icon: Presentation, href: "/dashboard/pitch-deck" },
  { name: "GTM & Roadmap", icon: Calendar, href: "/dashboard/roadmap" },
  { name: "Business Plan", icon: FileText, href: "/dashboard/plan" },
  { name: "Landing Page", icon: Globe, href: "/dashboard/landing-page" },
  { name: "Shark Tank Mode", icon: Lightbulb, href: "/dashboard/sharktank" },
  { name: "AI Co-Founder", icon: MessageSquare, href: "/dashboard/cofounder" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { project, loading, validateNewProject, resetProject } = useProject();

  // 1. Loading state (fetching active project from database)
  if (loading && !project) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Loading intelligence...</p>
        </div>
      </div>
    );
  }

  // 2. Onboarding flow if no project exists yet
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        {/* Simplified Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">LaunchPilot AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">Step 1: Enter Startup Idea</span>
          </div>
        </header>

        {/* Center Form */}
        <main className="flex-1 flex items-center justify-center p-8 max-w-6xl mx-auto w-full">
          <OnboardingForm onSubmit={validateNewProject} />
        </main>

        <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-600">
          © 2026 LaunchPilot AI. Formulate startup validation reports in 60 seconds.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-50 flex flex-col h-full border-r border-white/5 bg-slate-900/95 backdrop-blur-xl transition-all duration-300",
          isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-20 md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center px-6 gap-3 shrink-0">
          <div className="p-2 bg-indigo-600 rounded-lg shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className={cn("font-bold text-lg tracking-tight transition-opacity", isSidebarOpen ? "opacity-100" : "md:opacity-0 md:w-0 overflow-hidden")}>LaunchPilot</span>
        </div>

        <div className="flex-1 px-3 py-2 overflow-y-auto">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-all group",
                    isActive 
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                      : "hover:bg-white/5 text-slate-400 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-indigo-400" : "group-hover:text-indigo-400")} />
                  <span className={cn("text-sm font-medium transition-opacity", isSidebarOpen ? "opacity-100" : "md:opacity-0 md:w-0 overflow-hidden")}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* New Validation Button */}
        <div className={cn("p-4 transition-opacity", isSidebarOpen ? "opacity-100" : "md:opacity-0 md:h-0 md:p-0 md:overflow-hidden")}>
          <Button 
            onClick={resetProject}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-xl h-10 font-bold"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="truncate">New Validation</span>
          </Button>
        </div>

        <div className="p-4 border-t border-white/5 shrink-0">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 px-3 text-slate-400 hover:text-white hover:bg-white/5"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
            <span className={cn("text-sm font-medium transition-opacity", isSidebarOpen ? "opacity-100" : "md:opacity-0 md:w-0 overflow-hidden")}>Collapse</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-white/5 bg-slate-950/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search startup intelligence..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            {/* Mobile Search Icon Only */}
            <Button variant="ghost" size="icon" className="sm:hidden text-slate-400">
              <Search className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-semibold text-white truncate max-w-[120px]">{project.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold truncate max-w-[120px]">{project.industry}</span>
            </div>
            <UserButton 
              afterSignOutUrl="/"
              userProfileMode="navigation"
              userProfileUrl="/settings"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 border border-white/20"
                }
              }}
            />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
