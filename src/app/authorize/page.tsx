import PageHeader from "@/components/PageHeader";
import TransactionForm from "@/components/TransactionForm";
import { Clock3, ShieldCheck, Lock } from "lucide-react";

export default function AuthorizePage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Authorize"
          subtitle="Place a hold on funds now and capture later when you&apos;re ready."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
          <TransactionForm
            type="authorize"
            title="Authorize Transaction"
            description="Authorize funds without capturing. Capture later to complete the transaction."
            submitLabel="Authorize"
          />

          <div className="panel p-6">
            <h3 className="font-semibold text-slate-900">Authorization Notes</h3>
            <p className="text-sm text-slate-500 mt-1">
              Authorizations typically remain valid for 7 days, depending on the card network.
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Clock3 className="w-4 h-4 text-amber-500 mt-0.5" />
                <span>Capture within the authorized window to avoid declines.</span>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>Use AVS and CVV to reduce chargeback risk.</span>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-slate-500 mt-0.5" />
                <span>Never store full card numbers in notes or exports.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
