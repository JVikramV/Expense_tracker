import { CATEGORIES } from '../constants/categories'

export const getCategoryTotals = (expenses) => {
	const totals = CATEGORIES.reduce((acc, category) => {
		acc[category] = 0
		return acc
	}, {})

	expenses.forEach((expense) => {
		const category = expense.category ?? 'Other'
		if (totals[category] !== undefined) {
			totals[category] += expense.amount
		} else {
			totals.Other += expense.amount
		}
	})

	return CATEGORIES.filter((category) => totals[category] > 0).map(
		(category) => ({
			category,
			total: totals[category],
		}),
	)
}
