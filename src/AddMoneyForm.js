import React, { useState } from 'react';

function AddMoneyForm({ addMoney, index }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      addMoney(index, parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="number"
        className="form-control me-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-success">Add Money</button>
    </form>
  );
}

export default AddMoneyForm;
