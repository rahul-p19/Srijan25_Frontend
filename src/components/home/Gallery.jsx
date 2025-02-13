import "./infiniteScroll.css"
import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CustomEase } from 'gsap/dist/CustomEase';

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);


const photos = [
  "/gallery/1.png",
  "/gallery/2.png",
  "/gallery/3.png",
  "/gallery/4.png",
  "/gallery/5.png",
  "/gallery/6.png",
  "/gallery/7.png",
  "/gallery/8.png",
  "/gallery/9.png",
  "/gallery/10.png",
  "/gallery/11.png",
  "/gallery/12.png",
  "/gallery/13.png",
  "/gallery/14.png",
  "/gallery/15.png",
  "/gallery/16.png",
  "/gallery/17.png",
  "/gallery/18.png",
  "/gallery/19.png",
  "/gallery/20.png",
  "/gallery/21.png",
  "/gallery/22.png",
  "/gallery/23.png",
  "/gallery/24.png",
  "/gallery/25.png",
];

function Gallery() {
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
    <div ref={container} className='w-full relative border-greyBorder border-t grid grid-cols-1 grid-rows-4 sm:grid-rows-1 sm:grid-cols-5 h-[80vh] sm:h-screen overflow-x-hidden'>
      <div className='absolute left-[50%] -translate-x-[50%] sm:hidden w-5/7 border-greyBorder border-r border-l h-full'></div>
      <div className='relative sm:bg-background z-[100] h-full border-r -mr-[1px] row-span-1 border-greyBorder border-b sm:border-b-transparent'>
        <h2 className='scrollAnimatedText absolute text-3xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>Gallery</h2>
        <img src='heading-outline.svg' className='px-2 scrollAnimatedText absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='relative sm:col-span-3 border-greyBorder sm:border-l sm:border-r grid grid-cols-2 row-span-3'>
        <div className='border-greyBorder sm:border-r'></div>
        <div className='h-1/2 absolute top-[10%] sm:top-[50%] sm:-translate-y-[50%] flex'>
          <ul className='flex h-full gap-x-3 infinite-scroll-gallery border-greyBorder border-t border-b'>
            {[...photos, ...photos].map((photo, ind) => (
              <li key={ind} className='h-full w-[80vw] sm:w-[35vw] grid place-items-center transition-all duration-1000'>
                <img src={photo} className='h-full w-full aspect-video object-cover object-top' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Gallery
