const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const chartDataRoutes = require("./routes/chartDataRoutes");
const logRoutes = require("./routes/logRoutes");
require("dotenv").config();
const app =express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/chart-data", chartDataRoutes);
app.use("/api/log", logRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
