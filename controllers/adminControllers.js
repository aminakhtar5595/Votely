const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidateModel");

// @desc Create new candidate
// @route POST /candidates
// @access Admin
const createCandidate = asyncHandler(async (req, res) => {
  const { name, party } = req.body;

  if (!name || !party) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  const candidate = await Candidate.create({ name, party });
  res.status(201).json(candidate);
});

// @desc Update candidate
// @route PUT /candidates/:id
// @access Admin
const updateCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.candidateId);
  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  const updatedCandidate = await Candidate.findByIdAndUpdate(
    req.params.candidateId,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCandidate);
});

// @desc Delete candidate
// @route DELETE /candidates/:id
// @access Admin
const deleteCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.candidateId);
  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  await Candidate.deleteOne({ _id: req.params.candidateId });
  res.status(200).json({ message: "Candidate removed successfully" });
});

module.exports = { createCandidate, updateCandidate, deleteCandidate };
