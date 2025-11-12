const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("unable to connect to database", err));
}

module.exports = connectDB;
