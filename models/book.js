const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  stars: {
    type: String,
    min: 1,
    max: 10,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

  },

}, {timestamps: true });


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  genre: [
    {
      type: String,
    },
  ],
  summary: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  // a field/key to represent the relationship
  purchasers: [
    {
      // type is the user's object id
      type: mongoose.Schema.Types.ObjectId,
      // tell mongoose what we are referencing
      ref: "User",
    },
  ],
  //reviews reference
  reviews: [reviewSchema],
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
