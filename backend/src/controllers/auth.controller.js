const userModel = require("../models/user.models");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const foodPartenerModel = require("../models/foodpartner.model");
const storageService = require("../services/storage.service");

async function generateSignedUrl(req, res) {
  try {
    const { fileType } = req.body;
    const fileExtension = fileType.split("/")[1];

    const result =
      await storageService.generatePresignedUploadUrl(fileExtension);
    res.json({
      message: "Presigned URL generated",
      ...result,
    });
  } catch (err) {
    console.error(err, "error");
    res.status(500).json({ error: "Could not create upload URL" });
  }
}

async function registerUser(req, res) {
  const { fullName, email, password, profileImageUrl } = req.body;
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
    profilePic: profileImageUrl,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
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

  const user = await userModel.findOne({ email }).select("+password");

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
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged In Successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body;
  const isAccountAlreadyExist = await foodPartnerModel.findOne({ email });

  if (isAccountAlreadyExist) {
    return res.status(400).json({
      message: "Partner Account Already Exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartenerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
    {expiresIn: "24h"},
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "Food Partner Registered Successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      phone: foodPartner.phone,
      contactName: foodPartner.contactName,
      address: foodPartner.address,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const user = await foodPartnerModel.findOne({ email });

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
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged In Successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner Logged Out Successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  generateSignedUrl,
};
