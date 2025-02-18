import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function PageReveal() {
  const container = useRef();
  const leftBlock = useRef();
  const rightBlock = useRef();
  const technoManagementFest = useRef();
  const logo = useRef();
  const loader = useRef();

  useGSAP(() => {

    gsap.to([logo.current, loader.current, technoManagementFest.current], {
      opacity: 0,
      display: "none",
      duration: 0.5,
      delay: 0.3
    })

    gsap.to(leftBlock.current, {
      xPercent: -120,
      delay: 0,
      duration: 2.5,
      ease: "power3.inOut"
    })

    gsap.to(rightBlock.current, {
      xPercent: 120,
      delay: 0,
      duration: 2.5,
      ease: "power3.inOut"
    })

    gsap.to(container.current, {
      delay: 2.2,
      display: "none"
    })

  }, {
    scope: container
  })

  return (
    <div ref={container} className="h-screen w-screen fixed z-[300]">
      <div ref={leftBlock} className='absolute bg-background h-screen w-full right-[45%]'></div>
      <div ref={rightBlock} className='absolute bg-background h-screen w-full left-[45%]'></div>
      <img ref={logo} src="/fetsu-presents-srijan25.svg" alt="Srijan 25 Logo" className="absolute top-[30%] left-[51%] -translate-[50%] h-36 w-auto" />
      <img src="/techno-management-fest.webp" alt="The Annual Techno-Management Fest of Jadavpur University" ref={technoManagementFest} className="text-center absolute top-[52.5%] left-[50%] -translate-[50%] border border-greyBorder p-2 w-2/3 sm:w-1/3" />
      <div ref={loader} className="absolute top-[75%] left-[50%] -translate-[50%] p-3 animate-spin bg-gradient-to-bl from-red via-purple to-lavender h-24 w-24 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-background"></div>
      </div>
    </div>

  )
}

export default PageReveal
