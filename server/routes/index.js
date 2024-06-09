const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./DB");
const session = require("express-session");
const { register } = require("../Controllers/AuthController");
const { login } = require("../Controllers/AuthController");

// router.get("/", function (req, res) {
//   res.json({ message: "Server-side is working" });
// });


router.post("/")



router.post("/register", register);
router.post("/login", login);

module.exports = router;
