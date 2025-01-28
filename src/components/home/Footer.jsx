import React from 'react'

function Footer() {
  return (
    <footer className='grid grid-cols-5 border-t border-t-white w-full'>
      <div></div>
      <div className='col-span-3 border-l border-r border-l-white border-r-white flex flex-col p-3'>
        <div className='flex justify-between p-8'>
          <div className='flex flex-col gap-y-4'>
            <h2 className='text-3xl'>Explore</h2>
            <div className='flex flex-col text-left text-lg underline underline-offset-2'>
              <a href='/'>Home</a>
              <a href='/events'>Events</a>
              <a href='/merchandise'>Merchandise</a>
              <a href='/ambassador'>Ambassador</a>
            </div>
          </div>
          <div className='flex flex-col gap-y-4'>
            <h2 className='text-3xl'>Legal</h2>
            <div className='flex flex-col text-right underline underline-offset-2 text-lg'>
              <a href='/privacy'>Privacy</a>
              <a href='/terms'>Terms</a>
              <a href='/event'>Event</a>
              <a href='/sponsor'>Sponsor</a>
            </div>
          </div>
        </div>
        <div>
          <p className='text-sm'>&copy; 2025 - F.E.T.S.U. Presents Srijan, Jadavpur University, Kolkata. All rights reserved.</p>
        </div>
      </div>
      <div></div>
    </footer>
  )
}

export default Footer
