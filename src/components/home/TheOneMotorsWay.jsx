import { Container, Section } from '../common/Layout'
import { Search, Calendar, CreditCard, Truck, ArrowRight, ChevronRight, MapPin, CheckCircle } from 'lucide-react'

const steps = [
  { 
    id: 1, 
    title: 'Select Your Car', 
    desc: 'Browse our hand-picked inventory of quality vehicles.',
    icon: Search
  },
  { 
    id: 2, 
    title: 'Book a Viewing', 
    desc: 'Schedule a visit or video call to see the car in detail.',
    icon: Calendar
  },
  { 
    id: 3, 
    title: 'Flexible Payment', 
    desc: 'We offer various payment options and part exchange.',
    icon: CreditCard
  },
  { 
    id: 4, 
    title: 'Home Delivery', 
    desc: 'Get your new car delivered nationwide to your door.',
    icon: Truck
  }
]

// V1: The "Speedometer" / Radial Arc
export const TheOneMotorsWayV1 = () => {
  return (
    <Section className="bg-[#080808] py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Container>
        <div className="text-center mb-20 relative z-10">
          <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">The Process</span>
          <h2 className="text-5xl md:text-6xl font-serif text-white mt-4 italic"> effortless. <br/><span className="not-italic font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Performance.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {/* Connecting Line */}
           <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/50 to-secondary/0" />
           
           {steps.map((step, i) => (
             <div key={i} className="relative group text-center pt-8">
                <div className="w-24 h-24 mx-auto bg-dark border-4 border-[#1a1a1a] rounded-full flex items-center justify-center relative z-10 group-hover:border-secondary transition-colors duration-500 mb-8 shadow-2xl">
                    <step.icon size={32} className="text-gray-400 group-hover:text-secondary transition-colors" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">
                        {i + 1}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">{step.desc}</p>
             </div>
           ))}
        </div>
      </Container>
    </Section>
  )
}

// V2: The "Tech Blueprint"
export const TheOneMotorsWayV2 = () => {
  return (
    <Section className="bg-[#050505] py-24 relative overflow-hidden font-mono">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/20 pb-8">
           <div>
             <div className="text-xs text-secondary mb-2">[ SYSTEM_PROTOCOL ]</div>
             <h2 className="text-4xl text-white font-bold uppercase tracking-tighter">Acquisition_Logic<span className="animate-pulse">_</span></h2>
           </div>
           <div className="text-right text-xs text-gray-500">
              <p>INITIATED BY: USER</p>
              <p>STATUS: ONLINE</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {steps.map((step, i) => (
             <div key={i} className="bg-dark/80 border border-white/10 p-8 hover:bg-secondary/10 hover:border-secondary/50 transition-all cursor-crosshair group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] text-gray-600 font-bold border-l border-b border-white/5 opacity-50">
                    STEP_0{i+1}
                </div>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-secondary"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-secondary"></div>

                <div className="flex items-start gap-6">
                    <div className="mt-1 text-secondary opacity-50 group-hover:opacity-100">
                        <step.icon size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{step.title}</h3>
                        <p className="text-gray-400 text-sm border-l border-white/10 pl-4 group-hover:border-secondary/50">{step.desc}</p>
                    </div>
                </div>
             </div>
           ))}
        </div>
      </Container>
    </Section>
  )
}

// V3: The "Dark Card Cascade"
export const TheOneMotorsWayV3 = () => {
  return (
    <Section className="bg-[#0f0f0f] py-32 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
                <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 block">The Journey</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-none">
                    Your Path to <br/><span className="text-secondary italic">Excellence.</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-secondary to-transparent" />
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step, i) => (
                    <div key={i} className={`p-8 bg-gradient-to-br from-[#1a1a1a] to-black border border-white/5 rounded-2xl group hover:-translate-y-2 transition-transform duration-300
                        ${i % 2 === 1 ? 'md:translate-y-12' : ''}
                    `}>
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-4xl font-serif text-white/10 group-hover:text-secondary/20 transition-colors font-bold">0{i+1}</span>
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-secondary group-hover:text-black text-white transition-all">
                                <step.icon size={20} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </Container>
    </Section>
  )
}

// V4: The "Neon Roadmap"
export const TheOneMotorsWayV4 = () => {
    return (
      <Section className="bg-black py-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
        
        <Container className="relative z-10">
          <div className="text-center mb-24">
             <h2 className="text-4xl font-bold text-white uppercase tracking-[0.2em]">Purchase <span className="text-outline-secondary text-transparent" style={{WebkitTextStroke: '1px #ff3b3b'}}>Protocol</span></h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
             {/* Center Line */}
             <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-secondary to-transparent md:-translate-x-1/2 opacity-30" />
             
             <div className="space-y-12 md:space-y-0">
                 {steps.map((step, i) => (
                     <div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16
                        ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}
                     `}>
                        {/* Content Side */}
                        <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 1 ? 'md:pl-0' : 'md:text-right'}`}>
                            <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </div>
                        
                        {/* Node */}
                        <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-2 border-secondary bg-black z-10 md:-translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(255,59,59,0.5)]">
                            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        </div>

                        {/* Spacer for other side */}
                        <div className="hidden md:block md:w-1/2" />
                     </div>
                 ))}
             </div>
          </div>
        </Container>
      </Section>
    )
}

// V5: Dark Mode Adapted (Previously "Negative")
export const TheOneMotorsWayV5_Dark = () => {
    return (
        <Section className="bg-[#050505] py-24 text-white relative">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white/10">THE WAY</h2>
                    <div className="text-right">
                        <p className="font-bold text-secondary uppercase tracking-widest text-sm">Transparent Process</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t-2 border-white/10">
                    {steps.map((step, i) => (
                        <div key={i} className="border-b md:border-b-0 md:border-r border-white/10 p-8 hover:bg-white/5 transition-colors relative h-full flex flex-col justify-between min-h-[250px] group">
                            <div>
                                <div className="flex justify-between mb-8">
                                    <span className="font-bold text-xl text-white/50 group-hover:text-white transition-colors">0{i+1}</span>
                                    <step.icon size={20} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-rotate-12 duration-300"/>
                                </div>
                                <h3 className="text-2xl font-black uppercase leading-tight mb-2 tracking-tight icon-hover-trigger text-white">{step.title}</h3>
                            </div>
                            <p className="text-sm font-medium text-gray-500 mt-4 group-hover:text-gray-300 transition-colors">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}

const TheOneMotorsWay = () => {
  return (
    // Only returning the chosen Version 5 (Dark Mode)
    <TheOneMotorsWayV5_Dark />
  )
}

export default TheOneMotorsWay
