'use client'
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import Select from '@/app/components/inputs/Select';
import Modal from '@/app/components/Modal';
import axios from 'axios';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface GroupModalProps {
      isOpen?: boolean;
      onClose: () => void;
      users: User[]
    }

function GroupChatModal({isOpen, onClose, users}:GroupModalProps) {
      const router=useRouter();
      const [isLoading, setIsLoading]=useState(false)

      const{register, handleSubmit, setValue, watch, formState:{errors}}=useForm<FieldValues>({
            defaultValues: {
                  name: '',
                  members:[]
            }
      })

      const members=watch('members')
      const onSubmit: SubmitHandler<FieldValues>=(data)=>{
            setIsLoading(true)
            axios.post('/api/conversations',{
                  ...data, members, isGroup: true
            })
            .then(()=>{
                  router.refresh();
                  onClose()
            })
            .catch(()=>toast.error('Group must have at least 3 members'))
            .finally(()=>setIsLoading(false))
      }
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='space-y-12'>
                        <div className='border-b border-gray-900/0 pb-12'>
                              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                    Create a group chat
                              </h2>
                              <p className='mt-1 text-sm leading-6 text-gray-600'>
                                    Create a chat with more than 2 people.
                              </p>
                              <div className='mt-12 flex flex-col gap-y-8 z-[100000] '>
                                    <Input register={register} label='Name' id='name' disabled={isLoading} required errors={errors}/>

                                    <Select disabled = {isLoading} label="Members" options={users.map(user=>({value: user.id, label:user.name}))}
                                    onChange={(value)=>setValue('members',value, {shouldValidate: true})}
                                    />
                              </div>
                        </div>
                  </div>
                  <div className='mt-6 flex items-center justify-end  gap-x-6'>
                        <Button disabled={isLoading} danger={false} onCIick={onClose} type='button' secondary>Cancel
                        </Button>

                        <Button disabled={isLoading} danger={false} onCIick={onClose} type='submit'>Create
                        </Button>
                  </div>
            </form>
      </Modal>
  )
}

export default GroupChatModal