import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";

export default function AuthorizePage() {
  return (
    <>
      <Header title="Authorize" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl">
          <TransactionForm
            type="authorize"
            title="Authorize Transaction"
            description="Authorize funds without capturing. Capture later to complete the transaction."
            submitLabel="Authorize"
          />
        </div>
      </div>
    </>
  );
}
