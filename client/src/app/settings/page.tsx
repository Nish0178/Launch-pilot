import { UserProfile } from "@clerk/nextjs";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-sm text-slate-500">Manage your profile, email, password, and security preferences.</p>
        </div>
        
        <div className="w-full flex justify-center [&>.cl-rootBox]:w-full [&>.cl-rootBox]:max-w-4xl">
          <UserProfile 
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full shadow-2xl",
                card: "bg-slate-50/50 backdrop-blur-xl border border-slate-200 shadow-none w-full",
                navbar: "border-r border-slate-200 hidden md:block",
                navbarButton: "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                navbarButtonActive: "text-blue-600 bg-blue-500/10",
                headerTitle: "text-slate-900",
                headerSubtitle: "text-slate-500",
                profileSectionTitle: "text-slate-900 border-b border-slate-200",
                profileSectionTitleText: "text-slate-900",
                profileSectionPrimaryButton: "text-blue-600 hover:text-indigo-300 hover:bg-blue-500/10",
                badge: "bg-blue-500/20 text-blue-600",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",
                formButtonReset: "text-slate-500 hover:bg-slate-50",
                formFieldLabel: "text-slate-700",
                formFieldInput: "bg-slate-500 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                dividerLine: "bg-slate-100",
                profileSectionItem: "border-b border-slate-200",
                breadcrumbsItem: "text-slate-500",
                breadcrumbsItemDivider: "text-slate-500",
                accordionTriggerButton: "text-slate-900 hover:bg-slate-50",
                pageScrollBox: "bg-transparent",
              }
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
