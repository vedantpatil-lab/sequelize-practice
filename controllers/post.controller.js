// const { where } = require("sequelize");
const { Post, User, Comment, Like } = require("../models/index");
const { sendMail } = require("../utils/sendMail");

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: "All fields are required !" })

        const post = await Post.create({
            title,
            content,
            userId: req.userId
        });

        const user = await User.findByPk(req.userId)
        sendMail(user.email, "Post Created Message !", "You have successfully created the post !")

        return res.status(201).json({ message: "Post created successfully !", post })
    } catch (error) {
        console.error("Error create post", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const posts = await Post.findAll({
            limit,
            offset,
            include: [
                { model: User, attributes: ["id", "username", "email"] },
                { model: Comment }
            ],
            order: [["createdAt", "ASC"]]
        })
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error get all posts !", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({
            where: { id },
            include: [
                { model: User, attributes: ["id", "username"] },
                { model: Comment, attributes: ["content"] }
            ]
        });
        if (!post) return res.status(404).json({ message: "Post not found !" })
        res.status(200).json(post)
    } catch (error) {
        console.error("Error get single post fetch !!", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Post.findOne({ where: { id } })
        if (!post) return res.status(404).json({ message: "Post not found !" })
        // console.log(post)
        if (post.userId !== req.userId) {
            return res.status(403).json({ message: "Unauthorized !" })
        }

        await Post.update({ title, content }, { where: { id } })

        const updatedPost = await Post.findOne({ where: { id } })

        res.status(200).json({ message: "Post updated!", updatedPost });

    } catch (error) {
        console.error("Error Update Post", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findOne({ where: { id } })

        if (!post) return res.status(404).json({ message: "Post not found !!" })

        if (post.userId !== req.userId) {
            return res.status(403).json({ message: "Not authorized !" })
        }

        await post.destroy();

        res.status(200).json({ message: "Post deleted successfully !" })
    } catch (error) {
        console.error("Error Delete Post !")
        req.status(500).json({ message: "Server Error !" })
    }
}

const uploadPost = async (req, res) => {
    try {
        res.status(200).json({ message: "File uploaded Successfully !!" })
    } catch (error) {
        console.error("Error Upload Post !", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id)
        if (!post) return res.status(404).json({ message: "Post not found !" })
        const exists = await Like.findOne({ where: { userId: req.userId, postId: id } })
        if (exists) return res.status(400).json({ message: "You already liked this post !" })
        await Like.create({ userId: req.userId, postId: id })
        const likeCount = await Like.count({ where: { postId: id } })
        res.status(200).json({
            message: "Post liked!",
            likes: likeCount
        });
    } catch (error) {
        console.error("Error Like Post", error)
        res.status(500).json({ message: "Server Error" })
    }
}

const dislikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id)
        if (!post) return res.status(404).json({ message: "Post not found !" })
        const exists = await Like.findOne({ where: { userId: req.userId, postId: id } })
        if (!exists) {
            return res.status(400).json({
                message: "You have not liked this post yet."
            });
        }
        await Like.destroy({
            where: { userId: req.userId, postId: id }
        });

        return res.status(200).json({ message: "Post unliked successfully!" });
    } catch (error) {
        console.error("Error Unlike Post !")
        res.status(500).json({ message: "Server Error !" })
    }
}

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost, uploadPost, likePost, dislikePost }