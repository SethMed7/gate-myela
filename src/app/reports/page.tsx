"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import MultiMetricAreaChart from "@/components/charts/MultiMetricAreaChart";
import DistributionDonutChart from "@/components/charts/DistributionDonutChart";
import HorizontalMetricBarChart from "@/components/charts/HorizontalMetricBarChart";
import { AiReportResponse, generateAiReport } from "@/lib/aiReportingClient";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Loader2,
  MoreHorizontal,
  RotateCcw,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const transactions = [
  {
    id: "TXN-8F2K9D3",
    date: "Jan 29, 2026 2:45 PM",
    type: "Sale",
    typeColor: "blue",
    amount: "$125.00",
    card: "•••• 4242",
    status: "Approved",
    statusColor: "green",
  },
  {
    id: "TXN-7G3L1E4",
    date: "Jan 29, 2026 1:30 PM",
    type: "Auth",
    typeColor: "indigo",
    amount: "$89.99",
    card: "•••• 1234",
    status: "Pending",
    statusColor: "amber",
  },
  {
    id: "TXN-6H4M2F5",
    date: "Jan 29, 2026 11:15 AM",
    type: "Capture",
    typeColor: "slate",
    amount: "$250.00",
    card: "•••• 5678",
    status: "Approved",
    statusColor: "green",
  },
  {
    id: "TXN-5I5N3G6",
    date: "Jan 29, 2026 10:00 AM",
    type: "Refund",
    typeColor: "orange",
    amount: "$45.00",
    card: "•••• 9012",
    status: "Approved",
    statusColor: "green",
  },
  {
    id: "TXN-4J6O4H7",
    date: "Jan 28, 2026 4:20 PM",
    type: "Sale",
    typeColor: "blue",
    amount: "$67.50",
    card: "•••• 3456",
    status: "Declined",
    statusColor: "red",
  },
  {
    id: "TXN-3K7P5I8",
    date: "Jan 28, 2026 3:45 PM",
    type: "Void",
    typeColor: "slate",
    amount: "$150.00",
    card: "•••• 7890",
    status: "Approved",
    statusColor: "green",
  },
  {
    id: "TXN-2L8Q6J9",
    date: "Jan 28, 2026 2:00 PM",
    type: "Sale",
    typeColor: "blue",
    amount: "$299.99",
    card: "•••• 2345",
    status: "Approved",
    statusColor: "green",
  },
];

const summary = [
  { label: "Volume", value: "$489.2k", subtext: "+11.8% vs prior week" },
  { label: "Approved", value: "2,184", subtext: "94.4% approval rate" },
  { label: "Declined", value: "94", subtext: "3.9% of traffic" },
  { label: "Chargebacks", value: "12", subtext: "-18% from last month" },
  { label: "Avg. Ticket", value: "$206", subtext: "+$14 week over week" },
];

const trendData = [
  { day: "Mon", volume: 62200, approvals: 282, declines: 11 },
  { day: "Tue", volume: 68400, approvals: 307, declines: 16 },
  { day: "Wed", volume: 70150, approvals: 319, declines: 18 },
  { day: "Thu", volume: 73900, approvals: 337, declines: 17 },
  { day: "Fri", volume: 82500, approvals: 381, declines: 19 },
  { day: "Sat", volume: 72120, approvals: 323, declines: 14 },
  { day: "Sun", volume: 59980, approvals: 235, declines: 13 },
];

const declineReasons = [
  { label: "Insufficient Funds", count: 38 },
  { label: "AVS Mismatch", count: 22 },
  { label: "Invalid CVV", count: 14 },
  { label: "Processor Timeout", count: 11 },
  { label: "Do Not Honor", count: 9 },
];

const paymentMix = [
  { name: "Card", value: 71, color: "#1e6dff" },
  { name: "ACH", value: 21, color: "#0f172a" },
  { name: "Wallet", value: 8, color: "#38bdf8" },
];

const typeColors: Record<string, string> = {
  blue: "bg-[var(--color-primary-soft)] text-[var(--color-primary)]",
  indigo: "bg-blue-50 text-blue-700",
  slate: "bg-slate-100 text-slate-700",
  orange: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
};

const statusColors: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
};

const initialAiReport: AiReportResponse = {
  summary: [
    "ACH approvals remain stronger than card traffic through non-peak hours.",
    "Overall approval trend is positive and stable week-over-week.",
  ],
  riskSignals: [
    "AVS mismatch remains the top preventable decline signal.",
    "Retry spikes around peak windows correlate with elevated decline rates.",
  ],
  recommendations: [
    "Require ZIP verification for high-risk merchant cohorts.",
    "Enable smart retry spacing for temporary processor timeouts.",
  ],
  generatedAt: new Date().toISOString(),
  provider: "seed",
};

const audienceBriefs: Record<string, { label: string; bullets: string[] }> = {
  ceo: {
    label: "Executive",
    bullets: [
      "Approval rate is stable with week-over-week volume growth above 10%.",
      "Top risk exposure remains AVS mismatch and retry clustering during peak windows.",
      "Recommended next move: publish stricter retry spacing and monitor chargeback trend weekly.",
    ],
  },
  ops: {
    label: "Operations",
    bullets: [
      "Declines are concentrated in a short list of avoidable reasons (AVS/CVV/timeout).",
      "Exception queue should prioritize pending capture expiry and settlement mismatches.",
      "Suggested action: enable route-specific fallback and morning exception sweeps.",
    ],
  },
  sales: {
    label: "Sales",
    bullets: [
      "Position recovered approvals and reduced decline friction as immediate revenue lift.",
      "Use payment-mix trend to steer prospects toward lower-risk rails where eligible.",
      "Anchor proposals with governance controls: rule lifecycle, audit log, and exception response.",
    ],
  },
  finance: {
    label: "Finance",
    bullets: [
      "Monitor settlement variance and refund timing to reduce reconciliation overhead.",
      "Track payment mix shifts to anticipate fee impact and net margin changes.",
      "Prioritize dispute-prevention controls before volume growth campaigns.",
    ],
  },
};

export default function ReportsPage() {
  const [aiPrompt, setAiPrompt] = useState(
    "Summarize approval trend by payment type and call out risk signals for the last 7 days."
  );
  const [aiReport, setAiReport] = useState<AiReportResponse>(initialAiReport);
  const [aiError, setAiError] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days");
  const [selectedAudience, setSelectedAudience] = useState<keyof typeof audienceBriefs>("ceo");

  const handleGenerateAiBrief = async () => {
    setAiError("");
    setIsGeneratingAi(true);

    try {
      const report = await generateAiReport({
        prompt: aiPrompt,
        dateRange: selectedDateRange,
        focus: ["approvals", "declines", "payment mix", "risk"],
        merchantProfile: "Myela TAG",
      });

      setAiReport(report);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate report";
      setAiError(message);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Reports"
          subtitle="Operational reporting, conversion trends, and AI-assisted insights for your gateway activity."
          actions={
            <>
              <button className="btn btn-secondary btn-md" onClick={handleGenerateAiBrief}>
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Brief
                  </>
                )}
              </button>
              <button className="btn btn-primary btn-md">
                <Download className="w-4 h-4" />
                Export Dataset
              </button>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-4">
          {summary.map((item, index) => (
            <div
              key={item.label}
              className={`panel p-5 ${index === 0 ? "bg-gradient-to-br from-[#0b0b0b] to-[#1a1a1a] text-white" : ""}`}
            >
              <span className={`text-sm font-medium ${index === 0 ? "text-white/60" : "text-slate-500"}`}>
                {item.label}
              </span>
              <div className={`text-3xl font-semibold mt-2 ${index === 0 ? "text-white" : "text-slate-900"}`}>
                {item.value}
              </div>
              <span className={`text-xs mt-1 ${index === 0 ? "text-white/40" : "text-slate-400"}`}>
                {item.subtext}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] gap-5">
          <div className="panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">Volume and Approval Trend</h3>
                <p className="text-sm text-slate-500">Daily pattern with approval/decline overlays</p>
              </div>
              <select
                className="input-base max-w-[190px]"
                value={selectedDateRange}
                onChange={(event) => setSelectedDateRange(event.target.value)}
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="h-80">
              <MultiMetricAreaChart
                data={trendData}
                xKey="day"
                areaKey="volume"
                areaLabel="Volume"
                lines={[
                  { key: "approvals", label: "Approved", color: "#0f172a" },
                  { key: "declines", label: "Declined", color: "#f97316" },
                ]}
                leftTickFormatter={(value) => `$${Math.round(value / 1000)}k`}
              />
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">AI Highlights</h3>
                <p className="text-sm text-slate-500">Auto-generated from reporting signals</p>
              </div>
              <Bot className="w-4 h-4 text-slate-500" />
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 p-3.5 bg-white">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg p-2 text-amber-700 bg-amber-50">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Risk Signals</div>
                    <p className="text-sm text-slate-600 mt-1">{aiReport.riskSignals[0]}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-3.5 bg-white">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg p-2 text-blue-700 bg-blue-50">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Trend Summary</div>
                    <p className="text-sm text-slate-600 mt-1">{aiReport.summary[0]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-3 text-sm text-blue-800">
              AI output is advisory only. Final decisions stay in your control.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="panel p-5">
            <h3 className="font-semibold text-slate-900 mb-1">Payment Method Mix</h3>
            <p className="text-sm text-slate-500 mb-4">Processed volume split by rail</p>
            <div className="h-64">
              <DistributionDonutChart data={paymentMix} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {paymentMix.map((method) => (
                <div key={method.name} className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
                  <div className="text-xs text-slate-500">{method.name}</div>
                  <div className="text-lg font-semibold text-slate-900">{method.value}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <h3 className="font-semibold text-slate-900 mb-1">Decline Reason Distribution</h3>
            <p className="text-sm text-slate-500 mb-4">Top causes from the last 7 days</p>
            <div className="h-64">
              <HorizontalMetricBarChart
                data={declineReasons}
                categoryKey="label"
                valueKey="count"
                valueLabel="Count"
              />
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900">AI Reporting Assistant</h3>
            </div>
            <div className="text-xs text-slate-500">
              Frontend contract: set `NEXT_PUBLIC_AI_REPORTING_ENDPOINT` for live generation.
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="text-sm font-semibold text-slate-700">Prompt</label>
              <textarea
                className="input-base mt-2 min-h-[130px] bg-white"
                value={aiPrompt}
                onChange={(event) => setAiPrompt(event.target.value)}
              />
              {aiError && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                  {aiError}
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <button className="btn btn-primary btn-sm" onClick={handleGenerateAiBrief}>
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Running
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Run Analysis
                    </>
                  )}
                </button>
                <button className="btn btn-outline btn-sm">Save Prompt Template</button>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-white">
              <div className="text-sm font-semibold text-slate-900 mb-2">
                Generated Brief
                <span className="text-xs text-slate-400 font-normal ml-2">
                  {new Date(aiReport.generatedAt).toLocaleString()}
                </span>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Summary</div>
                  <ul className="space-y-1 mt-1">
                    {aiReport.summary.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Risk</div>
                  <ul className="space-y-1 mt-1">
                    {aiReport.riskSignals.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                    Recommendations
                  </div>
                  <ul className="space-y-1 mt-1">
                    {aiReport.recommendations.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Audience-Ready AI Briefs</h3>
              <p className="text-sm text-slate-500">Same data, tailored messaging by stakeholder persona</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(audienceBriefs) as Array<keyof typeof audienceBriefs>).map((key) => (
                <button
                  key={key}
                  className={`btn btn-sm ${
                    selectedAudience === key ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setSelectedAudience(key)}
                >
                  {audienceBriefs[key].label}
                </button>
              ))}
            </div>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {audienceBriefs[selectedAudience].bullets.map((bullet) => (
              <li key={bullet} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-900">Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <div className="min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Date Range</label>
              <select className="input-base" defaultValue="Last 7 Days">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Transaction Type</label>
              <select className="input-base">
                <option>All Types</option>
                <option>Sale</option>
                <option>Authorization</option>
                <option>Capture</option>
                <option>Refund</option>
                <option>Void</option>
              </select>
            </div>
            <div className="min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Status</label>
              <select className="input-base">
                <option>All Statuses</option>
                <option>Approved</option>
                <option>Declined</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="min-w-[160px]">
              <label className="block text-sm font-medium text-slate-600 mb-2">Payment Rail</label>
              <select className="input-base">
                <option>All Rails</option>
                <option>Card</option>
                <option>ACH</option>
                <option>Wallet</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button className="btn btn-primary btn-md w-full">Apply</button>
            </div>
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">Transaction History</h3>
              <p className="text-sm text-slate-500">Showing 7 of 1,247 transactions</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, amount, or card..."
                className="input-base pl-9 w-full sm:w-72"
              />
            </div>
          </div>
          <div className="table-wrap">
            <table className="w-full">
              <thead className="bg-slate-50/60">
                <tr>
                  <th className="px-6 py-4 table-head">Transaction ID</th>
                  <th className="px-6 py-4 table-head">Date & Time</th>
                  <th className="px-6 py-4 table-head">Type</th>
                  <th className="px-6 py-4 table-head">Amount</th>
                  <th className="px-6 py-4 table-head">Card</th>
                  <th className="px-6 py-4 table-head">Status</th>
                  <th className="px-6 py-4 table-head text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/60 transition-colors">
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
                      <span className="text-sm font-semibold text-slate-900">{txn.amount}</span>
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
                        <button className="btn-icon" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {txn.status === "Approved" && txn.type === "Sale" && (
                          <button className="btn-icon" title="Refund">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button className="btn-icon" title="More Actions">
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
              Showing <span className="font-semibold text-slate-700">1-7</span> of{" "}
              <span className="font-semibold text-slate-700">1,247</span> results
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline btn-sm" disabled>
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 flex items-center justify-center text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg">
                  1
                </button>
                <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                  2
                </button>
                <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                  3
                </button>
                <span className="w-9 h-9 flex items-center justify-center text-slate-400">...</span>
                <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                  42
                </button>
              </div>
              <button className="btn btn-outline btn-sm">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
