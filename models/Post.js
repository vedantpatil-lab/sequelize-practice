const {DataTypes} = require("sequelize");
const { sequelize } = require("../config/db");

const Post = sequelize.define("POST", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    title : {
        type : DataTypes.STRING(50),
        allowNull : false,
        unique : true
    },
    content : {
        type : DataTypes.STRING(200),
        allowNull : false,
    }
}, {
    tableName : "posts",
    timestamps : true,
    underscored :  true,
    paranoid : true
})

module.exports = Post;

