import prisma from '@/app/lib/prismadb'
import getCurrentUser from './getCurrentUser'

const getConversationById = async (ConversationId:string)=>{
      try{
      const currentUser=await getCurrentUser();

      if(!currentUser?.email){
            return null;
      }

      const conversation=await prisma.conversation.findUnique({
            where:{
                  id:ConversationId
            },
            include:{
                  users: true
            }
      })
      return conversation;
      } catch(e:any){
            return null;
      }
}

export default getConversationById