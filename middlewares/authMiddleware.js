const jwt = require("jsonwebtoken")

const authMiddleware = async(req,res,next)=>{
    try {
        const authHeader = req.header('Authorization')
        if(!authHeader) return res.status(401).json({message : "No token provided !"})
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
        if (!token) {
            return res.status(401).json({ message: "Invalid token format!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error auth middleware", error)
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authMiddleware;

