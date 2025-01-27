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

module.exports = router;
