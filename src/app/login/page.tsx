"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios"



export default function LoginPage(){
  const router=useRouter()

  const [user, setUser]=useState({
    email:'',
    password:'',
  })
  const [buttonDisabled, setButtonDisabled]= useState(false)
  const [loading, setLoading]= useState(false)

  
  const onLogin=async function(){
    try {
      setLoading(true)
      const response=await axios.post('/api/users/login', user);
      console.log('login success', response.data)
      router.push('/profile')
    } catch (error:any) {
      console.log('login failed', error.message)
    } finally{
      setLoading(false)
    }
    
  }

  useEffect(()=>{
     if(user.email.length>0,user.password.length>0){
         setButtonDisabled(false)
     }else{
      setButtonDisabled(true)
     }

  }, [user])

  return(
    <div>
      <h1>{loading?"processing..":"login"}</h1>
     
        <label htmlFor="email">email</label>
       <input 
       id="email"
       placeholder="email"
       type="text"
       value={user.email}
       onChange={(e)=>setUser({...user,email:e.target.value})}
        />
         <label htmlFor="password">password</label>
        <input 
        id="password"
        placeholder="password"
        type="password"
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
         />
         <button onClick={onLogin}>login here</button>
         <Link href="/signup">visit signup page</Link>
    </div>
  )
}