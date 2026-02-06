"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Search } from "lucide-react";

interface PortalItem {
  id: string;
  name: string;
  domain: string;
  href: string;
  external: boolean;
  active?: boolean;
}

const portals: PortalItem[] = [
  {
    id: "myela-tag",
    name: "Myela TAG",
    domain: "gate-poc.sethmedina.com",
    href: "/",
    external: false,
    active: true,
  },
  {
    id: "msd-edge",
    name: "MSD Edge Portal",
    domain: "partners-poc.merchantservicedepot.com",
    href: "https://partners-poc.merchantservicedepot.com/auth?redirect=%2F",
    external: true,
  },
];

export default function PortalSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activePortal = portals.find((portal) => portal.active) ?? portals[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Switch portal"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold flex items-center justify-center">
          M
        </div>
        <div className="text-sm font-semibold text-slate-900 leading-none">
          {activePortal.name}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[320px] rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <button className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100 transition-colors">
              Jump to another portal
            </button>
          </div>

          <div className="mt-2 space-y-1">
            {portals.map((portal) => (
              <a
                key={portal.id}
                href={portal.href}
                target={portal.external ? "_blank" : undefined}
                rel={portal.external ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!portal.external) {
                    setIsOpen(false);
                  }
                }}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  portal.active ? "bg-blue-50/70" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold">
                    {portal.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">{portal.name}</div>
                    <div className="text-xs text-slate-500 truncate">{portal.domain}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
