import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import energyData from "../data/energyData.json"; // Update path if needed

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EnergyBarChart = () => {
  // State for chart data
  const [chartData, setChartData] = useState(null);

  // State to toggle visibility of datasets
  const [showEnergySavingModeOn, setShowEnergySavingModeOn] = useState(true);
  const [showEnergySavingModeOff, setShowEnergySavingModeOff] = useState(true);

  useEffect(() => {
    const labels = energyData.map((d) =>
      new Date(d.createdAt.$date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );

    // Define energy consumption values
    const valuesOn = energyData.map((d) => d.total_kwh * 0.6); // Example values for Energy Saving Mode ON
    const valuesOff = energyData.map((d) => d.total_kwh * 0.4); // Example values for Energy Saving Mode OFF

    setChartData({
      labels,
      datasets: [
        {
          label: "Energy Saving Mode ON",
          data: valuesOn,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          stack: "energy", // Ensure stacking with the same group name
        },
        {
          label: "Energy Saving Mode OFF",
          data: valuesOff,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          stack: "energy", // Ensure stacking with the same group name
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Legend is not required because we have checkboxes
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)} kWh`,
        },
      },
    },
    scales: {
      x: {
        stacked: true, // Enable stacking on x-axis
        title: {
          display: true,
          text: "Date",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        stacked: true, // Enable stacking on y-axis
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} kWh`, // Add units to Y-axis labels
        },
        title: {
          display: true,
          text: "Energy Consumed (kWh)",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    barThickness: 50, // Adjust bar width
  };

  // Filter data based on checkboxes
  const filteredChartData = chartData && {
    ...chartData,
    datasets: chartData.datasets.filter((dataset) => {
      if (dataset.label === "Energy Saving Mode ON" && showEnergySavingModeOn) {
        return true;
      }
      if (dataset.label === "Energy Saving Mode OFF" && showEnergySavingModeOff) {
        return true;
      }
      return false;
    }),
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg overflow-hidden w-1/2 h-full
    ">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Energy Consumed
      </h2>

      {/* Checkbox Controls */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showEnergySavingModeOn}
            onChange={() => setShowEnergySavingModeOn((prev) => !prev)}
          />
          Energy Saving Mode ON
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showEnergySavingModeOff}
            onChange={() => setShowEnergySavingModeOff((prev) => !prev)}
          />
          Energy Saving Mode OFF
        </label>
      </div>

      {/* Chart Container */}
      <div
        style={{
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            minWidth: `${Math.max(energyData.length * 120, 1000)}px`, // Dynamically calculate width
            height: "500px", // Sufficient height for better visibility
          }}
        >
          {filteredChartData ? (
            <Bar data={filteredChartData} options={options} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyBarChart;



