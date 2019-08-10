const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.render("single", { title: "Single" });
//   console.log(req.params.id);
// });
router.get("/:id", (req, res) => {
  //res.render("single", { title: "Single" });
  console.log(req.params.id);
  res.end();
});

module.exports = router;
