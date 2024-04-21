'use-client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../inputs/Input';
import Image from 'next/image'
import { User } from 'next-auth';
import placeholderImg from '../../../../public/images/placeholder.jpg'
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';
import sharp from 'sharp';


interface SettingsModalProps {
      isOpen?: boolean;
      onClose: () => void;
      currentUser: User;
    }

function SettingsModal({isOpen, onClose, currentUser}:SettingsModalProps) {
      const router=useRouter();
      const [isLoading, setIsLoading]=useState(false)

      const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm<FieldValues>({
            defaultValues:{
                  name: currentUser?.name,
                  image: currentUser?.image
            }
      })
      const image=watch('image');

      const handleUpload = (result:any)=>{
            setValue('image', result?.info?.secure_url, {
                  shouldValidate: true
            })
      }


// Inside your component
// const handleUpload = (result: any) => {
//   // Convert the image to a square shape
//   sharp(result.info.secure_url)
//     .resize({
//       fit: 'cover',
//       width: 200, // Set the desired width for a square image
//       height: 200 // Set the desired height for a square image
//     })
//     .toBuffer()
//     .then((buffer:any) => {
//       // Get the buffer data and update the image state
//       setValue('image', `data:image/jpeg;base64,${buffer.toString('base64')}`, {
//         shouldValidate: true
//       });
//     })
//     .catch((error:any) => {
//       console.error('Error processing image:', error);
//       toast.error('Failed to process image');
//     });
// };


      const onSubmit: SubmitHandler<FieldValues>=(data)=>{
           setIsLoading(true)
           axios.post('/api/settings', data)
           .then(()=>{
            router.refresh()
            toast.success("User Updated Successfully")
            onClose()
           })
           .catch(()=> toast.error('Something went wrong!'))
           .finally(()=>setIsLoading(false))
      }
      return (
            <Modal isOpen={isOpen} onClose={onClose} >
                  <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-12'>
                              <div className='border-b border-gray-900/10 pb-12'>
                                    <h2 className='font-semibold leading-7 text-gray-900 text-2xl'>
                                          Profile
                                    </h2>
                                    <p className='mt-1 text-sm leading-6 text-gray-600'>Edit your public information</p>
                                    <div className='mt-10 flex flex-col gap-y-8'>
                                          <Input disabled={isLoading} label='Name' id='name' errors={errors} required register={register}/>
                                          <div>
                                                <label className='block text-sm font-mono leading-6 text-gray-900'>Photo</label>
                                                <div className='mt-2 flex items-center gap-x-3'>
                                                <Image
                                                      width="48"
                                                      height="48" 
                                                      className="rounded-full h-12 w-12" 
                                                      src={image || currentUser?.image || placeholderImg}
                                                      alt="Avatar"
                                                      />
                                                      <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset='nturjoga'>
                                                            <Button disabled={isLoading} secondary type='button' danger={false}>Change</Button>
                                                      </CldUploadButton>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className='mt-6 flex items-center justify-end gap-x-4'>
                                    <Button disabled={isLoading} onCIick={onClose} secondary danger={false}>Cancel</Button>
                                    <Button disabled={isLoading} onCIick={onClose} type='submit' danger={false}>Save</Button>

                              </div>
                        </div>
                  </form>
            </Modal>
      )
}

export default SettingsModal