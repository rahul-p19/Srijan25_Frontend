import React from 'react'

function Hero() {
  return (
    <div className='h-[90vh] w-screen max-w-full grid grid-cols-7 sm:grid-cols-5 relative overflow-x-clip'>
      <div></div>
      <div className='col-span-5 sm:col-span-3 grid grid-cols-2 grid-rows-10 sm:grid-rows-6 border-l border-r border-l-white border-r-white'>
        <div className='sm:border-r border-b border-white flex items-end sm:row-span-2'>
          <img src='/inverted-commas.svg' className='p-1 sm:p-4 border-white border-t border-r h-1/3 sm:h-auto' />
        </div>
        <div className='border-white border-b sm:row-span-2'></div>
        <div className='relative border-white border-b border-r flex items-end p-6 text-lg sm:text-2xl'>
          <h3 className='absolute top-[50%] -translate-y-[50%] left-[25%] sm:left-[5%] hero-text-1'>Coding</h3>
          <h3 className='absolute top-[50%] -translate-y-[50%] left-[20%] sm:left-[5%] hero-text-2'>Robotics</h3>
          <h3 className='absolute top-[50%] -translate-y-[50%] left-[13%] sm:left-[5%] hero-text-3'>Management</h3>
        </div>
        <div className='relative border-white border-b flex justify-end items-end p-6 text-lg sm:text-2xl'>
          <h3 className='absolute top-[50%] -translate-y-[50%] right-[5%] hero-text-1'>Cultural Nights</h3>
          <h3 className='absolute top-[50%] -translate-y-[50%] right-[5%] hero-text-2'>Comedy Nights</h3>
          <h3 className='absolute top-[50%] -translate-y-[50%] right-[20%] sm:right-[5%] hero-text-3'>F5 Talks</h3>
        </div>
        <div className='row-span-[0] col-span-[0] sm:row-span-3 sm:col-span-1 border-r-white sm:border-r flex p-6'>
        </div>
        <div className='row-span-1 col-span-2 sm:row-span-3 sm:col-span-1 flex items-end justify-center sm:justify-end'>
          <a className='p-3 border-white border sm:border-r-transparent sm:border-b-transparent text-lg sm:text-2xl z-[101] text-transparent bg-clip-text bg-gradient-to-r from-white to-light-pink' href='/register'>Register Now</a>
        </div>
      </div>
      <div></div>
      <div className='absolute z-[90] bottom-[25%] sm:bottom-0 left-[5%] h-[10%] sm:h-[30%] bg-background border border-white sm:border-b-transparent'>
        <img src='/fetsu-presents-srijan-glitch.svg' className='h-full' />
      </div>
      <div className='absolute p-3 z-[90] bottom-[45%] sm:bottom-[20%] right-[3%] sm:right-[12%] bg-background border border-white'>
        <p className='text-base sm:text-3xl'><span className='text-transparent bg-clip-text bg-gradient-to-r from-blue via-red to-red'>20-23</span> MARCH <br className='sm:hidden' /> 2025</p>
      </div>
      <img src='/mascot.svg' className='absolute z-[100] top-[20%] left-[50%] -translate-x-[50%] h-full mascot-animation'
        onMouseOut={(e) => { e.target.style.animationPlayState = "paused"; }}
        onMouseEnter={(e) => { e.target.style.animationPlayState = "running"; }}
      />
    </div>
  )
}

export default Hero
