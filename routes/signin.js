const express = require("express");
const router = express.Router();
//this is signin routes
const User = require("../model/user");

router.get("/", (req, res) => {
  res.render("signin", { title: "Sign in" });
});
router.post("/", (req, res) => {
  let email = req.body.email;
  let pwd = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      res.render("signin", { title: "Sign in", errors: "User doesn't exist" });
    } else {
      if (pwd == user.password) {
        res.render("index", { title: "Home" });
      } else {
        res.render("signin", {
          title: "Sign in",
          errors: "Password incorrect"
        });
      }
    }
  });
});
module.exports = router;
