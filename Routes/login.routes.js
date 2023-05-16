const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

router
  .route("/")
  .get((req, res) => {
    if (req.session.myData?.isAuth) {
      res.redirect("/");
    } else res.render("login", { message: "" });
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user && user?.password === password) {
        req.session.myData = {
          isAuth: true,
          email,
        };
        res.redirect("/");
      } else {
        res.render("login", { message: "Email or Password was incorrect!" });
      }
    } catch (e) {
      console.log(e.message);
    }
  });

module.exports = router;
