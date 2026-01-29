"use client";

import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";

const pendingAuths = [
  { id: "TXN-789012345", date: "Jan 28, 2026", amount: "$150.00", card: "•••• 4242" },
  { id: "TXN-789012346", date: "Jan 28, 2026", amount: "$89.99", card: "•••• 1234" },
  { id: "TXN-789012347", date: "Jan 27, 2026", amount: "$250.00", card: "•••• 5678" },
];

export default function CapturePage() {
  return (
    <>
      <Header title="Capture" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionForm
            type="capture"
            title="Capture Authorization"
            description="Capture funds from a previously authorized transaction."
            submitLabel="Capture Funds"
            showCardFields={false}
            showTransactionId={true}
          />

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Pending Authorizations</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-600 border-b border-slate-200">
                    <th className="pb-3 font-medium">Transaction ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Card</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAuths.map((auth) => (
                    <tr key={auth.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 text-sm font-mono text-slate-700">{auth.id}</td>
                      <td className="py-3 text-sm text-slate-600">{auth.date}</td>
                      <td className="py-3 text-sm font-medium text-slate-800">{auth.amount}</td>
                      <td className="py-3 text-sm text-slate-600">{auth.card}</td>
                      <td className="py-3">
                        <button className="px-3 py-1.5 bg-[#3b82f6] text-white text-xs font-medium rounded-lg hover:bg-[#2563eb] transition-colors">
                          Capture
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
