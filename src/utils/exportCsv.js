const formatDate = (date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

const escapeCsvField = (field) => {
	const str = String(field)
	if (str.includes(',') || str.includes('"') || str.includes('\n')) {
		return `"${str.replace(/"/g, '""')}"`
	}
	return str
}

export const expensesToCsv = (expenses) => {
	const headers = ['Title', 'Category', 'Amount', 'Date']
	const rows = expenses.map((expense) => [
		expense.title,
		expense.category,
		expense.amount,
		formatDate(expense.date),
	])

	return [headers, ...rows]
		.map((row) => row.map(escapeCsvField).join(','))
		.join('\n')
}

export const downloadExpensesCsv = (expenses, filename = 'expenses.csv') => {
	const csv = expensesToCsv(expenses)
	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	link.click()
	URL.revokeObjectURL(url)
}
