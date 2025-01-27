const express = require("express");
const router = express.Router();

const UserModel = require("../models/user.js");
// const BookModel = require("../models/book.js");

// cart show all books in the cart
router.get("/", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.session.user);
    res.render("cart/index", { cart: currentUser.cart });
  } catch (err) {
    console.log(err);
    res.send("Error rendering cart index");
  }
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.session.user._id);
    currentUser.cart.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/cart`);
  } catch (err) {
    console.log(err);
    // res.redirect("/");
    res.send("Error posting pbook to cart");
  }
});

module.exports = router;
