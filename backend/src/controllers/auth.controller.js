const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreradyExist = await userModel.findOne({ email });

  if (isUserAlreradyExist) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User Registered Sucessfully",
    user: {
      user: user._id,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged In Successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
