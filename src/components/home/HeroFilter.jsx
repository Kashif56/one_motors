
import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Calendar, Gauge } from 'lucide-react'
import { Button } from '../common/UIComponents'
import { setSearchQuery, setPriceRange, resetFilters } from '../../redux/slices/filterSlice'

const HeroFilter = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // Get cars from Redux store
    const { items: cars } = useSelector((state) => state.cars)

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    // Extract unique Makes (Brands)
    const uniqueMakes = useMemo(() => {
        const brands = cars.map(car => car.brand).filter(Boolean)
        return [...new Set(brands)].sort()
    }, [cars])

    // Extract Models based on selected Make
    const filteredModels = useMemo(() => {
        if (!make) return []
        const models = cars
            .filter(car => car.brand === make)
            .map(car => car.model)
            .filter(Boolean)
        return [...new Set(models)].sort()
    }, [cars, make])

    const handleSearch = () => {
        // Reset all existing filters first
        dispatch(resetFilters())

        const filters = {}
        
        // If Model is selected, search for "Make Model", otherwise just "Make"
        if (model) {
            filters.search = `${make} ${model}`.trim()
        } else if (make) {
            filters.search = make
        }
        
        if (maxPrice) {
            filters.priceRange = [0, parseInt(maxPrice)]
        }

        if (filters.search) dispatch(setSearchQuery(filters.search))
        if (filters.priceRange) dispatch(setPriceRange(filters.priceRange))
        
        // Build query params for URL persistence
        const params = new URLSearchParams()
        if (filters.search) params.set('search', filters.search)
        if (filters.priceRange) {
            params.set('minPrice', filters.priceRange[0])
            params.set('maxPrice', filters.priceRange[1])
        }

        navigate(`/cars?${params.toString()}`)
    }

    return (
        <div className="w-full max-w-5xl mx-auto mt-6 md:mt-12 fade-up relative z-30" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-4 md:p-6 backdrop-blur-2xl border-white/10 bg-black/50 rounded-2xl md:rounded-[2rem] shadow-2xl mx-2 md:mx-0">
                <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
                    {/* Make Selection */}
                    <div className="flex-1 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none z-10">
                           <Gauge size={18} className="md:w-5 md:h-5" />
                        </div>
                        <select 
                            className="w-full h-12 md:h-14 pl-11 md:pl-12 pr-10 bg-black/80 text-white border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-secondary focus:bg-black transition-all text-sm md:text-base font-medium cursor-pointer"
                            value={make}
                            onChange={(e) => {
                                setMake(e.target.value)
                                setModel('') // Reset model when make changes
                            }}
                        >
                            <option value="">All Makes</option>
                            {uniqueMakes.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors z-10" size={16} />
                    </div>

                    {/* Model Selection */}
                    <div className="flex-1 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none z-10">
                            <Calendar size={18} className="md:w-5 md:h-5" />
                        </div>
                        <select 
                            className="w-full h-12 md:h-14 pl-11 md:pl-12 pr-10 bg-black/80 text-white border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-secondary focus:bg-black transition-all text-sm md:text-base font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            disabled={!make}
                        >
                            <option value="">All Models</option>
                            {filteredModels.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors z-10" size={16} />
                    </div>

                    {/* Price Range */}
                    <div className="flex-1 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none z-10">
                            <span className="font-bold text-base md:text-lg">£</span>
                        </div>
                        <select 
                            className="w-full h-12 md:h-14 pl-11 md:pl-12 pr-10 bg-black/80 text-white border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-secondary focus:bg-black transition-all text-sm md:text-base font-medium cursor-pointer"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        >
                            <option value="">Max Budget</option>
                            <option value="50000">Up to £50,000</option>
                            <option value="100000">Up to £100,000</option>
                            <option value="150000">Up to £150,000</option>
                            <option value="200000">Up to £200,000</option>
                            <option value="500000">Up to £500,000</option>
                            <option value="1000000">No Limit</option>
                        </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors z-10" size={16} />
                    </div>

                    {/* Search Button */}
                    <Button 
                        className="h-12 md:h-14 px-8 bg-secondary text-dark font-bold hover:bg-white hover:text-dark transition-all duration-300 shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 lg:min-w-[160px] rounded-xl md:rounded-xl"
                        onClick={handleSearch}
                    >
                        <Search size={18} className="md:w-5 md:h-5" />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroFilter
