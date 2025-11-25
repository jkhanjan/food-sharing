const userModel = require("../models/user.models");

async function getUserProfileByID(req, res) {
  const paraams = req.params.id;
  const user = await userModel.findById(paraams);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}

module.exports = {
  getUserProfileByID,
};
