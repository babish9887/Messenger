'use client'
import { FullConversationType } from "@/app/types"
import { useRouter } from "next/navigation"
import { use, useEffect, useMemo, useState } from "react"
import useCoversation from "@/app/hooks/useConversation"
import clsx from "clsx"
import { MdOutlineGroupAdd } from "react-icons/md"
import ConversationBox from "./ConversationBox"
import GroupChatModal from "./GroupChatModal"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/app/lib/pusher"
import { find } from "lodash"

interface  ConversationProps{
      initialItems: FullConversationType[];
      users: User[]
}

const ConversationList: React.FC<ConversationProps> = ({initialItems, users})=>{
      const session=useSession();
      const [items, setItems]=useState(initialItems)
      const [isModalOpen, setIsModalOpen]=useState(false);

      const router=useRouter();
      const{conversationId, isOpen}=useCoversation();

      const pusherKey=useMemo(()=>{
            return session.data?.user?.email;
      },[session.data?.user?.email])

      useEffect(()=>{
            if(!pusherKey)
                  return;

            const newHandler=(conversation:FullConversationType)=>{
                  setItems((current)=>{
                        if(find(current,{id: conversation.id})){
                              return current;
                        }
                        return [conversation, ...current]
                  })
            }
            const updateHandler=(conversation:FullConversationType)=>{
                  setItems((current)=>current.map(currentConversation=>{
                        if(currentConversation.id===conversation.id){
                              return{
                                    ...currentConversation,
                                    messages: conversation.messages
                              }
                        }
                        return currentConversation;
                  }))
            }
            const removeHandler=(conversation:FullConversationType)=>{
                  setItems((current)=>{
                        return[...current.filter((convo)=> convo.id!== conversation.id)]
                  })
                  if(conversationId === conversation.id){
                        router.push('/conversations');
                  }
            }
            pusherClient.subscribe(pusherKey)
            pusherClient.bind('conversation:new', newHandler);
            pusherClient.bind('conversation:update', updateHandler);
            pusherClient.bind('conversation:remove',removeHandler)

            return()=>{
                  pusherClient.unsubscribe(pusherKey);
                  pusherClient.unbind('conversation:new', newHandler);
                  pusherClient.unbind('conversation:update', updateHandler)
                  pusherClient.unbind('conversation:remove',removeHandler)

            }
      },[pusherKey, conversationId, router])
      return(
            <>
            <GroupChatModal users={users} isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
            <aside className={clsx(`sm:w-[105px] md:w-[115px] z-0 bg-white dark:bg-slate-900 fixed inset-y-0 pb-20 lg:pb-30 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 sm:block`,
            isOpen? "hidden":"block w-full left-0"
            )}>
                  <div className="px-5">
                        <div className="flex justify-between mb-4 lg:flex-row sm:flex-col pt-4">
                              <div className="text-2xl font-extrabold text-neutral-800 block dark:text-neutral-200"> 
                                    Chats
                              </div>
                              <div 
                              onClick={()=>setIsModalOpen(true)}
                              className=" lg:flex rounded-full p-2 flex items-center justify-center bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                                    <MdOutlineGroupAdd size={20}/>
                              </div>
                        </div>
                  {items.map(item=>(
                        <ConversationBox key={item.id} data={item} selected={conversationId===item.id} />
                  ))}
                  </div>
                  
            </aside>
            </>

      )
}
export default ConversationList