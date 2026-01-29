"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  Plus,
  Search,
  MoreHorizontal,
  X,
  Calendar,
  DollarSign,
  Repeat,
  CheckCircle,
  Pause,
  Play,
  Trash2,
  Edit2,
  Users,
  Clock,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  billingDay?: number;
  features: string[];
  subscribers: number;
  status: "active" | "archived";
}

interface Subscription {
  id: string;
  customer: string;
  customerEmail: string;
  plan: string;
  amount: string;
  status: "active" | "paused" | "cancelled";
  nextBilling: string;
  startDate: string;
}

const initialPlans: Plan[] = [
  {
    id: "PLAN-001",
    name: "Starter",
    description: "Perfect for small businesses",
    price: 29,
    interval: "monthly",
    features: ["Up to 100 transactions/mo", "Basic reporting", "Email support"],
    subscribers: 45,
    status: "active",
  },
  {
    id: "PLAN-002",
    name: "Professional",
    description: "For growing businesses",
    price: 99,
    interval: "monthly",
    features: ["Unlimited transactions", "Advanced analytics", "Priority support", "API access"],
    subscribers: 128,
    status: "active",
  },
  {
    id: "PLAN-003",
    name: "Enterprise",
    description: "Custom solutions for large teams",
    price: 299,
    interval: "monthly",
    billingDay: 1,
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    subscribers: 23,
    status: "active",
  },
  {
    id: "PLAN-004",
    name: "Annual Basic",
    description: "Yearly billing with discount",
    price: 290,
    interval: "yearly",
    features: ["Up to 100 transactions/mo", "Basic reporting", "Email support", "2 months free"],
    subscribers: 67,
    status: "active",
  },
];

const initialSubscriptions: Subscription[] = [
  {
    id: "SUB-001",
    customer: "John Smith",
    customerEmail: "john.smith@example.com",
    plan: "Professional",
    amount: "$99.00",
    status: "active",
    nextBilling: "Feb 1, 2026",
    startDate: "Jan 1, 2025",
  },
  {
    id: "SUB-002",
    customer: "Acme Corp",
    customerEmail: "billing@acme.com",
    plan: "Enterprise",
    amount: "$299.00",
    status: "active",
    nextBilling: "Feb 1, 2026",
    startDate: "Jun 15, 2024",
  },
  {
    id: "SUB-003",
    customer: "Tech Startup Inc",
    customerEmail: "accounts@techstartup.io",
    plan: "Professional",
    amount: "$99.00",
    status: "paused",
    nextBilling: "—",
    startDate: "Sep 1, 2025",
  },
  {
    id: "SUB-004",
    customer: "Design Co",
    customerEmail: "finance@design.co",
    plan: "Starter",
    amount: "$29.00",
    status: "active",
    nextBilling: "Feb 5, 2026",
    startDate: "Dec 5, 2025",
  },
];

const statusConfig = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
  paused: { bg: "bg-amber-50", text: "text-amber-700", icon: Pause },
  cancelled: { bg: "bg-red-50", text: "text-red-700", icon: X },
};

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "plans">("subscriptions");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [planFormData, setPlanFormData] = useState({
    name: "",
    description: "",
    price: "",
    interval: "monthly",
    billingDay: "",
    features: "",
  });
  const [subFormData, setSubFormData] = useState({
    customer: "",
    customerEmail: "",
    planId: "",
    startDate: "",
  });

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPlan: Plan = {
      id: `PLAN-${String(plans.length + 1).padStart(3, "0")}`,
      name: planFormData.name,
      description: planFormData.description,
      price: parseFloat(planFormData.price),
      interval: planFormData.interval,
      billingDay: planFormData.billingDay ? parseInt(planFormData.billingDay) : undefined,
      features: planFormData.features.split("\n").filter((f) => f.trim()),
      subscribers: 0,
      status: "active",
    };

    setPlans([...plans, newPlan]);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowPlanModal(false);
      setPlanFormData({
        name: "",
        description: "",
        price: "",
        interval: "monthly",
        billingDay: "",
        features: "",
      });
    }, 1500);
  };

  const handleCreateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const selectedPlan = plans.find((p) => p.id === subFormData.planId);

    const newSubscription: Subscription = {
      id: `SUB-${String(subscriptions.length + 1).padStart(3, "0")}`,
      customer: subFormData.customer,
      customerEmail: subFormData.customerEmail,
      plan: selectedPlan?.name || "",
      amount: `$${selectedPlan?.price.toFixed(2)}`,
      status: "active",
      nextBilling: new Date(
        new Date(subFormData.startDate).getTime() + 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      startDate: new Date(subFormData.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setSubscriptions([newSubscription, ...subscriptions]);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowSubModal(false);
      setSubFormData({
        customer: "",
        customerEmail: "",
        planId: "",
        startDate: "",
      });
    }, 1500);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all";

  const mrr = subscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + parseFloat(s.amount.replace("$", "")), 0);

  return (
    <>
      <Header title="Subscriptions" subtitle="Manage plans and recurring billing" />
      <div className="flex-1 p-6 overflow-auto bg-slate-50/50">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#0D0D0D] to-[#1a1a1a] rounded-2xl p-5 text-white">
            <div className="text-sm font-medium text-white/60">Monthly Recurring Revenue</div>
            <div className="text-3xl font-bold mt-1">${mrr.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Active Subscriptions</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">
              {subscriptions.filter((s) => s.status === "active").length}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Active Plans</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">
              {plans.filter((p) => p.status === "active").length}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Avg. Subscription Value</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">
              ${subscriptions.length > 0 ? (mrr / subscriptions.filter((s) => s.status === "active").length).toFixed(0) : 0}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200/60">
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "subscriptions"
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab("plans")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "plans"
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Plans
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
              />
            </div>
            <button
              onClick={() => (activeTab === "plans" ? setShowPlanModal(true) : setShowSubModal(true))}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 btn-press"
            >
              <Plus className="w-5 h-5" />
              {activeTab === "plans" ? "Create Plan" : "New Subscription"}
            </button>
          </div>
        </div>

        {activeTab === "subscriptions" ? (
          /* Subscriptions List */
          <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Next Billing</th>
                    <th className="px-6 py-4">Started</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscriptions.map((sub) => {
                    const StatusIcon = statusConfig[sub.status].icon;
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-slate-900">{sub.customer}</div>
                            <div className="text-xs text-slate-500">{sub.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                            {sub.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900">{sub.amount}</span>
                          <span className="text-slate-400 text-sm">/mo</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg ${
                              statusConfig[sub.status].bg
                            } ${statusConfig[sub.status].text}`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{sub.nextBilling}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-500">{sub.startDate}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {sub.status === "active" ? (
                              <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                                <Pause className="w-4 h-4" />
                              </button>
                            ) : sub.status === "paused" ? (
                              <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                                <Play className="w-4 h-4" />
                              </button>
                            ) : null}
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Plans Grid */
          <div className="grid grid-cols-3 gap-6">
            {plans
              .filter((p) => p.status === "active")
              .map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:border-[#3B82F6]/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{plan.name}</h3>
                      <p className="text-sm text-slate-500">{plan.description}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500">/{plan.interval}</span>
                    {plan.billingDay && (
                      <div className="text-xs text-slate-400 mt-1">
                        Bills on day {plan.billingDay} of each month
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users className="w-4 h-4" />
                      {plan.subscribers} subscribers
                    </div>
                    <span className="text-xs font-medium text-slate-400 uppercase">{plan.interval}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Create Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Plan Created</h3>
                <p className="text-slate-500">The plan has been created successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Create Plan</h2>
                  <button
                    onClick={() => setShowPlanModal(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreatePlan} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Plan Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={planFormData.name}
                      onChange={(e) => setPlanFormData({ ...planFormData, name: e.target.value })}
                      className={inputClasses}
                      placeholder="e.g., Professional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={planFormData.description}
                      onChange={(e) =>
                        setPlanFormData({ ...planFormData, description: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="Brief description of the plan"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          $
                        </span>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={planFormData.price}
                          onChange={(e) => setPlanFormData({ ...planFormData, price: e.target.value })}
                          className={`${inputClasses} pl-8`}
                          placeholder="99.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Billing Interval *
                      </label>
                      <select
                        value={planFormData.interval}
                        onChange={(e) =>
                          setPlanFormData({ ...planFormData, interval: e.target.value })
                        }
                        className={inputClasses}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Billing Day <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="28"
                      value={planFormData.billingDay}
                      onChange={(e) =>
                        setPlanFormData({ ...planFormData, billingDay: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="Day of month (1-28)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Features <span className="text-slate-400 font-normal">(One per line)</span>
                    </label>
                    <textarea
                      value={planFormData.features}
                      onChange={(e) =>
                        setPlanFormData({ ...planFormData, features: e.target.value })
                      }
                      className={`${inputClasses} h-24 resize-none`}
                      placeholder="Unlimited transactions&#10;Advanced analytics&#10;Priority support"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowPlanModal(false)}
                      className="px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Create Plan"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* New Subscription Modal */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Subscription Created</h3>
                <p className="text-slate-500">The subscription is now active.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">New Subscription</h2>
                  <button
                    onClick={() => setShowSubModal(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateSubscription} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={subFormData.customer}
                      onChange={(e) => setSubFormData({ ...subFormData, customer: e.target.value })}
                      className={inputClasses}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={subFormData.customerEmail}
                      onChange={(e) =>
                        setSubFormData({ ...subFormData, customerEmail: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Select Plan *
                    </label>
                    <select
                      required
                      value={subFormData.planId}
                      onChange={(e) => setSubFormData({ ...subFormData, planId: e.target.value })}
                      className={inputClasses}
                    >
                      <option value="">Choose a plan...</option>
                      {plans
                        .filter((p) => p.status === "active")
                        .map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name} - ${plan.price}/{plan.interval}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={subFormData.startDate}
                      onChange={(e) => setSubFormData({ ...subFormData, startDate: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowSubModal(false)}
                      className="px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Create Subscription"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
