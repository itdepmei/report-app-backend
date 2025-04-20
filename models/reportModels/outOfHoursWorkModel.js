const mongoose = require("mongoose");

const outOfHoursWorkSchema = new mongoose.Schema({
  timeStart: {
    type: String,
    required: true,
  },
  timeEnd: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  report: {
    type: mongoose.Schema.ObjectId,
    ref: "Report",
    required: [true, "Review must belong to a report"],
  },
});
module.exports = mongoose.model("OutOfHoursWork", outOfHoursWorkSchema);
