const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

router.get("/", authMiddleware.authUserMiddlware, foodController.getFoodItems);

router.post(
  "/like",
  authMiddleware.authUserMiddlware,
  foodController.likeFoodController
);

router.post("/save", authMiddleware.authUserMiddlware, foodController.saveFood);
router.get(
  "/save",
  authMiddleware.authUserMiddlware,
  foodController.getSaveFood
);

module.exports = router;
