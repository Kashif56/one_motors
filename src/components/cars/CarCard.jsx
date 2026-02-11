import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

// Dark Mode "Polaroid" / Gallery Card - Typography Aligned
const CarCard = ({ car }) => {
    return (
        <Link 
            to={`/cars/${car?.id}`} 
            className="group block bg-[#121212] p-2 pb-6 rounded-sm rotate-1 hover:rotate-0 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-secondary/5 hover:scale-105 border border-white/5"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 border-b-2 border-white/5">
                <img 
                    src={car?.images?.[0]} 
                    alt={car?.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0" 
                />
                <div className="absolute top-2 right-2 bg-secondary text-black text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                    {car?.year}
                </div>
                {/* Featured Badge if applicable */}
                {car?.featured && (
                    <div className="absolute top-2 left-2 text-secondary animate-pulse">
                        <Star size={16} fill="currentColor" />
                    </div>
                )}
            </div>
            
            <div className="px-5 pt-6 text-center">
                {/* Brand & Model: Matching the 'Editorial' Serif style */}
                <h3 className=" text-3xl text-white mb-2 group-hover:text-secondary transition-colors leading-none">
                    {car?.brand} <span className="text-gray-500 text-xl font-light italic">{car?.model}</span>
                </h3>
                
                {/* Subtitle: Matching the 'Tracking' Sans-serif style used in section headers */}
                <div className="flex items-center justify-center gap-2 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-[1px] bg-secondary"></span>
                    <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em] line-clamp-1">
                        {car?.title}
                    </p>
                    <span className="w-2 h-[1px] bg-secondary"></span>
                </div>

                <div className="text-xl font-bold text-white flex justify-center items-end gap-1 group-hover:scale-110 transition-transform origin-center">
                    <span className="text-secondary text-sm mb-1">£</span>
                    <span className="tracking-tight">{car?.price?.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    )
}

export default CarCard
