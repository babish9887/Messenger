import React, { useState } from 'react'
import Image from 'next/image'
import ImageModal from './ImageModal';

function ImageItem({image}:{image:any}) {
      const [imageModalOpen, setImageModelOpen]=useState(false);

  return (
    <div>
      <ImageModal src={image.image} isOpen={imageModalOpen} onClose={()=>setImageModelOpen(false)} />
      <Image onClick={()=>setImageModelOpen(true)} src={image.image} key={image.id} alt='image' width={200} height={200}/>
    </div>
  )
}

export default ImageItem