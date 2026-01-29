"use client";

import Header from "@/components/Header";
import { Download, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Eye, RotateCcw } from "lucide-react";

const transactions = [
  { id: "TXN-8F2K9D3", date: "Jan 29, 2026 2:45 PM", type: "Sale", typeColor: "blue", amount: "$125.00", card: "•••• 4242", status: "Approved", statusColor: "green" },
  { id: "TXN-7G3L1E4", date: "Jan 29, 2026 1:30 PM", type: "Auth", typeColor: "indigo", amount: "$89.99", card: "•••• 1234", status: "Pending", statusColor: "amber" },
  { id: "TXN-6H4M2F5", date: "Jan 29, 2026 11:15 AM", type: "Capture", typeColor: "purple", amount: "$250.00", card: "•••• 5678", status: "Approved", statusColor: "green" },
  { id: "TXN-5I5N3G6", date: "Jan 29, 2026 10:00 AM", type: "Refund", typeColor: "orange", amount: "$45.00", card: "•••• 9012", status: "Approved", statusColor: "green" },
  { id: "TXN-4J6O4H7", date: "Jan 28, 2026 4:20 PM", type: "Sale", typeColor: "blue", amount: "$67.50", card: "•••• 3456", status: "Declined", statusColor: "red" },
  { id: "TXN-3K7P5I8", date: "Jan 28, 2026 3:45 PM", type: "Void", typeColor: "slate", amount: "$150.00", card: "•••• 7890", status: "Approved", statusColor: "green" },
  { id: "TXN-2L8Q6J9", date: "Jan 28, 2026 2:00 PM", type: "Sale", typeColor: "blue", amount: "$299.99", card: "•••• 2345", status: "Approved", statusColor: "green" },
];

const summary = [
  { label: "Total Transactions", value: "1,247", subtext: "Last 7 days" },
  { label: "Total Volume", value: "$89,432", subtext: "+18.2% from last week" },
  { label: "Approval Rate", value: "94.2%", subtext: "+2.1% from last week" },
  { label: "Avg Transaction", value: "$71.72", subtext: "Per transaction" },
];

const typeColors: Record<string, string> = {
  blue: "bg-[#3B82F6]/10 text-[#3B82F6]",
  indigo: "bg-indigo-50 text-indigo-600",
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-orange-50 text-orange-600",
  slate: "bg-slate-100 text-slate-600",
  red: "bg-red-50 text-red-600",
};

const statusColors: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
};

export default function ReportsPage() {
  const selectClasses = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all";

  return (
    <>
      <Header title="Reports" subtitle="Transaction history and analytics" />
      <div className="flex-1 p-6 overflow-auto bg-slate-50/50">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {summary.map((item, index) => (
            <div
              key={item.label}
              className={`rounded-2xl p-5 ${
                index === 0
                  ? "bg-gradient-to-br from-[#0D0D0D] to-[#1a1a1a] text-white"
                  : "bg-white border border-slate-200/60"
              }`}
            >
              <span className={`text-sm font-medium ${index === 0 ? "text-white/60" : "text-slate-500"}`}>
                {item.label}
              </span>
              <div className={`text-3xl font-bold mt-2 ${index === 0 ? "text-white" : "text-slate-900"}`}>
                {item.value}
              </div>
              <span className={`text-xs mt-1 ${index === 0 ? "text-white/40" : "text-slate-400"}`}>
                {item.subtext}
              </span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-900">Filters</span>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Date Range</label>
              <select className={selectClasses} defaultValue="Last 7 Days">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Transaction Type</label>
              <select className={selectClasses}>
                <option>All Types</option>
                <option>Sale</option>
                <option>Authorization</option>
                <option>Capture</option>
                <option>Refund</option>
                <option>Void</option>
              </select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Status</label>
              <select className={selectClasses}>
                <option>All Statuses</option>
                <option>Approved</option>
                <option>Declined</option>
                <option>Pending</option>
              </select>
            </div>
            <button className="px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl text-sm font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 btn-press">
              Apply Filters
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all btn-press">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Transaction History</h3>
              <p className="text-sm text-slate-500">Showing 7 of 1,247 transactions</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, amount, or card..."
                className="w-72 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Card</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-slate-900">{txn.id}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{txn.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg ${typeColors[txn.typeColor]}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">{txn.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 font-mono">{txn.card}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg ${statusColors[txn.statusColor]}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {txn.status === "Approved" && txn.type === "Sale" && (
                          <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all" title="Refund">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More Actions">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">1-7</span> of <span className="font-semibold text-slate-700">1,247</span> results
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 flex items-center justify-center text-sm font-semibold bg-[#3B82F6] text-white rounded-lg">1</button>
                <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">2</button>
                <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">3</button>
                <span className="w-9 h-9 flex items-center justify-center text-slate-400">...</span>
                <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">42</button>
              </div>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
