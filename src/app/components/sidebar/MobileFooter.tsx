'use client'
import useCoversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem"
import { useState } from "react"
import Avatar from "../Avatar"
import SettingsModal from "./SettingsModal"
import LogoutModal from "./LogoutModal"

const MobileFooter = ({currentUser}:any)=>{
      const routes=useRoutes()
      const {isOpen}= useCoversation();
      const [isnavOpen, setIsOpen]=useState(false);
      const [logout, setLogout]=useState(false);



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

            <div className="fixed  justify-between w-full bottom-0 z-40 flex items-center bg-white border-t[1px] lg:hidden">
                  {routes.map(item=>(
                        <MobileItem key={item.label} href={item.href} icon={item.icon} active={item.active} onClick={()=>handleClick(item.label)}/>
                  ))}
                    <nav className=' m-2 flex flex-col justify-between items-center'>
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