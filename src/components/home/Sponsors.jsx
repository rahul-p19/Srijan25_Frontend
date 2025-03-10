import "./infiniteScroll.css"
import React, { useState, useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger);


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
  { image: "/past-sponsors/4th-street-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/air-india-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/british-council-logo.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/bsnl-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/cesc-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/crescent-electric-logo.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/eillm-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/friendsfm-logo.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/holiday-inn-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/hyundai-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/id0if2F9r8_1739452523011.svg", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/id2Y4NR5gs_1739453947719.png", text: "past-sponsor", contrast: false },
  {
    image: "/past-sponsors/bbq-nation-logo.png", text: "past-sponsor", contrast: false
  },
  { image: "/past-sponsors/id8bItcgXR_1739453080609.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idAhC7tCYI_1739453384521.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idD0kDPd8T_1739453299036.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idKtU5gOEj_1739452469668.svg", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/idN3OdcTG__1739452699673.svg", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idOwOceQMf_1739453110810.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/ida9N-7Ufo_1739453004521.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idbWRcSAtt_logos.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/ideFUBvQnK_1739452592554.svg", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/ideI48Dyrt_1739453978333.jpeg", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idg5PoFoon_1739453676690.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/idhciyiwM8_1739454052174.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idnINEeqNC_1739452933876.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/idqB2cat2f_1739454152164.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/mobilewalla-logo.png", text: "past-sponsor", contrast: false },
  { image: "/past-sponsors/no-distance-logo.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/pizza-hut-logo.png", text: "past-sponsor", contrast: true },
  { image: "/past-sponsors/wow-momo-logo.png", text: "past-sponsor", contrast: false },
]

const primarySponsors = [
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: "Primary Sponsor",
    link: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: "Primary Sponsor",
    link: ""
  },
  {
    image: "/fetsu-presents-srijan-glitch.svg",
    text: "Primary Sponsor",
    link: ""
  },
]

function Sponsors() {

  const [heading, setHeading] = useState("Past Sponsors");
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
      <div className={`absolute top-[40%] sm:top-4 right-0 h-1/4 w-full sm:w-4/5 flex justify-between items-center ${heading === "Sponsors" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-500`}>
        <div className="grid place-items-center grid-cols-2 w-2/3 sm:w-3/4 h-full gap-4 px-2">
          {primarySponsors.filter((sponsor, ind) => ind < 2).map((sponsor, ind) => <img alt={sponsor.text} src={sponsor.image} key={ind} height="auto" width="auto" className="sm:w-1/2 border border-greyBorder px-2" />)}
        </div>
        <div className="grid place-items-center h-full w-1/3 sm:w-1/4 p-2 sm:p-4"><img alt={primarySponsors[2].text} src={primarySponsors[2].image} height="auto" width="auto" className="w-48 border border-greyBorder px-2" /></div>
      </div>
      <div className='relative bg-background z-[100] h-full border-greyBorder border-r -mr-[1px] row-span-2'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-greyBorder border-l border-r w-5/7'></div>
        <h2 className='scrollAnimatedText absolute text-2xl sm:text-xl xl:text-3xl text-center top-[50%] left-[50%] -translate-[50%]'>{heading}</h2>
        <div className='hidden absolute top-[65%] left-[50%] -translate-x-[50%] gap-x-3'>
          <button onClick={() => setHeading("Past Sponsors")}
            className={`text-7xl font-bold ${heading === "Past Sponsors" ? 'opacity-40' : ''}`}>
            &lsaquo;
          </button>
          <button onClick={() => setHeading("Sponsors")}
            className={`text-7xl font-bold ${heading === "Sponsors" ? 'opacity-40' : ''}`}>
            &rsaquo;
          </button>
        </div>
        <img src='heading-outline.svg' alt='Outline for header' height="auto" width="auto" loading="lazy" className='scrollAnimatedOutline absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-2' />
      </div>
      <div className='relative col-span-3 border-greyBorder border-t sm:border-t-transparent sm:border-l sm:border-r grid grid-cols-2 row-span-3 h-full'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-greyBorder border-l border-r w-5/7'></div>
        <div className='border-greyBorder sm:border-r'></div>
        <div className='absolute top-[50%] -translate-y-[50%] flex h-1/2'>
          <ul className='flex items-center infinite-scroll-carousel bg-background border-greyBorder border-t border-b h-full'>
            {heading === "Sponsors" ? [...currentSponsors, ...currentSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] h-full px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-greyBorder border-l'>
                <img loading="lazy" src={sponsor.image} className='w-72 py-6' alt="Sponsor of Srijan'25" width="auto" height="auto" />
              </li>
            )) : [...pastSponsors, ...pastSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-greyBorder border-l h-full'>
                <img loading="lazy" src={sponsor.image} alt="Past Sponsor of Srijan" height="auto" width="auto" className={`h-1/2 w-1/2 object-contain ${sponsor.contrast ? 'p-2 bg-white rounded-sm' : ''}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  )
}

export default Sponsors
