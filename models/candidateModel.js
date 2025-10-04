const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add candidate name"],
    },
    party: {
      type: String,
      required: [true, "Please add candidate party"],
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", candidateSchema);
