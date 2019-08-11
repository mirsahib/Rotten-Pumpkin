const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// router.get("/", (req, res) => {
//   res.render("single", { title: "Single" });
//   //console.log(req.params.id);
// });
router.get("/:id", (req, res) => {
  //res.render("single", { title: "Single" });
  const id = req.params.id;
  const apiUrl =
    " https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=c438d70b1fcbf9e8f9852482df70fa5f&append_to_response=videos,credits,reviews";

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      //res.send({ data });
      res.render("single", { title: "Single", data: data });
    })
    .catch(err => {
      res.status(400).render("404", { title: "400", msg: "400 Bad Request" });
    });

  // console.log(req.params.id);
  // res.end();
  //res.render("single", { title: "Single" });
  //res.end();
});

module.exports = router;
