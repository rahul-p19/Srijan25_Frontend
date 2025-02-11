import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function PageReveal() {
  const container = useRef();
  const leftBlock = useRef();
  const rightBlock = useRef();
  const logo = useRef();
  const loader = useRef();

  useGSAP(() => {

    gsap.to([logo.current, loader.current], {
      opacity: 0,
      display: "none",
      duration: 0.3,
      delay: 0.1
    })

    gsap.to(leftBlock.current, {
      xPercent: -100,
      delay: 0.4,
      duration: 1.5,
      ease: "power3.inOut"
    })

    gsap.to(rightBlock.current, {
      xPercent: 100,
      delay: 0.4,
      duration: 1.5,
      ease: "power3.inOut"
    })

  }, {
    scope: container
  })

  return (
    <div ref={container} className="h-screen w-screen fixed z-[300]">
      <div ref={leftBlock} className='absolute bg-background h-screen w-1/2'></div>
      <div ref={rightBlock} className='absolute bg-background h-screen w-1/2 left-[50%]'></div>
      <img ref={logo} src="/fetsu-presents-srijan25.svg" alt="Srijan 25 Logo" className="absolute top-[30%] left-[51%] -translate-[50%] h-36 w-auto" />
      <div ref={loader} className="absolute top-[70%] left-[50%] -translate-[50%] p-3 animate-spin bg-gradient-to-bl from-red via-purple to-lavender h-24 w-24 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
      </div>
    </div>

  )
}

export default PageReveal
