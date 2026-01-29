"use client";

import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";

const unsettledTxns = [
  { id: "TXN-789012348", date: "Jan 29, 2026", type: "Sale", amount: "$75.00", card: "•••• 9012" },
  { id: "TXN-789012349", date: "Jan 29, 2026", type: "Auth", amount: "$120.00", card: "•••• 3456" },
];

export default function VoidPage() {
  return (
    <>
      <Header title="Void" />
      <div className="flex-1 p-6 overflow-auto">
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

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Recent Unsettled Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-600 border-b border-slate-200">
                    <th className="pb-3 font-medium">Transaction ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Card</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unsettledTxns.map((txn) => (
                    <tr key={txn.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 text-sm font-mono text-slate-700">{txn.id}</td>
                      <td className="py-3 text-sm text-slate-600">{txn.date}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                          txn.type === "Sale"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-3 text-sm font-medium text-slate-800">{txn.amount}</td>
                      <td className="py-3 text-sm text-slate-600">{txn.card}</td>
                      <td className="py-3">
                        <button className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors">
                          Void
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
