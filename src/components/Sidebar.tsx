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
  Users,
  Receipt,
  Repeat,
  Settings,
  BadgeCheck,
  Upload,
} from "lucide-react";

const navSections = [
  {
    title: "Transactions",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/sale", label: "Sale", icon: CreditCard },
      { href: "/authorize", label: "Authorize", icon: Shield },
      { href: "/capture", label: "Capture", icon: Download },
      { href: "/refund", label: "Refund", icon: RotateCcw },
      { href: "/void", label: "Void", icon: XCircle },
      { href: "/validate", label: "Validate", icon: BadgeCheck },
      { href: "/batch", label: "Batch Upload", icon: Upload },
    ],
  },
  {
    title: "Billing",
    items: [
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/invoices", label: "Invoices", icon: Receipt },
      { href: "/subscriptions", label: "Subscriptions", icon: Repeat },
    ],
  },
  {
    title: "Analytics",
    items: [
      { href: "/reports", label: "Reports", icon: FileText },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] sm:w-[240px] bg-[var(--color-sidebar)] text-white flex flex-col sticky top-[var(--topbar-height)] h-[calc(100vh-var(--topbar-height))]">
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="sr-only">{section.title}</div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/25"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg transition-colors ${
                          isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                        }`}
                      >
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
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-white/10">
        <Link
          href="/settings"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/settings"
              ? "bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/25"
              : "text-white/65 hover:bg-white/5 hover:text-white"
          }`}
        >
          <div
            className={`p-1.5 rounded-lg transition-colors ${
              pathname === "/settings" ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
            }`}
          >
            <Settings className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="font-medium text-sm">Settings</span>
        </Link>
      </div>

      {/* Bottom section */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 text-[11px] text-white/40">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
