"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Play, ArrowLeft, UploadCloud, CheckCircle, 
  Clock, ShieldCheck, BrainCircuit, Send, 
  ListChecks, AlertCircle, Info, Mic, Video, Lightbulb
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { mockCandidateProfile } from "@/lib/mock-data";

export default function MissionProcessPage({ params }: { params: { missionId: string } }) {
  const router = useRouter();
  const profile = mockCandidateProfile;
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1 = Instructions, 2 = Q1, 3 = Q2, 4 = Q3, 5 = Live Video Interview
  const [missionStep, setMissionStep] = useState<number>(1); 

  // Video Stream Logic for Step 5
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (missionStep === 5 && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch((err) => console.error("Video access denied:", err));
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [missionStep]);

  return (
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto animate-fade-up">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => router.push('/missions')} className="flex items-center gap-2 text-sm font-bold text-[#4A5C74] hover:text-[#091F5C]">
              <ArrowLeft size={16} /> Back to Board
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className={`w-3 h-3 rounded-full transition-colors ${missionStep >= step ? 'bg-[#091F5C]' : 'bg-[#D5DEEF]'}`} />
              ))}
            </div>
          </div>

          {/* STEP 1: DETAILED INSTRUCTIONS */}
          {missionStep === 1 && (
            <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-[#D5DEEF]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#091F5C10] rounded-xl"><Info size={24} color="#091F5C" /></div>
                <h2 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "1.8rem", color: "#091F5C" }}>Pre-Mission Briefing</h2>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                  <h3 className="font-bold text-[#091F5C] mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <ListChecks size={18} /> How to complete this mission
                  </h3>
                  <ul className="space-y-4 text-sm text-[#4A5C74] font-medium">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#091F5C] text-white flex items-center justify-center text-[10px]">1</span>
                      Answer 3 written technical questions designed to test your architectural depth.
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#091F5C] text-white flex items-center justify-center text-[10px]">2</span>
                      Submit each response to move to the next stage. Note: Copy-pasting is disabled to ensure authenticity.
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#091F5C] text-white flex items-center justify-center text-[10px]">3</span>
                      The final stage is a <b>Live Video Defense</b>. You will be asked a follow-up question and must explain your reasoning to the camera.
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
                  <h3 className="font-bold text-[#091F5C] mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <AlertCircle size={18} /> Technical Requirements
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-[13px] text-[#4A5C74]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Quiet environment
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Working Webcam & Mic
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Stable internet
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Well-lit face
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl flex gap-3 border border-slate-100">
                  <Lightbulb className="text-blue-500 shrink-0" size={18} />
                  <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                    <b>Tip:</b> Don't just explain "what" you would do, explain <b>"why"</b>. Gemini AI evaluates your decision-making process more than just keywords.
                  </p>
                </div>
              </div>

              <button onClick={() => setMissionStep(2)} className="w-full py-4 rounded-xl font-bold bg-[#091F5C] text-white hover:opacity-90 shadow-lg shadow-blue-900/10">
                I Am Ready, Begin Mission
              </button>
            </div>
          )}

          {/* STEP 2: QUESTION 1 */}
          {missionStep === 2 && (
            <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-[#D5DEEF]">
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">Question 01</span>
              <h2 className="text-xl font-bold text-[#091F5C] mt-2 mb-4 select-none">Describe your approach to handling database locking during concurrent transactions.</h2>
              <textarea onPaste={(e) => e.preventDefault()} className="w-full h-40 p-4 rounded-xl border border-[#D5DEEF] bg-[#F8FAFC] focus:outline-none mb-6" placeholder="Type your strategy..." />
              <button onClick={() => setMissionStep(3)} className="w-full py-4 rounded-xl font-bold bg-[#091F5C] text-white">Next Question</button>
            </div>
          )}

          {/* STEP 3: QUESTION 2 */}
          {missionStep === 3 && (
            <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-[#D5DEEF]">
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">Question 02</span>
              <h2 className="text-xl font-bold text-[#091F5C] mt-2 mb-4 select-none">How do you implement compensation logic within a Saga pattern for distributed services?</h2>
              <textarea onPaste={(e) => e.preventDefault()} className="w-full h-40 p-4 rounded-xl border border-[#D5DEEF] bg-[#F8FAFC] focus:outline-none mb-6" placeholder="Type your strategy..." />
              <button onClick={() => setMissionStep(4)} className="w-full py-4 rounded-xl font-bold bg-[#091F5C] text-white">Next Question</button>
            </div>
          )}

          {/* STEP 4: QUESTION 3 */}
          {missionStep === 4 && (
            <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-[#D5DEEF]">
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">Question 03</span>
              <h2 className="text-xl font-bold text-[#091F5C] mt-2 mb-4 select-none">What are the primary scalability bottlenecks you've encountered in microservices?</h2>
              <textarea onPaste={(e) => e.preventDefault()} className="w-full h-40 p-4 rounded-xl border border-[#D5DEEF] bg-[#F8FAFC] focus:outline-none mb-6" placeholder="Type your strategy..." />
              <button onClick={() => setMissionStep(5)} className="w-full py-4 rounded-xl font-bold bg-[#10B981] text-white">Prepare Video Interview</button>
            </div>
          )}

          {/* STEP 5: LIVE VIDEO INTERVIEW */}
          {missionStep === 5 && (
            <div className="flex flex-col rounded-[2rem] bg-[#091F5C] shadow-2xl overflow-hidden border border-[#1E3A8A]">
              
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-90" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#091F5C] via-transparent to-transparent z-10" />

                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#10B981] flex items-center justify-center shadow-lg animate-pulse">
                    <Video size={24} color="white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm tracking-tight">Gemini AI Proctor</p>
                    <p className="text-[#10B981] text-[10px] font-extrabold uppercase tracking-widest">Live Video Validation</p>
                  </div>
                </div>

                <div className="absolute bottom-10 inset-x-0 z-20 flex justify-center items-end gap-1 h-12">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-1.5 bg-[#10B981] rounded-full animate-bounce" style={{ height: `${30 + Math.random() * 70}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white">
                <div className="text-center mb-8 select-none">
                  <h3 className="font-bold text-lg text-[#091F5C]">Final Defense: "Walk me through the dirty-read prevention logic in the Saga implementation you just described."</h3>
                  <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">Look into the camera and explain your logic</p>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
                    <button className="relative w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl">
                      <Mic size={24} />
                    </button>
                  </div>

                  <button onClick={() => router.push('/passport')} className="w-full py-4 rounded-2xl font-bold bg-[#10B981] text-white shadow-lg">
                    Finish Interview & Submit Mission
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}