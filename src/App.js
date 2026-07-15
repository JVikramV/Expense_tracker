import { useState } from 'react'
import Expenses from './components/expenses/Expenses'
import NewExpense from './components/new-expense/NewExpense'
import { DEFAULT_CATEGORY } from './constants/categories'

const EXPENSES = [
	{
		id: 'e1',
		title: 'Food',
		amount: 94.12,
		date: new Date(2023, 7, 14),
		category: 'Food',
	},
	{
		id: 'e2',
		title: 'Playstation 5',
		amount: 799.49,
		date: new Date(2022, 2, 12),
		category: 'Shopping',
	},
	{
		id: 'e3',
		title: 'Car Insurance',
		amount: 294.67,
		date: new Date(2021, 2, 28),
		category: 'Bills',
	},
	{
		id: 'e4',
		title: 'New Desk (Wooden)',
		amount: 450,
		date: new Date(2020, 5, 12),
		category: 'Shopping',
	},
]

const normalizeExpenses = (expenses) =>
	expenses.map((expense) => ({
		...expense,
		category: expense.category ?? DEFAULT_CATEGORY,
	}))

function App() {
	const [expenses, setExpenses] = useState(normalizeExpenses(EXPENSES))

	const addNewExpenseHandler = (newExpense = {}) => {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, normalizeExpenses([newExpense])[0]]
		})
	}

	const deleteExpenseByIdHandler = (id) => {
		setExpenses((prevExpenses) =>
			prevExpenses.filter((expense) => expense.id !== id),
		)
	}

	return (
		<div>
			<NewExpense onAddNewExpense={addNewExpenseHandler} />
			<Expenses
				expenses={expenses}
				onDeleteExpense={deleteExpenseByIdHandler}
			/>
		</div>
	)
}

export default App
