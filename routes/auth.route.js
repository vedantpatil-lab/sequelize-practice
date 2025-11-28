const express = require("express");
const { register, login, logout, refreshToken, profile, followUser, unfollowUser, deleteUser, getUsers } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.get('/profile', authMiddleware, profile)
router.post('/:id/follow', authMiddleware, followUser)
router.post('/:id/unfollow', authMiddleware, unfollowUser)
router.delete('/:id', authMiddleware, deleteUser)
router.get("/", getUsers)

module.exports = router;