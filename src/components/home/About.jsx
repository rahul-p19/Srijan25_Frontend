import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CustomEase } from 'gsap/dist/CustomEase';

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);


function About() {
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

        gsap.set(".aboutJadavpur", {
          y: 75,
          opacity: 0,
        })

        gsap.to(".aboutJadavpur", {
          y: 0,
          yPercent: 0,
          opacity: 1,
          duration: reduceMotion ? 0 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: isDesktop ? "top 72%" : "top 80%",
          }
        })

        gsap.set(".aboutJadavpurOutline", {
          y: 75,
          xPercent: -50,
          opacity: 0,
        })

        gsap.to(".aboutJadavpurOutline", {
          y: 0,
          yPercent: 0,
          xPercent: -50,
          opacity: 1,
          duration: reduceMotion ? 0 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: isDesktop ? "top 72%" : "top 80%",
          }
        })

        gsap.set(".aboutSrijan", {
          y: 75,
          opacity: 0,
        })

        gsap.to(".aboutSrijan", {
          y: 0,
          yPercent: 0,
          opacity: 1,
          duration: reduceMotion ? 0 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: isDesktop ? "top 20%" : "top 0%",
          }
        })

        gsap.set(".aboutSrijanOutline", {
          y: 75,
          xPercent: -50,
          opacity: 0,
        })

        gsap.to(".aboutSrijanOutline", {
          y: 0,
          yPercent: 0,
          xPercent: -50,
          opacity: 1,
          duration: reduceMotion ? 0 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: isDesktop ? "top 20%" : "top 0%",
          }
        })


      })

  }, {
    scope: container
  })
  return (
    <div ref={container} className='min-h-screen border-greyBorder border-t grid grid-cols-1 sm:grid-cols-5'>
      <div className='relative h-[20vh] sm:h-screen border-greyBorder border-b sm:border-b-transparent'>
        <h2 className='aboutJadavpur text-3xl absolute text-center top-[35%] sm:top-[22%] left-[50%] -translate-x-[50%] sm:-translate-y-[50%]'>About JU</h2>
        <img src='heading-outline.svg' className='px-2 aboutJadavpurOutline absolute top-[20%] left-[50%] -translate-x-[50%] sm:-translate-y-[50%]' />
        <div className='absolute sm:hidden left-[50%] -translate-x-[50%] h-full w-5/7 border-greyBorder border-l border-r'></div>
        <h2 className='aboutSrijan hidden sm:block text-3xl absolute text-center top-[71%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>About Srijan</h2>
        <img src='heading-outline.svg' className='px-2 aboutSrijanOutline hidden sm:block absolute top-[70%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
      </div>
      <div className='col-span-3 border-greyBorder sm:border-l sm:border-r grid row-span-5'>
        <div className='row-span-2 grid place-items-center px-8 py-4 sm:py-0 text-left sm:text-justify'>
          <p className='aboutJadavpur'>
            Founding members of National Council of Bengal, in 1906 set the goal "To achieve self reliance through empowerment of Youth by imparting Best of Global Knowledge", and Jadavpur University, founded on 24th December 1955, continues to do the same today. <br />
            The university's commitment to research, innovation, community engagement, a legendary network of alumnus, and its unwavering contribution to imparting knowledge and refining the taste of culture and technology has marked its distinguished reputation not only in the Indian subcontinent but also at an international level.
          </p>
        </div>
        <div className='sm:hidden relative h-[20vh] border-greyBorder border-t sm:border-t-transparent'>
          <h2 className='scrollAnimatedText text-3xl absolute text-center top-[25%] left-[50%] -translate-x-[50%] w-1/3 aboutSrijan'>About Srijan</h2>
          <img src='heading-outline.svg' className='px-2 aboutSrijanOutline absolute top-[20%] left-[50%] -translate-x-[50%]' />
          <div className='absolute left-[50%] -translate-x-[50%] h-full w-5/7 border-greyBorder border-l border-r'></div>
        </div>
        <div className='grid grid-cols-2 sm:border-greyBorder border-t sm:border-b'>
          <div className='border-greyBorder border-r'></div>
        </div>
        <div className='row-span-2 grid place-items-center px-8 py-4 sm:py-0 text-left sm:text-justify'>
          <p className='aboutSrijan'>
            In the heart of Kolkata, where passion ignites, Srijan flourishes — an annual tribute to creativity and excellence, cradled by Jadavpur. From its inception in 2007 as a humble spark, it has flourished into an spectacular festival of technology and management. <br />
            In this four-day spectacle, Srijan transcends from being merely a festival, it becomes a chorus of the most brilliant minds, echoing through the halls of Jadavpur's heritage. Join us at Jadavpur University to engage in 35+ events ranging from Coding Competitions, B-Plan competitions, Case Studies, Equity Research Events, Robotics Competitions, Web Design, Rap Battles and many more to have an experience of a lifetime.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default About
