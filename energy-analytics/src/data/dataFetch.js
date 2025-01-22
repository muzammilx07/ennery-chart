import { useEffect, useState } from "react";

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/api/chart-data/fetch")
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, []);


  return <canvas id="chart"></canvas>;
};

export default ChartComponent;
