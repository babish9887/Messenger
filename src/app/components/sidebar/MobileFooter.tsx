'use client'
import useCoversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem"
import { useState } from "react"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"
import LogoutModal from "./LogoutModal"
import { useTheme } from "next-themes"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"

const MobileFooter = ({currentUser}:any)=>{
      const routes=useRoutes()
      const {isOpen}= useCoversation();
      const [isnavOpen, setIsOpen]=useState(false);
      const [logout, setLogout]=useState(false);

      const {theme, setTheme}=useTheme()

      if(isOpen){
            return null;
      }
      const handleClick=(label:string)=>{
            console.log(label);
            if(label!=='Logout')
                  return;
            setLogout(true);
      }
      return (
            <>
      <LogoutModal currentUser={currentUser} isOpen={logout} onClose={()=>setLogout(false)}/>

       <SettingsModal currentUser={currentUser} isOpen={isnavOpen} onClose={()=>setIsOpen(false)}/>

            <div className="fixed  justify-between w-full bottom-0 z-40 flex items-center bg-white dark:bg-gray-900 border-t[1px] lg:hidden">
                  {routes.map(item=>(
                        <MobileItem key={item.label} href={item.href} icon={item.icon} active={item.active} onClick={()=>handleClick(item.label)}/>
                  ))}
                    <nav className=' m-2 flex justify-between items-center'> 
                  <div className="w-7 h-7 bg-slate-200 dark:bg-slate-700 cursor-pointer dark:text-gray-200 rounded-md mr-2 mb-2 flex items-center justify-center text-xl"
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
export default MobileFooter