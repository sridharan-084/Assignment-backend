const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
  subscriptionType: {
    type: String,
    enum: ["Monthly", "Yearly"],
    default: "Monthly",
  },
  PlanType: {
    type: String,
  },
  monthlyPrice: {
    type: String,
  },
  Devices: {
    type: [String], // Here, we specify that Devices is an array of strings
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you need for your user here
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;
