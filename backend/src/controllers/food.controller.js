const foodModel = require("../models/food-item-model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
//FOR THE IMAGE KIT UPLOAD
// async function createFood(req, res) {
//   console.log(req.file);
//   const ext = req.file.originalname.split(".").pop();
//   const fileName = `${uuid()}.${ext}`;

//   const fileUploadResult = await storageService.uploadFile(
//     req.file.buffer,
//     fileName
//   );
//   const foodItem = await foodModel.create({
//     name: req.body.name,
//     video: fileUploadResult.url,
//     description: req.body.description,
//     foodPartner: req.foodPartner._id,
//   });
//   res.status(201).json({
//     message: " item created successfully",
//     food: foodItem,
//   });
// }

// food.controller.js
async function createFood(req, res) {
  try {
    const { name, description, videoPath } = req.body;
    const videoUrl = storageService.getPublicUrl(videoPath);
    console.log(videoUrl);
    const foodItem = await foodModel.create({
      name,
      description,
      video: videoUrl,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      foodItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create food item" });
  }
}
async function generateSignedUrl(req, res) {
  try {
    const { fileType } = req.body;
    const fileExtension = fileType.split("/")[1];

    const result = await storageService.generatePresignedUploadUrl(
      fileExtension
    );

    res.json({
      message: "Presigned URL generated",
      ...result,
    });
  } catch (err) {
    console.error(err, "error");
    res.status(500).json({ error: "Could not create upload URL" });
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  res.status(200).json({
    message: "food items fetched successfully",
    foodItems,
  });
}

async function likeFoodController(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    food: foodId,
    user: user._id,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "food unliked successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "food liked successfully",
    like,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    food: foodId,
    user: user._id,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "food unsaved successfully",
    });
  }

  await saveModel.create({
    food: foodId,
    user: user._id,
  });

  res.status(201).json({
    message: "food saved successfully",
  });
}

async function getSaveFood(req, res) {
  const user = req.user;
  const savedFoods = await saveModel.find({ user: user._id }).populate("food");
  if (!savedFoods) {
    res.status(404).json({
      message: "saved food not found",
    });
  }
  res.status(200).json({
    message: "saved food fetched successfully",
    savedFoods,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFoodController,
  saveFood,
  getSaveFood,
  generateSignedUrl,
};
