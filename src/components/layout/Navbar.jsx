
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../common/UIComponents'

const navItems = ['Home', 'Cars', 'Services', 'About', 'Contact']

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    
    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [location])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
            scrolled ? 'bg-white text-black py-4 shadow-md' : 'bg-transparent text-white py-6 md:py-8'
        }`}>
            <div className="max-w-[1920px] mx-auto px-6 md:px-16 flex justify-between items-center">
                {/* Left: Menu Trigger */}
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="hover:text-secondary transition-colors group flex items-center gap-3 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                         <div className="flex flex-col gap-1.5 group-hover:gap-2 transition-all">
                             <span className={`w-8 h-[2px] ${scrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? '!bg-secondary rotate-45 translate-y-2' : ''} transition-all duration-300`} />
                             <span className={`w-6 h-[2px] ${scrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : ''} group-hover:w-8 transition-all duration-300`} />
                             <span className={`hidden ${isOpen ? 'block w-8 h-[2px] !bg-secondary -rotate-45 -translate-y-2' : ''} transition-all duration-300`} />
                         </div>
                         <span className={`hidden md:block text-xs uppercase tracking-widest font-bold ${isOpen ? 'text-secondary' : ''}`}>
                            {isOpen ? 'Close' : 'Menu'}
                         </span>
                    </button>
                </div>

                {/* Center: Logo */}
                <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 text-center group">
                    <h1 className={`text-2xl md:text-3xl font-black tracking-tighter leading-none group-hover:tracking-normal transition-all duration-500 ${scrolled ? 'text-black' : 'text-white'}`}>
                        ONE M.
                    </h1>
                </Link>

                {/* Right: Actions */}
                <div className="flex gap-4 md:gap-6 items-center">
                    <Link 
                        to="/contact" 
                        className={`text-xs uppercase tracking-widest font-bold hidden md:block hover:text-secondary transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
                    >
                        Start Engine
                    </Link>
                    
                    {/* Mobile Call Button */}
                    <a href="tel:07733488929" className="md:hidden">
                        <Phone size={20} className={scrolled ? 'text-black' : 'text-white'} />
                    </a>

                    <div className={`w-8 h-8 rounded-full border ${scrolled ? 'border-black text-black' : 'border-white text-white'} flex items-center justify-center cursor-pointer hover:bg-secondary hover:border-secondary hover:text-white transition-all`}>
                        <User size={14} />
                    </div>
                </div>
            </div>

            {/* Fillscreen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 top-0 left-0 w-full bg-[#111] text-white z-[-1] pt-28 pb-10 overflow-y-auto"
                    >
                        <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 h-full content-start">
                            
                            {/* Navigation Links */}
                            <div className="space-y-4 md:space-y-6 flex flex-col justify-center">
                                {navItems.map((item, i) => (
                                    <Link 
                                        key={item} 
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                                        className="block text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 hover:to-secondary transition-all hover:pl-4" 
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-sm md:text-lg text-gray-600 font-mono align-top mr-4 md:mr-8 inline-block mt-2">0{i+1}</span>
                                        {item}
                                    </Link>
                                ))}
                            </div>

                            {/* Info Section */}
                            <div className="text-gray-400 font-mono text-sm space-y-8 md:space-y-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-16">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-secondary mb-3">Headquarters</p>
                                    <p className="text-lg md:text-xl text-white leading-relaxed">
                                        288a Kingston Rd<br/>
                                        Leatherhead, KT22 7QD<br/>
                                        United Kingdom
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-secondary mb-3">Direct Line</p>
                                    <p className="text-lg md:text-xl text-white leading-relaxed">
                                        07733 488 929<br/>
                                        <span className="text-gray-500">info@onemotors.co.uk</span>
                                    </p>
                                </div>
                                <div className="pt-4">
                                     <Button onClick={() => setIsOpen(false)} className="w-full md:w-auto bg-white text-black hover:bg-secondary border-none py-4 text-xs font-bold uppercase tracking-widest">
                                        Schedule Inspection
                                     </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
