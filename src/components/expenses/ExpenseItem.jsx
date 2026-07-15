import React from 'react';
import Card from '../UI/card/Card';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Button from '../UI/button/Button';

const ExpenseItem = ({ date, title, amount, category, onDeleteExpense, id }) => {
  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <div className="expense-item__info">
          <h2>{title}</h2>
          <span className="expense-item__category">{category}</span>
        </div>
        <div className="expense-item__price">${amount}</div>
      </div>
      <Button
        style={{ marginLeft: '1rem' }}
        onClick={() => {
          onDeleteExpense(id);
        }}
      >
        Delete
      </Button>
    </Card>
  );
};

export default ExpenseItem;
