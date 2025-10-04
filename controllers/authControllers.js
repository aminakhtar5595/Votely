const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Signup new user
// @route POST /signup
// @access Public
const signup = asyncHandler(async (req, res) => {
  const { username, governmentId, password } = req.body;

  if (!username || !governmentId || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ governmentId });
  if (userExists) {
    return res.status(400).json({ message: "Government ID already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    governmentId,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: { id: user._id, username: user.username, governmentId: user.governmentId }
  });
});

// @desc Login user with governmentId + password
// @route POST /login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { governmentId, password } = req.body;

  if (!governmentId || !password) {
    return res.status(400).json({ message: "Government ID and password are required" });
  }

  const user = await User.findOne({ governmentId });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      user: {
        id: user._id,
        username: user.username,
        governmentId: user.governmentId,
        role: user.role
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );


  res.json({
    message: "Login successful",
    token,
    user: { id: user._id, username: user.username, governmentId: user.governmentId, role: user.role }
  });
});

module.exports = { signup, login };
