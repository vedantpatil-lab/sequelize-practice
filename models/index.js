const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

User.hasMany(Post, {
    foreignKey : "userId",
    onDelete : "CASCADE"
})

Post.belongsTo(User, {
    foreignKey : "userId",
    onDelete : "CASCADE"
})

Post.hasMany(Comment, {
    foreignKey : "postId",
    onDelete : "CASCADE"
})

Comment.belongsTo(Post, {
    foreignKey : "postId",
    onDelete : "CASCADE"
})

module.exports = {
    User,
    Post,
    Comment
}