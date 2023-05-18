const express = require("express");
const Books = require("../models/Books.model");

/**
 * const newBook = new Books({
      author: "Héctor García , Francesc Miralles",
      title: "Ikigai",
      borrowedBy: "",
      image:
        "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
      description:
        "The Ikigai book introduces you to various topics related to the art of living, such as the blue zones, longevity, logotherapy, flow, yoga, tai chi, and resilience. It defines what Ikigai is and its rules. The book says that living a long and full life is under your control to an extent.",
    });
 */

const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    try {
      const allBooks = await Books.find({});
      res.json({ allBooks });
    } catch (e) {
      console.log(e.message);
    }
  })
  .post((req, res) => {
    res.end("<h1>hello</h1>");
  });

function isAuth(req, res, next) {
  if (req.session.myData?.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
}

router
  .route("/:id")
  .get()
  .post(isAuth, async (req, res) => {
    const id = req.params.id;
    try {
      const email = req.session.myData?.email;
      await Books.findByIdAndUpdate(
        { _id: id },
        { $set: { isBorrowed: true, borrowedBy: email } }
      );
    } catch (e) {
      if (e) {
        res.redirect("/login");
      }
      console.log(e.message);
    }
    res.redirect("/");
  });

module.exports = router;
