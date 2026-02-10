import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Car, Menu, X, Phone } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Car className="w-8 h-8 text-secondary" />
          <span className="text-2xl font-serif font-bold text-white">
            ONE <span className="text-secondary">MOTORS</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Cars', 'Services', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="font-medium transition-all hover:text-secondary text-white/80 hover:scale-105"
            >
              {item}
            </Link>
          ))}
          <a href="tel:07733488929" className="flex items-center gap-2 btn-premium py-2 px-5 text-sm uppercase tracking-widest font-bold">
            <Phone size={14} />
            07733 488 929
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-dark border-b border-white/5 py-8 flex flex-col items-center gap-6 md:hidden animate-fade-in">
          {['Home', 'Cars', 'Services', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-xl font-medium text-white hover:text-secondary"
            >
              {item}
            </Link>
          ))}
          <a href="tel:07733488929" className="flex items-center gap-2 btn-premium">
            <Phone size={18} />
            Call Us
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
