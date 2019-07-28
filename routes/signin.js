const express = require("express");
const router = express.Router();
//this is signin routes

router.get("/", (req, res) => {
  res.render("signin", { title: "Sign in" });
});

module.exports = router;
