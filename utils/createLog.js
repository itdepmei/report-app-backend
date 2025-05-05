const Log = require("../models/logModel");

const createLog = async (userName, message) => {
  await Log.create({ userName: userName,  message: message });
};

module.exports = createLog;

exports.getLog = async () => {
  return await Log.find().sort({ createdAt: -1 }); // ترتيب تنازلي حسب تاريخ الإنشاء
};