import React from 'react'

function Contact() {
  return (
    <div className='h-[40vh] border-white border-t grid grid-cols-5'>
      <div className='relative'>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>Get in Touch</h2>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='col-span-3 border-white border-l border-r grid grid-cols-2 grid-rows-5'>
        <div className='row-span-4 border-white border-r grid place-items-center'>
          <a href='mailto:srijan.ju@jadavpuruniversity.in'>srijan.ju@jadavpuruniversity.in</a>
        </div>
        <div className='row-span-4 border-white grid items-end'>
          <p className='text-left p-1'>SUBSCRIBE TO OUR NEWSLETTER</p>
        </div>
        <div className='border-white border-r border-t'></div>
        <input className='border-white border-t px-4' type='text' placeholder='youremail@gmail.com' />
      </div>
      <div className='grid grid-rows-5'>
        <div className='row-span-4'></div>
        <button className='w-full p-1 border-white border-t text-xl'>SUBSCRIBE</button>
      </div>
    </div>
  )
}

export default Contact
