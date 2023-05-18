const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  borrowedBy: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    required: true,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    default: "",
  },
});

const Book = mongoose.model("books", BookSchema);
module.exports = Book;
