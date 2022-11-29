import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewExpense } from "./NewExpense";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";

export type ExpenseData = {
  title: string;
  markdown: string;
  tags: Tag[];
  //cost: string;
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
  //cost: string;
};

function App() {
  const [expenses, setExpenses] = useLocalStorage<RawExpense[]>("EXPENSES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  //const [costs, setCosts] = useLocalStorage
  //TODO: add handling for costs

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

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="/new"
          element={<NewExpense onSubmit={onCreateExpense} />}
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
