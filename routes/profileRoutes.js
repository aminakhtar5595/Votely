const express = require("express");
const { getProfile, updatePassword } = require("../controllers/profileControllers");
const validateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", validateToken, getProfile);
router.put("/profile/password", validateToken, updatePassword);

module.exports = router;
