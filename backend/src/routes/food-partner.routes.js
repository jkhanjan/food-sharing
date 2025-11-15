const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const foodPartnerController = require("../controllers/food-partner.controller");

const router = express.Router();

router.get(
  "/:id",
  authMiddleware.authUserMiddlware,
  foodPartnerController.getFoodPartnerById
);
module.exports = router;
