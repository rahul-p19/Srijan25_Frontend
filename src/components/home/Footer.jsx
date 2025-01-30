import React from 'react'

function Footer() {
  return (
    <footer className='grid grid-cols-7 sm:grid-cols-5 border-t border-t-white w-full'>
      <div></div>
      <div className='col-span-5 sm:col-span-3 border-l border-r border-l-white border-r-white flex flex-col gap-y-8 sm:gap-y-2 p-1 sm:p-3'>
        <div className='flex justify-between p-2 sm:p-8'>
          <div className='flex flex-col gap-y-4'>
            <h2 className='text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-light-pink'>Explore</h2>
            <div className='flex flex-col text-left sm:text-lg underline underline-offset-2'>
              <a href='/'>Home</a>
              <a href='/events'>Events</a>
              <a href='/merchandise'>Merchandise</a>
              <a href='/ambassador'>Ambassador</a>
            </div>
          </div>
          <div className='flex flex-col gap-y-4'>
            <h2 className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-white to-light-pink'>Legal</h2>
            <div className='flex flex-col text-right underline underline-offset-2 sm:text-lg'>
              <a href='/privacy'>Privacy</a>
              <a href='/terms'>Terms</a>
              <a href='/event'>Event</a>
              <a href='/sponsor'>Sponsor</a>
            </div>
          </div>
        </div>
        <div>
          <p className='text-sm pb-2 sm:pb-0'>&copy; 2025 - F.E.T.S.U. Presents Srijan, Jadavpur University, Kolkata. All rights reserved.</p>
        </div>
      </div>
      <div></div>
    </footer>
  )
}

export default Footer
