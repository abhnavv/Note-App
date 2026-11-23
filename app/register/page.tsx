"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Register() {
    const router = useRouter()
    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:""
    })
    //console.log(userDetails);
    
    const handleRegister = async(e:any) => {
        e.preventDefault()
        const {name,email,password} = userDetails
        if(!name || !email || !password){
            toast.error("Please Fill The Form Completely !")
        }
        else{
           const res = await fetch('/api/register',{
                method:"POST",
                body:JSON.stringify(userDetails)
            })
            // console.log(res);
            const serverResponse = await res.json()
            // console.log(serverResponse);
            if(res.status === 201){
                toast.success(serverResponse.message)
                router.push('/login')  
            }else{
                toast.error(serverResponse.message)
            }
            setUserDetails({name:"",email:"",password:""})
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-green-300 flex flex-col gap-9 items-center justify-center rounded-2xl p-6 md:p-10 w-full max-w-md shadow-2xl">
                <h1 className="text-2xl font-black">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-7 w-full">
                    <input type="text" name="" id="" placeholder="Username" className="border border-gray-50 rounded shadow-2xl p-2 w-full outline-none px-5" onChange={(e) => setUserDetails({...userDetails,name:e.target.value})} value={userDetails.name}/>
                    <input type="text" name="" id="" placeholder="User Email" className="border border-gray-50 rounded shadow-2xl p-2 w-full outline-none px-5" onChange={(e) => setUserDetails({...userDetails,email:e.target.value})} value={userDetails.email}/>
                    <input type="password" name="" id="" placeholder="Password" className="border border-gray-50 rounded shadow-2xl p-2 w-full outline-none px-5" onChange={(e) => setUserDetails({...userDetails,password:e.target.value})} value={userDetails.password}/>
                    <button type="submit" className="bg-green-800 rounded p-2 text-white font-sans font-bold px-5 mb-4 text-center">Register</button>
                </form>
                <p className="font-extralight text-sm mb-4"> Already have an account ? Please 
                 <Link href={'/login'} className="text-blue-700 font-bold hover:underline ms-2">Login</Link>   
                </p>
            </div>
        </div>
    )
}