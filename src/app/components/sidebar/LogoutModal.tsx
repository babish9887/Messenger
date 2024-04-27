'use-client'
import React, { useState } from 'react'
import Modal from '../Modal';
import { User } from 'next-auth';
import Button from '../Button';
import { signOut } from 'next-auth/react';


interface LogoutModalProps {
      isOpen?: boolean;
      onClose: () => void;
      currentUser: User;
    }

function LogoutModal({isOpen, onClose, currentUser}:LogoutModalProps) {
    
      const [isLoading, setIsLoading]=useState(false)

      return (
            <Modal isOpen={isOpen} onClose={onClose} >
                  <form>
                        <div className='space-y-12'>
                              <div className=''>
                                    <h2 className='font-semibold leading-7 text-gray-900 text-2xl'>
                                          Are you sure to Logout?
                                    </h2>
                                   
                              </div>

                              <div className='mt-6 flex items-center justify-end gap-x-4'>
                                    <Button disabled={isLoading} onCIick={onClose} secondary danger={false}>Cancel</Button>
                                    <Button disabled={isLoading} onCIick={()=>{setIsLoading(true);signOut()}} danger={false}>Logout</Button>

                              </div>
                        </div>
                  </form>
            </Modal>
      )
}

export default LogoutModal