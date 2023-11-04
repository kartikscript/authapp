'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function resetpassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm]=useState('')
  const [ischanged,setIsChanged] = useState(false)
  const router=useRouter()

  const changePassword = async () => {
    try {
      if(password===passwordConfirm){
      await axios.post("/api/users/resetpassword", { token ,password});
      }
      
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

 
return(
  <div>
      <label htmlFor="password">enter new password</label>
      <input
      id='password'
      placeholder="new password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <br/>
           <label htmlFor="confirm password"> confirm password</label>
      <input
      id='confirm password'
      placeholder="confirm password"
      value={passwordConfirm}
      onChange={(e)=>setPasswordConfirm(e.target.value)}
      />
      <br/>
      <button onClick={changePassword}>change password</button>
      <p>{ischanged?"password changed" :""}</p>
  </div>
)

}