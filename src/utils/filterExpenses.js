export const filterExpenses = (
	expenses,
	{ selectedYear, selectedCategory, searchTerm },
) => {
	return expenses.filter((expense) => {
		const matchesYear =
			selectedYear === 'All' ||
			expense.date.getFullYear().toString() === selectedYear

		const matchesCategory =
			selectedCategory === 'All' || expense.category === selectedCategory

		const matchesSearch =
			searchTerm.trim() === '' ||
			expense.title.toLowerCase().includes(searchTerm.toLowerCase())

		return matchesYear && matchesCategory && matchesSearch
	})
}
