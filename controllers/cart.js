const express = require("express");
const router = express.Router();

// const UserModel = require("../models/user.js");
const BookModel = require("../models/book.js");

// cart index all books in the cart
router.get("/", async (req, res) => {
  try {
    const booksInCart = await BookModel.find({
      purchasers: req.session.user._id,
    });

    // if (!booksInCart.purchasers) {
    //   console.log("empty cart!!!!!");
    //   return res.render("cart/index.ejs", { cart: [] }); // Return empty if no search term
    // } else if (booksInCart.purchasers) {
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
