import './App.css'
import Navbar from "./components/home/Navbar"
import Footer from "./components/home/Footer"
import Hero from './components/home/Hero'
import Timeline from './components/home/Timeline'
import About from './components/home/About'
import Contact from './components/home/Contact'

function App() {

  return (
    <>
      <main className='font-sometypeMono'>
        <Navbar />
        <Hero />
        <Timeline />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
