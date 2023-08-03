const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10; // Define the number of salt rounds for bcrypt

const UserSignup = async (req, res) => {
  try {
    //console.log(req.body);
    const userExist = await User.find({ email: req.body.email });
    if (userExist.length > 0) {
      // Check the length of the array
      return res.status(400).json({
        message: "User Already exists. Try to login.",
        success: false,
      });
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({
          message: "Error hashing password",
          success: false,
        });
      } else {
        req.body.password = hashedPassword;
        const user = new User(req.body);
        const result = await user.save(); // Use user.save() instead of User.save()
        return res.status(200).json({
          message: "User created successfully",
          success: true,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = UserSignup;
