const express = require("express");
const router = express.Router();

const UserModel = require("../models/user.js");
const BookModel = require("../models/book.js");

router.get("/", async (req, res) => {
  try {
    const allBooks = await BookModel.find({});
    res.render("books/index.ejs", { books: allBooks });
  } catch (err) {
    console.log(err);
    // res.redirect("/");
    res.send("Error in rendering books index");
  }
});

router.get("/:bookId", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.bookId);
    res.render("books/show.ejs", { book: book });
  } catch (err) {
    console.log(err);
    res.send("Error in rendering book show page");
  }
});

// this doesn't match restful convention
router.post("/:bookId", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.session.user._id);
    const book = await BookModel.findOne({ _id: req.params.bookId });
    book.purchasers.push(req.session.user._id);
    await book.save();
    res.redirect(`/users/${currentUser._id}/cart`);
  } catch (err) {
    console.log(err);
    // res.redirect("/");
    res.send("Error posting book to cart");
  }
});

router.delete("/:bookId", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.session.user._id);
    // const book = await BookModel.findById(req.params.bookId);
    // console.log(book);
    // book.purchasers.objectId(currentUser).deleteOne();
    // await book.save();
    await BookModel.findByIdAndUpdate(req.params.bookId, {
      $pull: { purchasers: req.session.user._id },
    }),
      res.redirect(`/users/${currentUser._id}/cart`);
  } catch (err) {
    console.log(err);
    res.send("Error deleting cart item");
  }
});

router.put("/:bookId", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.session.user._id);
    const book = await BookModel.updateMany(
      { purchasers: req.session.user._id },
      { $pull: { purchasers: req.session.user._id } }
    );
    // await book.save();
    res.redirect(`/users/${currentUser._id}/cart`);
  } catch (err) {
    console.log(err);
    res.send("Error deleting all cart items");
  }
});

module.exports = router;
