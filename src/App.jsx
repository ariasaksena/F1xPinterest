import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Product from './pages/Product'
import GuidePage from './pages/GuidePage'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/guide/:slug" element={<GuidePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
