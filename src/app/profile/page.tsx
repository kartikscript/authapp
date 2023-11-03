"use client"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function userProfile(){
  const [data,setData]=useState('nothing')

const router=useRouter()

  const logout=async ()=>{
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
      
      
    } catch (error:any) {
      console.log(error.message)
    }
  }

  const getUserDetails=async()=>{
    const res = await axios.get('/api/users/me')
    setData(res.data.data._id)

  }

  return(
  <div>
     <p>profile</p>
     <hr/>
     <p>profile page</p>
     <button onClick={logout}>logout</button>
     <h2>{data==='nothing'? "Nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2>

     
     <button onClick={getUserDetails}>get user details</button>


  </div>
  
    )
}