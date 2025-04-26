const mongoose = require("mongoose");

const complaintsSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Complaints", complaintsSchema);