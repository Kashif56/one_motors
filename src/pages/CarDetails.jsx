import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  ArrowLeft, Phone, MessageSquare, Gauge, Fuel, Activity, 
  MapPin, CheckCircle, FileText, ArrowUpRight
} from 'lucide-react'
import { Container } from '../components/common/Layout'
import { Button, Input } from '../components/common/UIComponents'
import CarGallery from '../components/cars/CarGallery'
import CarCard from '../components/cars/CarCard'

// Shared Enquiry Form
const EnquiryForm = ({ compact = false }) => {
    const [isSent, setIsSent] = useState(false)
    if (isSent) {
        return (
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in p-8 bg-green-500/10 rounded-xl border border-green-500/20">
                <CheckCircle size={40} className="text-green-500" />
                <div>
                    <h4 className="text-xl font-bold text-white">Request Sent!</h4>
                    <p className="text-gray-400 text-sm">We'll be in touch shortly.</p>
                </div>
                <Button variant="outline" onClick={() => setIsSent(false)} className="text-xs">Send Another</Button>
            </div>
        )
    }
    return (
        <div className={`space-y-4 ${compact ? 'p-0' : 'p-6 md:p-8'}`}>
            <textarea placeholder="I'm interested in this vehicle..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-24 focus:outline-none focus:border-secondary text-sm resize-none"></textarea>
            <div className="grid grid-cols-1 gap-4">
                <Input placeholder="Full Name" className="bg-white/5 border-white/10 text-white rounded-lg h-10" />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <Input placeholder="Phone / Email" className="bg-white/5 border-white/10 text-white rounded-lg h-10" />
            </div>
            <Button onClick={() => setIsSent(true)} className="w-full mt-6 font-bold h-12 uppercase tracking-wide text-sm flex items-center justify-center gap-2 group">
                Send Request <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
            </Button>
        </div>
    )
}

// TechSpecRow Component
const TechSpecRow = ({ label, value }) => (
    <div className="flex justify-between border-b border-white/10 py-3 group hover:bg-white/5 transition-colors px-2 -mx-2 rounded-lg">
        <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold group-hover:text-white transition-colors">{label}</span>
        <span className="text-white font-mono text-sm text-right">{value || 'N/A'}</span>
    </div>
)

const CarDetails = () => {
    const { id } = useParams()
    const { items: cars, loading } = useSelector((state) => state.cars)
    const car = cars.find(c => c.id === id)
    
    // Fallback or Loading
    if (loading) return <div className="min-h-screen pt-40 text-center text-white bg-dark">Loading Excellence...</div>
    if (!car) return <div className="min-h-screen pt-40 text-center text-white bg-dark">Car Not Found</div>

    // Similar Cars Logic
    const similarCars = cars.filter(c => c.id !== id && c.body_type === car.body_type).slice(0, 3)

    return (
        <div className="bg-[#050505] min-h-screen pt-30 pb-20 border-t border-white/5">
            <Container>
                {/* 1. Impact Header */}
                <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-8 fade-up">
                    <div className="max-w-4xl w-full">
                        <Link to="/cars" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 text-xs uppercase tracking-widest font-bold group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
                        </Link>
                        <h1 className="text-4xl md:text-8xl font-serif text-white leading-[0.9] -ml-1 mb-4">
                            {car.brand}<br/>
                            <span className="italic text-gray-600 block mt-2 text-2xl md:text-5xl">{car.title}</span>
                        </h1>
                        <div className="flex gap-4 mt-6 text-xs font-mono text-gray-400 uppercase tracking-widest flex-wrap">
                            <span className="border border-white/20 px-3 py-1 rounded-full text-white">{car.year}</span>
                            <span className="border border-white/20 px-3 py-1 rounded-full flex items-center gap-2"><Gauge size={12}/> {car.mileage?.toLocaleString()} MI</span>
                            <span className="border border-white/20 px-3 py-1 rounded-full flex items-center gap-2"><Activity size={12}/> {car.transmission}</span>
                            <span className="border border-white/20 px-3 py-1 rounded-full flex items-center gap-2"><Fuel size={12}/> {car.fuel_type}</span>
                        </div>
                        {/* Price Display for Mobile/Desktop Header - Added as requested */}
                        <div className="mt-6 md:hidden">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Offered At</p>
                            <div className="text-4xl font-mono text-white tracking-tighter">£{car.price?.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    {/* Desktop Price Header */}
                    <div className="hidden md:block text-right w-full md:w-auto mt-4 md:mt-0">
                         <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Offered At</div>
                         <div className="text-6xl font-mono text-white tracking-tighter mb-4">£{car.price?.toLocaleString()}</div>
                    </div>
                </div>

                {/* 2. Main Visual Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-20 fade-up" style={{animationDelay: '100ms'}}>
                     
                     {/* Sticky Spec Sidebar - Left Column (Hidden on Mobile, shows after on desktop) */}
                     <div className="lg:col-span-4 order-2 lg:order-1 h-fit space-y-8">
                         
                         {/* Mobile: Price is usually at top, but here we keep sidebar flow. Desktop: Sticky */}
                         {/* Technical Data Card */}
                         <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                        
                             <h3 className="text-white font-serif text-lg italic mb-4 flex items-center gap-2">
                                <FileText size={16} className="text-secondary"/> Technical Data
                             </h3>
                             <TechSpecRow label="Engine" value={car.fuel_type} />
                             <TechSpecRow label="Transmission" value={car.transmission} />
                             <TechSpecRow label="Mileage" value={`${car.mileage?.toLocaleString()} mi`} />
                             <TechSpecRow label="Body Style" value={car.body_type} />
                             <TechSpecRow label="Ext. Color" value={car.color || 'Onyx Black'} />
                             <TechSpecRow label="Int. Color" value="Premium Black" />
                             <TechSpecRow label="Stock #" value={`#${car.id.slice(0,6).toUpperCase()}`} />
                         </div>
                         <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                             
                              {/* Enquiry Form */}
                              <div className="mb-8">
                                  <h3 className="text-xl font-serif text-white mb-2 italic">Express Interest</h3>
                                  <p className="text-gray-500 mb-6 text-xs">Fill out the form below to enquire about this vehicle.</p>
                                  <EnquiryForm compact={true} />
                              </div>

                              {/* Direct Contact */}
                              <div className="grid grid-cols-2 gap-3">
                                  <a href="tel:07733488929" className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white hover:text-black border border-white/5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">
                                      <Phone size={14}/> Call
                                  </a>
                                  <a href="https://wa.me/447733488929" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-[#25D366] hover:text-white border border-white/5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">
                                      <MessageSquare size={14}/> Chat
                                  </a>
                              </div>
                         </div>

                         
                     </div>

                     {/* Main Content Area - Right Column */}
                     <div className="lg:col-span-8 order-1 lg:order-2 space-y-12">
                         {/* Hero Gallery */}
                         <div className="w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 border border-white/5">
                            <CarGallery images={car.images} />
                         </div>
                         
                         {/* Description */}
                         <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                                "A masterclass in automotive excellence. This vehicle represents the perfect synthesis of performance and luxury."
                            </h2>
                            <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
                                <p>{car.description || "The driving experience is nothing short of extraordinary. From dynamic handling to a cabin that isolates you from the world outside, every detail has been calibrated for enjoyment. This vehicle has been meticulously inspected and prepared to the highest standard."}</p>
                            </div>
                         </div>

                         {/* Key Highlights Grid */}
                         <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-secondary"/> Key Highlights
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                    {['Premium Sound System', 'Heated Leather Seats', 'Navigation System', 'Parking Sensors', 'Bluetooth Connectivity', 'Cruise Control', 'Alloy Wheels', 'Climate Control'].map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                        </div>
                     </div>
                </div>

                {/* 3. Similar Vehicles - Footer Section */}
                {similarCars.length > 0 && (
                    <div className="border-t border-white/10 pt-20">
                        <div className="flex justify-between items-end mb-10">
                            <h3 className="text-3xl md:text-5xl font-serif text-white italic">You May Also Like</h3>
                            <Link to="/cars" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">View All Inventory</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {similarCars.map((similarCar) => (
                                <CarCard key={similarCar.id} car={similarCar} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default CarDetails
