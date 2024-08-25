import React, { useState, useEffect } from 'react';
import JarList from './JarList';
import JarForm from './JarForm';
import Modal from './Modal';
import AddMoneyToWalletForm from './AddMoneyToWalletForm';

function App() {
  const [jars, setJars] = useState([]);
  const [totalAdded, setTotalAdded] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedJars = JSON.parse(localStorage.getItem('jars'));
    const savedWalletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
    
    if (savedJars) {
      setJars(savedJars);
      const total = savedJars.reduce((sum, jar) => sum + jar.currentBalance, 0);
      setTotalAdded(total);
    }

    if (!savedJars || savedJars.length === 0) {
      setIsModalOpen(true);
    }

    setWalletBalance(savedWalletBalance);
  }, []);

  useEffect(() => {
    localStorage.setItem('jars', JSON.stringify(jars));
    const total = jars.reduce((sum, jar) => sum + jar.currentBalance, 0);
    setTotalAdded(total);
  }, [jars]);

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance);
  }, [walletBalance]);

  const addJar = (name, targetAmount) => {
    const newJar = { name, targetAmount, currentBalance: 0 };
    setJars([...jars, newJar]);
    setIsModalOpen(false);
  };

  const addMoneyToWallet = (amount) => {
    setWalletBalance(walletBalance + amount);
  };

  const addMoney = (index, amount) => {
    const jar = jars[index];
    const neededAmount = jar.targetAmount - jar.currentBalance;
    
    if (neededAmount > 0) {
      const amountToAdd = Math.min(amount, neededAmount);

      if (amountToAdd <= walletBalance) {
        const updatedJars = jars.map((jar, i) =>
          i === index ? { ...jar, currentBalance: jar.currentBalance + amountToAdd } : jar
        );
        setJars(updatedJars);
        setWalletBalance(walletBalance - amountToAdd);
      } else {
        alert('Insufficient wallet balance');
      }
    } else {
      alert('Jar is already fully funded');
    }
  };

  const deleteJar = (index) => {
    const jarToDelete = jars[index];
    const updatedJars = jars.filter((_, i) => i !== index);
    
    // Move the jar's current balance back to the wallet
    setWalletBalance(walletBalance + jarToDelete.currentBalance);
    
    setJars(updatedJars);
  };

  const completeJar = (index) => {
    const updatedJars = jars.filter((_, i) => i !== index);
    setJars(updatedJars);
  };

  const handleAddJarClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Jar Saver</h1>
        <div className="wallet-and-total">
          <div className="total-added">
            Total Added: ${totalAdded.toFixed(2)}
          </div>
          <div className="wallet-balance">
            Wallet Balance: ${walletBalance.toFixed(2)}
          </div>
        </div>
        <AddMoneyToWalletForm addMoneyToWallet={addMoneyToWallet} />
      </header>
      <button className="btn btn-primary mb-3" onClick={handleAddJarClick}>
        Add Jar
      </button>
      <JarList jars={jars} addMoney={addMoney} deleteJar={deleteJar} completeJar={completeJar} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <JarForm addJar={addJar} />
      </Modal>
    </div>
  );
}

export default App;
