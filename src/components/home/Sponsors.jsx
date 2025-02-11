import React, { useState, useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CustomEase } from 'gsap/dist/CustomEase';

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);


const currentSponsors = [
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan25.svg",
    text: ""
  },
]

const pastSponsors = [
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: ""
  },
]

function Sponsors() {

  const [heading, setHeading] = useState("Sponsors");
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
          opacity: 0,
        })

        gsap.to(".scrollAnimatedText", {
          y: 0,
          yPercent: -50,
          opacity: 1,
          duration: reduceMotion ? 0 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: isDesktop ? "top 45%" : "top 80%",
          }
        })

        gsap.set(".scrollAnimatedOutline", {
          y: 75,
          xPercent: -50,
          opacity: 0,
        })

        gsap.to(".scrollAnimatedOutline", {
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
    <div ref={container} className='w-full relative border-greyBorder border-t grid grid-cols-1 sm:grid-cols-5 grid-rows-5 sm:grid-rows-1 h-[80vh] overflow-x-hidden'>
      <div className='relative bg-background z-[100] h-full border-r -mr-[1px] row-span-2'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-greyBorder border-l border-r w-5/7'></div>
        <h2 className='scrollAnimatedText absolute text-3xl top-[50%] left-[50%] -translate-[50%]'>{heading}</h2>
        <div className='absolute top-[65%] left-[50%] -translate-x-[50%] flex gap-x-3'>
          <button onClick={() => setHeading("Past Sponsors")}
            className={`text-7xl font-bold ${heading === "Past Sponsors" ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => setHeading("Sponsors")}
            className={`text-7xl font-bold ${heading === "Sponsors" ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' className='scrollAnimatedOutline absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='relative col-span-3 border-greyBorder border-t sm:border-t-transparent sm:border-l sm:border-r grid grid-cols-2 row-span-3'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-greyBorder border-l border-r w-5/7'></div>
        <div className='border-greyBorder sm:border-r'></div>
        <div className='absolute top-[50%] -translate-y-[50%] flex'>
          <ul className='flex infinite-scroll-carousel bg-background border-greyBorder border-t border-b'>
            {heading === "Sponsors" ? [...currentSponsors, ...currentSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-greyBorder border-l'>
                <img src={sponsor.image} className='w-72 py-6' />
              </li>
            )) : [...pastSponsors, ...pastSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-greyBorder border-l'>
                <img src={sponsor.image} className='w-72 py-6' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  )
}

export default Sponsors
