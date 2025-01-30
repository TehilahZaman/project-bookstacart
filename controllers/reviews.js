const express = require("express");
const router = express.Router();

const ReviewModel = require("../models/review.js");
const BookModel = require("../models/book.js");

///books/:bookId/reviewed-by/:userId
//create a comment on a book show page

router.post("/:bookId/reviewed-by/:userId", async (req, res) => {
  try {
    // find the user
    // const currentUser = await UserModel.findById(req.session.user._id);

    // create the review in the DB
    const review = await ReviewModel.create(req.body);

    console.log(" the whole review:", review);
    console.log(" review id", review.id);
    console.log(req.params.bookId, "book id");
    // console.log(currentUser._id);
    console.log(review._id, " review id ");

    const book = await BookModel.findById(req.params.bookId);
    // find the book and put the review id in the book reviews key
    await BookModel.findByIdAndUpdate(req.params.bookId, {
      $push: { reviews: review.id },
    });

    // await book.save();

    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.send("Error creating your review");
  }
});

// router.post("/:bookId/reviewed-by/:userId/:reviewId", async (req, res) => {
//   try {
//     // find the new review
//     const newReview = await ReviewModel.findById(req.params.reviewId);
//     // find the book and put the review id in the book reviews key
//     await BookModel.findByIdAndUpdate(req.params.bookId),
//       {
//         $push: { reviews: req.params.reviewId },
//       };
//     res.send("you got it");
//   } catch (err) {
//     console.log(err);
//     res.send("Error adding your review to the book");
//   }
// });

// res.redirect(
//   `/books/${req.params.bookId}/reviewed-by/${currentUser._id}/${review._id}`
// );

//see that comment on the page
//edit comment
//delete comment

//see all comments for that book page

module.exports = router;
