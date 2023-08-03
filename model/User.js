const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
  subscriptionType: {
    type: String,
    enum: ["monthly", "yearly"],
    default: "monthly",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you need for your user here
});

const User = mongoose.model("User", userSchema);

module.exports = User;
