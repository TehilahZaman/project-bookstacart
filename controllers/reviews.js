const express = require("express");
const router = express.Router();

const ReviewModel = require("../models/review.js");
const BookModel = require("../models/book.js");

///books/:bookId/reviewed-by/:userId

//create a review on a book show page
router.post("/:bookId/reviewed-by", async (req, res) => {
  req.body.user = req.session.user._id;
  try {
    // find the book
    const currentBook = await BookModel.findById(req.params.bookId);
    // put the review in the book reviews
    currentBook.reviews.push(req.body);
    // save
    await currentBook.save();

    res.redirect(`/books/${req.params.bookId}`);
  } catch (err) {
    console.log(err);
    res.send("Error creating your review");
  }
});

// get edit page
router.get("/:bookId/reviewed-by/:reviewId/edit", async (req, res) => {
  let edit = true;
  const user = req.session.user._id;
  const book = await BookModel.findById(req.params.bookId);
  const review = book.reviews.id(req.params.reviewId);

  res.render("books/show.ejs", { edit, book, editReview: review, user });
});

//edit comment
router.put("/:bookId/reviewed-by/:reviewId", async (req, res) => {
  const book = await BookModel.findById(req.params.bookId);
  const review = book.reviews.id(req.params.reviewId);
  review.set(req.body);
  book.save();
  res.redirect(`/books/${req.params.bookId}`);
});

//delete comment
router.delete("/:bookId/reviewed-by/:reviewId", async (req, res) => {
  const book = await BookModel.findById(req.params.bookId);
  const review = book.reviews.id(req.params.reviewId).deleteOne();
  await book.save();
  res.redirect(`/books/${req.params.bookId}`);
});

module.exports = router;
