import { Container } from '../components/common/Layout'

const stats = [
    { label: "Years of Excellence", value: "15+" },
    { label: "Cars Delivered", value: "2,500+" },
    { label: "Happy Clients", value: "98%" },
    { label: "Awards Won", value: "12" }
]

const team = [
    { name: "Shahbaz", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Sarah Jenkins", role: "Head of Sales", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Marcus Chen", role: "Master Technician", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
]

// --- THE EDITORIAL (Magazine Style) - Dark & Refined ---
const About = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans">
             <Container className="pt-32 pb-16 md:pt-40 md:pb-24">
                 {/* Header Section */}
                 <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4">
                     <span className="text-secondary  italic text-xl md:text-2xl mb-4 block">The Art of Motoring</span>
                     <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
                        Curating Excellence <br className="hidden md:block"/> Since 2008.
                     </h1>
                     <div className="w-16 md:w-24 h-1 bg-white mx-auto" />
                 </div>

                 {/* Main Content Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-20 md:mb-32">
                     {/* Image Column */}
                     <div className="col-span-1 md:col-span-12 lg:col-span-7 relative order-2 md:order-1">
                         <div className="relative aspect-[4/3] md:aspect-auto md:h-[600px] overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 ease-out" 
                                alt="Showroom" 
                            />
                         </div>
                         
                         {/* Floating Quote Card (Desktop Only) */}
                         <div className="absolute -bottom-12 -right-12 bg-[#1a1a1a] border border-white/10 text-white p-8 md:p-12 max-w-sm md:max-w-md hidden lg:block shadow-2xl">
                             <p className=" text-xl md:text-2xl italic leading-relaxed text-gray-200">"We believe every car has a soul. Our job is to match it with yours."</p>
                             <div className="mt-6 font-bold text-xs md:text-sm tracking-widest uppercase text-secondary">— Shahbaz, Founder</div>
                         </div>
                     </div>

                     {/* Text Column */}
                     <div className="col-span-1 md:col-span-12 lg:col-span-4 lg:col-start-9 order-1 md:order-2 px-2 md:px-0">
                         <h3 className="font-bold text-2xl md:text-3xl mb-6">A Legacy of Trust.</h3>
                         <p className="text-gray-400 leading-relaxed mb-6 text-base md:text-lg">
                             One Motors started as a small passion project in a single garage. Today, we are the region's premier destination for luxury and performance vehicles. 
                         </p>
                         <p className="text-gray-400 leading-relaxed mb-8 text-base md:text-lg">
                             Our philosophy is simple: Transparency, Quality, and Respect. We treat every client like a member of our club, and every car like it's our own.
                         </p>
                         
                         {/* Mobile Quote (Visible only on mobile/tablet) */}
                         <div className="lg:hidden mb-8 border-l-4 border-secondary pl-6 py-4 bg-white/5">
                             <p className=" text-lg italic leading-relaxed text-gray-300">"We believe every car has a soul. Our job is to match it with yours."</p>
                             <div className="mt-4 font-bold text-xs tracking-widest uppercase text-secondary">— Shahbaz</div>
                         </div>

                         {/* Stats Grid */}
                         <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                             {stats.slice(0,2).map((stat, i) => (
                                 <div key={i}>
                                     <div className="text-3xl md:text-4xl  text-secondary mb-1">{stat.value}</div>
                                     <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>

                 {/* Team Section */}
                 <div className="border-t border-white/10 pt-16 md:pt-20">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 px-2 md:px-0">
                         <h2 className="text-3xl md:text-4xl font-light">Meet the Curators</h2>
                         <button className="font-bold border-b border-white pb-1 hover:text-secondary hover:border-secondary transition-colors text-sm md:text-base text-gray-300 hover:text-secondary">
                            Join the Team
                         </button>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 px-2 md:px-0">
                         {team.map((member, i) => (
                             <div key={i} className="group cursor-pointer">
                                 <div className="overflow-hidden mb-6 aspect-[3/4] relative bg-gray-900 border border-white/5">
                                     <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply" />
                                     <img 
                                        src={member.img} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100 opacity-80 group-hover:opacity-100" 
                                        alt={member.name} 
                                     />
                                 </div>
                                 <h4 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">{member.name}</h4>
                                 <p className="text-gray-500  italic">{member.role}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             </Container>
        </div>
    )
}

export default About
