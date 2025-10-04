const express = require('express');
const { createCandidate, updateCandidate, deleteCandidate } = require('../controllers/adminControllers');
const router = express.Router();
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const validateToken = require('../middlewares/authMiddleware');

router.post('/candidates', validateToken, createCandidate);
router.put('/candidates/:candidateId', validateToken, updateCandidate);
router.delete('/candidates/:candidateId', validateToken, deleteCandidate);


module.exports = router;
