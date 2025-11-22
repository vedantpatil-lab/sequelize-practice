const express = require("express");
const { register, login, logout, refreshToken, profile } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.get('/profile', authMiddleware, profile)

module.exports = router;