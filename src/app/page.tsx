"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ShieldCheck,
  CreditCard,
  FileText,
  Zap,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
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
  { label: "Approved", value: "1,247", change: "+12.5%", positive: true, icon: ShieldCheck },
  { label: "Declined", value: "43", change: "-8.3%", positive: false, icon: AlertTriangle },
  { label: "Pending", value: "12", change: "+2", positive: true, icon: Activity },
  { label: "Volume", value: "$89.4k", change: "+18.2%", positive: true, icon: TrendingUp },
];

const queue = [
  { label: "Pre-Auth", value: "12", tone: "text-blue-600" },
  { label: "Documents", value: "4", tone: "text-amber-600" },
  { label: "Review", value: "2", tone: "text-emerald-600" },
  { label: "At Risk", value: "1", tone: "text-red-500" },
];

const recentTransactions = [
  { id: "TXN-8F2K9", amount: "$125.00", status: "Approved", time: "2 min ago", card: "•••• 4242" },
  { id: "TXN-7G3L1", amount: "$89.99", status: "Approved", time: "5 min ago", card: "•••• 1234" },
  { id: "TXN-6H4M2", amount: "$250.00", status: "Pending", time: "8 min ago", card: "•••• 5678" },
  { id: "TXN-5I5N3", amount: "$45.00", status: "Approved", time: "12 min ago", card: "•••• 9012" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of your payment processing activity and approvals."
          actions={
            <>
              <Link href="/reports" className="btn btn-secondary btn-md">
                View Reports
              </Link>
              <Link href="/sale" className="btn btn-primary btn-md">
                New Transaction
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </>
          }
        />

        <div className="panel p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Welcome to your agent portal.
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Gain insights into processing volumes, manage applications, and track approvals with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="btn btn-primary btn-sm">Download the playbook</button>
            <button className="btn btn-outline btn-sm">Watch a quick tour</button>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="panel p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-semibold text-slate-900">{stat.value}</span>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.positive ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="panel p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-900">Processing Volume</h3>
                <p className="text-sm text-slate-500 mt-1">Transactions over the past week</p>
              </div>
              <select className="input-base max-w-[180px]">
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
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
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
                      backgroundColor: "#0b0b0b",
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
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    fill="url(#colorVolume)"
                    dot={false}
                    activeDot={{ r: 6, fill: "var(--color-primary)", strokeWidth: 3, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-900">Queue Snapshot</h3>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {queue.map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className={`text-2xl font-semibold ${item.tone}`}>{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Approval Rate</div>
                  <div className="text-xs text-slate-500">94.2% this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="panel p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-900">Recent Activity</h3>
              <Link href="/reports" className="text-sm font-medium text-[var(--color-primary)]">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        txn.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{txn.amount}</div>
                      <div className="text-xs text-slate-500">{txn.card}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-lg ${
                        txn.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {txn.status}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{txn.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/sale"
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 text-sm">Process Sale</div>
                  <div className="text-xs text-slate-500">Authorize and capture</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/authorize"
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 text-sm">Authorize Only</div>
                  <div className="text-xs text-slate-500">Hold funds for capture</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/reports"
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 text-sm">View Reports</div>
                  <div className="text-xs text-slate-500">Analytics and exports</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
