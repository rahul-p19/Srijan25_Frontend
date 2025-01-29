import React, { useState } from 'react'

const timelineEvents = [
  "Workshop",
  "Fun Zone",
  "F5 Talks",
  "Coding",
  "Robotics",
  "Gaming",
  "Finance & Management",
  "Go Karting",
  "Brain Storming",
  "Cultural Night",
  "Standup Comedy",
  "Miscellaneous"
]

function Timeline() {

  const [timelineStart, setTimelineStart] = useState(0);

  return (
    <div className='w-full relative border-white border-t grid grid-cols-5 h-screen'>
      <div className='relative bg-background z-[100] h-full'>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>Timeline</h2>
        <div className='absolute top-[60%] left-[50%] -translate-x-[50%] flex gap-x-3'>
          <button onClick={() => {
            if (timelineStart >= 0) return;
            setTimelineStart((prev) => prev + 10);
          }}
            className={`text-7xl font-bold ${timelineStart >= 0 ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => {
            if (timelineStart <= (timelineEvents.length - 6) * -10) return;
            setTimelineStart((prev) => {
              return prev - 10;
            });
          }}
            className={`text-7xl font-bold ${timelineStart <= (timelineEvents.length - 6) * -10 ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='border-white border-r border-l col-span-3 grid grid-cols-2'>
        <div className='border-white border-r'></div>
        <div></div>
      </div>
      <div className='absolute h-3/5 w-full bottom-0 overflow-x-hidden'>
        <div className='h-[2px] bg-white w-full absolute top-[50%]'></div>
        {timelineEvents.map((event, ind) => {
          const left = timelineStart + 20 + 10 * (ind + 1);
          const top = ind % 2 === 0 ? 85 : 7;
          const lineTop = ind % 2 === 0 ? 50 : 15;
          return (
            <>
              <div key={ind} className={`text-left text-nowrap absolute transition-all duration-1000`} style={{ left: `${left}%`, top: `${top}%` }}>
                {event}
              </div>
              <div key={ind + 100} className={`absolute w-[2px] h-[35%] bg-white transition-all duration-1000`} style={{ left: `${left + 2}%`, top: `${lineTop}%` }}></div>
              <div key={ind + 200} className={`absolute w-6 h-6 aspect-square rounded-full bg-white top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-1000`} style={{ left: `${left + 2}%` }}></div>
            </>
          )
        })}

      </div>
    </div>
  )
}

export default Timeline
