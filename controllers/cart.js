const express = require("express");
const router = express.Router();

const BookModel = require("../models/book.js");

// cart index all books in the cart
router.get("/", async (req, res) => {
  try {
    const booksInCart = await BookModel.find({
      purchasers: req.session.user._id,
    });
    res.render("cart/index.ejs", {
      cart: booksInCart,
    });
    //}
  } catch (err) {
    console.log(err);
    res.send("Error rendering cart index");
  }
});

module.exports = router;
