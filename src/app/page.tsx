"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import MultiMetricAreaChart from "@/components/charts/MultiMetricAreaChart";
import { roleOptions, useRole, type AppRole } from "@/components/RoleContext";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  CircleAlert,
  CreditCard,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
} from "lucide-react";

const volumeData = [
  { name: "Mon", volume: 32000, count: 142 },
  { name: "Tue", volume: 45000, count: 198 },
  { name: "Wed", volume: 38000, count: 167 },
  { name: "Thu", volume: 52000, count: 231 },
  { name: "Fri", volume: 61000, count: 289 },
  { name: "Sat", volume: 48000, count: 215 },
  { name: "Sun", volume: 35000, count: 156 },
];

const roleHero: Record<AppRole, { title: string; subtitle: string }> = {
  owner: {
    title: "Business performance and risk at a glance",
    subtitle: "Track growth, approval trend, and margin-sensitive rules before they impact revenue.",
  },
  ops: {
    title: "Operational queue and exceptions control",
    subtitle: "Prioritize work items, clear pending issues, and keep daily payment flow stable.",
  },
  cashier: {
    title: "Fast transaction handling workspace",
    subtitle: "Run transactions quickly with minimal friction and clear next-step guidance.",
  },
  finance: {
    title: "Settlement and reconciliation center",
    subtitle: "Monitor settlement health, disputes, and high-value finance exceptions.",
  },
  agent: {
    title: "Sales and onboarding motion cockpit",
    subtitle: "Move prospects to activation with ROI proof and implementation readiness checks.",
  },
};

const roleStats: Record<
  AppRole,
  { label: string; value: string; change: string; positive: boolean; icon: typeof Activity }[]
> = {
  owner: [
    { label: "Gross Volume", value: "$489k", change: "+11.8%", positive: true, icon: TrendingUp },
    { label: "Approval Rate", value: "94.4%", change: "+1.9%", positive: true, icon: ShieldCheck },
    { label: "Rule Impact", value: "+$9.2k", change: "week", positive: true, icon: Sparkles },
    { label: "Risk Alerts", value: "7", change: "-2", positive: true, icon: AlertTriangle },
  ],
  ops: [
    { label: "Open Queue", value: "24", change: "-6", positive: true, icon: Activity },
    { label: "Pending Captures", value: "12", change: "-2", positive: true, icon: CheckCircle },
    { label: "Exceptions", value: "8", change: "+1", positive: false, icon: CircleAlert },
    { label: "SLA", value: "98.6%", change: "+0.4%", positive: true, icon: ShieldCheck },
  ],
  cashier: [
    { label: "Transactions", value: "132", change: "+14", positive: true, icon: CreditCard },
    { label: "Avg Checkout", value: "42s", change: "-6s", positive: true, icon: Activity },
    { label: "Declines", value: "5", change: "-2", positive: true, icon: AlertTriangle },
    { label: "Pending Help", value: "2", change: "steady", positive: true, icon: CheckCircle },
  ],
  finance: [
    { label: "Settled Today", value: "$82.4k", change: "+6.2%", positive: true, icon: TrendingUp },
    { label: "Disputes", value: "3", change: "-1", positive: true, icon: AlertTriangle },
    { label: "Refund Value", value: "$2.1k", change: "+0.3k", positive: false, icon: ArrowDownRight },
    { label: "Reconciliation", value: "99.2%", change: "+0.8%", positive: true, icon: CheckCircle },
  ],
  agent: [
    { label: "Active Pipeline", value: "19", change: "+4", positive: true, icon: Target },
    { label: "This Week Wins", value: "6", change: "+2", positive: true, icon: UserPlus },
    { label: "Avg Deal Size", value: "$1,240", change: "+$180", positive: true, icon: TrendingUp },
    { label: "Onboarding Risk", value: "2", change: "-1", positive: true, icon: AlertTriangle },
  ],
};

const queueByRole: Record<AppRole, { label: string; value: string; tone: string }[]> = {
  owner: [
    { label: "High Value", value: "6", tone: "text-blue-600" },
    { label: "At Risk", value: "2", tone: "text-red-500" },
    { label: "Rule Drafts", value: "3", tone: "text-amber-600" },
    { label: "Approvals", value: "91", tone: "text-emerald-600" },
  ],
  ops: [
    { label: "Pre-Auth", value: "12", tone: "text-blue-600" },
    { label: "Documents", value: "4", tone: "text-amber-600" },
    { label: "Review", value: "2", tone: "text-emerald-600" },
    { label: "At Risk", value: "1", tone: "text-red-500" },
  ],
  cashier: [
    { label: "Ready", value: "21", tone: "text-emerald-600" },
    { label: "Help Needed", value: "2", tone: "text-amber-600" },
    { label: "Declined", value: "5", tone: "text-red-500" },
    { label: "Retry", value: "3", tone: "text-blue-600" },
  ],
  finance: [
    { label: "Settlements", value: "9", tone: "text-blue-600" },
    { label: "Disputes", value: "3", tone: "text-red-500" },
    { label: "Chargebacks", value: "1", tone: "text-amber-600" },
    { label: "Reconciled", value: "97", tone: "text-emerald-600" },
  ],
  agent: [
    { label: "Demos", value: "7", tone: "text-blue-600" },
    { label: "Proposals", value: "11", tone: "text-amber-600" },
    { label: "Contracting", value: "4", tone: "text-emerald-600" },
    { label: "At Risk", value: "2", tone: "text-red-500" },
  ],
};

const onboardingTemplates: Record<AppRole, { id: string; label: string }[]> = {
  owner: [
    { id: "owner_brand", label: "Brand and portal profile configured" },
    { id: "owner_rules", label: "Tax/tip/surcharge baseline published" },
    { id: "owner_team", label: "Team roles and permissions assigned" },
    { id: "owner_report_pack", label: "Executive report pack saved" },
  ],
  ops: [
    { id: "ops_batch", label: "Batch and retry policy reviewed" },
    { id: "ops_exceptions", label: "Exception response playbook acknowledged" },
    { id: "ops_rules", label: "Workflow approvals connected" },
    { id: "ops_alerts", label: "Operational alerts configured" },
  ],
  cashier: [],
  finance: [],
  agent: [
    { id: "agent_demo", label: "Demo data profile loaded" },
    { id: "agent_roi", label: "ROI calculator configured" },
    { id: "agent_assets", label: "Sales collateral pack selected" },
    { id: "agent_handoff", label: "Implementation handoff checklist shared" },
  ],
};

const exceptionSnapshot: Record<AppRole, { total: string; summary: string; critical: string }> = {
  owner: {
    total: "7",
    summary: "Issues requiring policy or strategic review",
    critical: "2 high value declines need immediate attention",
  },
  ops: {
    total: "8",
    summary: "Operational exceptions currently open",
    critical: "1 SLA breach if TXN-7330 not resolved in 12 min",
  },
  cashier: {
    total: "2",
    summary: "Transactions blocked at point of sale",
    critical: "1 customer waiting on duplicate payment check",
  },
  finance: {
    total: "4",
    summary: "Finance queue exceptions",
    critical: "2 settlement mismatches require reconciliation",
  },
  agent: {
    total: "5",
    summary: "Prospect and onboarding risk signals",
    critical: "1 high-value prospect stalled on implementation timeline",
  },
};

const recentTransactions = [
  { id: "TXN-8F2K9", amount: "$125.00", status: "Approved", time: "2 min ago", card: "•••• 4242" },
  { id: "TXN-7G3L1", amount: "$89.99", status: "Approved", time: "5 min ago", card: "•••• 1234" },
  { id: "TXN-6H4M2", amount: "$250.00", status: "Pending", time: "8 min ago", card: "•••• 5678" },
  { id: "TXN-5I5N3", amount: "$45.00", status: "Approved", time: "12 min ago", card: "•••• 9012" },
];

interface QuickAction {
  href: string;
  label: string;
  desc: string;
  icon: typeof CreditCard;
  roles?: AppRole[];
}

const quickActions: QuickAction[] = [
  { href: "/sale", label: "Process Sale", desc: "Authorize and capture", icon: CreditCard },
  {
    href: "/exceptions",
    label: "Exception Workbench",
    desc: "Resolve declines and pending holds",
    icon: CircleAlert,
    roles: ["owner", "ops", "finance"],
  },
  {
    href: "/rules",
    label: "Rules Governance",
    desc: "Review, approve, publish",
    icon: Sparkles,
    roles: ["owner", "ops", "finance", "agent"],
  },
  {
    href: "/sales-mode",
    label: "Sales Mode",
    desc: "ROI calculator and demo profile",
    icon: Target,
    roles: ["owner", "agent"],
  },
  { href: "/reports", label: "View Reports", desc: "Analytics and exports", icon: FileText },
];

const ONBOARDING_STORAGE_KEY = "myela_onboarding_steps";

type OnboardingState = Partial<Record<AppRole, Record<string, boolean>>>;

function getInitialOnboardingState(): OnboardingState {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return value ? (JSON.parse(value) as OnboardingState) : {};
  } catch {
    return {};
  }
}

export default function Dashboard() {
  const { role } = useRole();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(getInitialOnboardingState);

  const hero = roleHero[role];
  const stats = roleStats[role];
  const queue = queueByRole[role];
  const onboardingSteps = onboardingTemplates[role];
  const snapshot = exceptionSnapshot[role];
  const currentRole = roleOptions.find((option) => option.id === role);

  const visibleActions = quickActions.filter((action) => !action.roles || action.roles.includes(role));
  const completedSteps = onboardingSteps.filter((step) => onboardingState[role]?.[step.id]).length;

  const toggleOnboarding = (stepId: string) => {
    const roleState = onboardingState[role] ?? {};
    const nextRoleState = { ...roleState, [stepId]: !roleState[stepId] };
    const nextState = { ...onboardingState, [role]: nextRoleState };

    setOnboardingState(nextState);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(nextState));
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Dashboard"
          subtitle={`${hero.subtitle} Current view: ${currentRole?.label ?? "Role"}.`}
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
              <h2 className="text-lg font-semibold text-slate-900">{hero.title}</h2>
              <p className="text-sm text-slate-500 max-w-xl">{hero.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/exceptions" className="btn btn-outline btn-sm">
              Exception Queue
            </Link>
            <Link href="/rules" className="btn btn-primary btn-sm">
              Govern Rules
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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
                    {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
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
              <MultiMetricAreaChart
                data={volumeData}
                xKey="name"
                areaKey="volume"
                areaLabel="Volume"
                lines={[{ key: "count", label: "Merchant Count", color: "#0f172a" }]}
                leftTickFormatter={(value) => `$${Math.round(value / 1000)}k`}
              />
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
                  <div className="text-sm font-semibold text-slate-900">Role Mode</div>
                  <div className="text-xs text-slate-500">{currentRole?.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div className="panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">Exception Workbench Snapshot</h3>
                <p className="text-sm text-slate-500">{snapshot.summary}</p>
              </div>
              <span className="text-3xl font-semibold text-slate-900">{snapshot.total}</span>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              {snapshot.critical}
            </div>
            <div className="mt-4">
              <Link href="/exceptions" className="btn btn-primary btn-sm">
                Open Workbench
              </Link>
            </div>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">Activation Milestones</h3>
                <p className="text-sm text-slate-500">
                  {onboardingSteps.length > 0
                    ? `${completedSteps}/${onboardingSteps.length} completed`
                    : "No onboarding milestones for this role"}
                </p>
              </div>
              {onboardingSteps.length > 0 && (
                <span className="text-sm font-semibold text-slate-700">
                  {Math.round((completedSteps / onboardingSteps.length) * 100)}%
                </span>
              )}
            </div>
            {onboardingSteps.length > 0 ? (
              <div className="space-y-2">
                {onboardingSteps.map((step) => {
                  const checked = Boolean(onboardingState[role]?.[step.id]);
                  return (
                    <label key={step.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOnboarding(step.id)}
                        className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                      />
                      <span className={`text-sm ${checked ? "text-slate-400 line-through" : "text-slate-700"}`}>
                        {step.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="text-sm text-slate-500">Role is in execution mode with no activation checklist.</div>
            )}
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
              {visibleActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 text-sm">{action.label}</div>
                      <div className="text-xs text-slate-500">{action.desc}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
