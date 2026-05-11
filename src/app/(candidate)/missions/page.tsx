"use client";

import { Play, Clock, Target } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { mockCandidateProfile } from "@/lib/mock-data";

// Fake data for the missions board
const availableMissions = [
  { id: "1", title: "React Performance Audit", role: "Frontend Engineer", time: "15 mins", points: "+5 Skill Proof" },
  { id: "2", title: "API Database Integration", role: "Backend Engineer", time: "30 mins", points: "+10 Skill Proof" },
];

export default function MissionsBoardPage() {
  const profile = mockCandidateProfile;

  return (
    <div className="flex min-h-screen" style={{ background: "#F0F3FA" }}>
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />

      <main className="flex-1 ml-64 p-8">
        <div className="animate-fade-up">
          <div className="mb-8">
            <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "2rem", color: "#091F5C", letterSpacing: "-0.02em" }}>
              Mission Board
            </h1>
            <p style={{ color: "#4A5C74", fontSize: "0.95rem", marginTop: 4, fontWeight: 500 }}>
              Select a verified mission to prove your skills and increase your TSS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableMissions.map((mission) => (
              <div key={mission.id} className="p-6 rounded-[2rem] bg-white transition-all hover:shadow-md" style={{ border: "1px solid #D5DEEF" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#334DAF] bg-[#E8F2FE] uppercase">
                    {mission.role}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: "bold", fontSize: "1.3rem", color: "#091F5C" }}>
                  {mission.title}
                </h3>
                <div className="flex items-center gap-4 mt-4 mb-6">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-[#4A5C74]"><Clock size={16} /> {mission.time}</p>
                  <p className="flex items-center gap-1.5 text-sm font-bold text-[#10B981]"><Target size={16} /> {mission.points}</p>
                </div>
                
                {/* Notice how this uses Next.js <Link> to go to the [missionId] folder! */}
                <Link 
                  href={`/missions/${mission.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-[#091F5C] text-white hover:opacity-90 transition-opacity"
                >
                  <Play size={16} /> Accept Mission
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}