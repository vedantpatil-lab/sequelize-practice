const express = require("express");
const { createComment, deleteComment, updateComment } = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/:postId/comment',authMiddleware, createComment)
router.delete('/:postId/comment/:id', authMiddleware, deleteComment)
router.put('/:postId/comment/:id', authMiddleware,  updateComment)

module.exports = router;