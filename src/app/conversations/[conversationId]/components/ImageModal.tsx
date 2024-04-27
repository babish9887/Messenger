'useClient'
import Modal from '@/app/components/Modal';
import ModalforImage from '@/app/components/ModalforImage';
import Image from 'next/image';
import React from 'react'

interface ImageModalProps{
      isOpen?: boolean,
      onClose: ()=>void;
      src?:string| null;
}

function ImageModal({isOpen, onClose, src}:ImageModalProps) {

      if(!src) return null;


      return (
      <ModalforImage isOpen={isOpen} onClose={onClose}>
            <div className='w-full  aspect-video '>
                  {/* <Image alt='Image' className='object-cover' width={50} height={50} src={src} /> */}
                  <Image alt='Image' className='object-cover max-w-full max-h-full' fill src={src} />

            </div>
      </ModalforImage>
      )
}

export default ImageModal