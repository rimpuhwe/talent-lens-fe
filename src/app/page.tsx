// src/app/page.tsx
import Link from "next/link";
import { 
  MapPin, Mail, Clock, Phone, 
  Users, Briefcase, Focus, ThumbsUp,
  Target, BrainCircuit, TrendingUp, CheckCircle2, ArrowRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-body overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#0F62FE] text-white py-2.5 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold tracking-wide">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><MapPin size={14} /> Kigali, Rwanda</span>
          <span className="flex items-center gap-2"><Mail size={14} /> partner@talentlens.rw</span>
        </div>
        <div className="flex items-center gap-6 mt-2 sm:mt-0">
          <span className="flex items-center gap-2"><Clock size={14} /> Office Hours: 8:00 AM - 6:00 PM</span>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm py-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="text-[#0F62FE]">
              <Focus size={36} strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-[28px] tracking-tighter text-slate-900">
              TalentLens
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 font-bold text-[15px] text-slate-600">
            <Link href="/" className="text-slate-900">HOME</Link>
            <Link href="#about" className="hover:text-[#0F62FE] transition-colors">JOB OPPORTUNITIES</Link>
            <Link href="#services" className="hover:text-[#0F62FE] transition-colors">FOR RECRUITERS</Link>
            <Link href="#features" className="hover:text-[#0F62FE] transition-colors">PRICING</Link>
          </div>

          {/* CTA Area */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="text-[#0F62FE]">
                <Phone size={28} fill="currentColor" className="rotate-12" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Call us today!</p>
                <p className="font-extrabold text-base text-slate-900 leading-tight">+250 787 333 755</p>
              </div>
            </div>
            <Link href="/login" className="text-[15px] font-bold text-slate-600 hover:text-[#0F62FE] ml-2">SIGN IN</Link>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-32 pb-48 px-6 lg:px-12 bg-slate-900 overflow-hidden flex items-center min-h-[700px]">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/40 z-10" />
          <div className="absolute inset-0 bg-[#0F62FE]/10 z-10 mix-blend-color" /> 
          <img 
            src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1778404707/Recruiters_make_a_dash_for_tech_talent_at_NITs_1_lf8zkt.jpg" 
            alt="talent screening with lens flare" 
            className="w-full lg:w-3/4 h-full object-cover opacity-40 mix-blend-luminosity grayscale"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.05]">
              AI Talent Validation<br />Platform
            </h1>
            
            <div className="w-32 h-2 bg-[#0F62FE] mt-8 mb-8"></div>
            
            <p className="text-slate-300 text-lg md:text-xl mb-12 leading-relaxed font-medium max-w-xl">
              Move beyond the CV. Our intelligent validation engine evaluates candidates through scenario-based missions, providing you with verified proof of work and explainable match scores for confident, bias-free hiring.
            </p>
            
            <Link href="/register" className="inline-block bg-[#0F62FE] hover:bg-blue-700 text-white font-extrabold py-4 px-10 rounded-full text-sm uppercase tracking-[0.15em] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              GET A QUOTE
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FLOATING STATS CARD */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-20 mb-24 flex justify-end">
        <div className="w-full max-w-3xl bg-white rounded-tl-[60px] rounded-br-[60px] rounded-tr-xl rounded-bl-xl py-8 px-8 flex flex-col md:flex-row justify-around items-center gap-6 border border-slate-200 border-b-4 border-b-[#0F62FE] shadow-xl">
          
          <div className="flex flex-col items-center text-center">
            <Users size={32} className="text-[#0F62FE] mb-3" strokeWidth={2} />
            <h3 className="text-3xl lg:text-4xl font-extrabold mb-1 text-slate-900 tracking-tight">20,000+</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Verified Talents</p>
          </div>
          
          <div className="hidden md:block w-px h-16 bg-slate-100"></div>
          
          <div className="flex flex-col items-center text-center">
            <ThumbsUp size={32} className="text-[#0F62FE] mb-3" strokeWidth={2} />
            <h3 className="text-3xl lg:text-4xl font-extrabold mb-1 text-slate-900 tracking-tight">100%</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Objective Scoring</p>
          </div>
          
          <div className="hidden md:block w-px h-16 bg-slate-100"></div>

          <div className="flex flex-col items-center text-center">
            <Briefcase size={32} className="text-[#0F62FE] mb-3" strokeWidth={2} />
            <h3 className="text-3xl lg:text-4xl font-extrabold mb-1 text-slate-900 tracking-tight">400+</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Hiring Partners</p>
          </div>

        </div>
      </section>

      {/* 5. ABOUT US SECTION */}
      <section id="about" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative">
            <div className="w-full aspect-[4/5] md:aspect-square rounded-tl-[140px] rounded-br-[40px] rounded-tr-[40px] rounded-bl-[40px] overflow-hidden shadow-2xl border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
                alt="Colleagues analyzing data" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-xl">
            <h2 className="text-[40px] md:text-[44px] font-extrabold text-slate-900 tracking-tight leading-none">About Us</h2>
            
            <div className="w-16 h-2 bg-[#0F62FE] mt-5 mb-8"></div>
            
            <p className="text-slate-500 text-[15px] md:text-lg leading-relaxed mb-6 font-medium">
              Across Rwanda and emerging digital economies, hiring is hindered by high application volumes and a reliance on poorly formatted CVs. This results in biased screening and overlooked potential, especially among self-taught professionals.
            </p>
            <p className="text-slate-500 text-[15px] md:text-lg leading-relaxed mb-10 font-medium">
              TalentLens introduces an intelligent <strong className="text-slate-900">Capability Validation Layer</strong>. Instead of submitting a CV, candidates complete scenario-based missions. Our AI evaluates critical thinking to generate a fair, transparent Talent Signal Score.
            </p>
            
            <Link href="/register" className="inline-block bg-[#0F62FE] hover:bg-blue-700 text-white font-extrabold py-4 px-10 rounded-full text-sm uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              LEARN MORE
            </Link>
          </div>
          
        </div>
      </section>

      {/* 6. OUR SERVICES SECTION */}
      <section id="services" className="py-24 px-6 lg:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-[#0F62FE] font-bold text-xs tracking-[0.2em] uppercase mb-3">
              Core Capabilities
            </p>
            <h2 className="text-[40px] md:text-[44px] font-extrabold text-[#0A192F] tracking-tight leading-none">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-10 text-center border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#0F62FE] rounded-full flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Target size={32} strokeWidth={2} />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-4">Capability Validation</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                We eliminate CV formatting bias. Candidates prove their technical skills, professional judgment, and learning agility through real-world, scenario-based missions evaluated instantly by AI.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl p-10 text-center border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#0F62FE] rounded-full flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-105 transition-transform duration-300">
                <BrainCircuit size={32} strokeWidth={2} />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-4">Intelligent Matching</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                Recruiters create capability profiles instead of standard job descriptions. Our AI matches these "Job Signals" to verified "Talent Signals," providing an explainable narrative for every shortlist.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl p-10 text-center border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#0F62FE] rounded-full flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-105 transition-transform duration-300">
                <TrendingUp size={32} strokeWidth={2} />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 mb-4">Continuous Learning</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                Candidates are never left with just a rejection. The platform provides targeted skill-gap feedback and recommends specific micro-learning resources to create a virtuous cycle of growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 pt-10 pb-6 px-5 lg:px-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <Focus size={32} strokeWidth={2.5} className="text-[#0F62FE]" />
            <span className="font-extrabold text-[25px] tracking-tight text-white">TalentLens</span>
          </div>
          
          <div className="flex gap-8 text-[12px] font-bold text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/login" className="hover:text-white transition-colors">Platform Login</Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} TalentLens. Built in Kigali, Rwanda.</p>
          <p>Powered by Gemini API · TalentLens</p>
        </div>
      </footer>

    </div>
  );
}