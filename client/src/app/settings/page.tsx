import { UserProfile } from "@clerk/nextjs";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Account Settings</h1>
          <p className="text-sm text-slate-400">Manage your profile, email, password, and security preferences.</p>
        </div>
        
        <div className="w-full flex justify-center [&>.cl-rootBox]:w-full [&>.cl-rootBox]:max-w-4xl">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full shadow-2xl",
                card: "bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-none w-full",
                navbar: "border-r border-white/10 hidden md:block",
                navbarButton: "text-slate-400 hover:text-white hover:bg-white/5",
                navbarButtonActive: "text-indigo-400 bg-indigo-500/10",
                headerTitle: "text-white",
                headerSubtitle: "text-slate-400",
                profileSectionTitle: "text-white border-b border-white/10",
                profileSectionTitleText: "text-white",
                profileSectionPrimaryButton: "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10",
                badge: "bg-indigo-500/20 text-indigo-400",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20",
                formButtonReset: "text-slate-400 hover:bg-white/5",
                formFieldLabel: "text-slate-300",
                formFieldInput: "bg-slate-950/50 border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
                dividerLine: "bg-white/10",
                profileSectionItem: "border-b border-white/10",
                breadcrumbsItem: "text-slate-400",
                breadcrumbsItemDivider: "text-slate-500",
                accordionTriggerButton: "text-white hover:bg-white/5",
                pageScrollBox: "bg-transparent",
              }
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
