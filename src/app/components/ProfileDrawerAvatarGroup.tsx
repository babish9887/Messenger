'use client'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import image from '../../../public/images/placeholder.jpg'

interface ProfileDrawerAvatarGroupProps{
      users?:User[]
}

function ProfileDrawerAvatarGroup({users}:ProfileDrawerAvatarGroupProps) {
      const slicedUsers=users?.slice(0,3)

      const positionMap={
            0:'top-0 left-[32px]',
            1: 'bottom-0',
            2: 'bottom-0 right-0'
      }
      return (
            <div className='relative h-32 w-32  rounded-full'>
                  {slicedUsers?.map((user, index)=>(
                        <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden h-[60px] w-[60px] ${positionMap[index as keyof typeof positionMap]}`} >
                              <Image src={user?.image || image} fill alt='Avatar'/>
                         </div>     
                  ))}
            </div>
      )
}

export default ProfileDrawerAvatarGroup