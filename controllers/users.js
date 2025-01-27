const express = require('express');
const router = express.Router();

const UserModel = require("../models/user.js");
const BookModel = require("../models/book.js");

// change users to user? 
// probably wont have an index page 
//unless profile page should be index page 
// router.get('/', (req, res) => {
//     try {
    



//     } catch (err) {
//         console.log(err)
//         res.send('Error rendering cart index')
// }
// })

// show route - profile page 
router.get("/userId", (req, res) => {
    try {
      



  } catch (err) {
    console.log(err);
    res.send("Error rendering cart index");
  }
});

module.exports = router;