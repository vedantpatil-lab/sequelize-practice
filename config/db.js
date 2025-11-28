const {Sequelize} = require("sequelize");
const dotenv = require("dotenv")

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect : "postgres",
        port : process.env.DB_PORT,
        host : process.env.DB_HOST,
        logging : false,
        pool : {
            max : 5,
            min : 0,
            acquire : 30000,
            idle : 10000
        }
    }
)

const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log("POSTGRES CONNECTED SUCCESSFULLY !!")
        // await sequelize.sync();
        // console.log("ALL TABLES SYNCED !")
    } catch (error) {
        console.error("Error connecting postgres !", error.message)
        return false
    }
}

module.exports = {sequelize, connectDB}