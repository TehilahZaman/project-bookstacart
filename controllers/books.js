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
    res.send("Error in rendering books index");
  }
});

router.get("/:bookId", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.bookId);
    res.render("books/show.ejs", { book: book });
  } catch (err) {
    consol.elog(err);
    res.send("Error in rendering book show page changed --- ba ");
  }
});

router.post("/:bookId", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.session.user._id);
    // currentUser.cart.push(req.body);
    // await currentUser.save();
    const book = await BookModel.findOne({ _id: req.params.bookId });
    book.purchaser.push(req.session.user._id);
    // req.body.purchaser = req.session.user._id;
    // await BookModel.create(req.body);
    await book.save()
    res.redirect(`/users/${currentUser._id}/cart`);
  } catch (err) {
    console.log(err);
    // res.redirect("/");
    res.send("Error posting pbook to cart");
  }
});

module.exports = router;
