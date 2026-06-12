import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[140px] rounded-full -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[20%] left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm">Start validating your startup ideas instantly</p>
        </div>
        
        <div className="backdrop-blur-xl bg-slate-900/50 border border-white/10 p-1 rounded-2xl shadow-2xl shadow-indigo-500/10">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white",
                dividerLine: "bg-white/10",
                dividerText: "text-slate-500",
                formFieldLabel: "text-slate-300",
                formFieldInput: "bg-slate-950/50 border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20",
                footerActionText: "text-slate-400",
                footerActionLink: "text-indigo-400 hover:text-indigo-300",
                identityPreviewText: "text-slate-300",
                identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
                formResendCodeLink: "text-indigo-400 hover:text-indigo-300",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
