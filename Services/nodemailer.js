import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config()
export const nodeMailer= async(user,token,res)=>{

const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
    user:process.env.PASSMAIL ,
    pass:process.env.PASSKEY,
  },
});

const mailOptions={

  from: process.env.PASSMAIL , // sender address
  to: user.email, // list of receivers
  subject: "Password Reset", // Subject line
text:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
      `https://authentication-frontend-taupe.vercel.app/reset-password/${user._id}/${token}`
}
transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error);
    res.status(500).json({message:"Internal server error in sending the mail"})
  }else{
    res.status(200).json({message:"Email sent successfully"})
  }
})


}

