import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentLens | See Beyond the CV",
  description:
    "Africa's evidence-first talent intelligence platform. Replace CVs with verified proof.",
  keywords: ["talent", "hiring", "Rwanda", "AI screening", "Opportunity in Rwanda", "talent intelligence", "skills verification", "data-driven hiring"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#080D1A] text-[#EDF2F7] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
