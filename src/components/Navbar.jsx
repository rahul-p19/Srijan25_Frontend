import React, { useState } from 'react'

function Navbar() {

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className='grid grid-cols-7 sm:grid-cols-5 w-full border-b border-b-white'>
      <div className='flex justify-around p-3'>
        <a href='/' className='hidden sm:block'>
          <img src='/srijan-logo-white.svg' />
        </a>
        <a href='/' className='hidden sm:block'>
          <img src='/fetsu-presents-srijan25.svg' />
        </a>
      </div>
      <div className='col-span-5 sm:col-span-3 grid grid-cols-2 sm:grid-cols-4 p-2 sm:p-0 items-center justify-items-center border-r border-r-white border-l-white border-l text-xl'>
        <a href='/' className='sm:hidden'>
          <img src='/srijan-logo-white.svg' />
        </a>
        <a href='/' className='sm:hidden'>
          <img src='/fetsu-presents-srijan25.svg' />
        </a>
        <a href='/' className='hidden sm:block'>Home</a>
        <a href='/#about' className='hidden sm:block'>About</a>
        <a href='/events' className='hidden sm:block'>Events</a>
        <a href='/notifications' className='hidden sm:block'>Notifications</a>
      </div>
      <div className='grid place-items-center text-xl'>
        <a href='/dashboard' className='hidden sm:block'>Dashboard</a>
        <button className='sm:hidden' onClick={() => {
          setNavbarOpen(true);
          setTimeout(handler)
        }}>+</button>
      </div>
      <div className={`${navbarOpen ? 'bottom-0 p-6' : 'bottom-[100%]'} bg-background transition-all duration-700 fixed z-[200] top-0 left-0 right-0`}>
        <button className={`absolute top-4 right-4 text-xl ${navbarOpen ? '' : 'hidden'}`} onClick={() => {
          setNavbarOpen(false);
        }}>X</button>
        <div className={`absolute bg-background top-[10%] left-[50%] -translate-x-[50%] flex flex-col gap-y-6 w-4/5 transition-all duration-100 ${navbarOpen ? 'bottom-0 opacity-100' : 'hidden bottom-[100%] opacity-0'} transition-discrete`}>
          <div className='flex justify-around w-full pl-6'>
            <img src='/srijan-logo-white.svg' />
            <img src='/fetsu-presents-srijan25.svg' />
          </div>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Home</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>About</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Events</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Notifications</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Campus Ambassadors</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Workshops</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Merchandise</a>
          <a href='/' className='text-left border-white/30 border-b w-full py-1'>Dashboard</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
