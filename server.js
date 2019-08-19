const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongo = require("mongodb");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//database setting
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch(err => {
    console.log(err);
  });

//express session,validator & cookie parser middleware
app.use(cookieParser());
app.use(
  session({ secret: "mirsahib", resave: false, saveUninitialized: true })
);
app.use(expressValidator());

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//setting view engine
//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setting static folder
app.use(express.static(path.join(__dirname, "public")));

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//load landing page
app.get("/", (req, res) => {
  //res.locals.title = "Rotten Pumpkin";
  res.render("index", { title: "Rotten Pumpkin" });
});

//signup router
app.use("/signup", require("./routes/signup"));

//signin router
app.use("/signin", require("./routes/signin"));

//single page router
app.use("/single", require("./routes/single"));
//movies page router
app.use("/movies", require("./routes/movies"));

//404 middleware
app.use(function(req, res) {
  res.status(404).render("404", { title: "404", msg: "404 not found" });
});

// app listener
app.listen(process.env.PORT || 3000, () => {
  console.log(`Application is running on ${process.env.PORT || 3000}`);
});

//test branch
