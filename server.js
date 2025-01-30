const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

const booksCtrl = require("./controllers/books.js");
const usersCtrl = require("./controllers/users.js");
const authCtrl = require("./controllers/auth.js");
const cartCtrl = require("./controllers/cart");
const reviewCtrl = require("./controllers/reviews.js");

const axios = require("axios");

app.set("view engine", "ejs");

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const port = process.env.PORT ? process.env.PORT : "3000";

const path = require("path");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.use(passUserToView);
app.use("/auth", authCtrl);
app.use("/books", booksCtrl);
app.use(isSignedIn);
app.use("/users/:userId/cart", cartCtrl);
app.use("/users", usersCtrl);
app.use("/books", reviewCtrl);
  // :bookId/reviewed-by/:userId"

app.use(express.json());

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
