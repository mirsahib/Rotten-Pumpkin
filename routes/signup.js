const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});
router.post("/", (req, res) => {
  let uName = req.body.username;
  let email = req.body.email;
  let pwd = req.body.password;
  let cpwd = req.body.password_confirm;
  //console.log(uName, email, pwd, cpwd);
  req.checkBody("username", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Please enter a valid email").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password", "Password should be at least 4 character")
    .isLength(4);
  req.checkBody("password_confirm", "Confirm password").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.render("signup", { title: "Signup", errors: errors });
  } else {
    console.log("success");
    res.redirect("/");
  }
});

module.exports = router;
