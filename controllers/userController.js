import { userModel } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create token ->
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ---------- user login -->
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    // checking user yes or not ->
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//! Time will start -> 6:22:21

// ------- user Register -------- ->
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validating password length
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Creating token
    const token = createToken(user._id);

    // Sending response with the token
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// --------For admin login---------
const adminLogin = async () => {};

export const UserController = {
  loginUser,
  registerUser,
  adminLogin,
};
