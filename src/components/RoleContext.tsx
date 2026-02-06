"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type AppRole = "owner" | "ops" | "cashier" | "finance" | "agent";

export interface RoleOption {
  id: AppRole;
  label: string;
  description: string;
}

const ROLE_STORAGE_KEY = "myela_app_role";

export const roleOptions: RoleOption[] = [
  { id: "owner", label: "Owner", description: "Business visibility and growth" },
  { id: "ops", label: "Operations", description: "Daily payment operations" },
  { id: "cashier", label: "Cashier", description: "Fast transaction handling" },
  { id: "finance", label: "Finance", description: "Settlement and reconciliation" },
  { id: "agent", label: "Agent", description: "Sales and onboarding support" },
];

interface RoleContextValue {
  role: AppRole;
  setRole: (role: AppRole) => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

function getInitialRole(): AppRole {
  if (typeof window === "undefined") {
    return "owner";
  }

  const savedRole = window.localStorage.getItem(ROLE_STORAGE_KEY) as AppRole | null;
  const isValid = roleOptions.some((option) => option.id === savedRole);
  return isValid && savedRole ? savedRole : "owner";
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<AppRole>(getInitialRole);

  const value = useMemo(
    () => ({
      role,
      setRole: (nextRole: AppRole) => {
        setRoleState(nextRole);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(ROLE_STORAGE_KEY, nextRole);
        }
      },
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}
