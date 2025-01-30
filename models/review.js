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
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
