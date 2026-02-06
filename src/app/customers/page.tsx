"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Plus,
  Search,
  Mail,
  Phone,
  CreditCard,
  Edit2,
  Trash2,
  X,
  User,
  Building,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  cardLast4?: string;
  cardBrand?: string;
  totalSpent: string;
  transactions: number;
  createdAt: string;
}

const initialCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    company: "Acme Corp",
    cardLast4: "4242",
    cardBrand: "Visa",
    totalSpent: "$12,450.00",
    transactions: 47,
    createdAt: "Jan 15, 2026",
  },
  {
    id: "CUS-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    cardLast4: "1234",
    cardBrand: "Mastercard",
    totalSpent: "$8,230.50",
    transactions: 32,
    createdAt: "Jan 18, 2026",
  },
  {
    id: "CUS-003",
    name: "Michael Chen",
    email: "m.chen@techstartup.io",
    phone: "(555) 345-6789",
    company: "Tech Startup Inc",
    address: "123 Innovation Way, San Francisco, CA",
    cardLast4: "5678",
    cardBrand: "Amex",
    totalSpent: "$24,100.00",
    transactions: 89,
    createdAt: "Jan 10, 2026",
  },
  {
    id: "CUS-004",
    name: "Emily Davis",
    email: "emily.d@design.co",
    phone: "(555) 456-7890",
    company: "Design Co",
    totalSpent: "$3,450.00",
    transactions: 12,
    createdAt: "Jan 22, 2026",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length && i < 16; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newCustomer: Customer = {
      id: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || undefined,
      address: formData.address || undefined,
      cardLast4: formData.cardNumber.slice(-4),
      cardBrand: "Visa",
      totalSpent: "$0.00",
      transactions: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
      });
    }, 1500);
  };

  const inputClasses = "input-base";

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Customers"
          subtitle="Manage your customer database and saved payment methods."
          actions={
            <>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-base pl-9 w-full sm:w-64"
                />
              </div>
              <button onClick={() => setShowModal(true)} className="btn btn-primary btn-md">
                <Plus className="w-4 h-4" />
                Add Customer
              </button>
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="panel p-5">
            <div className="text-sm font-medium text-slate-500">Total Customers</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">{customers.length}</div>
          </div>
          <div className="panel p-5">
            <div className="text-sm font-medium text-slate-500">With Payment Method</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">
              {customers.filter((c) => c.cardLast4).length}
            </div>
          </div>
          <div className="panel p-5">
            <div className="text-sm font-medium text-slate-500">Total Revenue</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">$48,230</div>
          </div>
          <div className="panel p-5">
            <div className="text-sm font-medium text-slate-500">Avg. Transaction</div>
            <div className="text-3xl font-semibold text-slate-900 mt-1">$268</div>
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="panel-header">
            <h3 className="font-semibold text-slate-900">All Customers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/60">
                <tr>
                  <th className="px-6 py-4 table-head">Customer</th>
                  <th className="px-6 py-4 table-head">Contact</th>
                  <th className="px-6 py-4 table-head">Payment Method</th>
                  <th className="px-6 py-4 table-head">Total Spent</th>
                  <th className="px-6 py-4 table-head">Transactions</th>
                  <th className="px-6 py-4 table-head">Created</th>
                  <th className="px-6 py-4 table-head text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-soft)] flex items-center justify-center">
                          <User className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{customer.name}</div>
                          {customer.company && (
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {customer.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {customer.phone}
                        </div>
                        {customer.address && (
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <MapPin className="w-3 h-3" />
                            {customer.address}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {customer.cardLast4 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-[8px] text-white flex items-center justify-center font-bold">
                            {customer.cardBrand?.toUpperCase().slice(0, 4)}
                          </div>
                          <span className="text-sm text-slate-600 font-mono">
                            •••• {customer.cardLast4}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">No card on file</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{customer.totalSpent}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{customer.transactions}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{customer.createdAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="btn-icon" aria-label="Charge customer">
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <button className="btn-icon" aria-label="Edit customer">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="btn-icon hover:text-red-500" aria-label="Delete customer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Customer Added</h3>
                <p className="text-slate-500">The customer has been added successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h2 className="text-xl font-semibold text-slate-900">Add New Customer</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-icon"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-4 h-4 text-slate-400" />
                      <h3 className="font-semibold text-slate-800">Basic Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClasses}
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClasses}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputClasses}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Company <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputClasses}
                          placeholder="Acme Corp"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Address <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className={inputClasses}
                          placeholder="123 Main St, City, State ZIP"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      <h3 className="font-semibold text-slate-800">Payment Method</h3>
                      <span className="text-xs text-slate-400">(Optional)</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })
                          }
                          className={`${inputClasses} font-mono`}
                          placeholder="4111 1111 1111 1111"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={(e) =>
                              setFormData({ ...formData, cardExpiry: formatExpiry(e.target.value) })
                            }
                            className={`${inputClasses} font-mono`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={formData.cardCvv}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardCvv: e.target.value.replace(/\\D/g, "").slice(0, 4),
                              })
                            }
                            className={`${inputClasses} font-mono`}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn btn-outline btn-md"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-md">
                      {isSubmitting ? "Adding..." : "Add Customer"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
