const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")
const bcrypt = require("bcrypt")
const { sendMail } = require("../utils/sendMail")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
},{
    tableName: "users",
    timestamps: true,
    underscored: true,
    paranoid: true,
    defaultScope :{
        attributes : { exclude : ['deletedAt'] }   
    },
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10)
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10)
            }
        },
        afterCreate : async(user)=>{
            await sendMail(
                user.email,
                "Welcome Message !",
                `Hello ${user.username}, welcome to our organization !`
            )
            console.log("Email sent !")
        }
    }
})

module.exports = User;
