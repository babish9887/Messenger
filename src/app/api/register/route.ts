import bcrypt from "bcrypt"
import prisma from '@/app/lib/prismadb'
import { NextResponse } from "next/server"
import { sendEmail } from "@/app/lib/mailer"

export async function POST(request: Request){
      try{
      const {email, password, name}= await request.json()

      if(!email || !name || !password)
            return new NextResponse('Missing info', {status: 400})
      
      const hashedPassword = await bcrypt.hash(password, 12);

      const user= await prisma.user.create({
            data:{
                  email, name, hashedPassword
            }
      })
      const res=sendEmail({email, emailType: "VERIFY", userId: user.id})

      return NextResponse.json(user)
      } catch(e: any){
            console.log(e.message)
            return new NextResponse('Internal Error', {status: 500})
      }
}