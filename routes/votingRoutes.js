const express = require('express');
const { getCandidatesList, voteCandidate, getVoteCounts } = require('../controllers/votingControllers');
const validateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/candidates", validateToken, getCandidatesList);
router.post("/vote/:candidateId", validateToken, voteCandidate);
router.get("/vote/counts", validateToken, getVoteCounts);

module.exports = router;