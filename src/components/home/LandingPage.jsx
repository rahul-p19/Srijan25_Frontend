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

export const LandingPage = () => (
  <main className="font-sometypeMono bg-background">
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
