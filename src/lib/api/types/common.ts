export type WorkCondition = "HIRED" | "OPEN" | "CLOSED" | "MATCH";
export type Gender = "MALE" | "FEMALE";
export type JobStatus = WorkCondition;
export type ApplicationStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "APPROVED"
  | "DENIED";

export type BackendRole =
  | "SUPER_ADMIN"
  | "HR_MANAGER"
  | "RECRUITER"
  | "CANDIDATE"
  | "VIEWER";

export interface ResponseMessage {
  message?: string;
  status?: string;
  Message?: string;
  Status?: string;
}

export interface SkillSet {
  skillSetName?: string;
}
