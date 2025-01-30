import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from './components/home/Hero'
import Timeline from './components/home/Timeline'
import About from './components/home/About'
import Contact from './components/home/Contact'
import Speakers from './components/home/Speakers'
import Sponsors from './components/home/Sponsors'
import Gallery from './components/home/Gallery'

function App() {

  return (
    <>
      <main className='font-sometypeMono'>
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
    </>
  )
}

export default App
