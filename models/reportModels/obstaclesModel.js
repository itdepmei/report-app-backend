const mongoose = require("mongoose");

const obstaclesSchema = new mongoose.Schema({
  timeStart: {
    type: String,
  },
  timeEnd: {
    type: String,
  },
  note: {
    type: String,
  },
  report: {
    type: mongoose.Schema.ObjectId,
    ref: "Report",
    required: [true, "Review must belong to a report"],
  },
});
module.exports = mongoose.model("Obstacles", obstaclesSchema);
