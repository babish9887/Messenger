
"use client"
import getMessages from '@/app/actions/getMessages'
import React, { useEffect, useState } from 'react'
import prisma from '@/app/lib/prismadb'
import getMessagesWithImages from '@/app/actions/getImages'
import Image from 'next/image'
import ImageModal from './ImageModal'
import ImageItem from './ImageItem'


function MediaBox({messages}: {messages:any}) {
      const [imageModalOpen, setImageModelOpen]=useState(false);

      const images=messages.filter((message:any)=>message.image!==null)
      console.log(images)
  return (
      <>
      <ImageModal src={images.image} isOpen={imageModalOpen} onClose={()=>setImageModelOpen(false)} />

    <div className='w-full  grid grid-cols-2 gap-2'>
      {images?.map((image:any) => (
            // <Image onClick={()=>setImageModelOpen(true)} src={image.image} key={image.id} alt='image' width={200} height={200}/>
            <ImageItem image={image} key={image.id}/>
      ))}

    </div>
      </>
  )
}

export default MediaBox