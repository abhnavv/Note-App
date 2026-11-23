"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import Header from "@/app/components/Header";
export default function Edit() {
    const router = useRouter()
    const {id} = useParams()
    const [note,setNote] = useState({title:"",description:""})
    console.log(note);
    useEffect(()=>{
        getNoteDetails()
    },[])
    const getNoteDetails = async() => {
        const res = await fetch(`/api/note/${id}`)
        const response = await res.json()
        // console.log(response);
        if(res.status === 200){
            setNote({title:response.data.title,description:response.data.description})
        }
    }
    
    const handleEdit = async(e:any) => {
        e.preventDefault()
        const {title,description} = note
        if(title && description){
            const res = await fetch(`/api/note/${id}`,{
                method:"PUT",
                body:JSON.stringify(note)
            })
            const data = await res.json()
            console.log(data);
            if(res.status === 200){
                toast.success(data.message)
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
                <h1 className="text-5xl font-black text-yellow-600 mb-9">Update note</h1>
                {   note ?
                    <div className="bg-white w-100 md:w-150 md:h-90 rounded-2xl shadow-2xl border border-gray-200 p-6 border-t-4 border-t-yellow-400 border-b-4 border-b-yellow-400">
                    <form onSubmit={handleEdit} className="flex items-center justify-center flex-col">
                        <div className="my-5 w-full">
                            <input value={note.title} type="text" placeholder="Title" className="p-2 border border-yellow-50 rounded shadow w-full outline-yellow-300" onChange={(e)=>setNote({...note,title:e.target.value})}/>
                        </div>
                        <div className="my-5 w-full">
                            <textarea placeholder="Description" className="p-2 border border-yellow-50 rounded shadow w-full outline-yellow-300" value={note.description} onChange={(e)=>setNote({...note,description:e.target.value})}/>
                        </div>
                        <button type="submit" className="bg-yellow-600 text-white font-bold
                        w-full p-2 rounded my-5">Update</button>
                    </form>
    
                </div>
                :
                <p className="text-yellow-300">Loading...</p>}
            </div>
        </>
       
    )
}