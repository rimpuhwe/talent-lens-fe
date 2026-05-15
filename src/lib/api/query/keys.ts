export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const,
  },
  profile: {
    me: ["profile", "me"] as const,
    status: ["profile", "status"] as const,
  },
  evidence: {
    results: ["evidence", "results"] as const,
    roleScores: ["evidence", "role-scores"] as const,
    module: (role: string, moduleType: string) =>
      ["evidence", "module", role, moduleType] as const,
  },
  jobs: {
    all: ["jobs"] as const,
    detail: (id: number) => ["jobs", id] as const,
  },
  admin: {
    candidates: ["admin", "candidates"] as const,
    recruiters: ["admin", "recruiters"] as const,
    recruiter: (id: number) => ["admin", "recruiters", id] as const,
  },
  ai: {
    health: ["ai", "health"] as const,
    match: (jobId: number, candidateId: string) =>
      ["ai", "match", jobId, candidateId] as const,
    evaluation: (role: string, question: string) =>
      ["ai", "evaluation", role, question] as const,
  },
} as const;
