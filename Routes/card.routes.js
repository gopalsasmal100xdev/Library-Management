const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

router
  .route("/")
  .get(async (req, res) => {
    if (req.session.myData?.isAuth) {
      const email = req.session.myData?.email;
      try {
        const [details] = await User.find({ email });
        res.render("card", {
          cardDetails: details.libraryCardNumber,
          name: details.name,
          userName: details.username,
        });
      } catch (e) {
        console.log(e.message);
        res.redirect("/login");
      }
    } else res.redirect("/login");
  })
  .post((req, res) => {});

module.exports = router;
