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
    <div className='w-full relative border-greyBorder border-t grid grid-cols-1 grid-rows-4 sm:grid-rows-1 sm:grid-cols-5 h-[80vh] sm:h-screen overflow-x-hidden'>
      <div className='absolute left-[50%] -translate-x-[50%] sm:hidden w-5/7 border-greyBorder border-r border-l h-full'></div>
      <div className='relative sm:bg-background z-[100] h-full border-r -mr-[1px] row-span-1 border-greyBorder border-b sm:border-b-transparent'>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>Gallery</h2>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='relative sm:col-span-3 border-greyBorder sm:border-l sm:border-r grid grid-cols-2 row-span-3'>
        <div className='border-greyBorder sm:border-r'></div>
        <div className='absolute top-[10%] sm:top-[50%] sm:-translate-y-[50%] flex'>
          <ul className='flex gap-x-3 infinite-scroll-gallery border-greyBorder border-t border-b'>
            {[...photos, ...photos].map((photo, ind) => (
              <li key={ind} className='w-[80vw] sm:w-[25vw] grid place-items-center transition-all duration-1000s'>
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
