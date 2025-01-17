export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));
//colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchdata("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};
//local storage functions
export const fetchdata = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
//Get all items
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchdata(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//delete item
export const deleteItem = ({ key, id }) => {
  const existingData = fetchdata(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

//create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchdata("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchdata("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

//delete item

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchdata("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

//formatting
export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};

//formatting percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigit: 0,
  });
};
//format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
