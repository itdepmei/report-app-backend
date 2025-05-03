const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
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
    default:"لا يوجد"
  },
  report: {
    type: mongoose.Schema.ObjectId,
    ref: "Report",
    required: [true, "Review must belong to a report"],
  },
  // user:{
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: [true, "Review must belong to a report"],
  // },
}, { timestamps: true });

module.exports = mongoose.model("Tasks", tasksSchema);
