import PageHeader from "@/components/PageHeader";
import TransactionForm from "@/components/TransactionForm";
import { RotateCcw, AlertTriangle, FileText } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Refund"
          subtitle="Issue partial or full refunds for settled transactions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
          <TransactionForm
            type="refund"
            title="Process Refund"
            description="Refund a previously captured transaction. Full or partial refunds supported."
            submitLabel="Process Refund"
            showCardFields={false}
            showTransactionId={true}
            showReason={true}
          />

          <div className="panel p-6">
            <h3 className="font-semibold text-slate-900">Refund Guidance</h3>
            <p className="text-sm text-slate-500 mt-1">
              Refunds are typically processed back to the original payment method.
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>Partial refunds can be issued multiple times until the full amount is returned.</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                <span>Refund timing depends on the issuing bank (typically 3-7 days).</span>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-slate-500 mt-0.5" />
                <span>Include a clear reason to simplify reconciliation.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
