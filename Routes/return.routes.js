const express = require("express");
const Book = require("../models/Books.model");

const router = express.Router();

router
  .route("/:id")
  .get((req, res) => {
    res.json({ message: "go to home page" });
  })
  .post(async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndUpdate(
      { _id: id },
      { $set: { isBorrowed: false, borrowedBy: "" } }
    );
    res.redirect("/profile");
  });

module.exports = router;
