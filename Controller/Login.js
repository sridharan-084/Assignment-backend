const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = async (email) => {
  try {
    const res = await jwt.sign(
      { email },
      process.env.TOKEN_SECRET,
      {},
      { expiresIn: "10h" }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

const Login = async (req, res) => {
  // console.log(req.body);
  try {
    const userExist = await User.find({ email: req.body.email });
    if (userExist.length === 0) {
      return res.status(400).json({
        message: "User Does not exists . Register Yourself First",
        success: false,
      });
    }

    const hashedPassword = userExist[0].password;
    const result = await bcrypt.compare(req.body.password, hashedPassword);
    if (result) {
      const accessToken = await generateAccessToken(userExist[0].email);
      res.status(200).json({
        message: "Log in successful",
        success: true,
        email: userExist[0].email,
        accessToken: accessToken,
      });
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
    return result;
  } catch (err) {
    return res.status(500).json({
      message: "Some error occured at server side",
      success: false,
    });
  }
};

module.exports = Login;
