const express = require("express");
const { getLog } = require("../utils/createLog");



const router = express.Router();

router
  .route("/")
  .get(getLog)
  