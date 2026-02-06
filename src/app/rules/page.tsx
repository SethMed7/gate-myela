"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  FileClock,
  History,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

type WorkflowState = "draft" | "review" | "approved" | "published" | "archived";

interface RuleSet {
  id: string;
  name: string;
  version: string;
  taxRate: number;
  tipOptions: string;
  surcharge: string;
  workflow: WorkflowState;
  updatedAt: string;
  owner: string;
}

interface RuleAssignment {
  id: string;
  profile: string;
  merchantCount: number;
  ruleSet: string;
  rollout: string;
  modifiedBy: string;
}

const initialRuleSets: RuleSet[] = [
  {
    id: "RULE-101",
    name: "Restaurant Standard",
    version: "v4",
    taxRate: 8.25,
    tipOptions: "15,18,20,25",
    surcharge: "Off",
    workflow: "published",
    updatedAt: "Feb 4, 2026",
    owner: "ops@myela.com",
  },
  {
    id: "RULE-115",
    name: "Service + Convenience",
    version: "v2",
    taxRate: 7.5,
    tipOptions: "18,20,22",
    surcharge: "2.9%",
    workflow: "approved",
    updatedAt: "Feb 1, 2026",
    owner: "risk@myela.com",
  },
  {
    id: "RULE-141",
    name: "Retail Flat Pricing",
    version: "v1",
    taxRate: 0,
    tipOptions: "Off",
    surcharge: "$1.50 fixed",
    workflow: "draft",
    updatedAt: "Jan 30, 2026",
    owner: "finance@myela.com",
  },
];

const assignments: RuleAssignment[] = [
  {
    id: "ASG-44",
    profile: "Myela TAG - Gift Merchants",
    merchantCount: 34,
    ruleSet: "Restaurant Standard v4",
    rollout: "100%",
    modifiedBy: "ops@myela.com",
  },
  {
    id: "ASG-45",
    profile: "High-Ticket Services",
    merchantCount: 11,
    ruleSet: "Service + Convenience v2",
    rollout: "80%",
    modifiedBy: "risk@myela.com",
  },
];

const workflowBadge: Record<WorkflowState, string> = {
  draft: "bg-slate-100 text-slate-700",
  review: "bg-amber-50 text-amber-700",
  approved: "bg-blue-50 text-blue-700",
  published: "bg-emerald-50 text-emerald-700",
  archived: "bg-slate-200 text-slate-700",
};

function getWorkflowAction(workflow: WorkflowState) {
  switch (workflow) {
    case "draft":
      return "submit_review";
    case "review":
      return "approve";
    case "approved":
      return "publish";
    case "published":
      return "rollback";
    default:
      return null;
  }
}

function getWorkflowButtonLabel(action: string | null) {
  switch (action) {
    case "submit_review":
      return "Submit For Review";
    case "approve":
      return "Approve Rule";
    case "publish":
      return "Publish Rule";
    case "rollback":
      return "Rollback To Draft";
    default:
      return "No Action";
  }
}

export default function RulesPage() {
  const [query, setQuery] = useState("");
  const [ruleSets, setRuleSets] = useState<RuleSet[]>(initialRuleSets);
  const [selectedRuleId, setSelectedRuleId] = useState(initialRuleSets[0]?.id ?? "");
  const [historyLog, setHistoryLog] = useState<string[]>([
    "Restaurant Standard v4 published by ops@myela.com",
    "Service + Convenience v2 approved by risk@myela.com",
  ]);

  const visibleRuleSets = useMemo(() => {
    if (!query.trim()) {
      return ruleSets;
    }

    return ruleSets.filter((rule) =>
      `${rule.name} ${rule.version} ${rule.workflow}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, ruleSets]);

  const selectedRule = visibleRuleSets.find((rule) => rule.id === selectedRuleId) ?? visibleRuleSets[0] ?? null;
  const selectedAction = selectedRule ? getWorkflowAction(selectedRule.workflow) : null;

  const logEvent = (message: string) => {
    setHistoryLog((current) => [`${message} · ${new Date().toLocaleString()}`, ...current].slice(0, 6));
  };

  const cloneRule = (ruleId: string) => {
    setRuleSets((current) => {
      const source = current.find((item) => item.id === ruleId);
      if (!source) {
        return current;
      }

      const nextVersion = Number(source.version.replace("v", "")) + 1;
      const cloned: RuleSet = {
        ...source,
        id: `RULE-${Math.floor(Math.random() * 900 + 100)}`,
        version: `v${nextVersion}`,
        workflow: "draft",
        updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };

      setSelectedRuleId(cloned.id);
      logEvent(`${cloned.name} ${cloned.version} created as draft`);
      return [cloned, ...current];
    });
  };

  const runWorkflowAction = () => {
    if (!selectedRule || !selectedAction) {
      return;
    }

    const nextWorkflow: Record<string, WorkflowState> = {
      submit_review: "review",
      approve: "approved",
      publish: "published",
      rollback: "draft",
    };

    const updatedWorkflow = nextWorkflow[selectedAction];

    setRuleSets((current) =>
      current.map((item) =>
        item.id === selectedRule.id
          ? {
              ...item,
              workflow: updatedWorkflow,
              updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            }
          : item
      )
    );

    logEvent(`${selectedRule.name} ${selectedRule.version} moved to ${updatedWorkflow}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Rules Engine"
          subtitle="Versioned governance lifecycle for tax, tip, and surcharge policy changes."
          actions={
            <>
              <button className="btn btn-secondary btn-md">
                <Sparkles className="w-4 h-4" />
                AI Suggest Rules
              </button>
              <button className="btn btn-primary btn-md">
                <Plus className="w-4 h-4" />
                New Rule Set
              </button>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Published</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">
              {ruleSets.filter((rule) => rule.workflow === "published").length}
            </div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">In Approval Flow</div>
            <div className="text-3xl font-semibold text-amber-600 mt-1">
              {ruleSets.filter((rule) => rule.workflow === "review" || rule.workflow === "approved").length}
            </div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Assigned Merchants</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">
              {assignments.reduce((sum, assignment) => sum + assignment.merchantCount, 0)}
            </div>
          </div>
          <div className="panel p-5">
            <div className="text-sm text-slate-500">Rollback Ready</div>
            <div className="text-3xl font-semibold text-blue-600 mt-1">
              {ruleSets.filter((rule) => rule.workflow === "published").length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-5">
          <div className="panel overflow-hidden">
            <div className="panel-header flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">Rule Set Library</h3>
                <p className="text-sm text-slate-500">Governed lifecycle with reusable versions</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search rule set"
                  className="input-base pl-9 w-64"
                />
              </div>
            </div>
            <div className="table-wrap">
              <table className="w-full">
                <thead className="bg-slate-50/60">
                  <tr>
                    <th className="px-6 py-4 table-head">Rule Set</th>
                    <th className="px-6 py-4 table-head">Tax</th>
                    <th className="px-6 py-4 table-head">Tips</th>
                    <th className="px-6 py-4 table-head">Surcharge</th>
                    <th className="px-6 py-4 table-head">Workflow</th>
                    <th className="px-6 py-4 table-head">Updated</th>
                    <th className="px-6 py-4 table-head text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleRuleSets.map((rule) => (
                    <tr
                      key={rule.id}
                      onClick={() => setSelectedRuleId(rule.id)}
                      className={`cursor-pointer hover:bg-slate-50/60 ${
                        selectedRule?.id === rule.id ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{rule.name}</div>
                        <div className="text-xs text-slate-500">{rule.id} · {rule.version}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{rule.taxRate}%</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{rule.tipOptions}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{rule.surcharge}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${workflowBadge[rule.workflow]}`}>
                          {rule.workflow.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{rule.updatedAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="btn-icon" aria-label="Clone rule" onClick={() => cloneRule(rule.id)}>
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="btn-icon" aria-label="Open rule detail">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-5">
            {selectedRule && (
              <>
                <div className="panel p-5">
                  <h3 className="font-semibold text-slate-900">{selectedRule.name} {selectedRule.version}</h3>
                  <p className="text-sm text-slate-500 mt-1">Owner: {selectedRule.owner}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-2">
                      <div className="text-xs text-slate-500">Tax</div>
                      <div className="font-semibold text-slate-900">{selectedRule.taxRate}%</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-2">
                      <div className="text-xs text-slate-500">Tip</div>
                      <div className="font-semibold text-slate-900">{selectedRule.tipOptions}</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-2">
                      <div className="text-xs text-slate-500">Surcharge</div>
                      <div className="font-semibold text-slate-900">{selectedRule.surcharge}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="btn btn-secondary btn-sm" onClick={() => cloneRule(selectedRule.id)}>
                      <Copy className="w-4 h-4" />
                      Clone
                    </button>
                    {selectedAction && (
                      <button className="btn btn-primary btn-sm" onClick={runWorkflowAction}>
                        <CheckCircle2 className="w-4 h-4" />
                        {getWorkflowButtonLabel(selectedAction)}
                      </button>
                    )}
                  </div>
                </div>

                <div className="panel p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Workflow Checklist</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <FileClock className="w-4 h-4 mt-0.5 text-slate-500" />
                      Draft created and validated
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 ${selectedRule.workflow === "review" || selectedRule.workflow === "approved" || selectedRule.workflow === "published" ? "text-emerald-600" : "text-slate-300"}`} />
                      Reviewer assigned
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 ${selectedRule.workflow === "approved" || selectedRule.workflow === "published" ? "text-emerald-600" : "text-slate-300"}`} />
                      Risk/finance approval complete
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 ${selectedRule.workflow === "published" ? "text-emerald-600" : "text-slate-300"}`} />
                      Published to assigned cohorts
                    </li>
                  </ul>
                </div>

                <div className="panel p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Compliance Signal</h3>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex gap-2">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Surcharge edits must be reviewed before publish in regulated states.
                  </div>
                  <button className="btn btn-outline btn-sm mt-3">
                    <RotateCcw className="w-4 h-4" />
                    Create Rollback Draft
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-5">
          <div className="panel overflow-hidden">
            <div className="panel-header">
              <h3 className="font-semibold text-slate-900">Assignments by Merchant Profile</h3>
              <p className="text-sm text-slate-500">Control rollout scope and ownership</p>
            </div>
            <div className="table-wrap">
              <table className="w-full">
                <thead className="bg-slate-50/60">
                  <tr>
                    <th className="px-6 py-4 table-head">Profile</th>
                    <th className="px-6 py-4 table-head">Merchants</th>
                    <th className="px-6 py-4 table-head">Assigned Rule Set</th>
                    <th className="px-6 py-4 table-head">Rollout</th>
                    <th className="px-6 py-4 table-head">Modified By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 font-semibold text-slate-900">{assignment.profile}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                          <Users className="w-4 h-4 text-slate-400" />
                          {assignment.merchantCount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                          <Tag className="w-4 h-4 text-slate-400" />
                          {assignment.ruleSet}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700">
                          {assignment.rollout}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{assignment.modifiedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end">
              <button className="btn btn-primary btn-sm">
                <CheckCircle2 className="w-4 h-4" />
                Publish Assignment Changes
              </button>
            </div>
          </div>

          <div className="panel p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Workflow History</h3>
            <div className="space-y-3">
              {historyLog.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <History className="w-4 h-4 mt-0.5 text-slate-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
