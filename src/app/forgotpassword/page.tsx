"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const sendToken = async function () {
    try {
      console.log(email);

      await axios.post("/api/users/forgotpassword", { email });
      setButtonDisabled(true);
      console.log("sent res");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen capitalize flex justify-center items-center bg-gradient-to-br from-sky-700 to-green-300 ">
      <div className="w-4/6 h-5/6 flex  items-center justify-between bg-white/50 rounded-tr-[30%] rounded-bl-[30%]">
        <h1 className="z-10 text-8xl self-start m-6  text-white/40 border-r-2 border-b-2 border-r-black/10 border-b-black/10 pb-4">
          Get Token
        </h1>
        <div className="justify-self-start border-l-2 border-t-2 border-l-black/10 border-t-black/10 p-4">
          <label className="text-xl text-teal-700" htmlFor="enter your email">
            enter your email
          </label>
          <input
            className="p-1 my-5  border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
            id="enter your email"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button
            className="p-2 text-base bg-emerald-400 text-white/60 "
            onClick={sendToken}
          >
            Send token
          </button>
          {buttonDisabled && (
            <h2 className="text-2xl text-center p-2 text-green-700 bg-green-300">
              token sent!!
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
