const foodModel = require("../models/food-item-model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const ext = req.file.originalname.split(".").pop();
  const fileName = `${uuid()}.${ext}`;

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    fileName
  );
  const foodItem = await foodModel.create({
    name: req.body.name,
    video: fileUploadResult.url,
    description: req.body.description,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "food item created successfully",
    food: foodItem,
  });

  res.send("food item created");
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  res.status(200).json({
    message: "food items fetched successfully",
    foodItems,
  });
}
module.exports = {
  createFood,
  getFoodItems,
};
