const express = require("express");
const router = express.Router();
const Books = require("../models/Books.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const books = await Books.find({});
      res.render("home", { bookList: books });
    } catch (e) {
      console.log(e.message);
    }
  })
  .post((req, res) => {
    res.json({ message: "hello" });
  });

module.exports = router;
