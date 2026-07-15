import React, { useState } from 'react';
import FormInput from '../UI/input/FormInput';
import Select from '../UI/select/Select';
import Button from '../UI/button/Button';
import { CATEGORIES, DEFAULT_CATEGORY } from '../../constants/categories';
import './ExpenseForm.css';

const ExpenseForm = ({ onCloseForm, onAddNewExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const isFormValid =
    title.trim().length !== 0 &&
    amount.trim().length !== 0 &&
    date.trim().length !== 0;

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setDate(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const expense = {
        date: new Date(date),
        title,
        amount: Number(amount),
        category,
        id: Date.now().toString(),
      };
      onAddNewExpense(expense);

      setTitle('');
      setAmount('');
      setDate('');
      setCategory(DEFAULT_CATEGORY);
      onCloseForm();
    } else {
      alert('Заполните все поля!');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <FormInput
          label={'Name'}
          type="text"
          onChange={titleChangeHandler}
          value={title}
        />
        <FormInput
          label={'Price'}
          inputType="number"
          value={amount}
          onChange={amountChangeHandler}
        />
        <FormInput
          label={'Date'}
          inputType="date"
          onChange={dateChangeHandler}
          value={date}
        />
        <Select
          label="Category"
          id="category"
          value={category}
          onChange={categoryChangeHandler}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>
      <div className="new-expense__actions">
        <Button type="button" onClick={onCloseForm}>
          Cancel
        </Button>
        <Button type="submit">Add Expenses</Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
