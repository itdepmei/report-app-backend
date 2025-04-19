const mongoose = require("mongoose");
const complaints = require("./complaintsModel");

const complaintsSchema = new mongoose.Schema({
  data: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
});

module.exports = mongoose.model("Report", reportSchema);
