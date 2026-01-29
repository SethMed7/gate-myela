"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { CreditCard, Shield, FileText } from "lucide-react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";

const volumeData = [
  { name: "Week 1", volume: 95000, count: 52 },
  { name: "Week 2", volume: 110000, count: 58 },
  { name: "Week 3", volume: 108000, count: 55 },
  { name: "Week 4", volume: 115000, count: 48 },
];

const stats = [
  { label: "Approved", value: "247", color: "text-[#3b82f6]" },
  { label: "Declined", value: "18", color: "text-[#3b82f6]" },
  { label: "Pending", value: "5", color: "text-[#3b82f6]" },
  { label: "Refunded", value: "12", color: "text-[#3b82f6]" },
  { label: "Voided", value: "3", color: "text-[#3b82f6]" },
  { label: "Captured", value: "189", color: "text-[#3b82f6]" },
];

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="flex-1 p-6 overflow-auto">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="w-16 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="20" y="25" width="40" height="30" rx="4" fill="#3b82f6" />
                  <rect x="26" y="32" width="28" height="4" rx="1" fill="white" />
                  <rect x="26" y="40" width="20" height="4" rx="1" fill="white" />
                  <rect x="26" y="48" width="14" height="4" rx="1" fill="white" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Welcome to{" "}
                  <span className="text-[#3b82f6]">your gateway portal.</span>
                </h2>
                <p className="text-slate-600 mt-1">
                  Process payments, manage transactions, track authorizations, and
                  generate reports with ease.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/sale"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                New Transaction
              </Link>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <polygon points="5,3 19,12 5,21 5,3" />
                </svg>
                Quick Tour
              </button>
            </div>
          </div>
        </div>

        {/* Charts and Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Volume Chart */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-800">Processing Volume</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                    Transaction Volume
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
                    Transaction Count
                  </span>
                </div>
              </div>
              <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option>Month to Date</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis
                    yAxisId="left"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#94a3b8"
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "volume" ? `$${Number(value).toLocaleString()}` : value,
                      name === "volume" ? "Volume" : "Count",
                    ]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="volume"
                    fill="#e2e8f0"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center"
              >
                <span className="text-sm text-slate-600">{stat.label}</span>
                <span className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/sale"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-[#2563eb] transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            Process Sale
          </Link>
          <Link
            href="/authorize"
            className="flex items-center justify-center gap-3 px-6 py-4 border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Shield className="w-5 h-5" />
            Authorize Only
          </Link>
          <Link
            href="/reports"
            className="flex items-center justify-center gap-3 px-6 py-4 border border-[#3b82f6] text-[#3b82f6] rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            <FileText className="w-5 h-5" />
            View Reports
          </Link>
        </div>
      </div>
    </>
  );
}
