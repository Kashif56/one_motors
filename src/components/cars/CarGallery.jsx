import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '../../services/utils'

const CarGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-advance slideshow if not hovered
  useEffect(() => {
    if (isHovered || images.length <= 1) return
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isHovered, images.length])

  if (!images?.length) {
    return (
        <div className="w-full aspect-[16/9] bg-white/5 flex items-center justify-center text-gray-500 rounded-3xl border border-white/10">
            <p className="uppercase tracking-widest font-bold text-sm">No Images Available</p>
        </div>
    )
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div 
        className="flex flex-col gap-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Stage */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[30px] border border-white/10 shadow-2xl bg-[#050505]">
        {/* Images */}
        {images.map((img, idx) => (
            <div 
                key={idx}
                className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-in-out",
                    selectedIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
            >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                
                {/* Cinematic Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
        ))}

        {/* Controls */}
        {images.length > 1 && (
            <>
                <button 
                    onClick={handlePrev}
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 z-20 hover:bg-white hover:text-dark hover:scale-110",
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                >
                    <ChevronLeft size={24} />
                </button>

                <button 
                    onClick={handleNext}
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 z-20 hover:bg-white hover:text-dark hover:scale-110",
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                >
                    <ChevronRight size={24} />
                </button>
            </>
        )}

        {/* Index Badge */}
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-widest z-20">
            {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x px-1">
            {images.map((img, idx) => (
            <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                "relative min-w-[70px] md:min-w-[90px] aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 snap-start",
                selectedIndex === idx 
                    ? "border-secondary opacity-100 scale-100" 
                    : "border-transparent opacity-40 hover:opacity-80 scale-95 hover:scale-100"
                )}
            >
                <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover"
                />
            </button>
            ))}
        </div>
      )} */}
    </div>
  )
}

export default CarGallery
