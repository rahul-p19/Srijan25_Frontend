import React from 'react'

function About() {
  return (
    <div className='h-screen border-white border-t grid grid-cols-5'>
      <div className='relative h-screen'>
        <h2 className='text-3xl absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>About JU</h2>
        <img src='heading-outline.svg' className='absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
        <h2 className='text-3xl absolute top-[80%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>About Srijan</h2>
        <img src='heading-outline.svg' className='absolute top-[80%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='col-span-3 border-white border-l border-r grid row-span-5'>
        <div className='row-span-2 grid place-items-center px-8 text-justify'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className='grid grid-cols-2 border-white border-t border-b'>
          <div className='border-white border-r'></div>
        </div>
        <div className='row-span-2 grid place-items-center px-8 text-justify'>
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
