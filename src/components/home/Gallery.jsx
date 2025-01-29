import React from 'react'

const photos = [
  "/speaker-image.png",
  "/speaker-image.png",
  "/speaker-image.png",
  "/speaker-image.png",
  "/speaker-image.png",
  "/speaker-image.png",
];

function Gallery() {

  return (
    <div className='w-full relative border-white border-t grid grid-cols-5 h-screen overflow-x-hidden'>
      <div className='relative bg-background z-[100] h-full border-r -mr-[1px]'>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>Gallery</h2>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='relative col-span-3 border-white border-l border-r grid grid-cols-2'>
        <div className='border-white border-r'></div>
        <div className='absolute top-[50%] -translate-y-[50%] flex'>
          <ul className='flex gap-x-3 infinite-scroll-gallery border-white border-t border-b'>
            {[...photos, ...photos].map((photo, ind) => (
              <li key={ind} className='w-[25vw] grid place-items-center transition-all duration-1000s'>
                <img src={photo} className='w-full' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Gallery
