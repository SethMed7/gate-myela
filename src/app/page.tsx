"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { CreditCard, Shield, FileText, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Activity } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const volumeData = [
  { name: "Mon", volume: 32000, count: 142 },
  { name: "Tue", volume: 45000, count: 198 },
  { name: "Wed", volume: 38000, count: 167 },
  { name: "Thu", volume: 52000, count: 231 },
  { name: "Fri", volume: 61000, count: 289 },
  { name: "Sat", volume: 48000, count: 215 },
  { name: "Sun", volume: 35000, count: 156 },
];

const stats = [
  { label: "Approved", value: "1,247", change: "+12.5%", positive: true, icon: TrendingUp },
  { label: "Declined", value: "43", change: "-8.3%", positive: true, icon: Activity },
  { label: "Pending", value: "12", change: "+2", positive: false, icon: Activity },
  { label: "Volume", value: "$89.4k", change: "+18.2%", positive: true, icon: TrendingUp },
];

const recentTransactions = [
  { id: "TXN-8F2K9", amount: "$125.00", status: "Approved", time: "2 min ago", card: "•••• 4242" },
  { id: "TXN-7G3L1", amount: "$89.99", status: "Approved", time: "5 min ago", card: "•••• 1234" },
  { id: "TXN-6H4M2", amount: "$250.00", status: "Pending", time: "8 min ago", card: "•••• 5678" },
  { id: "TXN-5I5N3", amount: "$45.00", status: "Approved", time: "12 min ago", card: "•••• 9012" },
];

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Overview of your payment processing" />
      <div className="flex-1 p-6 overflow-auto bg-slate-50/50">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0D0D0D] to-[#1a1a1a] rounded-2xl p-8 mb-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#3B82F6] flex items-center justify-center shadow-xl shadow-blue-500/30">
                <Zap className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Welcome back to <span className="text-[#3B82F6]">Gateway</span>
                </h2>
                <p className="text-white/60 max-w-md">
                  Your payment processing is running smoothly. Process transactions, manage authorizations, and generate reports.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/sale"
                className="group flex items-center gap-2 px-5 py-3 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/25 btn-press"
              >
                <CreditCard className="w-5 h-5" />
                New Transaction
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-slate-200/60 p-5 card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    stat.positive ? "text-emerald-600" : "text-amber-600"
                  }`}>
                    {stat.positive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Volume Chart */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900">Processing Volume</h3>
                <p className="text-sm text-slate-500 mt-0.5">Transaction volume over the past 7 days</p>
              </div>
              <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D0D0D",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px 16px",
                    }}
                    labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Volume"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    fill="url(#colorVolume)"
                    dot={false}
                    activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 3, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900">Recent Activity</h3>
              <Link href="/reports" className="text-sm font-medium text-[#3B82F6] hover:text-[#2563eb]">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      txn.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{txn.amount}</div>
                      <div className="text-xs text-slate-500">{txn.card}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium px-2 py-1 rounded-lg ${
                      txn.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {txn.status}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{txn.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/sale"
            className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900">Process Sale</div>
              <div className="text-sm text-slate-500">Authorize & capture payment</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>

          <Link
            href="/authorize"
            className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-[#3B82F6] transition-colors">
              <Shield className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900">Authorize Only</div>
              <div className="text-sm text-slate-500">Hold funds without capture</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>

          <Link
            href="/reports"
            className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-[#3B82F6] transition-colors">
              <FileText className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900">View Reports</div>
              <div className="text-sm text-slate-500">Transaction history & analytics</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </>
  );
}
