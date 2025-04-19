const mongoose = require("mongoose");

const complaintsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  dataStart: {
    type: Date,
    required: true,
  },
  dataEnd: {
    type: Date,
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

module.exports = mongoose.model("Complaints", complaintsSchema);