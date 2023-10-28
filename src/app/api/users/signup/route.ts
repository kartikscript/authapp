import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';



connect()

export async function POST(req:NextRequest){ 
  
     try{

      const reqBody= await req.json();
      const { username, password, email }=reqBody

      const user=await User.findOne({email});
      if(user){
        return NextResponse.json({message:'User already exists'}, {status:400})
      }
      //hashing password
      const salt=await bcryptjs.genSalt(10)//adding random strings/num in user password to make it more securee
      const hashedPassword=await bcryptjs.hash(password, salt)

      const newUser= new User({
        username,
        email,
        password:hashedPassword,
      })
      const savedUser=await newUser.save()

      return NextResponse.json({
        message:'User created successfully',
        success:true,
        savedUser
      })
     }catch(err:any){
      NextResponse.json({error:err.message} , {status:500})
     }
}