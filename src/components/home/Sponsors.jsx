import "./infiniteScroll.css"
import { useState, useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger);


const currentSponsors = [
  { image: "aliff-logo.webp", text: "Aliff", contrast: false },
  { image: "bong-pizza.webp", text: "Bong Pizza", contrast: false },
  { image: "canara-bank-logo.webp", text: "Canara Bank", contrast: false },
  { image: "comedy-company-logo.webp", text: "Comedy Company", contrast: false },
  { image: "drivers-club-logo.webp", text: "Classic Drivers Club", contrast: false },
  { image: "eve-placement-logo.webp", text: "EvePlacement", contrast: false },
  { image: "evepaper-logo.webp", text: "Evepaper", contrast: false },
  { image: "friends-fm-logo.webp", text: "91.9 Friends FM", contrast: false },
  { image: "ims-logo.webp", text: "IMS", contrast: false },
  { image: "interview-buddy.webp", text: "Interview Buddy", contrast: true },
  { image: "kitkat-logo.webp", text: "KitKat", contrast: false },
  { image: "nescafe-logo.webp", text: "Nescafe", contrast: false },
  { image: "redbull-logo.webp", text: "Red Bull", contrast: false },
  { image: "spykar-logo.webp", text: "Spykar", contrast: false },
  { image: "sugoi-drop-logo.webp", text: "SugoiDrop", contrast: true },
  { image: "telegraph-logo.webp", text: "Telegraph", contrast: false },
  { image: "toi-logo.webp", text: "Times of India", contrast: false },
  { image: "unstop-logo.webp", text: "Unstop", contrast: false },
  { image: "wiley-logo-black.webp", text: "Wiley", contrast: true },
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
    image: "/mio-amore-logo.svg",
    text: "Mio Amore - Premium Sponsor",
  },
  {
    image: "/paharpur-logo.webp",
    text: "Paharpur Cooling Towers - Associate Partner",
  }
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
      <div className={`absolute top-[33%] sm:top-0 right-0 h-1/3 w-full sm:w-4/5 flex justify-center sm:justify-between items-center ${heading === "Sponsors" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-500`}>
        <div className="grid place-items-center grid-cols-2 w-2/3 sm:w-3/4 h-full gap-4 px-2">
          {primarySponsors.filter((sponsor, ind) => ind < 2).map((sponsor, ind) => <img alt={sponsor.text} src={`/sponsors/${sponsor.image}`} key={ind} height="auto" width="auto" className="h-2/5 sm:h-3/4 w-auto" />)}
        </div>
      </div>
      <div className='relative bg-background z-[100] h-full border-greyBorder border-r -mr-[1px] row-span-2'>
        <div className='sm:hidden absolute left-[50%] -translate-x-[50%] h-full border-greyBorder border-l border-r w-5/7'></div>
        <h2 className='scrollAnimatedText absolute text-2xl sm:text-xl xl:text-3xl text-center top-[50%] left-[50%] -translate-[50%]'>{heading}</h2>
        <div className='absolute top-[65%] left-[50%] -translate-x-[50%] gap-x-3'>
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
        <div className='absolute top-[60%] -translate-y-[50%] flex h-1/2'>
          <ul className='flex items-center infinite-scroll-carousel bg-background border-greyBorder border-t border-b h-full'>
            {heading === "Sponsors" ? [...currentSponsors, ...currentSponsors].map((sponsor, ind) => (
              <li key={ind} className='w-[40vw] sm:w-[30vw] h-full px-4 sm:px-0 grid place-items-center transition-all duration-1000s border-greyBorder border-l'>
                <img loading="lazy" src={`/sponsors/${sponsor.image}`} className={`h-1/2 w-1/2 object-contain ${sponsor.contrast ? 'p-2 bg-white rounded-sm' : ''}`} alt={sponsor.text} width="auto" height="auto" />
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
