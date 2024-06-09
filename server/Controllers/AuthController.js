const jwt = require("jsonwebtoken");
const DB = require("../routes/DB");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "CAT", {
    expiresIn: maxAge,
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for blank inputs
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    // Check if the email already exists
    const existingUser = await DB.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const user = await DB.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ message: "User Created Successfully", user: user._id, create: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Registration failed" });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await DB.findOne({ email });
    if (user) {
      const auth = await user.comparePassword(password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie("jwt", token, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({ user: user._id, login: true });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Login failed" });
  }
};
