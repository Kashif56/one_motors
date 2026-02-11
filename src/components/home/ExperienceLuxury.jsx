import { useState, useRef } from 'react'
import { Container, Section } from '../common/Layout'
import { ArrowRight, Star, Shield, Award } from 'lucide-react'

// Content Data
const content = {
  tagline: "The Pinnacle of Motoring",
  heading: "Beyond Driving.",
  subheading: "Experience Artwork in Motion.",
  description: "One Motors isn't just a dealership; it's a curator of automotive excellence. We select vehicles that don't just transport you—they transform your journey. Impeccable condition, verified history, and an ownership experience as premium as the badge on the bonnet."
}

const CarImage = "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" // Dark high-end Porsche/Luxury look
const DetailImage1 = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Interior detail
const DetailImage2 = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Steering wheel

// Version 4: The "Editorial" - High Fashion Magazine Look
// Overlapping elements, massive outline typography, asymmetrical layout
export const ExperienceLuxuryV4 = () => {
  return (
    <Section className="bg-[#050505] py-24 md:py-32 overflow-hidden relative border-t border-white/5">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[15vw] md:text-[20vw] font-black text-white/5 leading-none tracking-tighter uppercase whitespace-nowrap" 
            style={{WebkitTextStroke: '1px rgba(255,255,255,0.05)', color: 'transparent'}}>
          LUXURY
        </h1>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
          
          {/* Text Block - Floating Top Left */}
          <div className="md:w-5/12 order-2 md:order-1 relative">
            <div className="bg-dark/80 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-none md:rounded-tr-[50px] relative">
              <div className="absolute -top-2 -left-2 w-20 h-20 border-t-2 border-l-2 border-secondary/50" />
              <div className="absolute -bottom-2 -right-2 w-20 h-20 border-b-2 border-r-2 border-secondary/50" />
              
              <h3 className="text-secondary font-bold tracking-[0.4em] text-xs mb-6 uppercase">One Motors Elite</h3>
              <h2 className="text-4xl md:text-6xl  text-white mb-6 leading-[0.9]">
                {content.heading} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white italic">
                  {content.subheading}
                </span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                {content.description}
              </p>
              <button className="group flex items-center gap-3 text-white border-b border-secondary pb-1 hover:text-secondary transition-colors">
                <span className="font-bold tracking-widest text-sm uppercase">Concierge Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* Image Block - Floating Bottom Right */}
          <div className="md:w-6/12 order-1 md:order-2 relative group">
            <div className="absolute inset-0 bg-secondary/20 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            <img 
              src={CarImage} 
              className="relative z-10 w-full h-[300px] md:h-[600px] object-cover grayscale-[20%] contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out"
              alt="Luxury Car"
            />
            {/* Floating Detail Badge */}
            <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 z-20 bg-white p-4 max-w-[200px] shadow-2xl hidden md:block">
               <p className="text-dark  text-xl italic leading-tight">"Where <br/>performance meets <br/>art."</p>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}

// Version 5: The "Interactive Reveal" - Darkroom Style
// Three vertical panels that expand on hover. Dark, mysterious, interactive.
export const ExperienceLuxuryV5 = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { title: "Curated", subtitle: "Inventory", desc: "Hand-picked for rarity and condition.", img: CarImage },
    { title: "Verified", subtitle: "Quality", desc: "150-Point comprehensive inspection.", img: DetailImage1 },
    { title: "Lifetime", subtitle: "Support", desc: "We are with you for the long haul.", img: DetailImage2 },
  ]

  return (
    <Section className="bg-[#0a0a0a] py-0 relative border-y border-white/5 h-[600px] md:h-[800px] flex flex-col md:flex-row overflow-hidden group">
      {tabs.map((tab, idx) => (
        <div 
          key={idx}
          onMouseEnter={() => setActiveTab(idx)}
          className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-r border-white/5 overflow-hidden
            ${activeTab === idx ? 'flex-[3] md:flex-[5] grayscale-0' : 'flex-[1] grayscale brightness-50 hover:brightness-75 cursor-pointer'}
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img src={tab.img} className="w-full h-full object-cover" alt={tab.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end h-full">
             <div className="overflow-hidden">
                <span className={`text-secondary font-bold uppercase tracking-widest text-xs md:text-sm mb-2 block transition-all delay-100 duration-500
                  ${activeTab === idx ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                  {tab.subtitle}
                </span>
                <h2 className={`text-4xl md:text-7xl  text-white mb-4 transition-all duration-500 origin-left
                   ${activeTab === idx ? 'scale-100' : 'scale-75 opacity-70'}
                `}>
                  {tab.title}
                </h2>
                <div className={`transition-all duration-500 delay-200 grid
                  ${activeTab === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}
                `}>
                  <p className="text-gray-300 text-lg overflow-hidden leading-relaxed max-w-md border-l border-secondary pl-4">
                    {activeTab === idx ? content.description : ""}
                  </p>
                </div>
             </div>
          </div>

          {/* Vertical Label (when closed) */}
          <div className={`absolute top-12 left-1/2 -translate-x-1/2 transition-opacity duration-300
             ${activeTab === idx ? 'opacity-0' : 'opacity-100'}
          `}>
             <span className="text-white/50 writing-vertical-rl text-xs uppercase tracking-[0.5em] rotate-180">
                {tab.title}
             </span>
          </div>
        </div>
      ))}
    </Section>
  )
}

// Version 6: The "Glass Monolith"
// A stunning, dark cinematic parallax background with a central frosted glass "monolith" content block.
export const ExperienceLuxuryV6 = () => {
  return (
    <div className="relativew-full bg-dark overflow-hidden">
       {/* Height definition for parallax feel */}
       <div className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center">
          
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
               className="w-full h-full object-cover"
               alt="Background"
             />
             <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
          </div>

          {/* Central Monolith */}
          <Container className="relative z-10 h-full flex items-center justify-center">
            <div className="relative max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-[40px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] animate-fade-up">
               
               {/* Left Half: Glass Content */}
               <div className="bg-dark/40 backdrop-blur-xl p-10 md:p-16 flex flex-col justify-center border-r border-white/5 relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
                  
                  <Award className="text-secondary w-10 h-10 mb-8" />
                  
                  <h2 className="text-4xl md:text-5xl  text-white mb-6 leading-tight">
                    Refined <span className="text-gray-500 italic">&</span> <br/>
                    <span className="text-white">Rarefied.</span>
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
                    We don't just sell cars. We grant access to a lifestyle of performance and prestige. Experience the difference of a dealership built on passion.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-white/20 flex-1" />
                    <span className="text-secondary font-bold uppercase text-[10px] tracking-[0.3em]">One Motors</span>
                  </div>
               </div>

               {/* Right Half: Contrast Image */}
               <div className="relative h-[300px] md:h-auto overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt="Interior"
                  />
                  <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay" />
                  <div className="absolute bottom-8 left-8 text-white z-10">
                     <p className=" text-2xl italic">"Perfection"</p>
                  </div>
               </div>

            </div>
          </Container>
       </div>
    </div>
  )
}

const ExperienceLuxury = () => {
  // CHANGE THIS TO TOGGLE VERSIONS: V4, V5, or V6
  return (
    <>
      <ExperienceLuxuryV4 />
    </>
  )
}

export default ExperienceLuxury
