const mongoose = require("mongoose");

const suggestionsSchema = new mongoose.Schema({
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
}, { timestamps: true });
module.exports = mongoose.model("Suggestions", suggestionsSchema);
