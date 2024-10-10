import bcrypt from "bcrypt";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      const user = new User({ name, email, password: hash });
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_Key, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly:false,
      secure: true, 
      maxAge: 10 * 24 * 60 * 60 * 1000, 
      sameSite: "none", 
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.TOKEN_Key, {
      expiresIn: "5d",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false, // Use secure cookies in production
      maxAge: 5 * 24 * 60 * 60 * 1000, // 10 days
      sameSite: "Lax", // Use 'Lax' or 'None' if your frontend and backend are on different domains
    });
    res.json({ message: "User logged in successfully", token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async () => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
