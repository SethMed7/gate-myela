"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
  Plus,
  Search,
  Send,
  Download,
  MoreHorizontal,
  X,
  User,
  Calendar,
  DollarSign,
  Repeat,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Eye,
} from "lucide-react";

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

interface Invoice {
  id: string;
  customer: string;
  customerEmail: string;
  amount: string;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  isRecurring: boolean;
  recurringInterval?: string;
  items: InvoiceItem[];
  createdAt: string;
}

const initialInvoices: Invoice[] = [
  {
    id: "INV-001",
    customer: "John Smith",
    customerEmail: "john.smith@example.com",
    amount: "$1,250.00",
    status: "paid",
    dueDate: "Jan 25, 2026",
    isRecurring: false,
    items: [{ description: "Consulting Services", quantity: 10, rate: 125 }],
    createdAt: "Jan 15, 2026",
  },
  {
    id: "INV-002",
    customer: "Acme Corp",
    customerEmail: "billing@acme.com",
    amount: "$3,500.00",
    status: "sent",
    dueDate: "Feb 1, 2026",
    isRecurring: true,
    recurringInterval: "Monthly",
    items: [{ description: "Monthly Retainer", quantity: 1, rate: 3500 }],
    createdAt: "Jan 20, 2026",
  },
  {
    id: "INV-003",
    customer: "Tech Startup Inc",
    customerEmail: "accounts@techstartup.io",
    amount: "$8,750.00",
    status: "overdue",
    dueDate: "Jan 20, 2026",
    isRecurring: false,
    items: [
      { description: "Development Services", quantity: 50, rate: 150 },
      { description: "Project Management", quantity: 10, rate: 125 },
    ],
    createdAt: "Jan 10, 2026",
  },
  {
    id: "INV-004",
    customer: "Design Co",
    customerEmail: "finance@design.co",
    amount: "$500.00",
    status: "draft",
    dueDate: "Feb 5, 2026",
    isRecurring: true,
    recurringInterval: "Weekly",
    items: [{ description: "Weekly Design Support", quantity: 1, rate: 500 }],
    createdAt: "Jan 28, 2026",
  },
];

const statusConfig = {
  draft: { bg: "bg-slate-100", text: "text-slate-700", icon: Clock },
  sent: { bg: "bg-blue-50", text: "text-blue-700", icon: Send },
  paid: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
  overdue: { bg: "bg-red-50", text: "text-red-700", icon: AlertCircle },
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", quantity: 1, rate: 0 }]);
  const [formData, setFormData] = useState({
    customer: "",
    customerEmail: "",
    dueDate: "",
    isRecurring: false,
    recurringInterval: "monthly",
  });

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newInvoice: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      customer: formData.customer,
      customerEmail: formData.customerEmail,
      amount: `$${calculateTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      status: "draft",
      dueDate: new Date(formData.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isRecurring: formData.isRecurring,
      recurringInterval: formData.isRecurring
        ? formData.recurringInterval.charAt(0).toUpperCase() + formData.recurringInterval.slice(1)
        : undefined,
      items,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setInvoices([newInvoice, ...invoices]);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
      setFormData({
        customer: "",
        customerEmail: "",
        dueDate: "",
        isRecurring: false,
        recurringInterval: "monthly",
      });
      setItems([{ description: "", quantity: 1, rate: 0 }]);
    }, 1500);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all";

  return (
    <>
      <Header title="Invoices" subtitle="Create and manage invoices" />
      <div className="flex-1 p-6 overflow-auto bg-slate-50/50">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 btn-press"
          >
            <Plus className="w-5 h-5" />
            Create Invoice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Total Outstanding</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">$12,250</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Paid This Month</div>
            <div className="text-3xl font-bold text-emerald-600 mt-1">$28,450</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Overdue</div>
            <div className="text-3xl font-bold text-red-600 mt-1">$8,750</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="text-sm font-medium text-slate-500">Recurring Active</div>
            <div className="text-3xl font-bold text-[#3B82F6] mt-1">
              {invoices.filter((i) => i.isRecurring).length}
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">All Invoices</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((invoice) => {
                  const StatusIcon = statusConfig[invoice.status].icon;
                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-slate-900">
                          {invoice.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-slate-900">{invoice.customer}</div>
                          <div className="text-xs text-slate-500">{invoice.customerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900">{invoice.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg ${
                            statusConfig[invoice.status].bg
                          } ${statusConfig[invoice.status].text}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{invoice.dueDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        {invoice.isRecurring ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 text-purple-700">
                            <Repeat className="w-3.5 h-3.5" />
                            {invoice.recurringInterval}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">One-time</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          {invoice.status === "draft" && (
                            <button className="p-2 text-slate-400 hover:text-[#3B82F6] hover:bg-blue-50 rounded-lg transition-all">
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
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
      </div>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Invoice Created</h3>
                <p className="text-slate-500">The invoice has been created as a draft.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900">Create Invoice</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-4 h-4 text-slate-400" />
                      <h3 className="font-semibold text-slate-800">Customer Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Customer Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.customer}
                          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
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
                          value={formData.customerEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, customerEmail: e.target.value })
                          }
                          className={inputClasses}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <h3 className="font-semibold text-slate-800">Line Items</h3>
                      </div>
                      <button
                        type="button"
                        onClick={addItem}
                        className="text-sm font-medium text-[#3B82F6] hover:text-[#2563eb]"
                      >
                        + Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateItem(index, "description", e.target.value)}
                            className={`${inputClasses} flex-1`}
                          />
                          <input
                            type="number"
                            required
                            min="1"
                            placeholder="Qty"
                            value={item.quantity || ""}
                            onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                            className={`${inputClasses} w-20 text-center`}
                          />
                          <div className="relative w-32">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              $
                            </span>
                            <input
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              placeholder="Rate"
                              value={item.rate || ""}
                              onChange={(e) => updateItem(index, "rate", parseFloat(e.target.value) || 0)}
                              className={`${inputClasses} pl-7`}
                            />
                          </div>
                          <div className="w-24 text-right font-semibold text-slate-900">
                            ${(item.quantity * item.rate).toFixed(2)}
                          </div>
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
                      <div className="text-right">
                        <span className="text-sm text-slate-500">Total</span>
                        <div className="text-2xl font-bold text-slate-900">
                          ${calculateTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Due Date & Recurring */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <h3 className="font-semibold text-slate-800">Schedule</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Due Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dueDate}
                          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Billing Type
                        </label>
                        <div className="flex items-center gap-4 py-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.isRecurring}
                              onChange={(e) =>
                                setFormData({ ...formData, isRecurring: e.target.checked })
                              }
                              className="w-4 h-4 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                            />
                            <span className="text-sm text-slate-700">Make this recurring</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {formData.isRecurring && (
                      <div className="mt-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Recurring Interval
                        </label>
                        <select
                          value={formData.recurringInterval}
                          onChange={(e) =>
                            setFormData({ ...formData, recurringInterval: e.target.value })
                          }
                          className={inputClasses}
                        >
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Create Invoice"}
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
