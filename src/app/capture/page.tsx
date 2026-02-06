"use client";

import PageHeader from "@/components/PageHeader";
import TransactionForm from "@/components/TransactionForm";

const pendingAuths = [
  { id: "TXN-789012345", date: "Jan 28, 2026", amount: "$150.00", card: "•••• 4242" },
  { id: "TXN-789012346", date: "Jan 28, 2026", amount: "$89.99", card: "•••• 1234" },
  { id: "TXN-789012347", date: "Jan 27, 2026", amount: "$250.00", card: "•••• 5678" },
];

export default function CapturePage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Capture"
          subtitle="Capture funds from a previously authorized transaction."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionForm
            type="capture"
            title="Capture Authorization"
            description="Capture funds from a previously authorized transaction."
            submitLabel="Capture Funds"
            showCardFields={false}
            showTransactionId={true}
          />

          <div className="panel overflow-hidden">
            <div className="panel-header">
              <h3 className="font-semibold text-slate-900">Pending Authorizations</h3>
              <p className="text-sm text-slate-500">Capture within the authorization window.</p>
            </div>
            <div className="panel-body overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                    <th className="py-3 px-2">Transaction ID</th>
                    <th className="py-3 px-2">Date</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Card</th>
                    <th className="py-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAuths.map((auth) => (
                    <tr key={auth.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 px-2 text-sm font-mono text-slate-700">{auth.id}</td>
                      <td className="py-3 px-2 text-sm text-slate-600">{auth.date}</td>
                      <td className="py-3 px-2 text-sm font-medium text-slate-800">{auth.amount}</td>
                      <td className="py-3 px-2 text-sm text-slate-600">{auth.card}</td>
                      <td className="py-3 px-2 text-right">
                        <button className="btn btn-primary btn-sm">Capture</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
