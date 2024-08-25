import React, { useState, useEffect } from 'react';
import JarList from './JarList';
import JarForm from './JarForm';

function App() {
	const [jars, setJars] = useState([]);

	// Load jars from localStorage on initial render
	useEffect(() => {
		const savedJars = JSON.parse(localStorage.getItem('jars'));
		if (savedJars) {
			setJars(savedJars);
		}
	}, []);

	// Save jars to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem('jars', JSON.stringify(jars));
	}, [jars]);

	const addJar = (name, targetAmount) => {
		const newJar = { name, targetAmount, currentBalance: 0 };
		setJars([...jars, newJar]);
	};

	const addMoney = (index, amount) => {
		const updatedJars = jars.map((jar, i) =>
			i === index ? { ...jar, currentBalance: jar.currentBalance + amount } : jar
		);
		setJars(updatedJars);
	};

	return (
		<div className="container">
			<h1>Jar Saver</h1>
			<JarForm addJar={addJar} />
			<JarList jars={jars} addMoney={addMoney} />
		</div>
	);
}

export default App;
