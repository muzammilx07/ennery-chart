const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema(
  {
    access_time: { type: String, required: true },
    access_date: { type: Date, required: true },
    employee_name: { type: String, required: true },
    algo_status: { type: String, enum: ["ON", "OFF"], required: true },
  },
  { timestamps: true }
);

const AccessLog = mongoose.model("AccessLog", accessLogSchema);
module.exports = AccessLog;
