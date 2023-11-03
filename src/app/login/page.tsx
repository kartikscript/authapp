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
    <div className="h-screen capitalize flex justify-center items-center bg-gradient-to-br from-sky-700 to-green-300 ">
        <div className="w-4/6 h-5/6 flex  items-center justify-between bg-white/50 rounded-tr-[30%] rounded-bl-[30%]">
            <h1 className="z-10 text-8xl self-start m-6  text-white/40 border-r-2 border-b-2 border-r-black/10 border-b-black/10 pb-4">Login</h1>
            <div className="border-2 border-r-0 border-b-0 border-black/10  ml- mt-20 p-12 py-12">
              
                <h1 className='text-4xl text-white/70 border-b-2 border-b-black/40 mb-6 px-0'>{loading?"Processing..":"Login here"}</h1>
              
                  <label className='text-xl text-teal-700' htmlFor="email">email</label>
                <input 
                id="email"
                placeholder="email"
                type="text"
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                className="p-1 mx-2 my-3 ml-8 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
                  /><br/>
                  <label className='text-xl text-teal-700' htmlFor="password">password</label>
                  <input 
                  id="password"
                  placeholder="password"
                  type="password"
                  value={user.password}
                  onChange={(e)=>setUser({...user,password:e.target.value})}
                  className="p-1 mx-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
                  />
                  <button
                        className="p-2 text-2xl bg-emerald-800 text-white/80 border block mt-8 mx-auto  border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600"
                        onClick={onLogin}>{buttonDisabled?"Fill Details":"login"}</button>
                  <Link  className='flex justify-center  text-emerald-700 text-base ' href="/signup">visit signup page</Link>
       </div>
       </div>
    </div>
  )
}