const AccessLog = require("../models/AccessLog");
const ChartData = require("../models/ChartData");

exports.logAccess = async (req, res) => {
  try {
    const { access_time, access_date, employee_name, algo_status } = req.body;
    const logEntry = new AccessLog({
      access_time,
      access_date,
      employee_name,
      algo_status,
    });

    await logEntry.save();

    const filteredData = await ChartData.find({
      algo_status: algo_status === "ON" ? 1 : 0,
    });

    res.status(201).json({ logEntry, filteredData });
  } catch (error) {
    res.status(500).json({ message: "Error logging access" });
  }
};
