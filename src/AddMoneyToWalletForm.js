import React, { useState } from 'react';

function AddMoneyToWalletForm({ addMoneyToWallet }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      addMoneyToWallet(parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="number"
        className="form-control me-2"
        placeholder="Amount to Wallet"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-success">Add to Wallet</button>
    </form>
  );
}

export default AddMoneyToWalletForm;
