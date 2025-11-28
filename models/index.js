const Comment = require("./Comment");
const Follow = require("./Follow");
const Like = require("./Like");
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

User.belongsToMany(Post, {
    through: Like,
    foreignKey : "userId"
})

Post.belongsToMany(User, {
    through : Like,
    foreignKey : "postId"
})

User.belongsToMany(User, {
    through : Follow,
    as : "Following",  //people I follow
    foreignKey : "followerId",
    onDelete : "CASCADE"
})

User.belongsToMany(User, {
    through : Follow,
    as : "Followers",
    foreignKey : "followingId",
    onDelete : "CASCADE"
})

module.exports = {
    User,
    Post,
    Comment,
    Like,
    Follow
}