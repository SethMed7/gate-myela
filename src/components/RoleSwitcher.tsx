"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { roleOptions, useRole } from "@/components/RoleContext";

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeRole = roleOptions.find((option) => option.id === role) ?? roleOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((value) => !value)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-white"
        aria-label="Switch role"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="font-semibold">{activeRole.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[220px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
          {roleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setRole(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${
                role === option.id ? "bg-blue-50" : "hover:bg-slate-50"
              }`}
            >
              <div className="text-sm font-semibold text-slate-900">{option.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
