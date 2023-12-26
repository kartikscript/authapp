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



////////////////////////////////////////
const enum Size{small=1, med, lar}//default value would be 0 if no value assigned
let mySize  =Size.med
const enum Size2{small='yay', med=3,lar,exlar}//lar=4,...
const num:number =12;

const objVariable:{readonly id:number,isActive:boolean,name?:string}={
     
      id:1,
      isActive:false

      }
//////////////////////////
type Objspecs ={
readonly id:number,
isActive:boolean,
addNum:(num1:number, num2:number)=>number
}

const obj1:Objspecs={
  id:2,
  isActive:true,
  addNum:(num:number,num2:number)=>{return 1+2}
}

function objfunc(user :Objspecs){}
objfunc({id:3,isActive:false,addNum:(num1:number,num2:number)=>34})
//////////////////////////////

const getNum=(val:string , roundTo:number=2):number => {
    return parseInt(val ,roundTo)
}
getNum('12kg',3)

const random =():{name:string ,id :number}=>{

  return {name:'naam' ,id:2}
}
//////////////////////////

const ran:string|number=12

type Nums=10 |20 |30
let num1:Nums=20// same as let num1:10 |20 |30
num1=30

const errorMsg=function(errmsg:string):never{ // never type is used when we know the value will never occur
  throw new Error(errmsg)
}
