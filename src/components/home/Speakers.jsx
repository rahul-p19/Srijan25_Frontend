import React, { useState } from 'react'

const speakerDetails = [
  {
    name: "Prakriti",
    image: "/speaker-image.png",
    facebook: "",
    linkedin: ""
  },
  {
    name: "Sukriti",
    image: "/speaker-image.png",
    facebook: "",
    linkedin: ""
  },
  {
    name: "Robin",
    image: "/speaker-image.png",
    facebook: "",
    linkedin: ""
  },
  {
    name: "John",
    image: "/speaker-image.png",
    facebook: "",
    linkedin: ""
  },
  {
    name: "Lana",
    image: "/speaker-image.png",
    facebook: "",
    linkedin: ""
  },
]

function SpeakerCard({ speaker }) {
  return (
    <div className='flex flex-col items-center gap-y-2 w-full h-full'>
      <div className='bg-gradient-to-b from-red via-lavender to-white p-0.5'>
        <img src={speaker.image} className='object-contain h-full w-full bg-background p-1.5' />
      </div>
      <div className='flex justify-between w-full px-2 text-xl'>
        <h2>{speaker.name}</h2>
        <div className='flex gap-x-2'>
          <a href={speaker.facebook}>f</a>
          <a href={speaker.linkedin}>in</a>
        </div>
      </div>
    </div >
  )
}

function Speakers() {

  const [carouselStart, setCarouselStart] = useState(0);

  return (
    <div className='w-full relative border-white border-t grid grid-cols-1 sm:grid-cols-5 grid-rows-3 sm:grid-rows-1 h-screen overflow-x-hidden'>
      <div className='relative bg-background z-[100] h-full border-white border-b sm:border-b-transparent sm:border-r sm:-mr-[1px] row-span-1'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-white border-l border-r w-5/7'></div>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>F5 Speakers</h2>
        <div className='absolute top-[65%] left-[50%] -translate-x-[50%] flex gap-x-3'>
          <button onClick={() => {
            if (carouselStart >= 0) return;
            setCarouselStart((prev) => {
              return window.innerWidth >= 600 ? prev + 25 : prev + 50;
            });
          }}
            className={`text-7xl font-bold ${carouselStart >= 0 ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => {
            if (window.innerWidth >= 600 && carouselStart <= (speakerDetails.length - 2) * -25) return;
            if (window.innerWidth < 600 && carouselStart <= (speakerDetails.length - 1) * -50) return;
            setCarouselStart((prev) => {
              return window?.innerWidth >= 600 ? prev - 25 : prev - 50;
            });
          }}
            className={`text-7xl font-bold ${window.innerWidth >= 600 ? carouselStart <= (speakerDetails.length - 2) * -25 ? 'opacity-40' : '' : carouselStart <= (speakerDetails.length - 1) * -50 ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='border-white sm:border-r sm:border-l col-span-3 grid grid-cols-2 row-span-2'>
        <div className='border-white border-r'></div>
        <div></div>
      </div>
      <div className='absolute h-full w-screen overflow-x-hidden'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-white border-l border-r w-5/7'></div>
        {speakerDetails.map((speaker, ind) => {
          const left = window?.innerWidth >= 600 ? carouselStart - 5 + 26 * (ind + 1) : carouselStart - 45 + 50 * (ind + 1);
          return (
            <>
              <div key={ind} className={`text-left text-nowrap absolute transition-all duration-1000 top-[50%] -translate-y-[20%] sm:-translate-y-[50%] p-2 ${carouselStart === ind * -50 ? '' : 'opacity-0 pointer-events-none sm:pointer-events-auto sm:opacity-100'}`} style={{ left: `${left}%` }}>
                <SpeakerCard speaker={speaker} key={ind} />
              </div>
            </>
          )
        })}
      </div>
      <div className='bg-background z-[100] h-full border-white sm:border-l -ml-[1px]'></div>
    </div>
  )
}

export default Speakers
