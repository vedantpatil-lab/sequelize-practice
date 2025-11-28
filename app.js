const express = require("express")
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send("Home Page")
})

app.use("/api/users", userRouter)
app.use('/api/posts', postRouter)
app.use('/api/posts', commentRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})