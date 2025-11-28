const {DataTypes} = require("sequelize")
const { sequelize } = require("../config/db")

const Follow = sequelize.define("Follow", {
    followerId:{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    followingId : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
},{
    tableName: "follows",
    timestamps: true,
    underscored: true,
})

module.exports = Follow;