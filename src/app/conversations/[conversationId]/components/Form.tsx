'use client'
import useCoversation from '@/app/hooks/useConversation'
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from 'react-icons/hi2';
import {CldUploadButton} from 'next-cloudinary'

function Form() {
      const {conversationId}=useCoversation();
      const {register, handleSubmit, setValue, formState:{errors}}=useForm<FieldValues>({
            defaultValues:{
                  message:''
            }
      })
      const onSubmit: SubmitHandler<FieldValues>=(data)=>{
            setValue('message', '', {shouldValidate: true})
            axios.post('/api/messages',{
                  ...data, conversationId
            })
      }

      const handleUpload=(result:any)=>{
            axios.post('/api/messages', {
                  image:result?.info?.secure_url,
                  conversationId: conversationId
            })
      }
      return (
            <div className='py-4 px-4 bg-white border-t dark:bg-gray-800 flex items-center gap-2 lg:gap-4 w-full'>
                  <CldUploadButton options={{maxFiles:1 }} onUpload={handleUpload} uploadPreset='nturjoga'>
                  <div className='text-indigo-500 hover:cursor-pointer'>
                        <HiPhoto size={30}/>
                  </div>
                  </CldUploadButton>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
                        <MessageInput id='message' register={register} errors={errors} required placeholder="Write a message"/>

                        <button type='submit' className='rounded-full p-2 bg-indigo-500 cursor-pointer hover:bg-sky-600 transition'>
                              <span className='text-white'>
                              <HiPaperAirplane size={18}/>
                              </span>
                        </button>
                  </form>
            </div>
      )
}

export default Form