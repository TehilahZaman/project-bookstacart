const express = require("express");
const router = express.Router();

const UserModel = require("../models/user.js");
const BookModel = require("../models/book.js");

const { fetchBooks } = require("../google_service");

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

router.get("/fetch-and-save-books", async (req, res) => {
  const query = req.query.q || "fiction"; // Example: Get query from request, default to 'fiction'
  try {
    const books = await fetchBooks(query);
    const formattedBooks = books.map((book) => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      genre: book.volumeInfo.categories || [],
      summary: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
    }));

    await BookModel.insertMany(formattedBooks); // Save to database
    res.status(200).send("Books saved to database successfully!");
  } catch (error) {
    res.status(500).send("Error saving books: " + error.message);
  }
});

// show route for a book
router.get("/:bookId", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.bookId);
    res.render("books/show.ejs", { book: book });
  } catch (err) {
    console.log(err);
    res.send("Error in rendering book show page");
  }
});

// is it okay to have this as a post not put?
router.put("/:bookId", async (req, res) => {
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
