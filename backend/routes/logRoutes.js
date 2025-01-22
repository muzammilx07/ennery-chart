const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");

router.post("/log-access", logController.logAccess);

module.exports = router;
