"use client";

import Header from "@/components/Header";
import { Download, Search } from "lucide-react";

const transactions = [
  { id: "TXN-789012350", date: "Jan 29, 2026 2:45 PM", type: "Sale", typeColor: "blue", amount: "$125.00", card: "•••• 4242", status: "Approved", statusColor: "green" },
  { id: "TXN-789012351", date: "Jan 29, 2026 1:30 PM", type: "Auth", typeColor: "green", amount: "$89.99", card: "•••• 1234", status: "Pending", statusColor: "yellow" },
  { id: "TXN-789012352", date: "Jan 29, 2026 11:15 AM", type: "Capture", typeColor: "purple", amount: "$250.00", card: "•••• 5678", status: "Approved", statusColor: "green" },
  { id: "TXN-789012353", date: "Jan 29, 2026 10:00 AM", type: "Refund", typeColor: "orange", amount: "$45.00", card: "•••• 9012", status: "Approved", statusColor: "green" },
  { id: "TXN-789012354", date: "Jan 28, 2026 4:20 PM", type: "Sale", typeColor: "blue", amount: "$67.50", card: "•••• 3456", status: "Declined", statusColor: "red" },
  { id: "TXN-789012355", date: "Jan 28, 2026 3:45 PM", type: "Void", typeColor: "red", amount: "$150.00", card: "•••• 7890", status: "Approved", statusColor: "green" },
  { id: "TXN-789012356", date: "Jan 28, 2026 2:00 PM", type: "Sale", typeColor: "blue", amount: "$299.99", card: "•••• 2345", status: "Approved", statusColor: "green" },
];

const summary = [
  { label: "Total Transactions", value: "1,247" },
  { label: "Total Volume", value: "$89,432.50" },
  { label: "Approval Rate", value: "94.2%" },
  { label: "Avg Transaction", value: "$71.72" },
];

const typeColors: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
};

const statusColors: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

export default function ReportsPage() {
  return (
    <>
      <Header title="Reports" />
      <div className="flex-1 p-6 overflow-auto">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option>Today</option>
                <option>Yesterday</option>
                <option selected>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Type</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option>All Types</option>
                <option>Sale</option>
                <option>Authorization</option>
                <option>Capture</option>
                <option>Refund</option>
                <option>Void</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option>All Statuses</option>
                <option>Approved</option>
                <option>Declined</option>
                <option>Pending</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors">
              Apply Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {summary.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <span className="text-sm text-slate-600">{item.label}</span>
              <div className="text-2xl font-bold text-slate-800 mt-1">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Transaction History</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-600 border-b border-slate-200">
                  <th className="px-4 py-3 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Date & Time</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Card</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-mono text-slate-700">{txn.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{txn.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[txn.typeColor]}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{txn.amount}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{txn.card}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[txn.statusColor]}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">
                          View
                        </button>
                        {txn.status === "Approved" && txn.type === "Sale" && (
                          <button className="px-2 py-1 text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">
                            Refund
                          </button>
                        )}
                        {txn.status === "Pending" && (
                          <button className="px-2 py-1 text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">
                            Capture
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 flex items-center justify-between">
            <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50" disabled>
              &lt; Previous
            </button>
            <span className="text-sm text-slate-600">Page 1 of 42</span>
            <button className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800">
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
