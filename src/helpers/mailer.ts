import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail=async ({email, emailType, userId}:any)=>{

try {
  //create hash token 
    const hashedToken=await bcryptjs.hash(userId.toString(), 10);
  if(emailType==='VERIFY'){
    await User.findByIdAndUpdate(userId, {verifyToken:hashedToken, verifyTokenExpiry:Date.now()+3600000})
  }else if(emailType==='RESET'){
    await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry:Date.now()+3600000})
  }
console.log('done 1')

  var transport = nodemailer.createTransport({ 
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9606b24a1500c3",
      pass: "229c18e4338f13"
    }
  });  
  console.log('done 2')


  const mailOptions = {
    from: 'suk.m4hh@gmail.com',
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/${emailType==='VERIFY'?'verifyemail':'resetpassword'}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType==='VERIFY'?'verifyemail':'resetpassword'}?token=${hashedToken}
    </p>`
}
console.log('done 3')

const mailresponse = await transport.sendMail(mailOptions);
console.log('done 4')

return mailresponse;

  
} catch (error:any) {
    throw new Error(error.message)
}
}