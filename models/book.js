const mongoose = require("mongoose");

const UserModel = require("../models/user.js");

const bookSchema = new mongoose.Schema({
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
  // a field/key to represent the relationship 
  purchaser: {
    // type is the user's object id 
    type: mongoose.Schema.Types.ObjectId,
    // tell mongoose what we are referencing 
    ref: 'UserModel'
  }
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
