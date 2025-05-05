const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
   userName: {
      type: String,
      required: [true, "User name is required"],
   },
  
   message: {
      type: String,
      required: [true, "Message is required"],
   },
   
  },
  { timestamps: true }
);


module.exports = mongoose.model("Log", logSchema);
