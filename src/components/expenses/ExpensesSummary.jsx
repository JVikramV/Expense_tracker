import React from 'react'
import SummaryCard from '../UI/summary-card/SummaryCard'
import { getExpenseStats } from '../../utils/expenseStats'
import './ExpensesSummary.css'

const formatCurrency = (amount) => `$${amount.toFixed(2)}`

const ExpensesSummary = ({ expenses }) => {
	const { total, count, highest, average } = getExpenseStats(expenses)

	const highestValue = highest
		? `${highest.title} — ${formatCurrency(highest.amount)}`
		: 'N/A'

	return (
		<div className='expenses-summary'>
			<SummaryCard label='Total Expenses' value={formatCurrency(total)} />
			<SummaryCard label='Number of Expenses' value={count} />
			<SummaryCard label='Highest Expense' value={highestValue} />
			<SummaryCard label='Average Expense' value={formatCurrency(average)} />
		</div>
	)
}

export default ExpensesSummary
