import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'


connect()


export async function POST(req:NextRequest){ 

  try {

    const reqBody= await req.json();
    const { username, password, email }=reqBody

    //checking if user exists
    const user=await User.findOne({email});
    if(!user){
      return NextResponse.json({message:'User doesnot exist'}, {status:400})
    }
    //check whether password is correct
    const validPassword = await bcryptjs.compare(password, user.password)
    if(!validPassword){
      return NextResponse.json({message:'incorrect password'}, {status:400})
    }
    //create token data
    const tokenData= {
      id: user._id,
      email:user.email,
      username:user.username,
    }
    //create token
    const token= await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"})
    
    const response=NextResponse.json({
      message:"login success",
      success:true
    })
    response.cookies.set("token",token, {
      httpOnly:true,
    })
    return response
    
  } catch (error:any) {
     return NextResponse.json({error:error.message} ,{status:500})
  }



}