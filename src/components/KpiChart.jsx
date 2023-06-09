import React from 'react';
import { Bar } from 'react-chartjs-2';

const KpiChart = () => {
  // נתוני ה-KPI
  const kpiData = {
    labels: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'],
    datasets: [
      {
        label: 'ערכים KPI',
        data: [75, 90, 60, 80], // ערכי ה-KPI
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>נתונים KPI</h2>
      <Bar
        data={kpiData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'ערכים',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default KpiChart;
