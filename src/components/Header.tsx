"use client";

import { Bell, LayoutGrid, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[var(--topbar-height)] bg-white border-b border-slate-200/70 sticky top-0 z-40">
      <div className="h-full px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[var(--color-primary)] flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="13" width="8" height="8" rx="2" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            MSD<span className="text-[var(--color-primary)]">Edge</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-icon" aria-label="Quick actions">
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button className="btn-icon relative" aria-label="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <button className="btn-icon" aria-label="Settings">
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-semibold">
            JN
          </div>
        </div>
      </div>
    </header>
  );
}
