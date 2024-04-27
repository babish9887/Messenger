"use client"
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import Avatar from '@/app/components/Avatar'
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '@/app/components/AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'

interface HeaderProps{
      conversation: Conversation  & {
            users:User[]
      }
      messages: any
};

const Header:React.FC<HeaderProps>=({conversation, messages})=> {
      const otherUser=useOtherUser(conversation);
      const [drawerOpen, setDrawerOpen]=useState(false)
      const {members}=useActiveList();
      const isActive=members.indexOf(otherUser?.email!)!==-1;
      const [images, setImages]=useState([]);     

      const statusText=useMemo(()=>{
            if(conversation.isGroup){
                  return `${conversation.users.length} members`;
            }
            return isActive? 'Active':'Offline';
      },[conversation, isActive])

      function handleClick(){
            setDrawerOpen(true);
            const images=messages.filter((message:any)=>message.image!==null)
            setImages(images)
      }
      return (
      <>
            <ProfileDrawer  messages={messages} data={conversation} isOpen={drawerOpen} onClose={()=>setDrawerOpen(false)} />
            <div className='bg-white dark:bg-gray-800 w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
                  <div className='flex gap-3 items-center'>
                        <div className='lg:hidden block text-indigo-500 hover:text-sky-600 transition cursor-pointer'>
                        <Link href='/conversations'><HiChevronLeft size={32} /></Link>
                        </div>
                        {conversation.isGroup?(
                              <div>
                              <AvatarGroup users={conversation.users} />
                              </div>
                        ):(
                        <Avatar user={otherUser} />
                        )}
                        <div className='flex flex-col'>
                              <div>
                                    {conversation.name || otherUser.name}
                              </div>
                              <div className='text-sm font-light text-neutral-500 dark:text-neutral-300'>
                                    {statusText}
                              </div>
                        </div>
                  </div>
                  <div className='text-indigo-600 cursor-pointer hover:text-indigo-500 transition'>
                  <HiMiniEllipsisHorizontal size={32} onClick={()=>{handleClick()}}/>

                  </div>
            </div>
      </>

      )
}

export default Header