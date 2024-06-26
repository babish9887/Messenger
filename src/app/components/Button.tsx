"use client"

import clsx from "clsx"
import React from "react";
interface ButtonProps{
      type?: 'button'|'submit'|'reset' | undefined;
      fullWidth?:boolean;
      children? : React. ReactNode;
      onCIick? :()=>void
      secondary? : boolean;
      danger: boolean;
      disabled? : boolean;
}
const Button:React.FC<ButtonProps> =({
      type,
      fullWidth,
      children ,
      onCIick,
      secondary ,
      danger,
      disabled
})=>{
      return(
            <button onClick={onCIick} type={type} disabled={disabled} className={clsx(`flex justify-center rounded-md px-3 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
            disabled && "opacity-50 cursor-default", 
            fullWidth && 'w-full', 
            secondary? 'text-gray-900 dark:text-gray-100':'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && 'bg-blue-500 hover:bg-indigo-500 focus-visible:outline-indigo-500')}>
                  {children} 
            </button>
      )
}
export default Button