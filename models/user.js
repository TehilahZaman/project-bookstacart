const mongoose = require("mongoose");

// const BookModel = require("../models/book.js");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
