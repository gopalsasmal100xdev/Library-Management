const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    req.session.destroy();
    res.redirect("/");
  })
  .post((req, res) => {
    res.json({ message: "Invalid request!" });
  });

module.exports = router;
