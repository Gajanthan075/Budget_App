import { createBrowserRouter, RouterProvider } from "react-router-dom";
//toast library

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard, { dashboardAction, dashboardLoader } from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Main, { mainLoader } from "./Layouts/Main";
import { logoutAction } from "./actions/logout";
import ExpensesPage, {
  expenseAction,
  expensesLoader,
} from "./Pages/ExpensesPage";
import BudgetPage, {
  budgetLoader,
  budgetAction,
} from "../src/Pages/BudgetPage";

import DeleteBudget from "./actions/DeleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: DeleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
