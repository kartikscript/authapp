"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SignupPage(){

  const router=useRouter()

  const [user, setUser]=useState({
    username:'',
    email:'',
    password:'',
  })

  const [buttonDisabled, setButtonDisabled]= useState(false)
  const [loading, setLoading]= useState(false)


  // const onSignup=async function(){
  //     try{
  //       setLoading(false);
  //       const response= await axios.post('/api/users/signup', user)
  //       console.log('success', response.data)
  //       router.push('/login')
 
  //     }catch(err:any){
  //       console.log('Signup failed', err.message)

  //     }finally{
  //       setLoading(false)
  //     }
  // }
  const onSignup = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success", response.data);
        router.push("/login");
        
    } catch (error:any) {
        console.log("Signup failed", error.message);
        
       
    }finally {
        setLoading(false);
    }
}

  useEffect(()=>{
     if(user.username.length>0,user.email.length>0,user.password.length>0){
         setButtonDisabled(false)
     }else{
      setButtonDisabled(true)
     }

  }, [user])

  return(
    <div>
      <h1>{loading?"Processing...":"Signup"}</h1> 
      <label htmlFor="username">username</label>
      <input 
      id="username"
      placeholder="username"
      type="text"
      value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
       />

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

         <button onClick={onSignup}>{buttonDisabled?"no signup":"signup"}</button>
         <Link href="/login">visit login page</Link>
    </div>

  )
}