const Log = require("../models/logModel");
const asyncHandler = require("express-async-handler");

exports.getAllLogs = asyncHandler(async (req, res, next) => {
  const logs = await Log.find();
  res.status(200).json({ data: logs });
});
