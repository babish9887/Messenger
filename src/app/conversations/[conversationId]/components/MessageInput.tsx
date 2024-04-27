'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps{
      placeholder?: string;
      id:string;
      type?:string
      required?: boolean
      register: UseFormRegister<FieldValues>
      errors:FieldErrors
}


function MessageInput({placeholder, id, type, required, register, errors}:MessageInputProps) {
  return (
    <div className='relative w-full'>
      <input id={id} placeholder={placeholder} type={type} autoComplete={id} {...register(id,{required})} className='text-black dark:text-white font-light py-2 px-4 bg-neutral-100 dark:bg-gray-700 w-full rounded-full focus:outline-none'/>
    </div>
  )
}

export default MessageInput