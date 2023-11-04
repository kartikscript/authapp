'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function resetpassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm]=useState('')


  const router=useRouter()

  const changePassword = async () => {
    try {
      if(password===passwordConfirm){
      await axios.post("/api/users/resetpassword", { token ,password});
      }
router.push('/login')
      
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

 
return(
<div className="h-screen capitalize flex  justify-center items-center bg-gradient-to-br from-sky-700 to-green-300 ">
      <div className="w-4/6 h-5/6 flex flex-col items-center  bg-white/50 rounded-tr-[30%] rounded-bl-[30%]">
        <h1 className="z-10 text-8xl self-start m-6  text-white/40 border-r-2 border-b-2 border-r-black/10 border-b-black/10 pb-4">
          Password<br/> Change
        </h1>
        <div className="border-2   border-r-0 border-b-0 border-black/10   p-12">   
           <label className="text-xl text-teal-700" htmlFor="password">enter new password</label>
      <input
        className="p-1 my-5  border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
      id='password'
      placeholder="new password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <br/>
           <label className="text-xl text-teal-700" htmlFor="confirm password"> confirm password</label>
      <input
        className="p-1 my-5  border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
      id='confirm password'
      placeholder="confirm password"
      value={passwordConfirm}
      onChange={(e)=>setPasswordConfirm(e.target.value)}
      />
      <br/>
      <button className="p-2 mx-auto text-base bg-emerald-400 text-white/60 " onClick={changePassword}>change password</button>
  </div>
  </div>
  </div>
)

}