const express = require("express");
const multer = require("multer");
const Book = require("../models/Books.model");

const Router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const { title } = req.body;
    const newTitle = title.replace(/\s/g, "");
    const ext = file.mimetype.split("/")[1];
    req.imageUrl = `${newTitle}.${ext}`;
    cb(null, `${newTitle}.${ext}`);
  },
});
const filter = (req, res, cb) => {};
const upload = multer({ storage: storage });

Router.route("/")
  .get((req, res) => {
    res.render("createBooks");
  })
  .post(upload.single("image"), async (req, res) => {
    const { author, description, title } = req.body;
    // const image = title.replace(/\s/g, "");
    const image = req.imageUrl;

    const newBook = new Book({
      author,
      image,
      description,
      title,
    });

    try {
      await newBook.save();
    } catch (e) {
      console.log(e.message);
      res.redirect("/createBook");
    }
    res.redirect("/");
  });

module.exports = Router;
