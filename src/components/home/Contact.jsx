import React from 'react'

function Contact() {
  return (
    <div className='min-h-[40vh] border-white border-t grid grid-cols-7 grid-rows-10 sm:grid-rows-1 sm:grid-cols-5'>
      <div className='relative row-span-4 border-white border-b sm:border-b-transparent col-span-7 sm:col-span-1'>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>Get in Touch</h2>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
        <div className='absolute left-[50%] top-[50%] -translate-[50%] w-5/7 h-full border-white border-l border-r sm:hidden'></div>
      </div>
      <div className='row-span-5 col-span-7 sm:col-span-3 border-white sm:border-l sm:border-r grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-5'>
        <div className='row-span-3 sm:row-span-4 border-white sm:border-r border-b sm:border-b-transparent grid place-items-center'>
          <a href='mailto:srijan.ju@jadavpuruniversity.in'>srijan.ju@jadavpuruniversity.in</a>
        </div>
        <div className='w-full row-span-1 sm:row-span-4 grid place-items-center sm:items-end'>
          <p className='text-center sm:text-left sm:p-1 w-5/7 sm:w-full border-white'>SUBSCRIBE TO OUR NEWSLETTER</p>
        </div>
        <div className='border-white hidden sm:block sm:border-r sm:border-t'></div>
        <div className='border-white border-t'>
          <input className='border-white h-full w-5/7 sm:w-full border-r border-l sm:border-l-transparent sm:border-r-transparent px-4 placeholder:text-center sm:placeholder:text-left' type='text' placeholder='youremail@gmail.com' />
        </div>
      </div>
      <div className='grid row-span-1 sm:grid-rows-5 col-span-7 sm:col-span-1'>
        <div className='row-span-4'></div>
        <div>
          <button className='w-5/7 sm:w-full h-full p-1 border-white border border-b-transparent border-t sm:border-l-transparent sm:border-r-transparent text-xl'>SUBSCRIBE</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
