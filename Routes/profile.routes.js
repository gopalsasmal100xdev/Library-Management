const express = require("express");
const router = express.Router();
const Books = require("../models/Books.model");

function isAuth(req, res, next) {
  if (req.session.myData?.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
}

router
  .route("/")
  .get(isAuth, async (req, res) => {
    try {
      const email = req.session.myData?.email;
      const borrowedBooks = await Books.find({ borrowedBy: email });
      res.render("profile", { borrowedBooks: borrowedBooks });
    } catch (e) {
      res.send("<h1>Something went wrong</h1>");
    }
  })
  .post((req, res) => {
    res.end();
  });

module.exports = router;
