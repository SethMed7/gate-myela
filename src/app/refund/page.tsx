import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";

export default function RefundPage() {
  return (
    <>
      <Header title="Refund" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl">
          <TransactionForm
            type="refund"
            title="Process Refund"
            description="Refund a previously captured transaction. Full or partial refunds supported."
            submitLabel="Process Refund"
            showCardFields={false}
            showTransactionId={true}
            showReason={true}
          />
        </div>
      </div>
    </>
  );
}
