import React, { Suspense } from 'react'
import workshops from "./workshops.json"
import Navbar from "../Navbar"
import Footer from "../Footer"
import PageReveal from "../PageReveal"
import Carousel from "./Carousel"

function Loading() {
  return <div className="h-screen w-screen bg-background fixed z-[300]">
    <img src="/fetsu-presents-srijan25.svg" alt="Srijan 25 Logo" className="absolute top-[30%] left-[51%] -translate-[50%] h-36 w-auto" />
    <div className="absolute top-[75%] left-[50%] -translate-[50%] p-3 animate-spin bg-gradient-to-bl from-red via-purple to-lavender h-24 w-24 aspect-square rounded-full">
      <img src="/techno-management-fest.webp" alt="The Annual Techno-Management Fest of Jadavpur University" className="text-center absolute top-[52.5%] left-[50%] -translate-[50%] border border-white p-2 w-2/3 sm:w-1/3" />
      <div className="rounded-full h-full w-full bg-background"></div>
    </div>
  </div>
}

function WorkshopPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-background font-sometypeMono'>
        <Navbar />
        <PageReveal />
        {workshops.map(workshop =>
          <div key={workshop.id} className='flex flex-col items-center'>
            <Carousel workshop={workshop} />
            <p className='w-full sm:w-3/5 text-[0.925rem] sm:text-base border-greyBorder border-t sm:border border-b-transparent p-4 sm:p-6 sm:text-justify'>{workshop.about}</p>
          </div>
        )}
        <Footer />
      </div>
    </Suspense>
  )
}

export { WorkshopPage }
