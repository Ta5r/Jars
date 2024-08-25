import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import AddMoneyForm from './AddMoneyForm';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function JarList({ jars, addMoney }) {
  const getChartData = (jar) => ({
    labels: ['Saved', 'Remaining'],
    datasets: [
      {
        data: [jar.currentBalance, jar.targetAmount - jar.currentBalance],
        backgroundColor: ['#28a745', '#e9ecef'],
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="jar-list">
      {jars.map((jar, index) => (
        <div key={index} className="jar-card">
          <div className="jar-body">
            <h5 className="jar-title">{jar.name}</h5>
            <p className="jar-text">Target: ${jar.targetAmount}</p>
            <p className="jar-text">Current Balance: ${jar.currentBalance}</p>
            <div className="pie-chart-container">
              <Pie data={getChartData(jar)} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <AddMoneyForm addMoney={addMoney} index={index} />
            <div className="progress mt-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${(jar.currentBalance / jar.targetAmount) * 100}%` }}
                aria-valuenow={jar.currentBalance}
                aria-valuemin="0"
                aria-valuemax={jar.targetAmount}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JarList;
