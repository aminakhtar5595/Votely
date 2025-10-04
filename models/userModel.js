const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please add a username"] },
    password: { type: String, required: [true, "Please add a password"] },
    governmentId: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    hasVoted: { type: Boolean, default: false },
    votedFor: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);