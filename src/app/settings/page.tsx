"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  Building2,
  Percent,
  HandCoins,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  ChevronRight,
  Shield,
  Bell,
  Users,
  Wallet,
  X,
} from "lucide-react";

interface SupportRequest {
  id: string;
  type: string;
  status: "pending" | "in_progress" | "completed";
  date: string;
  description: string;
}

const initialRequests: SupportRequest[] = [
  {
    id: "REQ-001",
    type: "Bank Account Update",
    status: "in_progress",
    date: "Jan 25, 2026",
    description: "Update routing number to ****4567",
  },
  {
    id: "REQ-002",
    type: "Bank Account Verification",
    status: "completed",
    date: "Jan 15, 2026",
    description: "Verify new bank account ending in ****8901",
  },
];

const statusConfig = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
  in_progress: { bg: "bg-blue-50", text: "text-blue-700", icon: AlertCircle },
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("payment");
  const [requests, setRequests] = useState<SupportRequest[]>(initialRequests);
  const [showBankModal, setShowBankModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bankFormData, setBankFormData] = useState({
    bankName: "",
    accountType: "checking",
    routingNumber: "",
    accountNumber: "",
    accountName: "",
  });

  const [settings, setSettings] = useState({
    // Tax settings
    taxEnabled: true,
    taxRate: "8.25",
    taxIncluded: false,
    // Tip settings
    tipEnabled: true,
    defaultTip: "18",
    tipOptions: "15,18,20,25",
    tipOnTax: false,
    // Surcharge settings
    surchargeEnabled: false,
    surchargeRate: "3.0",
    surchargeType: "percentage",
  });

  const handleBankRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newRequest: SupportRequest = {
      id: `REQ-${String(requests.length + 1).padStart(3, "0")}`,
      type: "Bank Account Update",
      status: "pending",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      description: `Update to ${bankFormData.bankName} account ending in ****${bankFormData.accountNumber.slice(-4)}`,
    };

    setRequests([newRequest, ...requests]);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowBankModal(false);
      setBankFormData({
        bankName: "",
        accountType: "checking",
        routingNumber: "",
        accountNumber: "",
        accountName: "",
      });
    }, 2000);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all";

  const tabs = [
    { id: "payment", label: "Payment Settings", icon: CreditCard },
    { id: "banking", label: "Bank Account", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "team", label: "Team", icon: Users },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <>
      <Header title="Settings" subtitle="Configure your gateway preferences" />
      <div className="flex-1 flex overflow-hidden bg-slate-50/50">
        {/* Settings Sidebar */}
        <div className="w-64 bg-white border-r border-slate-200/60 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "payment" && (
            <div className="max-w-2xl space-y-6">
              {/* Tax Settings */}
              <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50">
                    <Percent className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Tax Settings</h3>
                    <p className="text-sm text-slate-500">Configure tax calculation</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Enable Tax</div>
                      <div className="text-sm text-slate-500">Add tax to transactions</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.taxEnabled}
                        onChange={(e) =>
                          setSettings({ ...settings, taxEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                    </label>
                  </div>
                  {settings.taxEnabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tax Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={settings.taxRate}
                          onChange={(e) =>
                            setSettings({ ...settings, taxRate: e.target.value })
                          }
                          className={`${inputClasses} max-w-[150px]`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900">Tax Included in Price</div>
                          <div className="text-sm text-slate-500">
                            Prices already include tax
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.taxIncluded}
                            onChange={(e) =>
                              setSettings({ ...settings, taxIncluded: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Tip Settings */}
              <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50">
                    <HandCoins className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Tip Settings</h3>
                    <p className="text-sm text-slate-500">Configure tipping options</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Enable Tipping</div>
                      <div className="text-sm text-slate-500">Allow customers to add tips</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.tipEnabled}
                        onChange={(e) =>
                          setSettings({ ...settings, tipEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                    </label>
                  </div>
                  {settings.tipEnabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Default Tip (%)
                        </label>
                        <input
                          type="number"
                          value={settings.defaultTip}
                          onChange={(e) =>
                            setSettings({ ...settings, defaultTip: e.target.value })
                          }
                          className={`${inputClasses} max-w-[150px]`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tip Options (comma separated)
                        </label>
                        <input
                          type="text"
                          value={settings.tipOptions}
                          onChange={(e) =>
                            setSettings({ ...settings, tipOptions: e.target.value })
                          }
                          className={inputClasses}
                          placeholder="15,18,20,25"
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          Percentages shown to customers
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900">Calculate Tip on Tax</div>
                          <div className="text-sm text-slate-500">
                            Include tax in tip calculation
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.tipOnTax}
                            onChange={(e) =>
                              setSettings({ ...settings, tipOnTax: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Surcharge Settings */}
              <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-50">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Surcharge Settings</h3>
                    <p className="text-sm text-slate-500">Configure processing surcharges</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Enable Surcharge</div>
                      <div className="text-sm text-slate-500">
                        Add surcharge to card transactions
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.surchargeEnabled}
                        onChange={(e) =>
                          setSettings({ ...settings, surchargeEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3B82F6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                    </label>
                  </div>
                  {settings.surchargeEnabled && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Surcharge Rate
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={settings.surchargeRate}
                            onChange={(e) =>
                              setSettings({ ...settings, surchargeRate: e.target.value })
                            }
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Type
                          </label>
                          <select
                            value={settings.surchargeType}
                            onChange={(e) =>
                              setSettings({ ...settings, surchargeType: e.target.value })
                            }
                            className={inputClasses}
                          >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount ($)</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-800">
                            <strong>Important:</strong> Surcharging credit cards is regulated. Ensure
                            compliance with card network rules and state laws before enabling.
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button className="px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20">
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "banking" && (
            <div className="max-w-2xl space-y-6">
              {/* Current Bank Account */}
              <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#3B82F6]/10">
                      <Building2 className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Bank Account</h3>
                      <p className="text-sm text-slate-500">Your connected bank account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBankModal(true)}
                    className="px-4 py-2 text-sm font-semibold text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-xl transition-all"
                  >
                    Request Update
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Chase Business Checking</div>
                      <div className="text-sm text-slate-500">Account ending in ****4523</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-700">Verified</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4">
                    Bank account changes require verification and are processed through our support
                    team for security purposes.
                  </p>
                </div>
              </div>

              {/* Support Requests */}
              <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Recent Requests</h3>
                </div>
                {requests.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {requests.map((request) => {
                      const StatusIcon = statusConfig[request.status].icon;
                      return (
                        <div
                          key={request.id}
                          className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2 rounded-xl ${statusConfig[request.status].bg}`}
                            >
                              <StatusIcon
                                className={`w-5 h-5 ${statusConfig[request.status].text}`}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{request.type}</div>
                              <div className="text-sm text-slate-500">{request.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg ${
                                statusConfig[request.status].bg
                              } ${statusConfig[request.status].text}`}
                            >
                              {request.status.replace("_", " ").charAt(0).toUpperCase() +
                                request.status.replace("_", " ").slice(1)}
                            </span>
                            <div className="text-xs text-slate-400 mt-1">{request.date}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500">No recent requests</div>
                )}
              </div>
            </div>
          )}

          {(activeTab === "notifications" ||
            activeTab === "team" ||
            activeTab === "security") && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {activeTab === "notifications" && <Bell className="w-8 h-8 text-slate-400" />}
                  {activeTab === "team" && <Users className="w-8 h-8 text-slate-400" />}
                  {activeTab === "security" && <Shield className="w-8 h-8 text-slate-400" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Coming Soon</h3>
                <p className="text-slate-500">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings will be
                  available in a future update.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bank Update Request Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            {showSuccess ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Submitted</h3>
                <p className="text-slate-500">
                  Our support team will review your request and contact you within 1-2 business
                  days.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Request Bank Account Update</h2>
                  <button
                    onClick={() => setShowBankModal(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleBankRequest} className="p-6 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        For security, bank account changes are processed by our support team. Your
                        request will be reviewed within 1-2 business days.
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bankFormData.bankName}
                      onChange={(e) =>
                        setBankFormData({ ...bankFormData, bankName: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="Chase Bank"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Account Type *
                    </label>
                    <select
                      value={bankFormData.accountType}
                      onChange={(e) =>
                        setBankFormData({ ...bankFormData, accountType: e.target.value })
                      }
                      className={inputClasses}
                    >
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bankFormData.accountName}
                      onChange={(e) =>
                        setBankFormData({ ...bankFormData, accountName: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="Business Name LLC"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Routing Number *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={9}
                        value={bankFormData.routingNumber}
                        onChange={(e) =>
                          setBankFormData({
                            ...bankFormData,
                            routingNumber: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className={`${inputClasses} font-mono`}
                        placeholder="021000021"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankFormData.accountNumber}
                        onChange={(e) =>
                          setBankFormData({
                            ...bankFormData,
                            accountNumber: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className={`${inputClasses} font-mono`}
                        placeholder="123456789"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowBankModal(false)}
                      className="px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Submitting..." : "Submit Request"}
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
