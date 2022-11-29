import { ExpenseData } from "./App";
import { ExpenseForm } from "./ExpenseForm";

type NewExpenseProps = {
  onSubmit: (data: ExpenseData) => void;
};

export function NewExpense({ onSubmit }: NewExpenseProps) {
  //New note
  return (
    <>
      <h1 className="mb-4">Create a new expense</h1>
      <ExpenseForm onSubmit={onSubmit} />
    </>
  );
}
