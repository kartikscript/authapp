"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="h-screen capitalize flex  justify-center items-center bg-gradient-to-br from-sky-700 to-green-300 ">
      <div className="w-4/6 h-5/6 flex flex-col items-center  bg-white/50 rounded-tr-[30%] rounded-bl-[30%]">
        <h1 className="z-10 text-8xl self-start m-6  text-white/40 border-r-2 border-b-2 border-r-black/10 border-b-black/10 pb-4">
          Email <br/>Verification
        </h1>
        <div className="border-2   border-r-0 border-b-0 border-black/10   p-12">
          <h2 className="p-2 bg-emerald-300 text-black/70">
            {token ? `Token : ${token}` : "no token"}
          </h2>

          {verified && (
            <div>
              <h2 className="text-2xl text-center p-2 text-green-700 bg-green-300">Email Verified!!</h2>
              <Link className="text-xl mt-3 text-black/70 text-center block" href="/login">Login</Link>
            </div>
          )}
          {error && (
            
              <h2 className="text-2xl  text-center mt-4 bg-red-300 text-red-700">Error!!</h2>
            
          )}
        </div>
      </div>
    </div>
  );
}
