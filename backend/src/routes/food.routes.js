const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

// const upload = multer({
//   storage: multer.memoryStorage(),
// });

router.post(
  "/generate-presigned-url",
  authMiddleware.authFoodPartnerMiddleware,
  foodController.generateSignedUrl
)

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  foodController.createFood
);

router.get("/", authMiddleware.authUserMiddlware, foodController.getFoodItems);

router.post(
  "/like",
  authMiddleware.authUserMiddlware,
  foodController.likeFoodController
);
router.get(
  "/like",
  authMiddleware.authUserMiddlware,
  foodController.getLikedFoods
);


router.post("/save", authMiddleware.authUserMiddlware, foodController.saveFood);
router.get(
  "/save",
  authMiddleware.authUserMiddlware,
  foodController.getSaveFood
);

module.exports = router;
