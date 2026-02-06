"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useRole } from "@/components/RoleContext";
import {
  ArrowUpRight,
  CheckCircle,
  Clock3,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface ExceptionItem {
  id: string;
  type: "decline" | "pending_capture" | "settlement_mismatch" | "chargeback_risk";
  severity: "critical" | "high" | "medium";
  status: "open" | "in_review" | "resolved";
  customer: string;
  amount: string;
  age: string;
  owner: string;
  headline: string;
}

const exceptions: ExceptionItem[] = [
  {
    id: "EXC-901",
    type: "decline",
    severity: "critical",
    status: "open",
    customer: "Aster Hotel Group",
    amount: "$2,950.00",
    age: "12m",
    owner: "Ops Queue",
    headline: "High-ticket card decline with AVS mismatch",
  },
  {
    id: "EXC-902",
    type: "pending_capture",
    severity: "high",
    status: "in_review",
    customer: "Elm Retail Partners",
    amount: "$1,220.00",
    age: "34m",
    owner: "Capture Team",
    headline: "Authorization nearing expiry window",
  },
  {
    id: "EXC-903",
    type: "settlement_mismatch",
    severity: "medium",
    status: "open",
    customer: "Northline Cafe",
    amount: "$742.15",
    age: "2h",
    owner: "Finance",
    headline: "Settlement total mismatch against batch report",
  },
  {
    id: "EXC-904",
    type: "chargeback_risk",
    severity: "high",
    status: "open",
    customer: "Metro Wellness",
    amount: "$980.00",
    age: "1h",
    owner: "Risk",
    headline: "Velocity pattern indicates elevated dispute risk",
  },
];

const severityStyle = {
  critical: "bg-red-50 text-red-700",
  high: "bg-amber-50 text-amber-700",
  medium: "bg-blue-50 text-blue-700",
} as const;

const statusStyle = {
  open: "bg-red-50 text-red-700",
  in_review: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
} as const;

const diagnosticNotes: Record<ExceptionItem["type"], string[]> = {
  decline: [
    "Issuer response: AVS ZIP mismatch on retry.",
    "CVV matched. Risk engine score 62/100.",
    "Customer profile has 4 successful transactions in last 60 days.",
  ],
  pending_capture: [
    "Authorization window ends in 3 hours.",
    "No partial capture posted yet.",
    "Recommended to capture before nightly batch.",
  ],
  settlement_mismatch: [
    "Batch total differs from expected by $12.14.",
    "One refund appears in batch but not in local summary.",
    "Reconciliation pack needs manual confirmation.",
  ],
  chargeback_risk: [
    "3 attempts within 10 minutes across same card fingerprint.",
    "Merchant profile flagged for soft descriptor mismatch.",
    "Fraud rule `velocity-9` triggered.",
  ],
};

const recommendedActions: Record<ExceptionItem["type"], string[]> = {
  decline: [
    "Attempt soft retry with ZIP correction prompt.",
    "Offer ACH fallback option.",
    "Escalate to issuer call script if retry fails.",
  ],
  pending_capture: [
    "Capture the authorization now for full amount.",
    "If partial fulfillment, post partial capture and void remainder.",
    "Notify merchant ops if stock/backorder delay remains.",
  ],
  settlement_mismatch: [
    "Re-run batch summary against gateway settlement report.",
    "Verify refund timing cutoff.",
    "Flag discrepancy for finance close checklist.",
  ],
  chargeback_risk: [
    "Enable step-up verification before next transaction.",
    "Suspend retries for 30 minutes.",
    "Record evidence package for potential dispute defense.",
  ],
};

export default function ExceptionsPage() {
  const { role } = useRole();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(exceptions[0]?.id ?? "");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return exceptions;
    }

    return exceptions.filter((item) =>
      `${item.id} ${item.customer} ${item.headline}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Exception Workbench"
          subtitle={`Role-aware queue for ${role}. Diagnose issues and execute next actions quickly.`}
          actions={
            <>
              <button className="btn btn-secondary btn-md">
                <Sparkles className="w-4 h-4" />
                AI Next Best Action
              </button>
              <button className="btn btn-primary btn-md">
                <CheckCircle className="w-4 h-4" />
                Mark Selected Resolved
              </button>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Open Exceptions</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">
              {exceptions.filter((item) => item.status !== "resolved").length}
            </div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Critical</div>
            <div className="text-3xl font-semibold text-red-600 mt-1">
              {exceptions.filter((item) => item.severity === "critical").length}
            </div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Under Review</div>
            <div className="text-3xl font-semibold text-amber-600 mt-1">
              {exceptions.filter((item) => item.status === "in_review").length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6">
          <div className="panel overflow-hidden">
            <div className="panel-header flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">Queue</h3>
                <p className="text-sm text-slate-500">Prioritize by severity and age</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="input-base pl-9 w-full sm:w-72"
                  placeholder="Search queue"
                />
              </div>
            </div>
            <div className="table-wrap">
              <table className="w-full">
                <thead className="bg-slate-50/60">
                  <tr>
                    <th className="px-6 py-4 table-head">Exception</th>
                    <th className="px-6 py-4 table-head">Severity</th>
                    <th className="px-6 py-4 table-head">Status</th>
                    <th className="px-6 py-4 table-head">Amount</th>
                    <th className="px-6 py-4 table-head">Age</th>
                    <th className="px-6 py-4 table-head">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`cursor-pointer hover:bg-slate-50/60 ${
                        selected?.id === item.id ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.id}</div>
                        <div className="text-xs text-slate-500">{item.headline}</div>
                        <div className="text-xs text-slate-400 mt-1">{item.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${severityStyle[item.severity]}`}>
                          {item.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${statusStyle[item.status]}`}>
                          {item.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.amount}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.age}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-5">
            {selected ? (
              <>
                <div className="panel p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Diagnostic Detail</h3>
                    <span className="text-sm font-semibold text-slate-600">{selected.id}</span>
                  </div>
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    {selected.headline}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {diagnosticNotes[selected.type].map((note) => (
                      <li key={note} className="text-sm text-slate-600 flex gap-2">
                        <Clock3 className="w-4 h-4 mt-0.5 text-slate-400" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel p-5">
                  <h3 className="font-semibold text-slate-900">Recommended Actions</h3>
                  <ul className="mt-3 space-y-2">
                    {recommendedActions[selected.type].map((action) => (
                      <li key={action} className="text-sm text-slate-700 flex items-start gap-2">
                        <ArrowUpRight className="w-4 h-4 mt-0.5 text-[var(--color-primary)]" />
                        {action}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <button className="btn btn-primary btn-sm">Assign Owner</button>
                    <button className="btn btn-outline btn-sm">Add Internal Note</button>
                  </div>
                </div>

                <div className="panel p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Risk Signal</h3>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex gap-2">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Escalate if unresolved for 90 minutes to avoid customer-facing impact.
                  </div>
                </div>
              </>
            ) : (
              <div className="panel p-6 text-sm text-slate-500">No exception selected.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
