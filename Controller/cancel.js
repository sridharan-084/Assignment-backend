const Subscribe = require("../model/Subscribe");

const Cancel = async (req, res) => {
  try {
    const email = req.body.email;
    const result = await Subscribe.deleteOne({ email: email });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Subscriber not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Subscriber deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the subscriber",
      success: false,
    });
  }
};

module.exports = Cancel;
