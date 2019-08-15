const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
//this is signin routes

router.get("/", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=c438d70b1fcbf9e8f9852482df70fa5f&language=en-US&page=1";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.render("movies", { title: "Movies", data: data });
      //res.send(data);
    })
    .catch(err => {
      res
        .status(400)
        .render("404", { title: "400", msg: "404 file not found" });
    });

  //  res.render("movies", { title: "Movies" });
});

module.exports = router;
