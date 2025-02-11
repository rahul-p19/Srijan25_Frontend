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

export const LandingPage = () => (
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
);
