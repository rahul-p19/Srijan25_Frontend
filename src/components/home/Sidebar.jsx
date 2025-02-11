import React, { useEffect, useState } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import { DragHandleSharp } from '@mui/icons-material';

const sections = [
  {
    name: "Hero",
    start: 0,
    end: 0.6
  },
  {
    name: "Timeline",
    start: 0.6,
    end: 1.5
  },
  {
    name: "Sponsors",
    start: 1.5,
    end: 2.3
  },
  {
    name: "Explore",
    start: 2.3,
    end: 3.2
  },
  {
    name: "Speakers",
    start: 3.2,
    end: 4.0
  },
  {
    name: "About",
    start: 4.0,
    end: 5.0
  },
  {
    name: "Gallery",
    start: 5.0,
    end: 5.9
  },
  {
    name: "Get in Touch",
    start: 5.9,
    end: 7
  },
]

function Sidebar() {

  const [scroll, setScroll] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const height = window.innerHeight;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    })
  }, [])

  return (
    <>
      <div className={`fixed top-0 bottom-0 right-0 left-0 z-[199] bg-background/80 ${sidebarOpen ? 'flex' : 'hidden'}`}></div>
      <div className='fixed hidden sm:flex top-[40%] right-[3%] z-[110] flex-col gap-y-1'>
        {sections.map((ele, ind) => (
          <div key={ind} className={`flex flex-col gap-y-4 items-end border-red`}>
            <div className={`h-1 w-1 mr-2 relative rounded-full aspect-square ${(scroll >= ele.start * height && scroll < ele.end * height) ? 'bg-white' : 'bg-greyBorder/60'} transition-all duration-200 cursor-pointer`}
              onClick={() => window.scrollTo({
                top: (ele.end - 0.5) * height,
                left: 0,
                behavior: 'smooth'
              })}>
              <p className={`${(scroll >= ele.start * height && scroll < ele.end * height) ? 'opacity-100' : 'opacity-0'} absolute transition-opacity duration-300 delay-100 -bottom-[22px] -left-[14px] -rotate-45 text-xl`}>&lsaquo;</p>
              <p className={`${(scroll >= ele.start * height && scroll < ele.end * height) ? 'opacity-100' : 'opacity-0'} absolute transition-opacity duration-300 delay-100 -top-[22px] -right-3 -rotate-45 text-xl`}>&rsaquo;</p>
            </div>
            <p className={`${(scroll >= ele.start * height && scroll < ele.end * height) ? 'scale-y-100 h-auto' : 'scale-y-0 h-0'} transition-all duration-500 origin-bottom text-right text-sm`}>{ele.name}</p>
          </div>
        ))}
        <button onClick={() => setSidebarOpen(true)} className='cursor-pointer flex flex-col gap-0 items-end text-sm'>
          <DragHandleSharp />
          <p>
            Menu
          </p>
        </button>
      </div>
      <nav
        className={`hidden sm:flex bg-background transition-all duration-700 p-6 pt-10 fixed flex-col gap-y-12 top-8 bottom-8 border-greyBorder border z-[200] ${sidebarOpen ? `right-5 left-[78%]` : `left-[100%] -right-[20%]`
          }`}>
        <button className={`absolute top-10 right-5 cursor-pointer text-xl ${sidebarOpen ? '' : 'hidden'}`} onClick={() => {
          setSidebarOpen(false);
        }}><CloseIcon /></button>
        <div className='absolute -top-[1px] right-0 left-0 bg-gradient-to-r from-purple to-red h-[3px] z-[201]'></div>
        <h2 className='text-xl font-semibold border-greyBorder border-b pb-3 pl-3 text-left'>All Sections</h2>
        <div className='flex flex-col gap-y-4 text-lg items-end'>
          {sections.map((ele, ind) => (
            <button key={ind} className='uppercase w-4/5 text-right cursor-pointer'
              onClick={() => {
                window.scrollTo({
                  top: (ele.end - 0.5) * height,
                  left: 0,
                  behavior: 'smooth'
                });
                setSidebarOpen(false);
              }}>
              {ele.name}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Sidebar
