
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Filter, Zap, ArrowUpRight, X } from 'lucide-react'
import { fetchCars } from '../redux/slices/carsSlice'
import { Container } from '../components/common/Layout'
import { Button } from '../components/common/UIComponents'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import FilterSidebar from '../components/cars/FilterSidebar'

// --- SHARED DATA HOOK ---
const useCarData = () => {
    const dispatch = useDispatch()
    const { items: cars, loading, error } = useSelector((state) => state.cars)
    const filters = useSelector((state) => state.filter)

    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])

    // Filtering Logic
    const filteredCars = cars.filter((car) => {
        const searchTerm = filters.search?.toLowerCase() || ''
        const searchMatch = !searchTerm ||
            car.title?.toLowerCase().includes(searchTerm) ||
            car.brand?.toLowerCase().includes(searchTerm) ||
            car.model?.toLowerCase().includes(searchTerm)

        const minPrice = filters.priceRange?.[0] || 0
        const maxPrice = filters.priceRange?.[1] || 10000000
        const priceMatch = (car.price || 0) >= minPrice && (car.price || 0) <= maxPrice

        const fuelMatch = !filters.fuelType || filters.fuelType === 'All' || car.fuel_type === filters.fuelType
        const transMatch = !filters.transmission || filters.transmission === 'All' || car.transmission === filters.transmission
        const bodyMatch = !filters.bodyType || filters.bodyType === 'All' || car.body_type === filters.bodyType

        return searchMatch && priceMatch && fuelMatch && transMatch && bodyMatch
    })

    return { cars: filteredCars, loading, error }
}


// --- MAIN CARS PAGE (The Speedster / Velocity Grid) ---
const Cars = () => {
    const { cars, loading, error } = useCarData()
    const [showFilters, setShowFilters] = useState(false)

    if (loading) return (
        <div className="min-h-screen bg-dark  flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                <p className="text-white font-mono animate-pulse">STARTING_ENGINES...</p>
            </div>
        </div>
    )

    if (error) return <div className="pt-32 text-center text-red-500">{error}</div>

    return (
        <section className="bg-[#111] min-h-screen py-30 border-b border-white/10 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 transform -skew-x-12 opacity-10 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute h-full w-[200px] bg-white/5" style={{ left: `${i * 15}%` }} />
                ))}
            </div>

            <Container className="relative z-10 px-4 md:px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
                    <div className="transform md:-skew-x-6 text-center md:text-left w-full md:w-auto">
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase text-white mb-2 md:mb-4 tracking-tighter">
                            SPEED<span className="text-secondary">.LOG</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 font-bold uppercase tracking-widest pl-1">
                            High Performance Garage
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 py-4 px-8 border-white/20 hover:bg-white text-white hover:text-black transition-colors font-bold uppercase tracking-widest"
                    >
                        <Filter size={18} />
                        Tune Performance
                    </Button>
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                    {showFilters && (
                        <>
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" onClick={() => setShowFilters(false)} />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-20 right-0 h-full w-full max-w-md bg-[#1a1a1a] p-6 pb-32 z-[9999] overflow-y-auto border-l border-white/10 shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black italic uppercase text-white">Tune Performance</h3>
                                    <button onClick={() => setShowFilters(false)} className="text-white hover:text-secondary">
                                        <X size={24} />
                                    </button>
                                </div>
                                <FilterSidebar compact={true} />
                                <Button className="w-full mt-8 bg-secondary text-black font-bold uppercase py-4" onClick={() => setShowFilters(false)}>
                                    Ignite Search
                                </Button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Car Grid - The Speedster Layout */}
                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16 gap-x-8 pb-20">
                        {cars.map((car, i) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative transform md:${i % 2 === 0 ? 'translate-y-12' : ''}`}
                            >
                                <div className="absolute -inset-2 bg-secondary/0 group-hover:bg-secondary/100 transform skew-x-12 transition-all duration-300 z-0 hidden md:block" />

                                <Link to={`/cars/${car.id}`} className="block relative z-10 bg-[#1a1a1a] border border-white/10 transform md:skew-x-[-6deg] md:hover:skew-x-0 transition-transform duration-300 overflow-hidden group-hover:-translate-y-2 shadow-2xl">
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img src={car.images[0]} className="w-full md:w-[110%] h-full object-cover md:ml-[-5%] group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" alt={car.title} />
                                        <div className="absolute top-0 right-0 bg-secondary text-black font-black px-4 py-1 text-sm transform md:skew-x-6 translate-x-2 -translate-y-1">
                                            {car.year}
                                        </div>
                                    </div>
                                    
                                    {/* Card Content - Counter Skewed for readability on desktop */}
                                    <div className="p-6 md:transform md:skew-x-6">
                                        <h3 className="text-2xl font-black italic text-white mb-1 uppercase leading-none">{car.brand}</h3>
                                        <p className="text-gray-400 text-sm font-bold uppercase mb-4 border-b border-white/10 pb-4">{car.model}</p>
                                        
                                        <div className="flex justify-between items-center">
                                            <p className="text-white text-xl font-bold">£{car.price?.toLocaleString()}</p>
                                            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center transform -rotate-45 group-hover:rotate-0 transition-transform">
                                                <ArrowUpRight size={16} className="text-black" />
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-xs font-mono text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Zap size={10} className="text-secondary" />
                                                {car.fuel_type}
                                            </div>
                                            <div>{car.transmission}</div>
                                            <div>{car.mileage?.toLocaleString()} mi</div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 border border-white/10 mx-4 md:mx-0 transform md:-skew-x-6">
                         <div className="md:transform md:skew-x-6">
                            <h3 className="text-2xl md:text-3xl text-white mb-4 font-black italic uppercase">Grid Empty.</h3>
                            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md mx-auto px-4">
                                No machines found with this configuration. Adjust your tuning.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(true)}
                                className="border-white/20 text-white"
                            >
                                Retune Specs
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    )
}

export default Cars
