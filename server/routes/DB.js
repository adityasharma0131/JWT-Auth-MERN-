const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connect = mongoose.connect(
  "mongodb+srv://adityasharma0431:anant99@cluster0.rqziivy.mongodb.net/"
);

connect
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((error) => {
    console.error("Error Connecting Database!", error);
  });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", UserSchema);
