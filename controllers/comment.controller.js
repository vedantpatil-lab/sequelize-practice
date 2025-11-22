const { Comment, Post } = require("../models/index");


const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const post = await Post.findOne({ where: { id: postId } })
        if (!post) return res.status(404).json({ message: "Post not found !!" })
        const comment = await Comment.create({ content, postId })
        res.status(201).json({
            message: "Comment added successfully!",
            comment
        });

    } catch (error) {
        console.error("Error Create Comment !", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { postId, id } = req.params;
        const post = await Post.findOne({ where: { id: postId } })
        if (!post) return res.status(404).json({ message: "Post not found !" })
        const comment = await Comment.findOne({ where: { id, postId } })
        if (!comment) return res.status(404).json({ message: "Comment not found for this post !" })
        await comment.destroy();

        res.status(200).json({ message: "Comment deleted successfully!" });

        res.status(200).json({ message: "Comment Deleted Successfully !" })
    } catch (error) {
        console.error("Error Delete Comment !")
        res.status(500).json({ message: "Server Error !" })
    }
}

const updateComment = async(req,res)=>{
    try {
        const {postId, id} = req.params;
        const {content} = req.body;
        const post = await Post.findOne({where : {id : postId}})
        if(!post) return res.status(404).json({message : "Post not found !"})
        const comment = await Comment.findOne({where : {id}})
        if(!comment) return res.status(404).json({message : "Comment doesn't exists for this post."})
        await comment.update({content});
        const updatedComment = await Comment.findOne({where : {id}})
        res.status(200).json({message : "Comment Updated Successfully !", updatedComment})
    } catch (error) {
        console.error("Error Update Error");
        res.status(500).json({message : "Server Error !"})
    }
}

module.exports = { createComment, deleteComment, updateComment }


// ---======-=  Conventions ---========------=
// 'api/post/:id/comment/' get
// 'api/post/:id/comment' post
// 'api/post/:id/comment/:id' post