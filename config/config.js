const dotenv = require("dotenv")

dotenv.config();

module.exports = {
  development :{
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NEW,
    port : process.env.DB_PORT,
    dialect : "postgres",
    host : process.env.DB_HOST
  }
}