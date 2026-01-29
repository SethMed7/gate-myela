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
} from "lucide-react";
import ProductSwitcher from "./ProductSwitcher";

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
    <aside className="w-60 min-h-screen bg-[#0D0D0D] text-white flex flex-col">
      {/* Product Switcher */}
      <div className="p-4 border-b border-white/10">
        <ProductSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-3 mb-2">
              {section.title}
            </div>
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
                          ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
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

      {/* Settings Link */}
      <div className="p-3 border-t border-white/10">
        <Link
          href="/settings"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
            pathname === "/settings"
              ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
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
      <div className="p-4 border-t border-white/10">
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
