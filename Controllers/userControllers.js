import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { nodeMailer } from "../Services/nodemailer.js";


dotenv.config();
//signup
export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcryptjs.hash(password, 10);
    //console.log(hashPassword)
    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User SignUp successfully", result: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup Failure Internal server Error" });
  }
};
//signin
export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email });

    if (!loginUser) {
      res.status(401).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcryptjs.compare(password, loginUser.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid Password" });
    }
    //jwt part token creation after signin
    const token = jwt.sign({ _id: loginUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    loginUser.token = token;
    await loginUser.save();

    res.status(200).json({ message: "User SignIn successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signin Failure Internal server Error" });
  }
};
// getting authorized user
export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({ message: "Authorized User", data: [user] });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server Error Failed to get the user" });
  }
};
//forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User Not Found" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    await nodeMailer(user, token, res);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server Error in the forgot password" });
  }
};
//reset password
export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    
    const hashed = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!hashed) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    const passwordhash = await bcryptjs.hash(password, 10);
    const user = await User.findById({ _id: id });
    user.password = passwordhash;
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    await user.save();
    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server Error in the reset password" });
  }
};
