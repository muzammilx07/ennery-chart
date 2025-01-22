const express = require("express");
const router = express.Router();
const chartDataController = require("../controllers/chartDataController");

router.post("/import", chartDataController.importChartData);
router.get("/fetch", chartDataController.getChartData);

module.exports = router;
