import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
});

const User = mongoose.model("User", userModel);

export default User;
