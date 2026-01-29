import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";

export default function SalePage() {
  return (
    <>
      <Header title="Sale" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl">
          <TransactionForm
            type="sale"
            title="Process Sale"
            description="Complete a sale transaction by authorizing and capturing funds in a single step."
            submitLabel="Process Sale"
          />
        </div>
      </div>
    </>
  );
}
