import "./infiniteScroll.css"
import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger);


const photos = [
  "/gallery/1.webp",
  "/gallery/2.webp",
  "/gallery/3.webp",
  "/gallery/4.webp",
  "/gallery/5.webp",
  "/gallery/6.webp",
  "/gallery/7.webp",
  "/gallery/8.webp",
  "/gallery/9.webp",
  "/gallery/10.webp",
  "/gallery/11.webp",
  "/gallery/12.webp",
  "/gallery/13.webp",
  "/gallery/14.webp",
  "/gallery/15.webp",
  "/gallery/16.webp",
  "/gallery/17.webp",
  "/gallery/18.webp",
  "/gallery/19.webp",
  "/gallery/20.webp",
  "/gallery/21.webp",
  "/gallery/22.webp",
  "/gallery/23.webp",
  "/gallery/24.webp",
  "/gallery/25.webp",
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
        <h2 className='scrollAnimatedText absolute text-2xl sm:text-xl xl:text-3xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>Gallery</h2>
        <img src='heading-outline.svg' loading="lazy" className='px-2 scrollAnimatedText absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='relative sm:col-span-3 border-greyBorder sm:border-l sm:border-r grid grid-cols-2 row-span-3'>
        <div className='border-greyBorder sm:border-r'></div>
        <div className='h-1/2 absolute top-[10%] sm:top-[50%] sm:-translate-y-[50%] flex'>
          <ul className='flex h-full gap-x-3 infinite-scroll-gallery border-greyBorder border-t border-b'>
            {[...photos, ...photos].map((photo, ind) => (
              <li key={ind} className='h-full w-[80vw] sm:w-[35vw] grid place-items-center transition-all duration-1000'>
                <img loading="lazy" src={photo} className='h-full w-full aspect-video object-cover object-top' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Gallery
