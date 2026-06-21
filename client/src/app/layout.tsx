import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ui } from "@clerk/ui";
import { ProjectProvider } from "@/hooks/useProject";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Launch Pilot-AI-powered startup validation platform",
  description: "AI-powered startup validation platform",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} ui={ui}>
      <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ProjectProvider>
            <FirebaseAnalytics />
            {children}
          </ProjectProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
