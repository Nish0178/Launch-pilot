import { UserProfile } from "@clerk/nextjs";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Account Settings</h1>
          <p className="text-sm text-zinc-500">Manage your profile, email, password, and security preferences.</p>
        </div>
        
        <div className="w-full flex justify-center">
          <UserProfile 
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full max-w-4xl shadow-2xl",
                card: "bg-zinc-50/50 backdrop-blur-xl border border-zinc-200 shadow-none w-full",
                navbar: "border-r border-zinc-200 hidden md:block",
                navbarButton: "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50",
                navbarButtonActive: "text-amber-500 bg-amber-500/10",
                headerTitle: "text-zinc-900",
                headerSubtitle: "text-zinc-500",
                profileSectionTitle: "text-zinc-900 border-b border-zinc-200",
                profileSectionTitleText: "text-zinc-900",
                profileSectionPrimaryButton: "text-amber-500 hover:text-indigo-300 hover:bg-amber-500/10",
                badge: "bg-amber-500/20 text-amber-500",
                formButtonPrimary: "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20",
                formButtonReset: "text-zinc-500 hover:bg-zinc-50",
                formFieldLabel: "text-zinc-700",
                formFieldInput: "bg-zinc-500 border-zinc-200 text-zinc-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                dividerLine: "bg-zinc-100",
                profileSectionItem: "border-b border-zinc-200",
                breadcrumbsItem: "text-zinc-500",
                breadcrumbsItemDivider: "text-zinc-500",
                accordionTriggerButton: "text-zinc-900 hover:bg-zinc-50",
                pageScrollBox: "bg-transparent",
              }
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
