import React, { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut } from 'react-chartjs-2'
import { getCategoryTotals } from '../../utils/categoryTotals'
import './ExpensesPieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const CATEGORY_COLORS = {
	Food: '#4a90d9',
	Shopping: '#096dc5',
	Bills: '#2c5f8a',
	Entertainment: '#6ba3e0',
	Transport: '#1a4a7a',
	Other: '#8eb8e8',
}

const centerTextPlugin = {
	id: 'centerText',
	beforeDraw(chart) {
		const dataset = chart.data.datasets[0]
		if (!dataset?.data?.length) return

		const total = dataset.data.reduce((sum, value) => sum + value, 0)
		const { left, right, top, bottom } = chart.chartArea
		const centerX = (left + right) / 2
		const centerY = (top + bottom) / 2
		const isMobile = chart.width < 400
		const { ctx } = chart

		ctx.save()
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = '#1a3a5c'

		ctx.font = `bold ${isMobile ? 10 : 12}px sans-serif`
		ctx.fillText('Total Spending', centerX, centerY - (isMobile ? 10 : 14))

		ctx.font = `bold ${isMobile ? 14 : 18}px sans-serif`
		ctx.fillText(`$${total.toFixed(2)}`, centerX, centerY + (isMobile ? 8 : 10))
		ctx.restore()
	},
}

const ExpensesPieChart = ({ expenses }) => {
	const categoryTotals = getCategoryTotals(expenses)

	const totalSpending = useMemo(
		() => categoryTotals.reduce((sum, { total }) => sum + total, 0),
		[categoryTotals],
	)

	const chartData = useMemo(
		() => ({
			labels: categoryTotals.map(({ category }) => category),
			datasets: [
				{
					data: categoryTotals.map(({ total }) => total),
					backgroundColor: categoryTotals.map(
						({ category }) => CATEGORY_COLORS[category],
					),
					borderColor: '#dfe6ff',
					borderWidth: 2,
					hoverBorderColor: '#1a3a5c',
					hoverBorderWidth: 3,
				},
			],
		}),
		[categoryTotals],
	)

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			cutout: '58%',
			animation: {
				animateRotate: true,
				animateScale: true,
				duration: 1000,
				easing: 'easeOutQuart',
			},
			plugins: {
				legend: {
					position: 'bottom',
					labels: {
						color: '#1a3a5c',
						font: { weight: 'bold', size: 12 },
						padding: 14,
						boxWidth: 14,
					},
				},
				tooltip: {
					backgroundColor: '#1a3a5c',
					titleColor: '#ffffff',
					bodyColor: '#dfe6ff',
					borderColor: '#096dc5',
					borderWidth: 1,
					padding: 12,
					callbacks: {
						title: (items) => items[0].label,
						label: (context) => {
							const value = context.parsed
							const percentage = ((value / totalSpending) * 100).toFixed(1)
							return [
								`Amount: $${value.toFixed(2)}`,
								`Share: ${percentage}%`,
							]
						},
					},
				},
				datalabels: {
					color: '#ffffff',
					font: {
						weight: 'bold',
						size: 11,
					},
					formatter: (value) => {
						const percentage = ((value / totalSpending) * 100).toFixed(1)
						return `${percentage}%`
					},
					display: (context) => {
						const value = context.dataset.data[context.dataIndex]
						return (value / totalSpending) * 100 >= 4
					},
					anchor: 'center',
					align: 'center',
				},
			},
		}),
		[totalSpending],
	)

	if (categoryTotals.length === 0) {
		return (
			<div className='expenses-pie-chart'>
				<h2 className='expenses-pie-chart__title'>Spending by Category</h2>
				<p className='expenses-pie-chart__fallback'>No expense data to display</p>
			</div>
		)
	}

	return (
		<div className='expenses-pie-chart'>
			<h2 className='expenses-pie-chart__title'>Spending by Category</h2>
			<div className='expenses-pie-chart__canvas'>
				<Doughnut
					data={chartData}
					options={chartOptions}
					plugins={[centerTextPlugin]}
				/>
			</div>
		</div>
	)
}

export default ExpensesPieChart
