"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Shield,
  Download,
  RotateCcw,
  XCircle,
  FileText,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sale", label: "Sale", icon: CreditCard },
  { href: "/authorize", label: "Authorize", icon: Shield },
  { href: "/capture", label: "Capture", icon: Download },
  { href: "/refund", label: "Refund", icon: RotateCcw },
  { href: "/void", label: "Void", icon: XCircle },
  { href: "/reports", label: "Reports", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#0D0D0D] text-white flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">Gateway</span>
            <span className="block text-[10px] text-white/40 font-medium tracking-wider uppercase">Payment Platform</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 mt-2">
        <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-3 mb-3">
          Transactions
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white/20"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-blue-600 flex items-center justify-center text-xs font-bold">
              GP
            </div>
            <div>
              <div className="text-sm font-medium">Gateway POC</div>
              <div className="text-[11px] text-white/40">v1.0.0</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/40">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
