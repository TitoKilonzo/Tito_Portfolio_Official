import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './components/ThemeToggle'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AppInner() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"             element={<Home />}         />
          <Route path="/about"        element={<About />}        />
          <Route path="/projects"     element={<Projects />}     />
          <Route path="/blog"         element={<Blog />}         />
          <Route path="/services"     element={<Services />}     />
          <Route path="/contact"      element={<Contact />}      />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <ThemeProvider>
      <Preloader onDone={() => setReady(true)} />
      {ready && <AppInner />}
    </ThemeProvider>
  )
}
