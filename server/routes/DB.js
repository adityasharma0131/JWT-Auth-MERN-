const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connect = mongoose.connect(
  "mongodb+srv://adityasharma0431:anant99@cluster0.rqziivy.mongodb.net/"
);

connect
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch(() => {
    console.log("Error Connecting Database!");
  });

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", UserSchema);
