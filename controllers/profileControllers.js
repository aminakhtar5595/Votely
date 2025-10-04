const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// @desc Get logged-in user profile
// @route GET /profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password"); // exclude password
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc Update password
// @route PUT /profile/password
// @access Private
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new password are required" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});

module.exports = { getProfile, updatePassword };
