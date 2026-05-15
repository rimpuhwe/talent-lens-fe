import { Clock, Mail, MapPin } from 'lucide-react'
import React from 'react'

function TopNavbar() {
  return (
    <div className="bg-bg-secondary/50 backdrop-blur-md border-b border-border-subtle text-text-secondary py-2.5 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-[11px] font-bold tracking-widest uppercase relative z-[10000]">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
            <MapPin size={14} className="text-accent-emerald group-hover:scale-110 transition-transform" /> 
            <span className="hidden xs:inline">Kigali, Rwanda</span>
            <span className="xs:hidden">Kigali</span>
          </span>
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
            <Mail size={14} className="text-accent-emerald group-hover:scale-110 transition-transform" /> 
            partner@talentlens.rw
          </span>
        </div>
        <div className="flex items-center gap-6 mt-2 md:mt-0 border-t md:border-t-0 border-white/5 pt-2 md:pt-0 w-full md:w-auto justify-center">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
            <Clock size={14} className="text-accent-emerald group-hover:scale-110 transition-transform" /> 
            08:00 AM - 06:00 PM
          </span>
        </div>
      </div>
  )
}

export default TopNavbar