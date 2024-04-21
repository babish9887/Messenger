'use client'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import PlaceholderImg from '../../../public/images/placeholder.jpg'

interface AvatarGroupProps{
      users?:User[]
}

function AvatarGroup({users}:AvatarGroupProps) {
      const slicedUsers=users?.slice(0,3)

      const positionMap={
            0:'top-0 left-[12px]',
            1: 'bottom-0',
            2: 'bottom-0 right-0'
      }
      return (
            <div className='relative h-9 w-9 md:w-11 md:h-11'>
                  {slicedUsers?.map((user, index)=>(
                        <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`} >
                              <Image src={user?.image || PlaceholderImg} fill alt='Avatar'/>
                         </div>     
                  ))}
            </div>
      )
}

export default AvatarGroup