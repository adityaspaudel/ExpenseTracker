const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const userRegistration = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password) {
      res.send({ message: "all fields are required" });
    }
    const findUserByUsername = await User.findOne({ username });
    const findUserByEmail = await User.findOne({ email });
    if (findUserByUsername || findUserByEmail) {
      res.status(409).send({ message: "username or email already exists" });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).send({
        message: "user created successfully",
        fullName,
        username,
        email,
      });
    }
  } catch (error) {
    console.error("registration failed", error);
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password didn't match" });
    }

    // 4. Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // 5. Send success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User login failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { userRegistration, userLogin };
