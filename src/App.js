import React, { useState, useEffect } from 'react';
import JarList from './JarList';
import JarForm from './JarForm';
import Modal from './Modal';

function App() {
  const [jars, setJars] = useState([]);
  const [totalAdded, setTotalAdded] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedJars = JSON.parse(localStorage.getItem('jars'));
    if (savedJars) {
      setJars(savedJars);
      // Calculate total amount added from saved jars
      const total = savedJars.reduce((sum, jar) => sum + jar.currentBalance, 0);
      setTotalAdded(total);
    }
    if (!savedJars || savedJars.length === 0) {
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jars', JSON.stringify(jars));
    // Update total added money whenever jars change
    const total = jars.reduce((sum, jar) => sum + jar.currentBalance, 0);
    setTotalAdded(total);
  }, [jars]);

  const addJar = (name, targetAmount) => {
    const newJar = { name, targetAmount, currentBalance: 0 };
    setJars([...jars, newJar]);
    setIsModalOpen(false);
  };

  const addMoney = (index, amount) => {
    const updatedJars = jars.map((jar, i) =>
      i === index ? { ...jar, currentBalance: jar.currentBalance + amount } : jar
    );
    setJars(updatedJars);
  };

  const deleteJar = (index) => {
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
        <div className="total-added">
          Total Added: ${totalAdded.toFixed(2)}
        </div>
      </header>
      <button className="btn btn-primary mb-3" onClick={handleAddJarClick}>
        Add Jar
      </button>
      <JarList jars={jars} addMoney={addMoney} deleteJar={deleteJar} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <JarForm addJar={addJar} />
      </Modal>
    </div>
  );
}

export default App;
