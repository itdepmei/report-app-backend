const express = require("express");
const { getAllLogs } = require("../services/logService");

const router = express.Router();

router.route("/").get(getAllLogs);

module.exports = router; 
