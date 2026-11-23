"use client"
import { useState } from "react"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Header from "@/app/components/Header";
export default function Add() {
    const router = useRouter()
    const [notes,setNotes] = useState({title:"",description:""})
    // console.log(notes);
    const handleAdd = async(e:any) => {
        e.preventDefault()
        const {title,description} = notes
        if(title && description){
            const res = await fetch('/api/note',{
                method:"POST",
                body:JSON.stringify(notes)
            })
            const data = await res.json()
            console.log(data);
            if(res.status === 201){
                toast.success(data.message)
                setNotes({title:"",description:""})
                router.push("/dashboard")           
            }
            
        }else{
            toast.error("Please enter title & description !")
        }
    }
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-centers m-auto">
                <h1 className="text-4xl font-black text-violet-600 mb-9">Add notes</h1>
                <div className="bg-white w-100 rounded-2xl shadow-2xl border border-gray-200 p-6 border-t-4 border-t-violet-400 border-b-4 border-b-violet-400">
                    <form onSubmit={handleAdd}>
                        <div className="my-5">
                            <input value={notes.title} type="text" placeholder="Title" className="p-2 border border-violet-50 rounded shadow w-full outline-violet-300" onChange={(e)=>setNotes({...notes,title:e.target.value})}/>
                        </div>
                        <div className="my-5">
                            <textarea placeholder="Description" className="p-2 border border-violet-50 rounded shadow w-full outline-violet-300" value={notes.description} onChange={(e)=>setNotes({...notes,description:e.target.value})}/>
                        </div>
                        <button type="submit" className="bg-violet-600 text-white font-bold
                        w-full p-2 rounded mb-5">ADD</button>
                    </form>
    
                </div>
            </div>
        </>
    )
}