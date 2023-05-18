const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

router
  .route("/")
  .get((req, res) => {
    res.render("register", { message: "" });
  })
  .post(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const userId = Date.now();

    const alreadyPresent = await User.exists({ email });
    if (alreadyPresent) {
      res.render("register", { message: "This email already registered!" });
    } else {
      try {
        const user = new User({
          username: `@${firstName}${lastName}`,
          name: `${firstName} ${lastName}`,
          email,
          password,
          libraryCardNumber: userId,
        });
        const userData = await user.save();
      } catch (e) {
        console.log(e.message);
      }
      res.render("login", {
        message: "Registration successful, Please login!",
      });
    }
  });

module.exports = router;
