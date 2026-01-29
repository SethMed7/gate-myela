"use client";

import { Bell, Settings, Search, ChevronDown } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#3B82F6] rounded-full ring-2 ring-white"></span>
        </button>

        {/* Settings */}
        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all">
          <Settings className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 mx-2" />

        {/* User Menu */}
        <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-all">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow-md shadow-blue-500/20">
            GP
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold text-slate-800">Gateway POC</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
