"use client";

import axios from "axios";
import { useState ,} from "react";
import { useRouter } from 'next/navigation';



export default function forgotpassword() {

  const [email, setEmail] = useState("");
  const [token, setToken]=useState('');
  const [buttonDisabled, setButtonDisabled]=useState(false)

  const router=useRouter()

  const sendToken =async function(){
    try{
    console.log(email)

     await axios.post('/api/users/forgotpassword', {email})
     
console.log('sent res')
    }catch(err:any){
        console.log(err.message)
    }
  
  }


 


  return (
    <div>
      <label htmlFor="enter your email">enter your email</label>
      <input
        id="enter your email"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <button onClick={sendToken}>Send token</button>
 
    </div>
  );
}
