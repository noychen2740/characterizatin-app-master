import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Card } from "@mui/material";
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);
 
export default function GraphsBar(props) {

  const data = {
  labels: ['Red', 'Orange', 'Blue'],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        label: 'Popularity of colours',
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.6)'
        ],
        borderWidth: 1,
      }
  ]
}
  const [chartData, setChartData] = useState({
    labels: props.Data.map((data) => data.KindOfExpenses), 
    datasets: [
      {
        label: 'הוצאות בש"ח',
        data: props.Data.map((data) => data.sumOfExpense),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ce93d8",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#e57373"
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  });

  const [chartDataP, setChartDataP] = useState({
    labels: props.DataPrecent.map((data) => data.KindOfExpenses), 
    datasets: [
      {
        label: '%',
        data: props.DataPrecent.map((data) => data.sumOfExpense),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ce93d8",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#e57373"
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  });



  return (
 <>
<Card sx={{ minWidth: 275  }} style={{marginTop:'20px',marginBottom:'20px'}}>
<h3 style={{ textAlign: "center" }}>הוצאות לפי קטגוריות</h3>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "התפלגות הוצאות בטיול"
            },
            legend: {
              display: false
            }
          }
        }}
      />
</Card>
<Card sx={{ minWidth: 275, height: 380  }} style={{marginBottom:'20px'}}>
      <h3 style={{ textAlign: "center" }}>פילוח הוצאות</h3>
      <Pie
        data={chartDataP}
        options={{
          plugins: {
            title: {
              display: true,
              text: "חלוקה באחוזים"
            }
          }
        }}
      />
</Card>  
{/* <Card sx={{ minWidth: 275}} style={{marginBottom:'10px'}}>
      <h3 style={{ textAlign: "center" }}>מגמה</h3>
      <Line
  data={chartData}
  options={{
    plugins: {
      title: {
        display: true,
      }
    }
  }}

/>
</Card>   */}
</>
  );
}