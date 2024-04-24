import bcrypt from "bcrypt"
import prisma from '@/app/lib/prismadb'
import { NextResponse } from "next/server"
import { sendEmail } from "@/app/lib/mailer"

export async function POST(request: Request){
      try{
      const {token}= await request.json()
      if(!token)
            return new NextResponse('Missing info', {status: 400})
            const res= await prisma.user.updateMany({
                  where:{
                        AND:[
                              {verifyToken: token},
                              {verifyTokenExpiry:{
                                    gt:new Date()
                              }}
                        ]
                  },
                  data:{
                        emailVerified: new Date(),
                        verifyToken:  "",
                        verifyTokenExpiry:null
                  }
            })
            if(res.count===1)
                  return NextResponse.json({status:true, message:"Email Verified"},{status:200})
            else
                  return NextResponse.json({status:false, message:"Token Expired"},{status:400})

      } catch(e: any){
            return NextResponse.json({status:false, message:"Something went wrong"},{status:400})

      }
}