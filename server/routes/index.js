const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./DB");
const session = require("express-session");

router.get("/", function (req, res) {
  res.json({ message: "Server-side is working" });
});

module.exports = router;
