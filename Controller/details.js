const Subscribe = require("../model/Subscribe");
const details = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    console.log(email);
    const user = await Subscribe.find({ email: email });

    if (user.length > 0) {
      return res.status(200).json({
        user: user,
      });
    } else {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error: error.message,
    });
  }
};

module.exports = details;
