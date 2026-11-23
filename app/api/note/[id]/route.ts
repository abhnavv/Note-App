import { connectDB } from "@/lib/mongodb";
import notes from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params
        const noteDetails = await notes.findById(id)
        return NextResponse.json({ message: "Note Details", data: noteDetails }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went Wrong", data: {} }, { status: 500 })
    }
}
export async function PUT(req: NextRequest, {params}:{params:{id:string}}) {
    try {
        const {id} = await params
        const body = await req.json()
        await notes.findByIdAndUpdate({_id:id},body,{new:true})
        return NextResponse.json({message:"Note Updated Successfully",data:{}},{status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went Wrong",data:{}},{status:500})
        
    }
 }

 export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = await params
        const deleteNote = await notes.findByIdAndDelete({_id:id})
        return NextResponse.json({message:"Note Deleted Successfully",data:deleteNote},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went Wrong",data:{}},{status:500})
        
    }
 }