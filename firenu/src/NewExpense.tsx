import { ExpenseData, Tag } from "./App";
import { ExpenseForm } from "./ExpenseForm";

type NewExpenseProps = {
  onSubmit: (data: ExpenseData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewExpense({
  onSubmit,
  onAddTag,
  availableTags,
}: NewExpenseProps) {
  //New note
  return (
    <>
      <h1 className="mb-4">Create a new expense</h1>
      <ExpenseForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
