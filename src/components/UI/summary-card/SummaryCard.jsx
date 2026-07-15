import React from 'react'
import Card from '../card/Card'
import './SummaryCard.css'

const SummaryCard = ({ label, value }) => {
	return (
		<Card className='summary-card'>
			<p className='summary-card__label'>{label}</p>
			<p className='summary-card__value'>{value}</p>
		</Card>
	)
}

export default SummaryCard
