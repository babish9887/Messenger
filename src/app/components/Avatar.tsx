"use-client"
import {User} from '@prisma/client'
import Image from 'next/image';
import placeholder from '../../../public/images/placeholder.jpg'
import useActiveList from '../hooks/useActiveList';

interface AvatarProps{
      user?:User;
}

const Avatar: React.FC<AvatarProps>=({user})=>{
      const {members}=useActiveList()
      const isActive=members.indexOf(user?.email!)!==-1
      return (
            <div className='relative'>
                  <div className='relative inline-block rounded-full overflow-hidden mx-1 lg:m-0 h-9 w-9 md:h-11 md:w-11'>
                        {/* <Image src={user?.image || placeholder} alt='avatar' fill/> */}
                        <Image src={user?.image ? user.image : placeholder} alt='Avatar' fill/>
                  </div>
                  {isActive &&
                   <span className='absolute block rounded-full bg-green-500 ring-2 ring-white bottom-1 right-1 h-2 w-2 md:h-3 md:w-3'/>
                  }
            </div>
      )
}
export default Avatar