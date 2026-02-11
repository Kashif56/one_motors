import { useState, useEffect } from 'react'
import { Container, Section } from '../common/Layout'

const reviews = [
  { 
    name: 'James Wilson', 
    role: 'Owner of Range Rover Sport',
    text: "One Motors made the entire process so smooth. The delivery service was exceptional and the car arrived in pristine condition."
  },
  {
    name: 'Sarah Thompson', 
    role: 'Owner of BMW 420d M Sport',
    text: "Professional, transparent, and high-quality cars. I couldn't be happier with my new BMW. Truly a five-star experience."
  },
  { 
    name: 'Michael Chen', 
    role: 'Owner of Tesla Model 3',
    text: "Highly recommend! The team is incredibly knowledgeable and helped me find exactly what I was looking for without any pressure."
  },
  { 
    name: 'Emma Davis', 
    role: 'Owner of Audi RS5',
    text: "The attention to detail is unmatched. The car looked better than new. A fantastic buying experience from start to finish."
  },
  { 
    name: 'Robert Fox', 
    role: 'Owner of Mercedes C63',
    text: "A truly premium experience. No pressure sales, just great advice, and a stunning vehicle that exceeded my expectations."
  }
]

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-rotate
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [isAutoPlaying])

    const handleManualChange = (index) => {
        setIsAutoPlaying(false) // Stop auto-rotation if user interacts
        setCurrentIndex(index)
    }

    const review = reviews[currentIndex]

    return (
        <Section className="bg-[#080808] py-32 relative overflow-hidden">
             {/* Background Big Quote */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] text-[200px] md:text-[500px]  text-white/5 opacity-20 pointer-events-none select-none overflow-hidden leading-none z-0">"</div>
             
             <Container className="relative z-10">
                 <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
                     
                     {/* Em Dash Header */}
                     <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-20 fade-up">
                        <span className="w-8 md:w-12 h-[2px] bg-secondary" />
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Spotlight Review</span>
                     </div>
                     
                     <div className="animate-fade-up min-h-[300px] flex flex-col justify-between">
                         <h2 className="text-3xl md:text-5xl lg:text-6xl  text-white leading-tight mb-10 transition-all duration-500">
                            "{review.text}"
                         </h2>
                         
                         <div className="flex flex-col items-center gap-3">
                            <h4 className="text-xl md:text-2xl font-bold text-white mb-0">{review.name}</h4>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-8">{review.role}</p>
                            
                            {/* Pagination Dots */}
                            <div className="flex gap-3">
                                 {reviews.map((_, idx) => (
                                     <button 
                                        key={idx}
                                        onClick={() => handleManualChange(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-secondary' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                                        aria-label={`Go to review ${idx + 1}`}
                                     />
                                 ))}
                            </div>
                         </div>
                     </div>
                 </div>
             </Container>
        </Section>
    )
}

export default Testimonials
