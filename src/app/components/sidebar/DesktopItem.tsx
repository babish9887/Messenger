"use client"

import clsx from "clsx"
import Link from "next/link"
interface DesktopItemProps{
      label: string;
      icon: any;
      href:string;
      onClick?:()=>void;
      active?:boolean
}

const DesktopItem:React.FC<DesktopItemProps>= ({label, icon:Icon, href, onClick, active})=>{
      const handleClick=()=>{
            if(onClick){
                  return onClick();
            }
      }
      return (
            <li onClick={handleClick}>
                  <div className={clsx(` group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
                  active &&'bg-gray-100 text-black'
                  )}>

                  <Link href={href} className="text-2xl">
                        <Icon  /> 
                        {/* clasName='h-8 w-8 shrink-0' */}
                        <span className="sr-only">{label}</span>
                  </Link>
                  </div>
            </li>
      )
}
export default DesktopItem