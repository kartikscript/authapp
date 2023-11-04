"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function userProfile() {
  const [data, setData] = useState("nothing");

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };

  return (
    
      <div className="h-screen capitalize flex justify-center items-center bg-gradient-to-br from-sky-700 to-green-300 ">
        <div className="w-4/6 h-5/6 flex  items-center  bg-white/50 rounded-tr-[30%] rounded-bl-[30%]">
          <h1 className="z-10 text-8xl self-start m-6  text-white/40 border-r-2 border-b-2 border-r-black/10 border-b-black/10 pb-4">
            Profile
          </h1>
          <div className="border-2  self-start  border-r-0 border-b-0 border-black/10   mt-14 p-12 py-12">
            <button
              className="text-4xl text-white/70 p-2 bg-emerald-400"
              onClick={getUserDetails}
            >
              Get User Details &darr;
            </button>
            <h2 className="text-center p-1 my-1 text-base bg-black/40 text-white/60">
              {data === "nothing" ? (
                "Nothing"
              ) : (
                <Link href={`/profile/${data}`}>id : {data}</Link>
              )}
            </h2>

            <button
              className="block mx-auto text-xl text-red-400 p-2 bg-red-100 mt-8"
              onClick={logout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
   
  );
}
