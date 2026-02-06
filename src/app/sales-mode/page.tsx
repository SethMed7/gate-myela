"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useRole } from "@/components/RoleContext";
import {
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FileText,
  Link2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export default function SalesModePage() {
  const { role } = useRole();
  const [monthlyVolume, setMonthlyVolume] = useState("450000");
  const [avgTicket, setAvgTicket] = useState("95");
  const [approvalRate, setApprovalRate] = useState("91.2");
  const [targetApprovalRate, setTargetApprovalRate] = useState("94.5");
  const [showDemoData, setShowDemoData] = useState(true);

  const model = useMemo(() => {
    const volume = Number(monthlyVolume) || 0;
    const ticket = Number(avgTicket) || 0;
    const currentRate = Number(approvalRate) || 0;
    const targetRate = Number(targetApprovalRate) || 0;
    const deltaRate = Math.max(targetRate - currentRate, 0);

    const transactions = ticket > 0 ? volume / ticket : 0;
    const recoveredCount = transactions * (deltaRate / 100);
    const recoveredRevenue = recoveredCount * ticket;
    const annualImpact = recoveredRevenue * 12;

    return {
      transactions,
      recoveredCount,
      recoveredRevenue,
      annualImpact,
      deltaRate,
    };
  }, [monthlyVolume, avgTicket, approvalRate, targetApprovalRate]);

  const capabilityRows = [
    {
      vendor: "NMI",
      points: [
        "Tokenized payment capture through frontend components (Collect.js / Payment Component).",
        "Customer Vault IDs for recurring and future charges without storing raw card data.",
        "Custom checkout APIs for transactions, subscriptions, and wallet-enabled flows.",
      ],
    },
    {
      vendor: "TCB TAG",
      points: [
        "Platform integrations advertised for Sticky.io, Konnektive, Infusionsoft, and Flex Charge.",
        "Processor network support listed for Global Payments, TSYS, Elavon, and WorldPay.",
        "Gateway feature set highlights 3DS2, multi-currency coverage, and self-boarding.",
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Sales Mode"
          subtitle={`Pre-sales and onboarding workflow for ${role}. Demo-friendly with hardcoded values.`}
          actions={
            <>
              <button className="btn btn-secondary btn-md">
                <FileText className="w-4 h-4" />
                Export ROI One-Pager
              </button>
              <button className="btn btn-primary btn-md">
                <ClipboardCheck className="w-4 h-4" />
                Build Implementation Plan
              </button>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Pipeline Opportunities</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">19</div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Ready to Demo</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">7</div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Onboarding This Week</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">6</div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">At Risk Deals</div>
            <div className="text-3xl font-semibold text-amber-600 mt-1">2</div>
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6">
          <div className="panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">ROI Calculator</h3>
              <span className="text-xs text-slate-500">Frontend simulation only</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Monthly Processing Volume ($)</label>
                <input
                  className="input-base"
                  value={monthlyVolume}
                  onChange={(event) => setMonthlyVolume(event.target.value.replace(/[^\d]/g, ""))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Average Ticket ($)</label>
                <input
                  className="input-base"
                  value={avgTicket}
                  onChange={(event) => setAvgTicket(event.target.value.replace(/[^\d.]/g, ""))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Current Approval Rate (%)</label>
                <input
                  className="input-base"
                  value={approvalRate}
                  onChange={(event) => setApprovalRate(event.target.value.replace(/[^\d.]/g, ""))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Target Approval Rate (%)</label>
                <input
                  className="input-base"
                  value={targetApprovalRate}
                  onChange={(event) => setTargetApprovalRate(event.target.value.replace(/[^\d.]/g, ""))}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Approval Lift</div>
                <div className="text-xl font-semibold text-slate-900">{model.deltaRate.toFixed(2)}%</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Recovered Txn/Month</div>
                <div className="text-xl font-semibold text-slate-900">{Math.round(model.recoveredCount)}</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Recovered Revenue/Month</div>
                <div className="text-xl font-semibold text-slate-900">${Math.round(model.recoveredRevenue).toLocaleString()}</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Annual Impact</div>
                <div className="text-xl font-semibold text-emerald-600">${Math.round(model.annualImpact).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="panel p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Demo Profile</h3>
              <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Use demo data</div>
                  <div className="text-xs text-slate-500">Safe mode for live calls and walkthroughs</div>
                </div>
                <input
                  type="checkbox"
                  checked={showDemoData}
                  onChange={(event) => setShowDemoData(event.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              </label>
              <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm text-slate-600">
                {showDemoData
                  ? "Demo profile active. No merchant-sensitive data shown."
                  : "Using live-like sample profile. Validate before customer share."}
              </div>
            </div>

            <div className="panel p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Implementation Readiness</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
                  Gateway credentials collected
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
                  Tax/tip/surcharge policy signed off
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
                  Go-live support owner assigned
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
                  Training session scheduled
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <PlayCircle className="w-4 h-4 text-[var(--color-primary)]" />
              Demo Checklist
            </div>
            <p className="text-sm text-slate-500 mt-2">
              1. Show role-based dashboard, 2. run exception remediation, 3. demonstrate rule publish workflow.
            </p>
          </div>
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Calculator className="w-4 h-4 text-[var(--color-primary)]" />
              ROI Storyline
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Lead with recovered approvals, then show operational time savings and governance confidence.
            </p>
          </div>
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Users className="w-4 h-4 text-[var(--color-primary)]" />
              Buyer Pack
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Include executive summary, policy controls, and implementation timeline in one export.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Link2 className="w-4 h-4 text-[var(--color-primary)]" />
              Capability Coverage (Frontend Planning)
            </div>
            <div className="mt-4 space-y-4">
              {capabilityRows.map((row) => (
                <div key={row.vendor} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-sm font-semibold text-slate-900">{row.vendor}</div>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                    {row.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
              PCI Scope Guardrails
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                Keep PAN entry and tokenization in gateway-hosted components, then operate on gateway tokens only.
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                Route repeat billing through vaulted payment IDs and avoid storing raw card fields in app state/logs.
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                Keep AI features focused on operational metadata (rates, declines, exceptions), not cardholder data.
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                Add dispute orchestration adapter points for Chargeflow and Chargeblast in the reporting layer.
              </div>
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">AI Assist (Frontend Prototype)</h3>
              <p className="text-sm text-slate-500">Suggested talking points for current opportunity</p>
            </div>
            <button className="btn btn-outline btn-sm">
              <Sparkles className="w-4 h-4" />
              Generate Pitch Notes
            </button>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex gap-2">
              <TrendingUp className="w-4 h-4 mt-0.5 text-emerald-600" />
              Highlight projected annual impact of ${Math.round(model.annualImpact).toLocaleString()}.
            </div>
            <div className="flex gap-2 mt-2">
              <ClipboardCheck className="w-4 h-4 mt-0.5 text-blue-600" />
              Emphasize governed rule workflows and exception handling as implementation risk reducers.
            </div>
            <div className="flex gap-2 mt-2">
              <Cpu className="w-4 h-4 mt-0.5 text-violet-600" />
              Position AI reporting as a decision support layer, not an automated payment decision engine.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
