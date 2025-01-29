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
      <div className='flex justify-between w-full px-2'>
        <h2>{speaker.name}</h2>
        <div className='flex gap-x-2'>
          <a href={speaker.facebook}>f</a>
          <a href={speaker.linkedin}>in</a>
        </div>
      </div>
    </div>
  )
}

function Speakers() {

  const [carouselStart, setCarouselStart] = useState(0);

  return (
    <div className='w-full relative border-white border-t grid grid-cols-5 h-screen overflow-x-hidden'>
      <div className='relative bg-background z-[100] h-full border-white border-r -mr-[1px]'>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>F5 Speakers</h2>
        <div className='absolute top-[60%] left-[50%] -translate-x-[50%] flex gap-x-3'>
          <button onClick={() => {
            if (carouselStart >= 0) return;
            setCarouselStart((prev) => prev + 25);
          }}
            className={`text-7xl font-bold ${carouselStart >= 0 ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => {
            if (carouselStart <= (speakerDetails.length - 2) * -25) return;
            setCarouselStart((prev) => {
              return prev - 25;
            });
          }}
            className={`text-7xl font-bold ${carouselStart <= (speakerDetails.length - 2) * -25 ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='border-white border-r border-l col-span-3 grid grid-cols-2'>
        <div className='border-white border-r'></div>
        <div></div>
      </div>
      <div className='absolute h-full w-screen overflow-x-hidden'>
        {speakerDetails.map((speaker, ind) => {
          const left = carouselStart - 5 + 26 * (ind + 1);
          return (
            <>
              <div key={ind} className={`text-left text-nowrap absolute transition-all duration-1000 top-[50%] -translate-y-[50%] p-2`} style={{ left: `${left}%` }}>
                <SpeakerCard speaker={speaker} key={ind} />
              </div>
            </>
          )
        })}
      </div>
      <div className='bg-background z-[100] h-full border-white border-l -ml-[1px]'></div>
    </div>
  )
}

export default Speakers
