import React from 'react'
import './Select.css'

const Select = ({ label, id, value, onChange, children }) => {
	return (
		<div className='select'>
			<label className='select__label' htmlFor={id}>
				{label}
			</label>
			<select id={id} className='select__control' value={value} onChange={onChange}>
				{children}
			</select>
		</div>
	)
}

export default Select
