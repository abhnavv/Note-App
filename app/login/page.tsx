"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
    const [userDetails,setUserDetails] = useState({
        email:"",
        password:""
    })
    const handleLogin =  async(e:any) => {
        e.preventDefault()
        const {email,password} = userDetails
        if(!email || !password){
            toast.error("Please enter email & password !")
        }else{
            await signIn("credentials",{email,password,callbackUrl:'/dashboard'})
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-green-300 flex flex-col gap-9 items-center justify-center rounded-2xl p-6 md:p-10 w-full max-w-md shadow-2xl">
                <h1 className="text-2xl font-black mt-3">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-7 w-full">
                    <input type="email" name="" id="" placeholder="user email" className="border border-gray-50 rounded shadow-2xl p-2 w-full outline-none px-5" value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
                    <input type="password" name="" id="" placeholder="Password" className="border border-gray-50 rounded shadow-2xl p-2 w-full outline-none px-5" value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
                    <button type="submit" className="bg-green-800 rounded p-2 text-white font-sans font-bold px-5">Login</button>
                </form>
                <p className="font-extralight text-sm mb-4"> Don't have an account ? Please
                 <Link href={'/register'} className="text-blue-700 font-bold hover:underline ms-2">Register</Link>   
                </p>
            </div>
        </div>
    )
}