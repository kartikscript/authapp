import { connect } from "@/dbConfig/dbConfig";

import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';


connect()

export  async function POST (request:NextRequest){

  try {
    const reqBody = await request.json();
    const {email} = reqBody
    console.log('got 2')
 
   const user = await User.findOne({email})
   console.log('got 1', user)
   if(!user){
      return NextResponse.json({message:"user does not exist"}, {status:500})
   }
    //send token

   await sendEmail({email, emailType: "RESET", userId: user._id})    

  return NextResponse.json({
    success:true,
    
  })
    
  } catch (error:any) {
return NextResponse.json({message:'invalid email'}, {status:400})    
  }
}