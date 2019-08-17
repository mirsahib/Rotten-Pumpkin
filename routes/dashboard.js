const express = require("express");
const router = express.Router();

const User = require("../model/user");

router.get("/", async (req, res) => {
  const user = await User.find({});
  try {
    res.render("dashboard", { title: "dashboard", data: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
