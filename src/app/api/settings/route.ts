import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request){
      try{
      const currentUser=await getCurrentUser()
      const {name, image}=await request.json();
      
      if(!currentUser?.id){
            return new NextResponse('Unauthorized', {status: 401})
      }

      const updatedUser=await prisma?.user.update({
            where:{
                  id: currentUser.id
            },
            data: {
                  image: image,
                  name: name
            }
      })
      return NextResponse.json(updatedUser)
      }catch(e:any){
            console.log(e)
            return new NextResponse(e, {status:500});
      }
}