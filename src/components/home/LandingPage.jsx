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
  });

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
        <Speakers />
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
