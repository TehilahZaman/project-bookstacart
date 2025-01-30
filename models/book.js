const mongoose = require("mongoose");

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
  reviews: [
    {
      // type is the references;s object id
      type: mongoose.Schema.Types.ObjectId,
      // tells mongoose what we are referencing
      ref: "Review",
    },
  ],
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
