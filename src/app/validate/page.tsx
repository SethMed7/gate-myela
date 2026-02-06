import PageHeader from "@/components/PageHeader";
import TransactionForm from "@/components/TransactionForm";
import { BadgeCheck, ShieldCheck, CreditCard } from "lucide-react";

export default function ValidatePage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Validate Card"
          subtitle="Verify card details with a $0 authorization before running a charge."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
          <TransactionForm
            type="validate"
            title="Validate Card"
            description="Verify a card with a $0 authorization. No funds are captured."
            submitLabel="Validate Card"
          />

          <div className="panel p-6">
            <h3 className="font-semibold text-slate-900">Validation Checklist</h3>
            <p className="text-sm text-slate-500 mt-1">
              Quick checks to confirm card readiness before running the transaction.
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <BadgeCheck className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Confirm billing ZIP matches the statement.</span>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>Use CVV whenever available for stronger verification.</span>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-4 h-4 text-slate-500 mt-0.5" />
                <span>Validation does not guarantee capture success.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
