import { useState, useEffect } from 'react'
import { Container } from '../common/Layout'
import HeroFilter from './HeroFilter'
// Images
import heroImg1 from '../../assets/hero-car.png'
import heroImg2 from '../../assets/hero_bg_sports.png'
import heroImg3 from '../../assets/hero_bg_suv.png'

const HERO_IMAGES = [heroImg1, heroImg2, heroImg3]

export const HeroCinematic = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Dynamic Background Carousel Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        }, 5000) // Change image every 5 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative h-screen min-h-[100dvh] md:min-h-[900px] flex flex-col justify-center items-center overflow-hidden bg-dark">
            {/* Cinematic Background Carousel */}
            {HERO_IMAGES.map((img, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img 
                        src={img} 
                        alt={`Hero Background ${index + 1}`} 
                        className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                            index === currentImageIndex ? 'scale-110' : 'scale-100'
                        }`}
                    />
                    {/* Consistent Overlays */}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-dark/80" />
                </div>
            ))}

            <Container className="relative z-10 text-white w-full flex flex-col items-center justify-center text-center h-full max-w-7xl px-4 md:px-6">
                <div className="fade-up flex flex-col items-center pt-28 md:pt-0">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <span className="w-8 md:w-12 h-[1px] md:h-[2px] bg-secondary" />
                        <span className="text-secondary font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm">The One Motors Collection</span>
                    </div>

                    <h1 className="text-[2.5rem] sm:text-5xl md:text-[7rem] lg:text-[9rem]  leading-[1.1] md:leading-[0.9] tracking-tighter mb-4 md:mb-10 drop-shadow-2xl px-2">
                        Uncompromising <br className="md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 italic">Performance.</span>
                    </h1>
                    
                    <p className="text-sm sm:text-base md:text-2xl text-gray-300 mb-6 md:mb-16 max-w-2xl mx-auto leading-relaxed font-light px-4">
                        Curating the finest collection of prestige vehicles. Where uncompromising quality meets unparalleled service.
                    </p>

                    {/* Integrated Horizontal Filter */}
                    <div className="w-full max-w-4xl mx-auto">
                        <HeroFilter />
                    </div>
                </div>
            </Container>

           
        </section>
    )
}
