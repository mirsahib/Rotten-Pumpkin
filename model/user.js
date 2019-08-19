const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", userSchema);
