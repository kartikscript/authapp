"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
    <div className="h-screen capitalize flex justify-center items-center bg-gradient-to-br from-sky-700 to-green-300 ">
        
        <div className="w-4/6 h-5/6 flex  items-center justify-between bg-white/50 rounded-tr-[30%] rounded-bl-[30%]">

            <h1 className="z-10 text-8xl self-start m-6  text-white/40 border-r-2 border-b-2 border-r-black/10 border-b-black/10 pb-4">Signup</h1>
            <div className="border-2 border-r-0 border-b-0 border-black/10  -translate-x-32 mt-20 p-12 py-12">
              
                 <h2 className=" text-4xl text-white/70 border-b-2 border-b-black/40 mb-6 px-0">{loading ? "Processing..." : `Welcome ${user.username.substring(0,9)}...`}</h2>
                 
                    <label className="text-xl text-teal-700" htmlFor="username">username</label>
                    <input 
                    className="p-1 mx-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="username"
                        /><br/>
                    <label className="text-xl text-teal-700" htmlFor="email">email</label>
                    <input 
                    className="p-1 my-5 ml-12 ml-autoborder border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email"
                        /><br/>
                    <label  className="text-xl text-teal-700" htmlFor="password">password</label>
                    <input 
                    className="p-1 mx-2  border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                        /><br/>
                        <button
                        onClick={onSignup}
                        className="p-2 text-2xl bg-emerald-800 text-white/80 border block mt-8 mx-auto  border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600">
                        {buttonDisabled ? "Fill details" : "Sign-up"}
                        </button>
                        <Link className='flex justify-center  text-emerald-700 text-base ' href="/login">Visit login page</Link>
            </div>
        </div>
     </div>
    )

}