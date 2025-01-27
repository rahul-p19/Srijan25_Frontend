import React from 'react'

function Navbar() {
  return (
    <nav className='grid grid-cols-5 w-full border-b border-b-white'>
      <div className='flex justify-around p-3'>
        <a href='/'>
          <img src='/srijan-logo-white.svg' />
        </a>
        <a href='/'>
          <img src='/fetsu-presents-srijan25.svg' />
        </a>
      </div>
      <div className='col-span-3 grid grid-cols-4 items-center justify-items-center border-r border-r-white border-l-white border-l text-xl'>
        <a href='/'>Home</a>
        <a href='/#about'>About</a>
        <a href='/events'>Events</a>
        <a href='/notifications'>Notifications</a>
      </div>
      <div className='grid place-items-center text-xl'>
        <a href='/dashboard'>Dashboard</a>
      </div>
    </nav>
  )
}

export default Navbar
