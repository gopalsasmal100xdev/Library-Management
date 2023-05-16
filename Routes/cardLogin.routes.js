const express = require("express");
const User = require("../models/user.models");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    if (req.session.myData?.isAuth) {
      res.redirect("/");
    } else res.render("cardLogin");
  })
  .post(async (req, res) => {
    const { cardId } = req.body;
    try {
      const [user] = await User.find({ libraryCardNumber: cardId });
      if (user) {
        const { email } = user;
        req.session.myData = {
          isAuth: true,
          email,
        };
        res.redirect("/");
      } else {
        res.render("loginCardError");
      }
    } catch (e) {
      console.log(e.message);
      res.redirect("/login");
    }
  });

module.exports = router;
