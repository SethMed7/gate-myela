"use client";

import { useState } from "react";
import { CheckCircle, CreditCard, Lock, ArrowRight, Loader2 } from "lucide-react";

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

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 page-transition">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 mb-6 ring-8 ring-emerald-50/50">
            <CheckCircle className="w-10 h-10" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Transaction Successful
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            {type === "sale" && "The sale has been processed and funds captured."}
            {type === "authorize" && "The authorization has been approved."}
            {type === "capture" && "The funds have been captured successfully."}
            {type === "refund" && "The refund has been processed successfully."}
            {type === "void" && "The transaction has been voided."}
          </p>
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-3 font-mono text-sm">
            <span className="text-slate-400">ID:</span>
            TXN-{Math.random().toString(36).substring(2, 11).toUpperCase()}
          </div>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden page-transition">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-1 text-sm">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {showTransactionId && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-slate-100">
                <CreditCard className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Transaction Details</h3>
            </div>
            <div>
              <label className={labelClasses}>Transaction ID</label>
              <input
                type="text"
                placeholder="TXN-123456789"
                value={formData.transactionId}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId: e.target.value })
                }
                className={`${inputClasses} font-mono`}
                required
              />
            </div>
          </div>
        )}

        {showCardFields && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-slate-100">
                <CreditCard className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Card Information</h3>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
                <Lock className="w-3 h-3" />
                Secured
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Card Number</label>
                <div className="relative">
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
                    className={`${inputClasses} font-mono tracking-wider`}
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Expiry Date</label>
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
                    className={`${inputClasses} font-mono text-center tracking-widest`}
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>CVV</label>
                  <input
                    type="text"
                    placeholder="•••"
                    maxLength={4}
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cvv: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className={`${inputClasses} font-mono text-center tracking-widest`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-slate-100">
              <span className="text-slate-600 font-bold text-sm">$</span>
            </div>
            <h3 className="font-semibold text-slate-800">
              {showTransactionId ? "Amount" : "Transaction Details"}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>
                {type === "refund" ? "Refund Amount" : type === "capture" ? "Capture Amount" : "Amount"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
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
                  className={`${inputClasses} pl-8 font-mono text-lg`}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Currency</label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className={inputClasses}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
          </div>

          {!showTransactionId && (
            <div className="mt-4">
              <label className={labelClasses}>
                Description <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Order #12345 or invoice reference"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={inputClasses}
              />
            </div>
          )}
        </div>

        {showReason && (
          <div className="mb-6">
            <label className={labelClasses}>
              Reason <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <select
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className={inputClasses}
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

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-50 btn-press ${
              isDanger
                ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
                : "bg-[#3B82F6] hover:bg-[#2563eb] shadow-lg shadow-blue-500/20"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {submitLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
