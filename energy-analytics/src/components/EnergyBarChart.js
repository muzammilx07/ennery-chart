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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EnergyBarChart = ({ fullData }) => {
  const [chartData, setChartData] = useState(null);
  const [showEnergySavingModeOn, setShowEnergySavingModeOn] = useState(true);
  const [showEnergySavingModeOff, setShowEnergySavingModeOff] = useState(true);

  useEffect(() => {
    if (fullData) {
      const labels = fullData.map((d) =>
        new Date(d.updatedAt.$date || d.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );

      const valuesOn = fullData.map((d) => d.total_kwh * 0.6);
      const valuesOff = fullData.map((d) => d.total_kwh * 0.4);

      setChartData({
        labels,
        datasets: [
          {
            label: "Energy Saving Mode ON",
            data: valuesOn,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            stack: "energy",
          },
          {
            label: "Energy Saving Mode OFF",
            data: valuesOff,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            stack: "energy",
          },
        ],
      });
    }
  }, [fullData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw.toFixed(2)} kWh`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Date",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} kWh`,
        },
        title: {
          display: true,
          text: "Energy Consumed (kWh)",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    barThickness: 50,
  };

  const filteredChartData = chartData && {
    ...chartData,
    datasets: chartData.datasets.filter((dataset) => {
      if (dataset.label === "Energy Saving Mode ON" && showEnergySavingModeOn) {
        return true;
      }
      if (
        dataset.label === "Energy Saving Mode OFF" &&
        showEnergySavingModeOff
      ) {
        return true;
      }
      return false;
    }),
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg overflow-hidden w-1/2 justify-center flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Energy Consumed
      </h2>

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

      <div
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            minWidth: `${Math.max(fullData.length * 120, 1000)}px`,
            height: "500px",
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
