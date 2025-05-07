const Log = require("../models/logModel");

const createLog = async (userName, message, action) => {
  await Log.create({ userName: userName,  message: message, action:action });
};

module.exports = createLog;
