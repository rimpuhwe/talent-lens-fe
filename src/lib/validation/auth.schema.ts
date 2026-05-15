import { z } from "zod";

export const candidateRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain special character"),

    confirmPassword: z.string(),

    birthDate: z.string().min(1, "Birth date is required"),

    gender: z.enum(["MALE", "FEMALE"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CandidateRegisterInput = z.infer<
  typeof candidateRegisterSchema
>;

export const recruiterRegisterSchema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),
    emailAddress: z.string().email("Invalid company email address"),
    contactNumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Phone number must be 10 to 15 digits and may start with +"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[@$!%*?&]/, "Must contain one of @$!%*?&"),
    confirmPassword: z.string(),
    location: z.string().min(1, "Location is required"),
    companySummary: z.string().min(1, "Company summary is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RecruiterRegisterInput = z.infer<
  typeof recruiterRegisterSchema
>;
