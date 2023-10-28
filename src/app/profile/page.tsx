"use client"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
export default function userProfile(){

const router=useRouter()

  const logout=async ()=>{
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
      
    } catch (error:any) {
      console.log(error.message)
    }

  }

  return(
  <div>
     <p>profile</p>
     <hr/>
     <button onClick={logout}>logout</button>


  </div>
  
    )
}