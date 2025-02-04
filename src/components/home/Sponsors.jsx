import React, { useState } from 'react'

const currentSponsors = [
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
]

const pastSponsors = [
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
]

function Sponsors() {

  const [heading, setHeading] = useState("Sponsors");

  return (
    <div className='w-full relative border-white border-t grid grid-cols-1 sm:grid-cols-5 grid-rows-5 sm:grid-rows-1 h-[80vh] overflow-x-hidden'>
      <div className='relative bg-background z-[100] h-full border-r -mr-[1px] row-span-2'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-white border-l border-r w-5/7'></div>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>{heading}</h2>
        <div className='absolute top-[65%] left-[50%] -translate-x-[50%] flex gap-x-3'>
          <button onClick={() => setHeading("Past Sponsors")}
            className={`text-7xl font-bold ${heading === "Past Sponsors" ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => setHeading("Sponsors")}
            className={`text-7xl font-bold ${heading === "Sponsors" ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='relative col-span-3 border-white border-t sm:border-t-transparent sm:border-l sm:border-r grid grid-cols-2 row-span-3'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-white border-l border-r w-5/7'></div>
        <div className='border-white sm:border-r'></div>
        <div className='absolute top-[50%] -translate-y-[50%] flex'>
          <ul className='flex infinite-scroll-carousel bg-background border-white border-t border-b'>
            {heading === "Sponsors" ? [...currentSponsors, ...currentSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-white border-l'>
                <img src={sponsor.image} className='w-72 py-6' />
              </li>
            )) : [...pastSponsors, ...pastSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-white border-l'>
                <img src={sponsor.image} className='w-72 py-6' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  )
}

export default Sponsors
