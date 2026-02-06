import PageHeader from "@/components/PageHeader";
import TransactionForm from "@/components/TransactionForm";
import { CheckCircle2, ShieldCheck, Wallet } from "lucide-react";

export default function SalePage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Sale"
          subtitle="Authorize and capture funds in a single, secure transaction."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
          <TransactionForm
            type="sale"
            title="Process Sale"
            description="Complete a sale transaction by authorizing and capturing funds in a single step."
            submitLabel="Process Sale"
            showPaymentMethodToggle={true}
          />

          <div className="panel p-6">
            <h3 className="font-semibold text-slate-900">Before You Submit</h3>
            <p className="text-sm text-slate-500 mt-1">
              Ensure the payment details match the customer&apos;s billing information.
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Double-check the amount and currency.</span>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>Use AVS/CVV for additional verification.</span>
              </div>
              <div className="flex items-start gap-3">
                <Wallet className="w-4 h-4 text-slate-500 mt-0.5" />
                <span>ACH payments typically settle in 1-2 business days.</span>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Tip
              </div>
              <p className="text-sm text-slate-600 mt-2">
                For large tickets, run a $1 authorization first to confirm the card status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
