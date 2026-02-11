
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { Container } from '../components/common/Layout'
import { Button } from '../components/common/UIComponents'

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
        }, 1500)
    }

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center items-center text-center py-12 md:py-20 bg-white/5 border border-white/10"
            >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black italic uppercase text-white mb-2">
                    TRANSMISSION<br/>RECEIVED
                </h3>
                <p className="text-gray-400 font-mono text-sm md:text-base max-w-xs mx-auto mb-8">
                    OUR AGENTS ARE ALREADY ANALYZING YOUR REQUEST. STAND BY FOR CONTACT.
                </p>
                <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-white/10 hover:bg-white/20 text-white border-none"
                    variant="outline"
                >
                    SEND_NEW_TRANSMISSION
                </Button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-400 font-mono tracking-wider">FIRST_NAME</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 focus:border-secondary/50 rounded-none px-4 py-3 text-white focus:outline-none transition-all lg:skew-x-[-10deg]" placeholder="JOHN" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-400 font-mono tracking-wider">LAST_NAME</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 focus:border-secondary/50 rounded-none px-4 py-3 text-white focus:outline-none transition-all lg:skew-x-[-10deg]" placeholder="DOE" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-400 font-mono tracking-wider">EMAIL_ADDRESS</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 focus:border-secondary/50 rounded-none px-4 py-3 text-white focus:outline-none transition-all lg:skew-x-[-10deg]" placeholder="JOHN@EXAMPLE.COM" />
            </div>
            <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-400 font-mono tracking-wider">PHONE_NUMBER</label>
                <input required type="tel" className="w-full bg-white/5 border border-white/10 focus:border-secondary/50 rounded-none px-4 py-3 text-white focus:outline-none transition-all lg:skew-x-[-10deg]" placeholder="+44 7700 900000" />
            </div>
            <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-400 font-mono tracking-wider">TRANSMISSION_DATA</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 focus:border-secondary/50 rounded-none px-4 py-3 text-white focus:outline-none transition-all resize-none lg:skew-x-[-10deg]" placeholder="I'M INTERESTED IN..." />
            </div>
            <Button 
                disabled={isSubmitting}
                className="w-full py-4 text-base md:text-lg font-black tracking-widest uppercase bg-secondary text-black hover:bg-white lg:skew-x-[-10deg] transform transition-all hover:scale-[1.02] active:scale-95 border-none clip-path-polygon disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? 'TRANSMITTING...' : 'INITIALIZE_CONTACT'}
                    <Zap className={`w-5 h-5 fill-current ${isSubmitting ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'}`} />
                </span>
                {isSubmitting && (
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="absolute inset-0 bg-white/20 z-0"
                    />
                )}
            </Button>
        </form>
    )
}

const Contact = () => {
    return (
        <div className="bg-[#0f0f0f] overflow-x-hidden w-full">
            {/* --- HERO SECTION: THE VELOCITY --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center py-12 md:py-24">
                {/* Speed Lines Background */}
                <div className="absolute inset-0 overflow-hidden transform -skew-x-12 scale-150 opacity-20 pointer-events-none">
                     {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
                            style={{
                                left: `${i * 5}%`,
                                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                                animationDelay: `-${Math.random() * 2}s`
                            }}
                        />
                     ))}
                     <style>{`
                        @keyframes fall {
                            0% { transform: translateY(-100%); }
                            100% { transform: translateY(100%); }
                        }
                     `}</style>
                </div>

                <Container className="relative z-10 w-full px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-stretch">
                        {/* Left Panel - The Brand */}
                        <div className="lg:w-5/12 bg-secondary text-black p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden group transform lg:-skew-x-6 hover:lg:skew-x-0 transition-transform duration-500 origin-bottom-left shadow-[0_0_50px_rgba(197,160,89,0.3)] min-h-[400px]">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10" />
                            
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative z-20"
                            >
                                <Zap size={48} className="mb-6 md:mb-8 rotate-12" />
                                <h2 className="text-5xl md:text-6xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6">
                                    FAST<br/>LANE
                                </h2>
                                <p className="font-bold text-lg md:text-xl opacity-80 uppercase tracking-widest max-w-[200px] border-l-4 border-black pl-4">
                                    Don't wait. Drive.
                                </p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 md:mt-12 space-y-4 md:space-y-6 font-mono font-bold relative z-20"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs opacity-60">HEAR_US</span>
                                    <a href="tel:07733488929" className="text-xl md:text-2xl tracking-tighter hover:opacity-70 transition-opacity">07733 488 929</a>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs opacity-60">WRITE_US</span>
                                    <a href="mailto:info@onemotors.co.uk" className="text-xl md:text-2xl tracking-tighter hover:opacity-70 transition-opacity">INFO@ONEMOTORS.CO.UK</a>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs opacity-60">LOCATE_US</span>
                                    <p className="text-base md:text-lg leading-tight">288A KINGSTON RD, LEATHERHEAD<br/>KT22 7QD</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Panel - The Form */}
                        <div className="lg:w-7/12 bg-[#1a1a1a] p-8 md:p-12 lg:p-16 border-t-8 lg:border-t-0 lg:border-r-8 border-white/10 relative transform lg:-skew-x-6 shadow-2xl">
                            {/* Terminal Header */}
                            <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-white/10 pb-4">
                                <h3 className="text-white text-2xl md:text-3xl font-bold italic uppercase flex items-center gap-4">
                                    <span className="w-8 md:w-12 h-4 md:h-6 bg-secondary skew-x-12 inline-block" />
                                    Inquiry Terminal
                                </h3>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse" />
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
                                </div>
                            </div>
                            
                            {/* Counter-skew internal content for readability on desktop */}
                            <div className="transform lg:skew-x-6"> 
                                 <ContactForm />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* --- MAP SECTION: THE COORDINATES --- */}
            <section className="relative py-0 pb-20 overflow-hidden px-4 md:px-0">
                <Container>
                    <div className="relative">
                         {/* Decorative Header for Map */}
                        <div className="flex items-end gap-3 md:gap-4 mb-4 transform lg:-skew-x-12 lg:ml-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic uppercase text-white tracking-tighter">
                                ZONE <span className="text-secondary">TARGET</span>
                            </h2>
                            <div className="h-3 md:h-4 w-20 md:w-32 bg-secondary animate-pulse" />
                        </div>

                         {/* Skewed Map Container */}
                        <div className="w-full h-[300px] md:h-[500px] bg-dark relative transform lg:-skew-x-6 border-4 border-white/10 overflow-hidden group">
                           {/* Overlay Gradients */}
                           <div className="absolute inset-0 bg-secondary/10 pointer-events-none z-10 mix-blend-overlay" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10 opacity-60" />

                           {/* Map Iframe */}
                            <div className="w-[120%] h-[120%] -ml-[10%] -mt-[5%] transform lg:skew-x-6 grayscale invert contrast-125 hover:filter-none transition-all duration-700">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.761066547633!2d-0.264645923456789!3d51.3533923717789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487609a3c9a3b2ad%3A0x1c3a6c5b9f7b3b3a!2s288%20Kingston%20Rd%2C%20Leatherhead%20KT22%207QD!5e0!3m2!1sen!2suk!4v1709123456789!5m2!1sen!2suk" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Location Pin Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                                 <div className="relative">
                                    <div className="w-8 h-8 bg-secondary rotate-45 animate-ping absolute inset-0" />
                                    <div className="w-8 h-8 bg-secondary rotate-45 relative flex items-center justify-center border-2 border-black">
                                        <MapPin className="text-black -rotate-45" size={16} />
                                    </div>
                                 </div>
                            </div>
                        </div>

                        {/* Location Detail Strip */}
                        <div className="bg-white/5 border-l-4 border-secondary p-4 md:p-6 mt-6 md:mt-8 max-w-2xl mx-auto transform lg:skew-x-[-10deg]">
                            <div className="transform lg:skew-x-[10deg] flex flex-wrap justify-between items-center gap-4">
                                <div className="w-full sm:w-auto">
                                    <p className="text-xs text-gray-400 font-mono tracking-widest mb-1">COORDINATES</p>
                                    <p className="text-white font-bold text-sm md:text-base">51.3534° N, 0.2646° W</p>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <p className="text-xs text-gray-400 font-mono tracking-widest mb-1">LOCAL_TIME</p>
                                    <p className="text-white font-bold flex items-center gap-2 text-sm md:text-base">
                                        <Clock size={14} className="text-secondary" />
                                        09:00 - 18:00
                                    </p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="w-full sm:w-auto text-xs py-2 px-4 !border-white/20 hover:!border-secondary hover:!bg-secondary hover:text-black transition-colors"
                                >
                                    GET DIRECTIONS
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Contact
