import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Jar Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Target Amount</label>
        <input
          type="number"
          className="form-control"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Add Jar</button>
    </form>
  );
}

export default JarForm;
