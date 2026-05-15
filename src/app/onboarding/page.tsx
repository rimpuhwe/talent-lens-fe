"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Linkedin,
  Phone,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  User,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { profileService } from "@/services/profile.service";
import { useToast } from "@/components/shared/toast-context";
import type { ProfileCompleteRequest } from "@/types/api.types";

type WorkCondition = NonNullable<ProfileCompleteRequest["workConditions"]>;
type Gender = NonNullable<ProfileCompleteRequest["gender"]>;

const workConditionOptions: WorkCondition[] = ["OPEN", "HIRED", "MATCH", "CLOSED"];
const MAX_DB_TEXT_LENGTH = 255;

function limitText(value: string, maxLength = MAX_DB_TEXT_LENGTH) {
  return value.trim().slice(0, maxLength);
}

export default function OnboardingPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [roleInput, setRoleInput] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "MALE" as Gender,
    professionalProfile: "",
    linkedInProfile: "",
    biography: "",
    workConditions: "OPEN" as WorkCondition,
    jobRoles: [] as string[],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profile, status] = await Promise.allSettled([
          profileService.getMe(),
          profileService.getProfileStatus(),
        ]);

        if (status.status === "fulfilled") {
          setCompletionPercentage(status.value?.completionPercentage ?? 0);
        }

        if (profile.status !== "fulfilled") return;

        const data = profile.value;
        setFormData((current) => ({
          ...current,
          firstName: data?.firstName ?? "",
          lastName: data?.lastName ?? "",
          phoneNumber: data?.phoneNumber ?? "",
          birthDate: data?.birthDate ? data.birthDate.slice(0, 10) : "",
          gender: data?.gender ?? "MALE",
          professionalProfile: data?.professionalProfile ?? "",
          linkedInProfile: data?.linkedInProfile ?? "",
          biography: data?.biography ?? "",
          workConditions: data?.workConditions ?? "OPEN",
          jobRoles: Array.isArray(data?.jobRoles) ? data.jobRoles.slice(0, 3) : [],
        }));
      } catch {
        // New candidate profiles may not exist yet; the form can still create one.
      }
    };

    void loadProfile();
  }, []);

  const nextStep = () => setStep((current) => Math.min(current + 1, 4));
  const prevStep = () => setStep((current) => Math.max(current - 1, 1));

  const addRole = () => {
    const role = limitText(roleInput, 80);
    if (!role || formData.jobRoles.includes(role) || formData.jobRoles.length >= 3) return;

    setFormData((current) => ({
      ...current,
      jobRoles: [...current.jobRoles, role],
    }));
    setRoleInput("");
  };

  const removeRole = (role: string) => {
    setFormData((current) => ({
      ...current,
      jobRoles: current.jobRoles.filter((item) => item !== role),
    }));
  };

  const buildPayload = (): ProfileCompleteRequest => ({
    firstName: limitText(formData.firstName, 80),
    lastName: limitText(formData.lastName, 80),
    phoneNumber: limitText(formData.phoneNumber, 16),
    birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : undefined,
    gender: formData.gender,
    professionalProfile: limitText(formData.professionalProfile),
    linkedInProfile: limitText(formData.linkedInProfile) || undefined,
    biography: limitText(formData.biography),
    workConditions: formData.workConditions,
    jobRoles: formData.jobRoles.map((role) => limitText(role, 80)),
  });

  const handleFinish = async () => {
    const payload = buildPayload();

    if (!payload.professionalProfile) {
      toastError("Profile Incomplete", "Add your professional profile before continuing.");
      setStep(3);
      return;
    }

    setLoading(true);

    try {
      try {
        await profileService.completeProfile(payload);
      } catch {
        await profileService.updateProfile(payload);
      }

      if (cvFile) {
        await profileService.uploadCv(cvFile);
      }

      success("Profile Completed", "Your candidate passport is ready.");
      router.push("/dashboard");
    } catch (error: any) {
      toastError(
        "Onboarding Incomplete",
        error?.response?.data?.message || error?.message || "Failed to save profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A15] text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-accent-emerald/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-emerald/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="w-full max-w-3xl relative z-10 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
           
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Candidate Onboarding</p>
              <p className="text-sm font-bold">Step {step} of 4</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
            <span>{completionPercentage}% complete</span>
            <div className="h-2 w-28 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-accent-emerald" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur-xl"
        >
          {step > 1 && (
            <button onClick={prevStep} className="mb-8 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-white">
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {step === 1 && (
            <section className="text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-accent-emerald/10 border border-accent-emerald/20">
                <Rocket size={38} className="text-accent-emerald" />
              </div>
              <h1 className="mb-5 text-4xl md:text-5xl font-black tracking-tight">Complete your candidate passport.</h1>
              <p className="mx-auto mb-10 max-w-xl text-muted-foreground text-lg leading-relaxed">
                Your profile is still missing required evidence fields. Fill your professional profile, role interests, contact details, and CV to unlock the dashboard.
              </p>
              <Button onClick={nextStep} className="bg-white hover:bg-slate-100 text-black px-12 py-7 rounded-2xl text-lg font-black">
                Start Profile
              </Button>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="mb-3 text-3xl font-black tracking-tight">Personal Details</h2>
              <p className="mb-8 text-muted-foreground">These fields match the backend candidate profile contract.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextField label="First Name" icon={User} maxLength={80} value={formData.firstName} onChange={(value) => setFormData({ ...formData, firstName: value })} />
                <TextField label="Last Name" icon={User} maxLength={80} value={formData.lastName} onChange={(value) => setFormData({ ...formData, lastName: value })} />
                <TextField label="Phone Number" icon={Phone} maxLength={16} value={formData.phoneNumber} placeholder="+250780000000" onChange={(value) => setFormData({ ...formData, phoneNumber: value })} />
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">Birth Date</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-accent-emerald"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-accent-emerald"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">Work Condition</label>
                  <select
                    value={formData.workConditions}
                    onChange={(e) => setFormData({ ...formData, workConditions: e.target.value as WorkCondition })}
                    className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-accent-emerald"
                  >
                    {workConditionOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button onClick={nextStep} className="mt-8 w-full bg-accent-emerald hover:bg-emerald-600 text-white py-7 rounded-2xl text-lg font-black">
                Continue
              </Button>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="mb-3 text-3xl font-black tracking-tight">Professional Profile</h2>
              <p className="mb-8 text-muted-foreground">Add your main role interests and professional summary.</p>

              <div className="space-y-6">
                <TextField
                  label="LinkedIn Profile"
                  icon={Linkedin}
                  value={formData.linkedInProfile}
                  placeholder="https://linkedin.com/in/your-name"
                  maxLength={MAX_DB_TEXT_LENGTH}
                  onChange={(value) => setFormData({ ...formData, linkedInProfile: value })}
                />

                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">Job Roles, max 3</label>
                  <div className="flex gap-3">
                    <input
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      maxLength={80}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addRole();
                        }
                      }}
                      placeholder="Frontend Engineer"
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-accent-emerald"
                    />
                    <button type="button" onClick={addRole} className="px-5 rounded-2xl bg-white text-black font-black">
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.jobRoles.map((role) => (
                      <span key={role} className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 px-3 py-2 text-xs font-bold text-accent-emerald">
                        {role}
                        <button type="button" onClick={() => removeRole(role)}>
                          <Trash2 size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <TextareaField
                  label="Professional Profile"
                  value={formData.professionalProfile}
                  placeholder="Describe your professional focus and strongest capabilities."
                  maxLength={MAX_DB_TEXT_LENGTH}
                  onChange={(value) => setFormData({ ...formData, professionalProfile: value })}
                />
                <TextareaField
                  label="Biography"
                  value={formData.biography}
                  placeholder="Share your background, achievements, and what kind of work you want."
                  maxLength={MAX_DB_TEXT_LENGTH}
                  onChange={(value) => setFormData({ ...formData, biography: value })}
                />
              </div>

              <Button onClick={nextStep} className="mt-8 w-full bg-accent-emerald hover:bg-emerald-600 text-white py-7 rounded-2xl text-lg font-black">
                Continue
              </Button>
            </section>
          )}

          {step === 4 && (
            <section>
              <h2 className="mb-3 text-3xl font-black tracking-tight">CV Upload</h2>
              <p className="mb-8 text-muted-foreground">Upload the document evidence for your candidate profile.</p>

              <label className="block cursor-pointer rounded-[2rem] border-2 border-dashed border-white/10 bg-white/[0.03] p-10 text-center hover:border-accent-emerald transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                />
                <Upload size={34} className="mx-auto mb-4 text-accent-emerald" />
                <p className="font-bold">{cvFile ? cvFile.name : "Choose CV file"}</p>
                <p className="mt-1 text-sm text-muted-foreground">PDF, DOC, or DOCX</p>
              </label>

              <div className="mt-8 rounded-2xl border border-accent-emerald/20 bg-accent-emerald/10 p-5 flex gap-4">
                <ShieldCheck size={22} className="text-accent-emerald shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">
                  We save your profile first, then upload the CV through the documented multipart endpoint.
                </p>
              </div>

              <Button
                onClick={handleFinish}
                disabled={loading}
                className="mt-8 w-full bg-white hover:bg-slate-100 text-black py-8 rounded-2xl text-xl font-black"
              >
                {loading ? (
                  <div className="w-6 h-6 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                ) : (
                  <>
                    Complete Profile
                    <CheckCircle2 className="ml-2" />
                  </>
                )}
              </Button>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  maxLength = MAX_DB_TEXT_LENGTH,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: LucideIcon;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} />
        <input
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-accent-emerald"
        />
      </div>
      <p className="mt-1 text-right text-[10px] font-bold text-muted-foreground">
        {value.length}/{maxLength}
      </p>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  maxLength = MAX_DB_TEXT_LENGTH,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        <FileText className="absolute left-5 top-5 text-muted-foreground" size={17} />
        <textarea
          rows={5}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          className="w-full resize-none bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-accent-emerald"
        />
      </div>
      <p className="mt-1 text-right text-[10px] font-bold text-muted-foreground">
        {value.length}/{maxLength}
      </p>
    </div>
  );
}
