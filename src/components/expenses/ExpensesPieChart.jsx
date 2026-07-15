import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { getCategoryTotals } from '../../utils/categoryTotals'
import './ExpensesPieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const CATEGORY_COLORS = {
	Food: '#4a90d9',
	Shopping: '#096dc5',
	Bills: '#2c5f8a',
	Entertainment: '#6ba3e0',
	Transport: '#1a4a7a',
	Other: '#8eb8e8',
}

const ExpensesPieChart = ({ expenses }) => {
	const categoryTotals = getCategoryTotals(expenses)

	if (categoryTotals.length === 0) {
		return (
			<div className='expenses-pie-chart'>
				<h2 className='expenses-pie-chart__title'>Spending by Category</h2>
				<p className='expenses-pie-chart__fallback'>No expense data to display</p>
			</div>
		)
	}

	const data = {
		labels: categoryTotals.map(({ category }) => category),
		datasets: [
			{
				data: categoryTotals.map(({ total }) => total),
				backgroundColor: categoryTotals.map(
					({ category }) => CATEGORY_COLORS[category],
				),
				borderColor: '#dfe6ff',
				borderWidth: 2,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					color: '#1a3a5c',
					font: { weight: 'bold' },
					padding: 16,
				},
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const value = context.parsed
						return ` $${value.toFixed(2)}`
					},
				},
			},
		},
	}

	return (
		<div className='expenses-pie-chart'>
			<h2 className='expenses-pie-chart__title'>Spending by Category</h2>
			<div className='expenses-pie-chart__canvas'>
				<Pie data={data} options={options} />
			</div>
		</div>
	)
}

export default ExpensesPieChart
