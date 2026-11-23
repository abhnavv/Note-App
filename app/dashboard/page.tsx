"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
import Header from "../components/Header";
interface Note {
    _id:string,
    title:string,
    description:string
}

export default function Dashboard() {
    const [allNotes,setAllNotes] = useState<Note[]>([])
    //console.log(allNotes);
    useEffect(() => {
        getAllNotes()
    },[])
    const getAllNotes = async() => {
        const res = await fetch('/api/note')
        const response = await res.json()
        setAllNotes(response.data)
    }
    const handleDelete = async(id:string) => {
        const res = await fetch(`/api/note/${id}`,{
            method:"DELETE"
        })
        const response = await res.json()
        if(res.status === 200) {
            toast.success(response.message)
            getAllNotes()
        }
    }
    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center m-6">
                <h1 className="text-7xl font-black text-blue-600 mb-3 italic">Your Notes
                </h1>
                <p className="font-extralight italic text-gray-500 mb-5">Manage your notes easily</p>
               
                <Link href={'/dashboard/add'} className="bg-violet-600 text-white p-2 px-4 rounded-xl ms-auto font-bold font-sans me-8">Add Notes + </Link>
                
                <div className="m-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {   
                        allNotes?.length > 0 ? 
                        allNotes?.map((note:Note) => (
                            <div key={note?._id} className="rounded-2xl p-5 shadow bg-violet-100 border-4 border-t-blue-500  border-b-blue-500 border-x-0 h-full flex flex-col">
                        <h1 className="text-2xl font-bold">{note?.title}</h1>
                        <p className="font-extralight text-sm">{note?.description}</p>
                        <div className="flex items-center justify-between mt-auto pt-6 font-serif">
                            <Link href={`/dashboard/${note?._id}`} className="p-2 px-5 bg-yellow-400 rounded">
                                Edit
                            </Link>
                            <button onClick={()=>handleDelete(note?._id)} className="p-2 bg-red-400 rounded ">
                                Delete
                            </button>
                        </div>
                       
    
                    </div>
                        ))
                        
                    :
                    <p className="text-center font-bold text-red-500 text-lg font-serif">No Note Added Yet !</p>
                    }
                </div>
            </div>
        </>
    )
}