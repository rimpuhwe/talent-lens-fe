"use client";

import { useState } from "react";
import { 
  Bell, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ChevronRight,
  Clock
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { mockCandidateProfile } from "@/lib/mock-data";

// --- MOCK NOTIFICATION DATA ---
type NotificationStage = 'MATCH' | 'INTERVIEW' | 'FINAL_STAGE' | 'OFFER';

interface Notification {
  id: string;
  stage: NotificationStage;
  title: string;
  company: string;
  message: string;
  date: string;
  read: boolean;
  actionRequired?: boolean;
  metadata?: any;
}

const initialNotifications: Notification[] = [
  {
    id: "n4",
    stage: 'OFFER',
    title: "Job Offer Extended!",
    company: "Kigali Tech Partners",
    message: "Congratulations! Based on your outstanding Technical Assessment and interview, we are thrilled to offer you the Senior Data Analyst position.",
    date: "Just now",
    read: false,
    actionRequired: true,
    metadata: { salary: "RWF 3,500,000 / month", location: "Kigali, Rwanda (Hybrid)" }
  },
  {
    id: "n3",
    stage: 'FINAL_STAGE',
    title: "Application Under Final Review",
    company: "Pan-African Bank",
    message: "The hiring manager has received your AI Technical Assessment scores and interview feedback. A final decision will be made shortly.",
    date: "2 days ago",
    read: true,
  },
  {
    id: "n2",
    stage: 'INTERVIEW',
    title: "Interview Scheduled",
    company: "Kigali Tech Partners",
    message: "Your AI-scheduled technical interview is confirmed. Please ensure you are in a quiet environment.",
    date: "May 18, 2026",
    read: true,
    metadata: { time: "May 20, 2026 • 09:00 AM CAT", link: "https://meet.google.com/abc-defg-hij" }
  },
  {
    id: "n1",
    stage: 'MATCH',
    title: "New AI Job Match",
    company: "Umurava",
    message: "Your Talent Signal Score (TSS) strongly matches a new Frontend Developer position. Your profile has been automatically shortlisted.",
    date: "May 15, 2026",
    read: true,
  }
];

export default function NotificationsPage() {
  const profile = mockCandidateProfile;
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  // State for handling the Job Offer Rejection flow
  const [rejectingOfferId, setRejectingOfferId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleAcceptOffer = (id: string) => {
    // In production, trigger API call to backend
    alert("Offer Accepted! The HR team will contact you shortly with onboarding details.");
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleRejectSubmit = (id: string) => {
    if (rejectionReason.trim().length < 10) return;
    // In production, trigger API call to backend with the reason
    alert(`Offer Rejected. Reason sent: "${rejectionReason}"`);
    setRejectingOfferId(null);
    setRejectionReason("");
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getStageIcon = (stage: NotificationStage) => {
    switch (stage) {
      case 'MATCH': return <Sparkles className="text-blue-600" size={20} />;
      case 'INTERVIEW': return <Calendar className="text-amber-600" size={20} />;
      case 'FINAL_STAGE': return <Clock className="text-slate-600" size={20} />;
      case 'OFFER': return <CheckCircle2 className="text-emerald-600" size={20} />;
    }
  };

  const getStageColor = (stage: NotificationStage) => {
    switch (stage) {
      case 'MATCH': return "bg-blue-50 border-blue-200";
      case 'INTERVIEW': return "bg-amber-50 border-amber-200";
      case 'FINAL_STAGE': return "bg-slate-50 border-slate-200";
      case 'OFFER': return "bg-emerald-50 border-emerald-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar role="candidate" userName={profile.full_name} userLocation={profile.location} />
      
      <main className="flex-1 ml-64 p-8 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8 animate-fade-up border-b border-slate-200 pb-6 flex justify-between items-end">
          <div>
            <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <Bell size={14}/> Updates & Tracking
            </p>
            <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">Notifications</h1>
            <p className="text-slate-500 mt-1">Track your application pipeline from AI matching to final offers.</p>
          </div>
          <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            {notifications.filter(n => !n.read).length} Unread
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {notifications.map((notif, i) => (
            <div 
              key={notif.id} 
              className={`bg-white rounded-2xl border ${notif.read ? 'border-slate-200' : 'border-blue-300 shadow-md'} p-6 md:p-8 animate-fade-up transition-all relative overflow-hidden`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Unread Indicator Bar */}
              {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />}

              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Icon Column */}
                <div className="shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${getStageColor(notif.stage)}`}>
                    {getStageIcon(notif.stage)}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                        <Briefcase size={12}/> {notif.company}
                      </span>
                      <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">{notif.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{notif.date}</span>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-3xl">
                    {notif.message}
                  </p>

                  {/* Stage-Specific Metadata (e.g., Interview Links) */}
                  {notif.stage === 'INTERVIEW' && notif.metadata && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Clock size={16} className="text-amber-600"/> {notif.metadata.time}
                      </div>
                      <a href={notif.metadata.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                        Join Google Meet <ChevronRight size={14} className="ml-0.5"/>
                      </a>
                    </div>
                  )}

                  {/* Job Offer Action Block */}
                  {notif.stage === 'OFFER' && notif.actionRequired && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-md border border-emerald-200">
                          {notif.metadata?.salary}
                        </span>
                        <span className="bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-md border border-slate-200">
                          {notif.metadata?.location}
                        </span>
                      </div>

                      {rejectingOfferId === notif.id ? (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 animate-fade-up">
                          <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                            <XCircle size={16} className="text-rose-500"/> Reason for Declining
                          </h4>
                          <p className="text-xs text-slate-500 mb-3">Your feedback helps companies improve their offers and helps our AI match you better next time.</p>
                          <textarea 
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="E.g., Salary does not meet expectations, accepted another offer, etc."
                            className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mb-3 resize-none h-24"
                          />
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handleRejectSubmit(notif.id)}
                              disabled={rejectionReason.trim().length < 10}
                              className="bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                              Submit & Decline
                            </button>
                            <button 
                              onClick={() => { setRejectingOfferId(null); setRejectionReason(""); }}
                              className="text-slate-500 text-sm font-semibold hover:text-slate-800 transition-colors px-3 py-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => handleAcceptOffer(notif.id)}
                            className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 size={18}/> Accept Offer
                          </button>
                          <button 
                            onClick={() => setRejectingOfferId(notif.id)}
                            className="bg-white text-slate-700 font-bold px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <XCircle size={18}/> Decline Offer
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No Notifications Yet</h3>
              <p className="text-slate-500 text-sm mt-2">Complete your Talent Passport to start receiving AI job matches.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}