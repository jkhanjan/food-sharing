const foodPartenerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food-item-model");

async function getFoodPartnerById(req, res) {
  const paramsId = req.params.id;
  const foodPartner = await foodPartenerModel.findById(paramsId);
  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartner._id,
  });
  if (!foodPartner) {
    return res.status(404).json({
      message: "food partner not found",
    });
  }
  res.status(200).json({
    message: "food partner fetched successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
}

module.exports = {
  getFoodPartnerById,
};
