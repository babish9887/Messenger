'use client'
import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'
import DesktopItem from './DesktopItem';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import SettingsModal from './SettingsModal';
import LogoutModal from './LogoutModal';
import {useTheme} from 'next-themes'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

interface DesktopSidebarProps{
      currentUser: User
}

const DesktopSidebar:React.FC<DesktopSidebarProps>=({currentUser})=> {
      const {theme, setTheme}=useTheme()
      const routes=useRoutes();
      const [isOpen, setIsOpen]=useState(false);
      const [logout, setLogout]=useState(false);
      const handleClick=(label:string)=>{
            console.log(label);
            if(label!=='Logout')
                  return;
            setLogout(true);
      }
      return (
      <>
      <LogoutModal currentUser={currentUser} isOpen={logout} onClose={()=>setLogout(false)}/>
      <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
      <div className='hidden md:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white dark:bg-gray-800 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col z-0 justify-between'>
            <nav className='mt-4 flex flex-col justify-between'>
                  <ul role='list' className='flex flex-col items-center space-y-1'>
                        {routes.map(item=>(
                              <DesktopItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} onClick={()=>handleClick(item.label)}/>
                        ))}
                  </ul>
             </nav>     
            

            
             <nav className='mt-4 flex flex-col justify-between items-center'>
                  <div className="w-10 h-10  bg-slate-200 dark:bg-slate-800 dark:border cursor-pointer dark:text-gray-200 dark:border-gray-200 rounded-md right-0  mb-2 flex items-center justify-center text-2xl"
                  onClick={()=>theme==='dark'?setTheme('light'):setTheme('dark')}>
                        {theme==='dark'?<IoSunnyOutline/>:<IoMoonOutline />}
                  </div>
                  <div onClick={()=>setIsOpen(true)}
                  className='cursor-pointer hover:opacity-75 transition'>
                        <Avatar user={currentUser} />
                  </div>
             </nav>
            
      </div>
      </>

      )
}

export default DesktopSidebar