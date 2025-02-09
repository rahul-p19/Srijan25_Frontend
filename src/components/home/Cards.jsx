import "./cards.css"
import React from 'react'

function Card({ card }) {

  return (
    <a href={card.link} className='flex relative flex-col items-center gap-y-2 w-full h-full cardContainer'>
      <div className='bg-gradient-to-b from-red via-lavender to-white p-0.5 overflow-hidden aspect-square h-full w-full cardDiv'>
        <div className='h-full w-full overflow-hidden'>
          <img src={card.image} className='object-cover aspect-square h-full w-full bg-background p-2 transition-all duration-500 cardImage' />
        </div>
      </div>
      <div className='opacity-100 sm:opacity-0 transition-opacity duration-500 hover:opacity-100 absolute grid place-items-center bottom-[2px] left-1 sm:left-0.5 right-1 sm:right-0.5 bg-background/90 py-6 text-xl cardText'>
        <h2>{card.text}</h2>
      </div>
    </a >
  )
}

function Cards() {

  const cardDetails = [
    {
      image: "/cards/events.svg",
      text: "Events",
      link: "/events"
    },
    {
      image: "/cards/workshop.svg",
      text: "Workshop",
      link: "/workshop"
    },
    {
      image: "/cards/campus-ambassadors.svg",
      text: "Campus Ambassadors",
      link: "/campusAmbassadors"
    },
    {
      image: "/cards/merchandise.svg",
      text: "Merchandise",
      link: "/merchandise"
    }
  ]

  return (
    <div className='min-h-[70vh] grid place-items-center w-full relative pb-8'>
      <div className='absolute w-5/7 sm:w-3/5 h-full border-greyBorder border-l border-r'>
        <div className='h-full w-1/2 border-greyBorder sm:border-r'></div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 z-50 sm:w-11/12'>
        {cardDetails.map((card, ind) => (
          <Card card={card} key={ind} />
        ))}
      </div>
    </div>
  )
}

export default Cards
