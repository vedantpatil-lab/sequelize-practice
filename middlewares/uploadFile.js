const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, path.join(__dirname, "..", 'uploads'))
    },

    filename : (req,file,cb)=>{
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})

const uploadFile = multer({storage})

module.exports = uploadFile;