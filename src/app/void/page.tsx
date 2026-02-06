"use client";

import PageHeader from "@/components/PageHeader";
import TransactionForm from "@/components/TransactionForm";

const unsettledTxns = [
  { id: "TXN-789012348", date: "Jan 29, 2026", type: "Sale", amount: "$75.00", card: "•••• 9012" },
  { id: "TXN-789012349", date: "Jan 29, 2026", type: "Auth", amount: "$120.00", card: "•••• 3456" },
];

export default function VoidPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-shell)]">
      <div className="page-shell">
        <PageHeader
          title="Void"
          subtitle="Void unsettled transactions before they are captured."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionForm
            type="void"
            title="Void Transaction"
            description="Void a transaction before it settles. Only unsettled transactions can be voided."
            submitLabel="Void Transaction"
            showCardFields={false}
            showTransactionId={true}
            showReason={true}
            isDanger={true}
          />

          <div className="panel overflow-hidden">
            <div className="panel-header">
              <h3 className="font-semibold text-slate-900">Recent Unsettled Transactions</h3>
              <p className="text-sm text-slate-500">Only unsettled items are eligible for void.</p>
            </div>
            <div className="panel-body overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                    <th className="py-3 px-2">Transaction ID</th>
                    <th className="py-3 px-2">Date</th>
                    <th className="py-3 px-2">Type</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Card</th>
                    <th className="py-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unsettledTxns.map((txn) => (
                    <tr key={txn.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 px-2 text-sm font-mono text-slate-700">{txn.id}</td>
                      <td className="py-3 px-2 text-sm text-slate-600">{txn.date}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            txn.type === "Sale"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm font-medium text-slate-800">{txn.amount}</td>
                      <td className="py-3 px-2 text-sm text-slate-600">{txn.card}</td>
                      <td className="py-3 px-2 text-right">
                        <button className="btn btn-danger btn-sm">Void</button>
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
