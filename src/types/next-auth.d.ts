import NextAuth, { DefaultSession } from "next-auth";
import type { UserRole } from "@/lib/auth-routes";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"] & {
      role?: UserRole;
    };
  }

  interface User {
    accessToken?: string;
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: UserRole;
  }
}
