"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface TransactionFormProps {
  type: "sale" | "authorize" | "capture" | "refund" | "void";
  title: string;
  description: string;
  submitLabel: string;
  showCardFields?: boolean;
  showTransactionId?: boolean;
  showReason?: boolean;
  isDanger?: boolean;
}

export default function TransactionForm({
  type,
  title,
  description,
  submitLabel,
  showCardFields = true,
  showTransactionId = false,
  showReason = false,
  isDanger = false,
}: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    amount: "",
    currency: "USD",
    transactionId: "",
    reason: "",
    description: "",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        cardNumber: "",
        expiry: "",
        cvv: "",
        amount: "",
        currency: "USD",
        transactionId: "",
        reason: "",
        description: "",
      });
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Transaction Successful
          </h3>
          <p className="text-slate-600 mb-4">
            {type === "sale" && "The sale has been processed successfully."}
            {type === "authorize" && "The authorization has been approved."}
            {type === "capture" && "The funds have been captured successfully."}
            {type === "refund" && "The refund has been processed successfully."}
            {type === "void" && "The transaction has been voided successfully."}
          </p>
          <div className="inline-block bg-slate-100 rounded-lg px-4 py-2 font-mono text-sm text-slate-700">
            TXN-{Math.random().toString(36).substring(2, 11).toUpperCase()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <p className="text-slate-600 mt-1">{description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {showTransactionId && (
          <div className="mb-6">
            <h3 className="font-medium text-slate-800 mb-4">Transaction Details</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Transaction ID
                </label>
                <input
                  type="text"
                  placeholder="TXN-123456789"
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {showCardFields && (
          <div className="mb-6">
            <h3 className="font-medium text-slate-800 mb-4">Card Information</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4111 1111 1111 1111"
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cardNumber: formatCardNumber(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={formData.expiry}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cvv: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-medium text-slate-800 mb-4">
            {showTransactionId ? "Amount" : "Transaction Details"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {type === "refund" ? "Refund Amount" : type === "capture" ? "Capture Amount" : "Amount"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: e.target.value.replace(/[^\d.]/g, ""),
                    })
                  }
                  className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent bg-white"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          {!showTransactionId && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description (Optional)
              </label>
              <input
                type="text"
                placeholder="Order #12345"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
            </div>
          )}
        </div>

        {showReason && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Reason (Optional)
            </label>
            <select
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent bg-white"
            >
              <option value="">Select a reason...</option>
              <option value="customer_request">Customer Request</option>
              <option value="duplicate">Duplicate Transaction</option>
              <option value="return">Product Return</option>
              <option value="fraud">Fraud Suspected</option>
              <option value="error">Entered in Error</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors disabled:opacity-50 ${
              isDanger
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#3b82f6] hover:bg-[#2563eb]"
            }`}
          >
            {isSubmitting ? "Processing..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
