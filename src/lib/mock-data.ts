import type {
  Profile,
  TalentSignal,
  Mission,
  MissionAttempt,
  JobSignal,
  ShortlistEntry,
  LearningRecommendation,
  PlatformStats,
} from "@/types";

// ─── Profiles ─────────────────────────────────────────────────────────────────

export const mockCandidateProfile: Profile = {
  id: "cand-001",
  role: "candidate",
  full_name: "Diane Uwimana",
  email: "diane@example.rw",
  location: "Musanze, Rwanda",
  role_family: "Data & Analytics",
  avatar_url: "",
  created_at: "2024-11-01T08:00:00Z",
};

export const mockRecruiterProfile: Profile = {
  id: "rec-001",
  role: "recruiter",
  full_name: "Karim Nzeyimana",
  email: "karim@fintech.rw",
  location: "Kigali, Rwanda",
  avatar_url: "",
  created_at: "2024-10-15T10:00:00Z",
};

export const mockAdminProfile: Profile = {
  id: "admin-001",
  role: "admin",
  full_name: "Amina Bergström",
  email: "amina@talentlens.rw",
  avatar_url: "",
  created_at: "2024-09-01T00:00:00Z",
};

// ─── Talent Signal ────────────────────────────────────────────────────────────

export const mockTalentSignal: TalentSignal = {
  id: "ts-001",
  candidate_id: "cand-001",
  skill_proof_score: 74,
  work_behavior_score: 68,
  learning_agility_score: 82,
  culture_fit_score: 71,
  overall_tss: 74,
  completed_modules: ["skill_proof", "scenario_judgment", "learning_agility"],
  updated_at: "2024-12-01T14:00:00Z",
};

// ─── Missions ─────────────────────────────────────────────────────────────────

export const mockMissions: Mission[] = [
  {
    id: "m-001",
    module_type: "skill_proof",
    role_family: "Data & Analytics",
    title: "Analyze MoMo Transaction Trends",
    scenario:
      "A Kigali-based mobile money startup has 90 days of transaction data across 12 districts. Volume has declined 18% in the past 30 days and the CEO needs to understand why before their board meeting tomorrow.",
    deliverable:
      "A written report (200–400 words) identifying 3 key insights and 1 actionable recommendation for the CEO.",
    time_limit_min: 20,
    scoring_rubric: [
      { dimension: "Analytical Depth", max_score: 25, indicators: "Identifies non-obvious patterns beyond surface statistics" },
      { dimension: "Business Relevance", max_score: 25, indicators: "Insights framed in business impact terms" },
      { dimension: "Communication Clarity", max_score: 25, indicators: "Clear, structured, readable by a non-technical CEO" },
      { dimension: "Recommendation Quality", max_score: 25, indicators: "Specific, actionable, grounded in data" },
    ],
    created_at: "2024-11-15T09:00:00Z",
  },
  {
    id: "m-002",
    module_type: "scenario_judgment",
    role_family: "Data & Analytics",
    title: "The Misleading Dashboard",
    scenario:
      "Your client — a Kigali NGO tracking malnutrition rates — asks you to adjust the Y-axis on a chart so it 'looks more impressive' for their donor presentation. The data is technically accurate either way, but the adjusted version overstates their impact significantly.",
    deliverable:
      "A 150–250 word explanation of what you would do, why, and how you would communicate your decision to the client.",
    time_limit_min: 15,
    scoring_rubric: [
      { dimension: "Ethical Clarity", max_score: 25, indicators: "Clear position taken on the ethical issue" },
      { dimension: "Stakeholder Awareness", max_score: 25, indicators: "Considers impact on all parties including ultimate beneficiaries" },
      { dimension: "Professional Communication", max_score: 25, indicators: "Proposes a constructive alternative, not just a refusal" },
      { dimension: "Decision Maturity", max_score: 25, indicators: "Shows understanding of long-term consequences" },
    ],
    created_at: "2024-11-16T09:00:00Z",
  },
  {
    id: "m-003",
    module_type: "learning_agility",
    role_family: "Data & Analytics",
    title: "Learn & Apply: Cohort Analysis",
    scenario:
      "Cohort analysis is a method used to track groups of users who share a common characteristic over time. Read the following 3-paragraph explanation, then answer the question below. You have 10 minutes.",
    deliverable:
      "Apply cohort analysis to determine which user signup month has the highest 30-day retention for a fictional Rwandan e-commerce app.",
    time_limit_min: 18,
    scoring_rubric: [
      { dimension: "Concept Grasp", max_score: 25, indicators: "Correctly understood the new concept from the brief" },
      { dimension: "Application Accuracy", max_score: 25, indicators: "Applied it correctly to the given problem" },
      { dimension: "Speed of Learning", max_score: 25, indicators: "Completed within the time limit with accurate output" },
      { dimension: "Transfer Quality", max_score: 25, indicators: "Showed ability to generalize beyond the example given" },
    ],
    created_at: "2024-11-18T09:00:00Z",
  },
];

export const mockMissionAttempts: MissionAttempt[] = [
  {
    id: "ma-001",
    candidate_id: "cand-001",
    mission_id: "m-001",
    mission: mockMissions[0],
    status: "scored",
    total_score: 74,
    dimension_scores: [
      { dimension: "Analytical Depth", score: 20, max_score: 25, evidence: "Correctly identified the Friday evening spike pattern and correlated it with payday cycles", feedback: "Go deeper — explain *why* Friday spikes occur, not just that they do" },
      { dimension: "Business Relevance", score: 18, max_score: 25, evidence: "Framed the 18% decline in terms of revenue impact", feedback: "Quantify the estimated revenue impact in RWF to strengthen the business case" },
      { dimension: "Communication Clarity", score: 21, max_score: 25, evidence: "Used clear headings and avoided jargon throughout", feedback: "Add a one-sentence executive summary at the very top" },
      { dimension: "Recommendation Quality", score: 15, max_score: 25, evidence: "Recommended 'improving user experience' — too vague", feedback: "Specify which feature, which user segment, and what metric to track" },
    ],
    strengths: ["Clear structure and formatting", "Good pattern recognition", "Business-oriented framing"],
    improvements: ["Deeper causal reasoning", "More specific recommendations", "Quantify financial impact"],
    overall_summary: "Strong data instincts and clear communication. Diane's analysis is readable and well-organized. Her main growth area is moving from observation to specific, actionable recommendations.",
    started_at: "2024-11-20T10:00:00Z",
    submitted_at: "2024-11-20T10:18:00Z",
    scored_at: "2024-11-20T10:19:00Z",
    attempt_number: 1,
  },
  {
    id: "ma-002",
    candidate_id: "cand-001",
    mission_id: "m-002",
    mission: mockMissions[1],
    status: "scored",
    total_score: 68,
    dimension_scores: [
      { dimension: "Ethical Clarity", score: 22, max_score: 25, evidence: "Clearly refused to adjust the axis for misleading purposes", feedback: "Strong position — reinforce with a reference to professional data ethics standards" },
      { dimension: "Stakeholder Awareness", score: 16, max_score: 25, evidence: "Mentioned the client and donor but not the malnutrition beneficiaries", feedback: "Always trace impact to the end beneficiaries in humanitarian contexts" },
      { dimension: "Professional Communication", score: 18, max_score: 25, evidence: "Proposed an alternative visualization approach", feedback: "Draft the actual alternative sentence you'd say to the client" },
      { dimension: "Decision Maturity", score: 12, max_score: 25, evidence: "Focused on immediate situation, didn't address long-term reputational risk", feedback: "Consider what happens to trust if this is discovered by the donor later" },
    ],
    strengths: ["Clear ethical position", "Proposed constructive alternative"],
    improvements: ["Consider full stakeholder chain", "Address long-term consequences"],
    overall_summary: "Diane shows solid ethical instincts. Her main development area is expanding her stakeholder lens beyond the immediate client relationship.",
    started_at: "2024-11-22T14:00:00Z",
    submitted_at: "2024-11-22T14:13:00Z",
    scored_at: "2024-11-22T14:14:00Z",
    attempt_number: 1,
  },
];

// ─── Job Signals ──────────────────────────────────────────────────────────────

export const mockJobSignals: JobSignal[] = [
  {
    id: "js-001",
    recruiter_id: "rec-001",
    title: "Junior Data Analyst",
    role_family: "Data & Analytics",
    company_context: "Early-stage fintech startup, 8-person team, fast-paced environment in Kigali",
    required_skills: ["SQL", "Data Storytelling", "Excel", "Problem Solving"],
    skill_levels: { SQL: "intermediate", "Data Storytelling": "strong", Excel: "basic" },
    scenario_types: ["ethical_dilemma", "ambiguity_under_pressure"],
    culture_notes: "We value direct communication, independent thinking, and learning agility over credentials",
    timeline_days: 14,
    status: "active",
    created_at: "2024-12-01T08:00:00Z",
    _count: { shortlist_entries: 7 },
  },
  {
    id: "js-002",
    recruiter_id: "rec-001",
    title: "Product Manager — Digital Payments",
    role_family: "Product Management",
    company_context: "Scale-up fintech expanding to rural Rwanda, 30-person team",
    required_skills: ["Product Strategy", "Stakeholder Management", "Data Analysis", "User Research"],
    skill_levels: { "Product Strategy": "strong", "Stakeholder Management": "intermediate" },
    scenario_types: ["stakeholder_conflict", "resource_constraints"],
    culture_notes: "Mission-driven team. Rwanda context knowledge is a strong plus.",
    timeline_days: 21,
    status: "active",
    created_at: "2024-11-28T10:00:00Z",
    _count: { shortlist_entries: 12 },
  },
  {
    id: "js-003",
    recruiter_id: "rec-001",
    title: "Frontend Developer",
    role_family: "Software Engineering",
    company_context: "NGO building digital health tools for community health workers",
    required_skills: ["React", "TypeScript", "Responsive Design", "API Integration"],
    skill_levels: { React: "intermediate", TypeScript: "basic" },
    scenario_types: ["technical_tradeoff", "user_empathy"],
    culture_notes: "Low-resource context. Must design for feature phones and low bandwidth.",
    timeline_days: 10,
    status: "closed",
    created_at: "2024-11-10T08:00:00Z",
    _count: { shortlist_entries: 9 },
  },
];

// ─── Shortlist ────────────────────────────────────────────────────────────────

export const mockShortlist: ShortlistEntry[] = [
  {
    id: "sl-001",
    job_signal_id: "js-001",
    candidate_id: "cand-001",
    candidate: mockCandidateProfile,
    talent_signal: mockTalentSignal,
    overall_match: 84,
    recommendation: "strong",
    dimension_breakdown: [
      { dimension: "Skill Proof", job_need: "SQL + data storytelling", candidate_proof: "Scored 74/100 on MoMo transaction analysis — identified key patterns and framed business impact clearly", match_level: "strong", gap: null },
      { dimension: "Work Behavior", job_need: "Ethical decision-making under ambiguity", candidate_proof: "Chose ethical path in data presentation scenario. Proposed constructive alternative.", match_level: "partial", gap: "Stakeholder chain awareness needs development" },
      { dimension: "Learning Agility", job_need: "Fast learner for evolving role", candidate_proof: "Scored 82/100 on learning agility — grasped cohort analysis in under 10 minutes", match_level: "strong", gap: null },
      { dimension: "Communication", job_need: "Clear communication with non-technical stakeholders", candidate_proof: "Written communication scored 71 — module not yet completed verbally", match_level: "partial", gap: "Verbal/communication module not yet completed" },
    ],
    match_narrative: "Diane has strong analytical instincts, excellent learning agility, and solid ethical judgment. Her communication module is incomplete — one gap test would confirm full-stack readiness.",
    gap_test_sent: false,
    gap_test_completed: false,
    created_at: "2024-12-02T09:00:00Z",
  },
  {
    id: "sl-002",
    job_signal_id: "js-001",
    candidate_id: "cand-002",
    candidate: { id: "cand-002", role: "candidate", full_name: "Jean-Pierre Habimana", email: "jp@example.rw", location: "Kigali", role_family: "Data & Analytics", created_at: "2024-10-01T00:00:00Z" },
    talent_signal: { id: "ts-002", candidate_id: "cand-002", skill_proof_score: 81, work_behavior_score: 76, learning_agility_score: 65, culture_fit_score: 80, overall_tss: 76, completed_modules: ["skill_proof", "scenario_judgment", "communication_proof"], updated_at: "2024-12-01T00:00:00Z" },
    overall_match: 79,
    recommendation: "strong",
    dimension_breakdown: [
      { dimension: "Skill Proof", job_need: "SQL + data storytelling", candidate_proof: "Scored 81/100 — strong SQL query design and clear data narrative", match_level: "strong", gap: null },
      { dimension: "Work Behavior", job_need: "Ethical decision-making", candidate_proof: "Good judgment in 3/3 scenarios — considers long-term stakeholder impact", match_level: "strong", gap: null },
      { dimension: "Learning Agility", job_need: "Fast learner", candidate_proof: "Scored 65/100 — grasps concepts accurately but slower than ideal", match_level: "partial", gap: "Slower uptake under time pressure" },
      { dimension: "Communication", job_need: "Clear stakeholder communication", candidate_proof: "Scored 80/100 on communication proof — clear, structured verbal responses", match_level: "strong", gap: null },
    ],
    match_narrative: "Jean-Pierre demonstrates strong analytical skills and excellent communication. His learning agility is his only notable gap — worth exploring with one targeted mission.",
    gap_test_sent: true,
    gap_test_completed: true,
    created_at: "2024-12-02T09:01:00Z",
  },
  {
    id: "sl-003",
    job_signal_id: "js-001",
    candidate_id: "cand-003",
    candidate: { id: "cand-003", role: "candidate", full_name: "Claudine Mukamana", email: "claudine@example.rw", location: "Huye, Rwanda", role_family: "Data & Analytics", created_at: "2024-09-15T00:00:00Z" },
    talent_signal: { id: "ts-003", candidate_id: "cand-003", skill_proof_score: 62, work_behavior_score: 71, learning_agility_score: 78, culture_fit_score: 55, overall_tss: 67, completed_modules: ["skill_proof", "scenario_judgment", "learning_agility"], updated_at: "2024-11-30T00:00:00Z" },
    overall_match: 67,
    recommendation: "borderline",
    dimension_breakdown: [
      { dimension: "Skill Proof", job_need: "SQL + data storytelling", candidate_proof: "Scored 62/100 — good pattern recognition, but weak on quantitative framing", match_level: "partial", gap: "Needs to strengthen data quantification skills" },
      { dimension: "Work Behavior", job_need: "Ethical decision-making", candidate_proof: "Solid judgment — 2/3 scenarios handled with maturity", match_level: "partial", gap: null },
      { dimension: "Learning Agility", job_need: "Fast learner", candidate_proof: "Scored 78/100 — rapidly applies new concepts", match_level: "strong", gap: null },
      { dimension: "Communication", job_need: "Clear stakeholder communication", candidate_proof: "Communication module not yet completed", match_level: "gap", gap: "Communication module not attempted" },
    ],
    match_narrative: "Claudine shows impressive learning agility and solid judgment. Her skill proof and communication gaps make her borderline — a targeted SQL mission would determine fit clearly.",
    gap_test_sent: false,
    gap_test_completed: false,
    created_at: "2024-12-02T09:02:00Z",
  },
];

// ─── Learning Recommendations ─────────────────────────────────────────────────

export const mockLearningRecs: LearningRecommendation[] = [
  {
    id: "lr-001",
    candidate_id: "cand-001",
    dimension: "Communication",
    gap_diagnosis: "Verbal communication module not completed — no evidence of structured verbal reasoning under professional prompts",
    resources: [
      { title: "Professional Communication Challenge", url: "https://competence.umurava.africa/challenges/communication", platform: "Umurava Competence", estimated_hours: 1 },
      { title: "Business Communication for Analysts", url: "https://www.coursera.org/learn/business-communication", platform: "Coursera", estimated_hours: 4 },
    ],
    generated_at: "2024-12-02T10:00:00Z",
  },
  {
    id: "lr-002",
    candidate_id: "cand-001",
    dimension: "Work Behavior",
    gap_diagnosis: "Stakeholder chain awareness is incomplete — does not consistently trace decisions to end beneficiaries in humanitarian contexts",
    resources: [
      { title: "Stakeholder Ethics in Data Work", url: "https://alxafrica.com/courses/data-ethics", platform: "ALX Africa", estimated_hours: 2 },
      { title: "Responsible Data Practices", url: "https://www.youtube.com/results?search_query=responsible+data+storytelling", platform: "YouTube", estimated_hours: 1 },
    ],
    generated_at: "2024-12-02T10:00:00Z",
  },
];

// ─── Platform Stats (Admin) ───────────────────────────────────────────────────

export const mockPlatformStats: PlatformStats = {
  total_candidates: 1247,
  total_recruiters: 89,
  total_missions_completed: 4832,
  total_job_signals: 213,
  total_hires: 156,
  avg_tss: 68,
  avg_match_score: 72,
  top_role_families: [
    { role: "Data & Analytics", count: 312 },
    { role: "Software Engineering", count: 287 },
    { role: "Digital Marketing", count: 198 },
    { role: "Product Management", count: 156 },
    { role: "UX/UI Design", count: 142 },
    { role: "Business Analysis", count: 98 },
  ],
  skill_demand: [
    { skill: "SQL", demand: 87, supply: 54 },
    { skill: "React", demand: 72, supply: 61 },
    { skill: "Data Storytelling", demand: 68, supply: 41 },
    { skill: "Python", demand: 65, supply: 48 },
    { skill: "Product Strategy", demand: 58, supply: 29 },
    { skill: "UX Research", demand: 44, supply: 33 },
  ],
  monthly_activity: [
    { month: "Jul", candidates: 78, missions: 210, hires: 8 },
    { month: "Aug", candidates: 102, missions: 287, hires: 11 },
    { month: "Sep", candidates: 134, missions: 398, hires: 15 },
    { month: "Oct", candidates: 189, missions: 542, hires: 22 },
    { month: "Nov", candidates: 241, missions: 731, hires: 34 },
    { month: "Dec", candidates: 312, missions: 892, hires: 41 },
  ],
  recommendation_distribution: [
    { type: "strong", count: 412 },
    { type: "borderline", count: 287 },
    { type: "not_yet", count: 548 },
  ],
  tss_distribution: [
    { range: "0–20", count: 48 },
    { range: "21–40", count: 124 },
    { range: "41–60", count: 298 },
    { range: "61–80", count: 541 },
    { range: "81–100", count: 236 },
  ],
};