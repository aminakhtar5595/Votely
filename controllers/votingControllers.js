const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidateModel");
const User = require("../models/userModel");

// @desc Get all candidates
// @route GET /candidates
// @access Public
const getCandidatesList = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find().sort({ votes: -1 });
  res.status(200).json(candidates);
});

// @desc Vote for a candidate
// @route POST /vote/:id
// @access Private
const voteCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.candidateId);
  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.hasVoted) {
    return res.status(400).json({ message: "You have already voted" });
  }

  candidate.votes += 1;
  await candidate.save();

  user.hasVoted = true;
  await user.save();

  res.status(200).json({ message: "Vote recorded successfully" });
});

// @desc Get live vote counts
// @route GET /vote/counts
// @access Public
const getVoteCounts = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find().sort({ votes: -1 });
  res.status(200).json(candidates);
});

module.exports = { getCandidatesList, voteCandidate, getVoteCounts };
