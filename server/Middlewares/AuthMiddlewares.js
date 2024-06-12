const jwt = require("jsonwebtoken");
const User = require("../routes/DB");

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    res.json({ status: false });
    return; // End middleware function
  }

  try {
    const decodedToken = jwt.verify(token, "CAT");
    const user = await User.findById(decodedToken.id);

    if (user) {
      res.json({ status: true, user: user.email });
    } else {
      res.json({ status: false });
    }
  } catch (err) {
    res.json({ status: false });
  }

  // No need to call next() as res.json already ends the response
};
