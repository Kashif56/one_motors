import { ArrowRight, Play, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../common/Layout'
import { Button } from '../common/UIComponents'
import { cn } from '../../services/utils'
import heroImg from '../../assets/hero-car.png'

export const HeroClassic = () => {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-dark">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={heroImg} 
                    alt="Luxury Performance Vehicle" 
                    className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90" />
            </div>

            <Container className="relative z-10 text-white h-full flex items-center">
                <div className="max-w-4xl fade-up">
                    <h1 className="text-7xl md:text-[9rem] font-serif leading-[0.8] mb-8 tracking-tighter">
                        Pure <br />
                        <span className="text-secondary italic font-light drop-shadow-2xl">Elegance.</span>
                    </h1>
                    <div className="w-24 h-1 bg-secondary mb-10" />
                    <p className="text-2xl text-gray-300 mb-12 max-w-xl font-light leading-relaxed">
                        Experience automotive perfection. A curated collection for those who demand the extraordinary.
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                        <Link to="/cars">
                            <Button className="h-16 px-10 text-lg group bg-white text-dark hover:bg-secondary hover:text-white border-none transition-all duration-500 shadow-xl">
                                Discover Collection
                                <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Play size={20} className="ml-1 fill-white" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest">Watch Film</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
