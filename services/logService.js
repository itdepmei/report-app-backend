const Log = require("../models/logModel");
const asyncHandler = require("express-async-handler");

exports.getAllLogs = asyncHandler(async (req, res, next) => {
  const logs = await Log.find().sort({ createdAt: -1 }); 
  res.status(200).json({ data: logs });
});

