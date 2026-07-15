import React from 'react'
import FormInput from '../UI/input/FormInput'
import Select from '../UI/select/Select'
import { CATEGORIES } from '../../constants/categories'
import './ExpensesFilter.css'

const ExpensesFilter = ({
	selectedYear,
	onSelectedYearChange,
	selectedCategory,
	onSelectedCategoryChange,
	searchTerm,
	onSearchChange,
}) => {
	return (
		<div className='expenses-filter'>
			<div className='expenses-filter__control'>
				<FormInput
					label='Search by title'
					type='text'
					value={searchTerm}
					onChange={onSearchChange}
					placeholder='Search expenses...'
				/>
			</div>
			<div className='expenses-filter__control'>
				<Select
					label='Filter by category'
					id='category-filter'
					value={selectedCategory}
					onChange={onSelectedCategoryChange}
				>
					<option value='All'>All</option>
					{CATEGORIES.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</Select>
			</div>
			<div className='expenses-filter__control'>
				<Select
					label='Filter by year'
					id='year-filter'
					value={selectedYear}
					onChange={onSelectedYearChange}
				>
					<option value='2023'>2025</option>
					<option value='2022'>2024</option>
					<option value='2021'>2023</option>
					<option value='2020'>2022</option>
					<option value='All'>All</option>
				</Select>
			</div>
		</div>
	)
}

export default ExpensesFilter
