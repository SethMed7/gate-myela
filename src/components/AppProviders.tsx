"use client";

import { RoleProvider } from "@/components/RoleContext";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>;
}
