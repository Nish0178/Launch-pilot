import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute top-[20%] right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="mb-8 text-center flex flex-col items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity mb-4">
            <img src="/logo.png" alt="LaunchPilot AI Logo" className="h-16 w-auto object-contain" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to your LaunchPilot AI dashboard</p>
        </div>
        
        <div className="backdrop-blur-xl bg-slate-50/50 border border-slate-200 p-1 rounded-2xl shadow-2xl shadow-blue-500/10">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900",
                dividerLine: "bg-slate-100",
                dividerText: "text-slate-500",
                formFieldLabel: "text-slate-700",
                formFieldInput: "bg-slate-500 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
                footerActionText: "text-slate-500",
                footerActionLink: "text-blue-600 hover:text-indigo-300",
                identityPreviewText: "text-slate-700",
                identityPreviewEditButton: "text-blue-600 hover:text-indigo-300",
                formResendCodeLink: "text-blue-600 hover:text-indigo-300",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
