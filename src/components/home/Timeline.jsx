import React, { useState, useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const container = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 640px)',
      isMobile: '(max-width: 639px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    },
      (context) => {
        let { isDesktop, reduceMotion } = context.conditions;

        gsap.set(".scrollAnimatedText", {
          y: 75,
          xPercent: -50,
          opacity: 0,
        })

        gsap.to(".scrollAnimatedText", {
          y: 0,
          yPercent: -50,
          xPercent: -50,
          opacity: 1,
          duration: reduceMotion ? 0 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: isDesktop ? "top 45%" : "top 80%",
          }
        })
      })

  }, {
    scope: container
  })

  return (
    <div ref={container} className='w-full relative border-greyBorder border-t grid grid-cols-1 lg:grid-cols-5 grid-rows-3 lg:grid-rows-1 h-screen'>
      <div className='relative lg:bg-background z-[100] h-full row-span-1 border-greyBorder border-b lg:border-b-transparent'>
        <div className='lg:hidden absolute left-[50%] -translate-x-[50%] h-full border-greyBorder border-l border-r w-5/7'></div>
        <h2 className='absolute text-3xl top-[50%] left-[50%] -translate-y-[50%] scrollAnimatedText'>Timeline</h2>
        <div className='absolute top-[65%] left-[50%] -translate-x-[50%] flex gap-x-3'>
          <button onClick={() => {
            if (timelineStart >= 0) return;
            setTimelineStart((prev) => {
              return window.innerWidth >= 1024 ? prev + 10 : prev + 40;
            });
          }}
            className={`text-7xl font-bold ${timelineStart >= 0 ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => {
            if (window.innerWidth >= 1024 && timelineStart <= (timelineEvents.length - 6) * -10) return;
            if (window.innerWidth < 1024 && timelineStart <= (timelineEvents.length - 1) * -40) return;
            setTimelineStart((prev) => {
              return window.innerWidth >= 1024 ? prev - 10 : prev - 40;
            });
          }}
            className={`text-7xl font-bold ${window.innerWidth >= 1024 ? timelineStart <= (timelineEvents.length - 6) * -10 ? 'opacity-40' : '' : timelineStart <= (timelineEvents.length - 1) * -40 ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' loading="lazy" className='px-2 scrollAnimatedText absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='grid border-greyBorder lg:border-r-transparent lg:border-l col-span-3 lg:grid-cols-2 row-span-2 relative'>
        <div className='lg:hidden absolute left-[50%] -translate-x-[50%] h-full w-5/7'></div>
        <div className='border-greyBorder lg:border-r-transparent'></div>
        <div></div>
      </div>
      <div className='absolute h-3/5 w-full bottom-0 lg:bottom-[20%] overflow-x-hidden row-span-2'>
        <div className='h-[2px] bg-white w-full absolute top-[50%]'></div>
        {timelineEvents.map((event, ind) => {
          const left = window.innerWidth >= 1024 ? timelineStart + 20 + 10 * (ind + 1) : timelineStart - 10 + 40 * (ind + 1);
          const top = ind % 2 === 0 ? 76 : 19;
          const lineTop = ind % 2 === 0 ? 50 : 25;
          return (
            <>
              <div key={ind} className={`text-left text-nowrap absolute transition-all duration-1000`} style={{ left: `${left}%`, top: `${top}%` }}>
                {event}
              </div>
              <div key={ind + 100} className={`absolute w-[2px] h-[25%] bg-white transition-all duration-1000`} style={{ left: `${left + 2}%`, top: `${lineTop}%` }}></div>
              <div key={ind + 200} className={`absolute w-6 h-6 aspect-square rounded-full bg-white top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-1000`} style={{ left: `${left + 2}%` }}></div>
            </>
          )
        })}

      </div>
    </div>
  )
}

export default Timeline
