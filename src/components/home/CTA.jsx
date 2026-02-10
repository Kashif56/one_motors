import { Container, Section } from '../common/Layout'
import { Phone, MessageSquare } from 'lucide-react'

const contacts = {
    phoneLink: "tel:07733488929",
    whatsapp: "https://wa.me/447733488929"
}

// Cinematic Footer - Dark Version
const CallToAction = () => {
    return (
        <Section className="relative py-16 md:py-48 flex items-center justify-center overflow-hidden bg-black">
             {/* Background Image with heavy dark overlay */}
             <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1503376763036-066120622c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    className="w-full h-full object-cover opacity-20 grayscale" 
                    alt="Road" 
                  />
                  {/* Deep Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-black/40" />
             </div>
             
             <Container className="relative z-10 text-center">
                  <h2 className="text-5xl md:text-8xl font-black text-white mb-8 md:mb-12 tracking-tighter uppercase leading-[0.9]">
                    Drive <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-900">Excellence.</span>
                  </h2>
                  
                  <div className="flex justify-center gap-12 md:gap-24">
                      <a href={contacts.phoneLink} className="group flex flex-col items-center gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 scale-100 group-hover:scale-110">
                             <Phone size={28} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">Call Us</span>
                      </a>
                      
                      <a href={contacts.whatsapp} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 scale-100 group-hover:scale-110">
                             <MessageSquare size={28} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">WhatsApp</span>
                      </a>
                  </div>
             </Container>
        </Section>
    )
}

export default CallToAction
