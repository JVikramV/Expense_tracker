import React, { useState } from 'react'
import ExpenseList from './ExpenseList'
import Card from '../UI/card/Card'
import ExpensesFilter from './ExpensesFilter'
import ExpensesSummary from './ExpensesSummary'
import ExpensesPieChart from './ExpensesPieChart'
import './Expenses.css'
import ExpensesChart from './ExpensesChart'
import { filterExpenses } from '../../utils/filterExpenses'
import { downloadExpensesCsv } from '../../utils/exportCsv'
import Button from '../UI/button/Button'

const Expenses = ({ expenses = [], onDeleteExpense }) => {
	const [selectedYear, setSelectedYear] = useState('All')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [searchTerm, setSearchTerm] = useState('')

	const selectedYearChangeHandler = (e) => {
		setSelectedYear(e.target.value)
	}

	const selectedCategoryChangeHandler = (e) => {
		setSelectedCategory(e.target.value)
	}

	const searchChangeHandler = (e) => {
		setSearchTerm(e.target.value)
	}

	const filteredExpenses = filterExpenses(expenses, {
		selectedYear,
		selectedCategory,
		searchTerm,
	})

	const exportCsvHandler = () => {
		downloadExpensesCsv(filteredExpenses)
	}

	return (
		<Card className='expenses'>
			<ExpensesFilter
				selectedYear={selectedYear}
				onSelectedYearChange={selectedYearChangeHandler}
				selectedCategory={selectedCategory}
				onSelectedCategoryChange={selectedCategoryChangeHandler}
				searchTerm={searchTerm}
				onSearchChange={searchChangeHandler}
			/>
			<div className='expenses__export'>
				<Button
					onClick={exportCsvHandler}
					disabled={filteredExpenses.length === 0}
				>
					Export CSV
				</Button>
			</div>
			<ExpensesSummary expenses={filteredExpenses} />
			<ExpensesPieChart expenses={filteredExpenses} />
			<ExpensesChart expenses={filteredExpenses} />
			<ExpenseList
				onDeleteExpense={onDeleteExpense}
				expenses={filteredExpenses}
			/>
		</Card>
	)
}

export default Expenses
