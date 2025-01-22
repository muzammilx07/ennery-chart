const ChartData = require("../models/ChartData");

exports.importChartData = async (req, res) => {
  try {
    const chartData = new ChartData(req.body);
    await chartData.save();
    console.log("Data Imported Successfully");
    return res.status(201).json(chartData); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error importing chart data" });
  }
};


// Fetch Chart Data (GET)
exports.getChartData = async (req, res) => {
  try {
    const chartData = await ChartData.find();
    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chart data" });
  }
};
