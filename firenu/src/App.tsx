import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewExpense } from "./NewExpense";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { ExpenseList } from "./ExpenseList";

export type ExpenseData = {
  title: string;
  markdown: string;
  tags: Tag[];
  cost: string;
  oneTimePayment: boolean;
  paid: boolean;
};

export type Tag = {
  id: string;
  label: string;
};

export type Expense = {
  id: string;
} & ExpenseData;

export type RawExpense = {
  id: string;
} & RawExpenseData;

export type RawExpenseData = {
  title: string;
  markdown: string;
  tagIds: string[];
  cost: string;
  oneTimePayment: boolean;
  paid: boolean;
};

function App() {
  const [expenses, setExpenses] = useLocalStorage<RawExpense[]>("EXPENSES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const expensesWithTags = useMemo(() => {
    return expenses.map((expense) => {
      return {
        ...expense,
        tags: tags.filter((tag) => expense.tagIds.includes(tag.id)),
      };
    });
  }, [expenses, tags]);

  function onCreateExpense({ tags, ...data }: ExpenseData) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route
          path="/new"
          element={
            <NewExpense
              onSubmit={onCreateExpense}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
