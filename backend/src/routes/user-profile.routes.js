const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const userProfileByIdController = require("../controllers/user-profile.controller");

const router = express.Router();

router.get(
  "/me",
  authMiddleware.authUserMiddlware,
  userProfileByIdController.getUserProfileByID
);
module.exports = router;
