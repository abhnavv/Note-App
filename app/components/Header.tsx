"use client"
import { signOut } from "next-auth/react"
export default function Header() {
    const handleLogout = async() => {
        await signOut({
            callbackUrl:'/login'
        })
    }
    return (
        <header className="shadow border-b-gray-50 p-3 flex justify-between">
            <div className="flex items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3M-Skb1lYpod3Q3R73aHESLe_GkTqv8kHo29fCiIGfg&s=10" alt="" height={60} width={70}/>
                <h1 className="text-2xl font-black text-blue-900">Note-APP</h1>
                </div>          
            <button className="bg-red-500 text-white p-2 rounded text-sm my-auto" onClick={handleLogout}>LOGOUT</button>
        </header>
    )
}