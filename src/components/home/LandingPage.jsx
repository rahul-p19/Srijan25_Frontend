/* eslint-disable react/prop-types */
import Footer from "../Footer";
import Navbar from "../Navbar";
import About from "./About";
import Contact from "./Contact";
import Conveners from "./Conveners";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Speakers from "./Speakers";
import Sponsors from "./Sponsors";
import Timeline from "./Timeline";
import Sidebar from "./Sidebar";
import Cards from "./Cards";
import { Suspense, useEffect } from "react";
import PageReveal from "../PageReveal";
import Artists from "./Artists";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const pastSpeakers = [
  {
    name: "Raj Vikramaditya",
    about: "Founder and CEO, TakeUForward",
    image: "/speakers/raj-vikramaditya.jpg",
    youtube: "https://www.youtube.com/@takeUforward",
    linkedin: "https://www.linkedin.com/in/rajstriver/"
  },
  {
    name: "Aman Dhattarwal",
    about: "Founder and CEO, Apna College",
    image: "/speakers/aman-dhattarwal.jpg",
    youtube: "https://www.youtube.com/@AmanDhattarwal",
    linkedin: "https://www.linkedin.com/in/dhattarwalaman/"
  },
  {
    name: "Gaurav Sen",
    about: "Founder, InterviewReady",
    image: "/speakers/gaurav-sen.jpg",
    youtube: "https://www.youtube.com/@gkcs",
    linkedin: "https://www.linkedin.com/in/gkcs/"
  },
  {
    name: "Amitabh",
    about: "Operations Director, Chandrayaan 3",
    image: "/speakers/Amitabh-Singh.png",
    linkedin: "https://www.linkedin.com/in/amitabh-amitabh-069038bb/"
  },
  {
    name: "Soumita Roy Choudhury",
    about: "VP APAC Mobilewalla",
    image: "/speakers/soumita-roy-choudhury.jpg",
    youtube: "",
    linkedin: "https://www.linkedin.com/in/soumita-roy-choudhury-5a842120/?originalSubdomain=sg"
  },
  {
    name: "Shibaji Paul",
    about: "Youtuber, 635K+ Subscribers",
    image: "/speakers/shibaji-paul.jpg",
    youtube: "https://www.youtube.com/@explorershibaji",
    instagram: "https://www.instagram.com/explorer_shibaji/"
  },
]

const currentSpeakers = [
  {
    name: "Dr. Gajendra Purohit",
    about: "Educator & Entrepreneur, 1.63M YT Subscribers",
    image: "/speakers/gajendra-purohit.jpg",
    youtube: "https://www.youtube.com/@gajendrapurohit",
    linkedin: "https://www.linkedin.com/in/dr-gajendra-purohit/"
  },
  {
    name: "Rajit Bhattacharya",
    about: "Founder and CEO, Data Sutram",
    image: "/speakers/rajit-bhattacharya.jpg",
    linkedin: "https://www.linkedin.com/in/rajitbhattacharya/"
  },
  {
    name: "Dr. Debiprosad Duari",
    about: "Former Director, Research & Academic at MP Birla",
    image: "/speakers/debiprosad-duari.jpg",
    linkedin: "https://www.linkedin.com/in/debiprosad-duari-039597175/"
  }
]

function Loading() {
  return (
    <div className="h-screen w-screen bg-background fixed z-[300]">
      <img
        src="/fetsu-presents-srijan25.svg"
        alt="Srijan 25 Logo"
        height="auto"
        width="auto"
        className="absolute top-[30%] left-[51%] -translate-[50%] h-36 w-auto"
      />
      <img
        src="/techno-management-fest.webp"
        height="auto"
        width="auto"
        alt="The Annual Techno-Management Fest of Jadavpur University"
        className="text-center absolute top-[52.5%] left-[50%] -translate-[50%] border border-white p-2 w-2/3 sm:w-1/3"
      />
      <div className="absolute top-[75%] left-[50%] -translate-[50%] p-3 animate-spin bg-gradient-to-bl from-red via-purple to-lavender h-24 w-24 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-background"></div>
      </div>
    </div>
  );
}

const LandingPage = ({ setUser }) => {
  useEffect(() => {
    const sid = localStorage.getItem("sid");
    setUser(sid ?? "");

    setTimeout(()=>{
      toast("F5 Speakers live!")
    },1000)
    
  },[]);

  return (
    <Suspense fallback={<Loading />}>
      <main className="font-sometypeMono bg-background">
        <Helmet>
          <link rel="canonical" href="https://srijanju.in" />
          <meta
            name="description"
            content="Official Website for Srijan'25 - The Annual Techno-Management Fest of Jadavpur University"
          />
        </Helmet>
        <PageReveal />
        <Navbar />
        <Sidebar />
        <Hero />
        <Timeline />
        <Sponsors />
        <Cards />
        <Speakers speakerDetails={currentSpeakers} headerText={"F5 Speakers"} />
        <Speakers speakerDetails={pastSpeakers} headerText={"Past Speakers"} />
        <Artists />
        <About />
        <Gallery />
        <Contact />
        <Conveners />
        <Footer />
      </main>
    </Suspense>
  );
};

export default LandingPage;
