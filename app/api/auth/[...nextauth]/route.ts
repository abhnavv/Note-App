import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";
const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{},
            async authorize(credentials:any){
                await connectDB()
                const existingUser = await users.findOne({email:credentials.email})
                if(!existingUser){
                    return null
                }else{
                    const isPasswordMatch = await bcrypt.compare(credentials.password,existingUser.password)
                    if(!isPasswordMatch){
                        return null
                    }else{
                        return {
                            id:existingUser._id,
                            name:existingUser.name,
                            email:existingUser.email
                        }
                    }
                }
            }
        
        })
    ],
    session:{
        strategy:'jwt'
    },
    pages:{
        'signIn':'/login'
    }
})

export {handler as GET,handler as POST}
