import React, { useRef } from "react";
import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MerchandisePage from './components/MerchandisePage'
import Hero from './components/home/Hero'
import Timeline from './components/home/Timeline'
import About from './components/home/About'
import Contact from './components/home/Contact'
import Speakers from './components/home/Speakers'
import Sponsors from './components/home/Sponsors'
import Gallery from './components/home/Gallery'
import Sidebar from './components/home/Sidebar'
import Cards from './components/home/Cards'
import Eventpage from "./components/Events/Eventpage"
import EventRegistration from './components/Events/EventRegistration'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const container = useRef();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="/events" element={<Eventpage />} />
          <Route path="/eventregistration" element={<EventRegistration />} />
          <Route path="/" element={
            <div>
              <main ref={container} className='font-sometypeMono'>
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
            </div>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
