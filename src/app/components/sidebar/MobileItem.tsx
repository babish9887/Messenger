"use client"
import Link from 'next/link'
import clsx from 'clsx'
import React from 'react'

interface MobileItemProps{
      icon: any;
      href:string;
      onClick?:()=>void;
      active?:boolean
}

const MobileItem:React.FC<MobileItemProps>= ({ icon:Icon, href, onClick, active})=>{
      const handleClick=()=>{
            if(onClick){
                  return onClick();
            }
      }
      return (
            <Link href={href}
            onClick={onClick}
            className={clsx(`group flex gap-x-3 text-xl leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700`,
            active && 'bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200'
            )}>
                  <Icon  />
            </Link>
      )
}

export default MobileItem