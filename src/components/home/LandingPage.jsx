import Footer from "../Footer";
import Navbar from "../Navbar";
import About from "./About";
import Contact from "./Contact";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Speakers from "./Speakers";
import Sponsors from "./Sponsors";
import Timeline from "./Timeline";

export const LandingPage = () => (
  <div>
    <main className="font-sometypeMono">
      <Navbar />
      <Hero />
      <Timeline />
      <Sponsors />
      <Speakers />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  </div>
);
