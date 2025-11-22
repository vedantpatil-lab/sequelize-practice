const { User } = require("../models/index");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "All fields are required !" })

        const isExists = await User.findOne({ where: { email } })

        if (isExists) return res.status(400).json({ message: "User already exists. Try Sign In" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({ username, email, password: hashedPassword })

        res.status(201).json({ message: "User Regisetered Successfully !", user })

    } catch (error) {
        console.error("Error Create User !!", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required !" })

        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: "User not found !" })

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(400).json({ message: "Invalid credientials !" })

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: "15m" })
        const refreshToken = jwt.sign({userId : user.id}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn : "7d"})

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,    
            sameSite: "Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000

        });

        sendMail(email, "Login Mail !", "You've successfully logged in !")

        res.status(200).json({
            message: "User Sign in successful !", accessToken, user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Error Logging in !", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User logged Out !" })
    } catch (error) {
        console.error("Error log out !", error)
        res.status(500).json({ message: "Server Error !" })
    }
}

const refreshToken = async(req, res)=>{
    try {
        const token = req.cookies.refreshToken;
        if(!token) return res.status(404).json({message : "Token no found !"})

        const verifyToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)

        if(!verifyToken) return res.status(400).json({message : "Invalid Token !"})

        const newAccessToken = jwt.sign({userId : verifyToken.userId}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn : "15m"})

        return res.status(200).json({newAccessToken})
    } catch (error) {
        console.error("Error refresh token", error)
        res.status(500).json({message : "Server Error"})
    }
}

const profile = async(req, res)=>{
    try {
        res.status(200).json({message : "You can access the profile !"})
    } catch (error) {
        console.error("Error profile access !", error)
        res.status(500).json({message : "Server Error !"})
    }
}



module.exports = { register, login, logout, refreshToken, profile }

