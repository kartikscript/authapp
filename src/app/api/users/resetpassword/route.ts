import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import  bcryptjs  from 'bcryptjs';


export  async function POST (request:NextRequest){

  try {
    const reqBody =await request.json()
    const {token, password}=reqBody;

    const user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry:{$gt:Date.now()}})
    
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    user.password=hashedPassword
    user.forgotPasswordToken =undefined
    user.forgotPasswordTokenExpiry=undefined

    await user.save()
     return NextResponse.json({
      success:true
     })

    
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:400})
  }
}