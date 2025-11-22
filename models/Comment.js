const {DataTypes} = require("sequelize")
const { sequelize } = require("../config/db")

const Comment = sequelize.define("Comment", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    content : {
        type : DataTypes.STRING(200),
        allowNull :  false,
    }
}, {
    tableName : "comments",
    timestamps : true,
    underscored : true
})

module.exports = Comment;