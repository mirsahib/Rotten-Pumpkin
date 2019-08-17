const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/recommendations?api_key=c438d70b1fcbf9e8f9852482df70fa5f&language=en-US&page=1";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.render("movies", { title: "Recommendation", data: data });
      //res.send(data);
    })
    .catch(err => {
      res
        .status(400)
        .render("404", { title: "400", msg: "404 file not found" });
    });
});

module.exports = router;
