const express = require("express");
const { createPost, getAllPosts, getPost, updatePost, deletePost, uploadPost, likePost, dislikePost } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadFile = require("../middlewares/uploadFile");

const router = express.Router();

router.post('/',authMiddleware, createPost)
router.get('/', getAllPosts)
router.get('/:id', getPost)
router.put('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.post('/:id/upload', uploadFile.array("file"), uploadPost)
router.post('/:id/like', authMiddleware, likePost)
router.post('/:id/dislike', authMiddleware, dislikePost)

module.exports = router;