import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/layout/TopNav";

export const metadata: Metadata = {
  title: "TalentLens | Evidence-First Talent Intelligence",
  description: "Replace CVs with verified proof. The smart hiring platform for Rwanda.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <TopNav />
        {children}
      </body>
    </html>
  );
}