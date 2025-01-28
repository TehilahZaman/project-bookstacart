const express = require("express");
const router = express.Router();

// const UserModel = require("../models/user.js");
const BookModel = require("../models/book.js");

// cart show all books in the cart
router.get("/", async (req, res) => {
  try {
    const booksInCart = await BookModel.find({
      purchasers: req.session.user._id,
    }).populate({ path: "purchasers", selecct: "username" });
      //.populate({ path: "purchasers", selecct: "username" });
    res.render("cart/index.ejs", { cart: booksInCart });
  } catch (err) {
    console.log(err);
    res.send("Error rendering cart index");
  }
});

module.exports = router;
