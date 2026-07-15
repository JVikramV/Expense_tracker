export const getExpenseStats = (expenses) => {
	if (expenses.length === 0) {
		return {
			total: 0,
			count: 0,
			highest: null,
			average: 0,
		}
	}

	const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
	const count = expenses.length
	const highest = expenses.reduce((max, expense) =>
		expense.amount > max.amount ? expense : max,
	)
	const average = total / count

	return { total, count, highest, average }
}
