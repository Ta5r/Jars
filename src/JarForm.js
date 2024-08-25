import React, { useState } from 'react';
import './JarForm.css'; // Import custom CSS for additional styling

function JarForm({ addJar }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && targetAmount) {
      addJar(name, parseFloat(targetAmount));
      setName('');
      setTargetAmount('');
    }
  };

  return (
    <div className="jar-form-container">
      <h2 className="jar-form-title">Add a New Jar</h2>
      <form onSubmit={handleSubmit} className="jar-form">
        <div className="form-group">
          <label htmlFor="jarName" className="form-label">Jar Name</label>
          <input
            id="jarName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter jar name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetAmount" className="form-label">Target Amount</label>
          <input
            id="targetAmount"
            type="number"
            className="form-control"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Enter target amount"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Add Jar</button>
      </form>
    </div>
  );
}

export default JarForm;
