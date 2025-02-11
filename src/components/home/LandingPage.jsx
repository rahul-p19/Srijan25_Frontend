import Footer from "../Footer";
import Navbar from "../Navbar";
import About from "./About";
import Contact from "./Contact";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Speakers from "./Speakers";
import Sponsors from "./Sponsors";
import Timeline from "./Timeline";
import Sidebar from "./Sidebar";
import Cards from "./Cards"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react";
import PageReveal from "../PageReveal";

function Loading() {
  return <div className="h-screen w-screen bg-background fixed z-[300]">
    <img src="/fetsu-presents-srijan25.svg" alt="Srijan 25 Logo" className="absolute top-[30%] left-[51%] -translate-[50%] h-36 w-auto" />
    <div className="absolute top-[70%] left-[50%] -translate-[50%] p-3 animate-spin bg-gradient-to-bl from-red via-purple to-lavender h-24 w-24 aspect-square rounded-full">
      <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
    </div>
  </div>
}

export const LandingPage = () => (
  <Suspense fallback={<Loading />}>
    <main className="font-sometypeMono bg-background">
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            backgroundColor: "#141414",
            borderRadius: "0px",
            fontSize: "24px",
            padding: "12px",
            color: "white",
            borderTop: "1px solid #b60000",
            borderLeft: "1px solid #b60000",
            borderBottom: "1px solid #532e8f",
            borderRight: "1px solid #532e8f",
            zIndex: 1005,
            textAlign: "center"
          }
        }}
        containerStyle={{
          top: "15vh",
          right: "40vw",
          left: "40vw",
        }}
      />
      <PageReveal />
      <Navbar />
      <Sidebar />
      <Hero />
      <Timeline />
      <Sponsors />
      <Cards />
      <Speakers />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  </Suspense>
);
