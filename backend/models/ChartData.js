const mongoose = require("mongoose");

const chartDataSchema = new mongoose.Schema(
  {
    serialNo: String,
    clientID: mongoose.Schema.Types.ObjectId,
    deviceMapID: mongoose.Schema.Types.ObjectId,
    devices: [mongoose.Schema.Types.ObjectId],
    total_kwh: Number,
    ac_run_hrs: Number,
    ac_fan_hrs: Number,
    algo_status: Number,
    billing_ammount: Number,
    cost_reduction: Number,
    energy_savings: {
      savings_percent: Number,
      ref_kwh: Number,
      us_meter: Number,
      us_calc: Number,
      inv_factor: Number,
    },
    mitigated_co2: Number,
    weather: {
      max_temp: Number,
      min_temp: Number,
    },
  },
  { timestamps: true }
);

const ChartData = mongoose.model("ChartData", chartDataSchema);
module.exports = ChartData;
