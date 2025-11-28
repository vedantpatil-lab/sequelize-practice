const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config();

const transport = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user : "vedant.patil@nimapinfotech.com",
        pass : process.env.APP_PASSWORD
    }
})

exports.sendMail = (mail, subject, body)=>{
    const mailOptions = {
        from : "vedant.patil@nimapinfotech.com",
        to : mail,
        subject,
        text : body
    }

    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.error("Error Send Mail !", err)
        }else{
            console.log("Mail Sent Successfully !", info.response)
        }
    })
}