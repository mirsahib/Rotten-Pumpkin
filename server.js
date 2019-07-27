const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongo = require("mongodb");

//database setting
var db_url =
  "mongodb+srv://mirsahib24:admin123@test-ry7bt.mongodb.net/rotten-pumpkin?retryWrites=true&w=majority";
mongoose.connect(db_url, { useNewUrlParser: true });

mongoose.connection.on("error", function(err) {
  console.log(err);
  console.log("Could not connect to mongodb");
});

mongo.MongoClient.connect(db_url, { useNewUrlParser: true }, function(
  err,
  client
) {
  if (err) {
    console.log("Could Not Connect DB");
  } else {
    db = client.db("Test");
  }
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//setting view engine
//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setting static folder
app.use(express.static(path.join(__dirname, "public")));

//load landing page
app.get("/", (req, res) => {
  //res.locals.title = "Rotten Pumpkin";
  res.render("index", { title: "Rotten Pumpkin" });
});

//404 middleware
app.use(function(req, res) {
  res.status(404).render("404", { title: "404" });
});

// app listener
app.listen(process.env.PORT || 3000, () => {
  console.log(`Application is running on ${process.env.PORT || 3000}`);
});

//test branch
