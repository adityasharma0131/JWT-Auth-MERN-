const jwt = require("jsonwebtoken");
const DB = require("../routes/DB");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await DB.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, create: true });
  } catch (error) {
    console.log(error);
  }
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "CAT", {
    expiresIn: maxAge,
  });
};

module.exports.login = async (req, res, next) => {};
