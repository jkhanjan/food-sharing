const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const saveModel = mongoose.model("save", savedSchema);
module.exports = saveModel;
