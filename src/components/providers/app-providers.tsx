"use client";

import { AuthBootstrap } from "./auth-bootstrap";
import { QueryProvider } from "./query-provider";
import { AuthSessionProvider } from "./session-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
      <QueryProvider>
        <AuthBootstrap />
        {children}
      </QueryProvider>
    </AuthSessionProvider>
  );
}
