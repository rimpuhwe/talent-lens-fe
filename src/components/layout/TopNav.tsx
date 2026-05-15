"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();

  // Hide on homepage
  if (pathname === "/") {
    return null;
  }

  return (
    // The main wrapper stays full width, sticky, and on top
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      
      {/* REMOVED max-w-[1400px]! It now stretches edge-to-edge with padding */}
      <div className="w-full px-6 md:px-10 lg:px-12 py-4 flex items-center justify-between">
        
        {/* LOGO (Left) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div>
            {/* NEW CUSTOM SVG: Matches your uploaded image perfectly */}
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#2563EB" /* Vibrant blue from your image */
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Top Left Bracket */}
              <path d="M9 4H6a2 2 0 0 0-2 2v3"></path>
              {/* Top Right Bracket */}
              <path d="M15 4h3a2 2 0 0 1 2 2v3"></path>
              {/* Bottom Left Bracket */}
              <path d="M9 20H6a2 2 0 0 1-2-2v-3"></path>
              {/* Bottom Right Bracket */}
              <path d="M15 20h3a2 2 0 0 0 2-2v-3"></path>
              {/* Center Dot */}
              <circle cx="12" cy="12" r="2.5"></circle>
            </svg>
          </div>
          <span className="font-extrabold text-[28px] tracking-tight text-[#0A192F]">
            TalentLens
          </span>
        </Link>

       

        {/* CONTACT & SIGN IN (Right) */}
        <div className="hidden lg:flex items-center gap-10">
          
          <div className="flex items-center gap-3">
            <div className="text-[#2563EB]">
              <Phone size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">CALL US TODAY!</span>
              <span className="font-extrabold text-[15px] text-[#0A192F] leading-none">+250 787 333 755</span>
            </div>
          </div>

          <Link href="/login" className="text-[14px] font-bold text-[#0A192F] uppercase hover:text-[#2563EB] tracking-wide">
            SIGN IN
          </Link>

        </div>
      </div>
    </nav>
  );
}