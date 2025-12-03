const userModel = require("../models/user.models");

async function getUserProfileByID(req, res) {
  try {
    res.status(200).json({
      message: "User fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  getUserProfileByID,
};
