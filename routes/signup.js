const express = require("express");
const router = express.Router();

const User = require("../model/user");

//this is signup routes
router.get("/", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});
router.post("/", (req, res) => {
  let uName = req.body.username;
  let email = req.body.email;
  let pwd = req.body.password;
  let cpwd = req.body.password_confirm;
  let country = req.body.country;
  let age = req.body.age;
  console.log(country);
  //console.log(uName, email, pwd, cpwd);
  req.checkBody("username", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Please enter a valid email").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password", "Password should be at least 4 character")
    .isLength(4);
  req.checkBody("password2", "Confirm Password").notEmpty();
  req.checkBody("password2", "Password do not match").equals(req.body.password);
  req.checkBody("age", "Age is required").notEmpty();
  req.checkBody("age", "Age Field should be numeric").isNumeric();
  const errors = req.validationErrors();
  if (errors) {
    res.render("signup", { title: "Signup", errors: errors });
  } else {
    var user = new User({
      username: uName,
      email: email,
      password: pwd,
      country: country,
      age: age
    });
    user.save((err, data) => {
      if (err) {
        res.status(401).json({ err: err });
      } else {
        //this should be res.redirect
        res.render("index", { title: "Home", role: "user" });
        console.log(data);
      }
    });
  }
});

module.exports = router;
