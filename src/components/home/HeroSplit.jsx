import { ArrowRight, ChevronRight, Gauge, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../common/Layout'
import { Button } from '../common/UIComponents'
import heroImg from '../../assets/hero-car.png'

export const HeroSplit = () => {
    return (
        <section className="relative h-screen min-h-[900px] flex items-center bg-[#080808] text-white">
            <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="z-10 fade-up">
                    <div className="bg-secondary/10 w-fit px-4 py-2 rounded-full mb-6 flex items-center gap-2 border border-secondary/20">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-secondary text-xs uppercase font-bold tracking-widest">Premium Inventory Updated Daily</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                        PRECISION <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-600">PERFORMANCE</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                        Redefining the standard of luxury car ownership. Our meticulously selected inventory offers exclusivity, power, and timeless design.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Link to="/cars">
                            <Button className="w-full sm:w-auto h-16 px-10 text-lg font-bold bg-secondary text-dark hover:bg-white hover:text-dark transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                View Current Stock
                            </Button>
                        </Link>
                        <a href="tel:07733488929">
                             <Button variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg font-medium border-white/20 text-white hover:border-secondary hover:text-secondary">
                                 Make an Enquiry
                             </Button>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
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

                {/* Hero Image / Cinematic Element */}
                <div className="relative h-full min-h-[500px] lg:h-[800px] w-full rounded-[40px] overflow-hidden group">
                    <img 
                        src={heroImg} 
                        alt="High Performance Car" 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-60" />
                    
                    {/* Floating Glass Card */}
                    <div className="absolute bottom-10 left-10 right-10 glass-card p-6 backdrop-blur-xl border border-white/10 flex justify-between items-center group-hover:translate-y-[-10px] transition-transform duration-500">
                        <div>
                            <p className="text-white font-bold text-lg">Featured: BMW M4 Competition</p>
                            <p className="text-secondary font-medium text-sm">Now Available • 503 HP</p>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark text-xl group-hover:rotate-45 transition-transform duration-300">
                            <ArrowRight />
                        </div>
                    </div>
                </div>
            </Container>
            
            {/* Ambient Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    )
}
