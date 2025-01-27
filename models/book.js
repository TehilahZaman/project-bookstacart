const mongoose = require("mongoose");

const UserModel = require("../models/user.js");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  summary: {
    type: String,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
