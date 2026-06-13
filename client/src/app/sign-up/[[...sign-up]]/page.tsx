import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[140px] rounded-full -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[20%] left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full -z-10" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 text-center flex flex-col items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity mb-4">
            <img src="/logo.png" alt="LaunchPilot AI Logo" className="h-16 w-auto object-contain" />
          </Link>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Create Account</h1>
          <p className="text-zinc-500 mt-2 text-sm">Start validating your startup ideas instantly</p>
        </div>
        
        <div className="backdrop-blur-xl bg-zinc-50/50 border border-zinc-200 p-1 rounded-2xl shadow-2xl shadow-amber-500/10">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-900",
                dividerLine: "bg-zinc-100",
                dividerText: "text-zinc-500",
                formFieldLabel: "text-zinc-700",
                formFieldInput: "bg-zinc-500 border-zinc-200 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                formButtonPrimary: "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20",
                footerActionText: "text-zinc-500",
                footerActionLink: "text-amber-500 hover:text-indigo-300",
                identityPreviewText: "text-zinc-700",
                identityPreviewEditButton: "text-amber-500 hover:text-indigo-300",
                formResendCodeLink: "text-amber-500 hover:text-indigo-300",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
