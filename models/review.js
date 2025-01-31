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


// router.post("/:bookId/reviewed-by/:userId", async (req, res) => {
//   try {
//     // create the review in the DB
//     const review = await ReviewModel.create(req.body);
//     // find the book and put the review id in the book reviews key
//     await BookModel.findByIdAndUpdate(req.params.bookId, {
//       $push: { reviews: review._id },
//     });
//     // either review.id and review._id works

//     res.redirect(`/books/${req.params.bookId}`);
//   } catch (err) {
//     console.log(err);
//     res.send("Error creating your review");
//   }
// });

