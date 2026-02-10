import { ArrowRight, Play, Star, Gauge, Shield, Users, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../common/Layout'
import { Button } from '../common/UIComponents'
import heroImg from '../../assets/hero-car.png'
import interiorImg from '../../assets/luxury-interior.png'

export const HeroBlended = () => {
    return (
        <section className="relative min-h-screen flex flex-col bg-dark text-white overflow-hidden">
            {/* Main Hero Area - Cinematic with Split Layout */}
            <div className="relative h-[85vh] min-h-[700px] flex items-center">
                {/* Background Image with Vignette */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImg} 
                        alt="Luxury Performance Vehicle" 
                        className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
                </div>

                <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
                    {/* Left Content - Classic Typography */}
                    <div className="lg:col-span-7 fade-up">
                        {/* Elegant Top Line */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[2px] bg-secondary" />
                            <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs">Leatherhead's Premier Dealership</span>
                        </div>

                        {/* Impactful Headline - Blend of Classic & Modern */}
                        <h1 className="text-6xl md:text-[7.5rem] font-serif leading-[0.85] tracking-tight mb-8">
                            Uncompromising <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 italic font-light">Excellence</span>
                        </h1>

                        {/* Refined Description */}
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
                            Experience automotive perfection. A curated collection where uncompromising quality meets unparalleled service.
                        </p>

                        {/* Premium CTAs */}
                        <div className="flex flex-col sm:flex-row gap-5 mb-12">
                            <Link to="/cars">
                                <Button className="w-full sm:w-auto h-16 px-10 text-lg group bg-white text-dark hover:bg-secondary hover:text-white border-none shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.5)] transition-all duration-500">
                                    View Collection
                                    <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                                </Button>
                            </Link>
                            <a href="tel:07733488929">
                                <Button variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg font-medium border-white/30 text-white hover:border-secondary hover:text-secondary backdrop-blur-sm transition-all duration-500">
                                    Book Appointment
                                </Button>
                            </a>
                        </div>

                        {/* Stats Row - From Split Version */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            {[
                                { label: 'Vehicles', value: '50+', icon: Gauge },
                                { label: 'Inspection', value: '100%', icon: Shield },
                                { label: 'Happy Clients', value: '250+', icon: Users }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1">
                                        <stat.icon size={12} className="text-secondary" /> {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Floating Glass Card with Interior Image */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="glass-card p-8 backdrop-blur-xl border-white/10 bg-white/5 group hover:border-secondary/30 transition-all duration-500">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                                <img 
                                    src={interiorImg} 
                                    alt="Luxury Interior" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed text-lg font-light italic">
                                "Automotive excellence isn't just about speed. It's about the feeling of absolute control and uncompromising luxury."
                            </p>
                            <div className="flex items-center gap-4 text-white/80 group-hover:text-secondary transition-colors cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-secondary group-hover:border-secondary transition-all">
                                    <Play size={18} className="ml-1 fill-current" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest">Watch Our Story</span>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Ambient Glow */}
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
            </div>

            {/* Bottom Feature Bar - Inspired by Cinematic Version */}
            <div className="relative bg-[#0a0a0a] border-t border-white/5 py-8">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
                        <div>
                            <span className="block text-2xl font-serif text-white mb-1">2024</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Latest Models</span>
                        </div>
                        <div>
                            <span className="block text-2xl font-serif text-white mb-1">0-60</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">3.2 Seconds</span>
                        </div>
                        <div>
                            <span className="block text-2xl font-serif text-white mb-1">500+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Horsepower</span>
                        </div>
                        <div>
                            <span className="block text-2xl font-serif text-white mb-1">5★</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Customer Rating</span>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
}
