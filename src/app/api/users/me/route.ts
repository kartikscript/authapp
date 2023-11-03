import { NextRequest,NextResponse } from "next/server";
import { getTokenFromData } from "@/helpers/getTokenFormData";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request:NextRequest){

  try {
    const userId= await getTokenFromData(request);
    const user =await User.findOne({_id:userId}).select("-password")
    
   return NextResponse.json({
      message:'User FOund',
      data:user
    })
  } catch (error:any) {
    return NextResponse.json({error:error.message}, {status:400})
  }
}