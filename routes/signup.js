const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//this is signup routes
const User = require("../model/user");

router.get("/", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});
router.post("/", (req, res) => {
  var uName = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var cpwd = req.body.password_confirm;
  var country = req.body.country;
  var age = Number(req.body.age);
  //console.log(uName);
  //console.log(country);
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
    //req.flash("success_msg", "Registration");
    //res.redirect("/");
    //res.render("index", { title: "Home", role: "user" });
    User.findOne({ email: email }).then(user => {
      //check if user email exist in database
      if (user) {
        res.render("signup", {
          title: "Signup",
          user_msg: "Email already exist"
        });
      } else {
        var newUser = new User({
          username: uName,
          email: email,
          password: pass,
          country: country,
          age: age
        });
        //console.log(newUser.password);
        //res.end();
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser.save((err, data) => {
              if (err) {
                console.log(err);
              } else {
                req.flash("success_msg", "Registration Successful");
                res.redirect("/");
              }
            });
          });
        });
      }
    });
  }
});

module.exports = router;
