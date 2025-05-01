const mongoose = require("mongoose");
const complaints = require("./complaintsModel");
const Obstacles = require("./obstaclesModel");
const suggestions = require("./suggestionsModels");
const tasks = require("./taskModels");
const outOfHoursWork = require("./outOfHoursWorkModel");


const reportSchema = new mongoose.Schema({
  date: {
    type: Date,
    
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  sendToAssistant: {
    type: Boolean,
    default: false,
  },
  department: {
    type:String
  }
});

reportSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await complaints.deleteMany({ report: doc._id });
    await Obstacles.deleteMany({ report: doc._id });
    await suggestions.deleteMany({ report: doc._id });
    await tasks.deleteMany({ report: doc._id });
    await outOfHoursWork.deleteMany({ report: doc._id });
  }
  next();
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
