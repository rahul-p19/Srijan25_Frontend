import React from 'react'

function About() {
  return (
    <div className='min-h-screen border-greyBorder border-t grid grid-cols-1 sm:grid-cols-5'>
      <div className='relative h-[20vh] sm:h-screen border-greyBorder border-b sm:border-b-transparent'>
        <h2 className='text-3xl absolute top-[35%] sm:top-[20%] left-[50%] -translate-x-[50%] sm:-translate-y-[50%]'>About JU</h2>
        <img src='heading-outline.svg' className='absolute top-[20%] left-[50%] -translate-x-[50%] sm:-translate-y-[50%]' />
        <div className='absolute sm:hidden left-[50%] -translate-x-[50%] h-full w-5/7 border-greyBorder border-l border-r'></div>
        <h2 className='hidden sm:block text-3xl absolute top-[80%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>About Srijan</h2>
        <img src='heading-outline.svg' className='hidden sm:block absolute top-[80%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='col-span-3 border-greyBorder sm:border-l sm:border-r grid row-span-5'>
        <div className='row-span-2 grid place-items-center px-8 py-4 sm:py-0 text-left sm:text-justify'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className='sm:hidden relative h-[20vh] border-greyBorder border-t sm:border-t-transparent'>
          <h2 className='text-3xl absolute top-[25%] left-[50%] -translate-x-[50%]'>About Srijan</h2>
          <img src='heading-outline.svg' className='absolute top-[20%] left-[50%] -translate-x-[50%]' />
          <div className='absolute left-[50%] -translate-x-[50%] h-full w-5/7 border-greyBorder border-l border-r'></div>
        </div>
        <div className='grid grid-cols-2 sm:border-greyBorder border-t sm:border-b'>
          <div className='border-greyBorder border-r'></div>
        </div>
        <div className='row-span-2 grid place-items-center px-8 py-4 sm:py-0 text-left sm:text-justify'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default About
