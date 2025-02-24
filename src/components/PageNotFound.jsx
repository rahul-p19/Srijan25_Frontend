import React from 'react'
import Navbar from "./Navbar"

function PageNotFound() {
  return (
    <div className='bg-background h-screen relative font-sometypeMono'>
      <div className='absolute w-full'>
        <Navbar />
      </div>
      <div className='absolute top-[50%] left-[50%] -translate-[50%] flex flex-col gap-y-4'>
        <h1 className='text-9xl text-red text-center font-bold'>404</h1>
        <h1 className='text-3xl font-semibold text-center'>Page Not Found</h1>
        <h3 className='text-lg font-semibold text-center'>Oops! Looks like you're lost</h3>
      </div>
      <div className='absolute h-full bg-transparent left-[50%] -translate-x-[50%] w-5/7 sm:w-3/5 border-greyBorder border-r border-l'></div>
      <div className='absolute w-full top-[85%] -translate-y-[50%] h-[1px] bg-greyBorder'></div>
    </div>
  )
}

export default PageNotFound
