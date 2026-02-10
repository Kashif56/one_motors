import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Search as SearchIcon, Car, Filter } from 'lucide-react'
import { fetchCars } from '../redux/slices/carsSlice'
import { resetFilters } from '../redux/slices/filterSlice'
import { Container } from '../components/common/Layout'
import { Button } from '../components/common/UIComponents'
import CarCard from '../components/cars/CarCard'
import FilterSidebar from '../components/cars/FilterSidebar'

const Cars = () => {
  const dispatch = useDispatch()
  const { items: cars, loading, error } = useSelector((state) => state.cars)
  const filters = useSelector((state) => state.filter)
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch])

  // Filtering Logic
  const filteredCars = cars.filter((car) => {
    // Search Filter
    const searchTerm = filters.search?.toLowerCase() || ''
    const searchMatch = !searchTerm || 
      car.title?.toLowerCase().includes(searchTerm) ||
      car.brand?.toLowerCase().includes(searchTerm) || 
      car.model?.toLowerCase().includes(searchTerm)
    
    // Price Filter
    const minPrice = filters.priceRange?.[0] || 0
    const maxPrice = filters.priceRange?.[1] || 10000000 
    const priceMatch = (car.price || 0) >= minPrice && (car.price || 0) <= maxPrice

    // Dropdown Filters
    const fuelMatch = !filters.fuelType || filters.fuelType === 'All' || car.fuel_type === filters.fuelType
    const transMatch = !filters.transmission || filters.transmission === 'All' || car.transmission === filters.transmission
    const bodyMatch = !filters.bodyType || filters.bodyType === 'All' || car.body_type === filters.bodyType

    return searchMatch && priceMatch && fuelMatch && transMatch && bodyMatch
  })

  // Sorting Logic
  const sortedCars = [...filteredCars].sort((a, b) => {
      switch(sortBy) {
          case 'price-low':
              return (a.price || 0) - (b.price || 0)
          case 'price-high':
              return (b.price || 0) - (a.price || 0)
          case 'mileage-low':
              return (a.mileage || 0) - (b.mileage || 0)
          case 'year-new':
              return (b.year || 0) - (a.year || 0)
          case 'newest':
          default:
              return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      }
  })

  if (error) return <div className="pt-32 text-center text-red-500">{error}</div>

  return (
    <div className="bg-dark min-h-screen pt-24 md:pt-32 pb-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="flex-1">
            <p className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">— Browse Collection</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white">Find Your <span className="text-secondary italic">Perfect Match</span></h1>
            <p className="text-gray-400 mt-4 text-lg">{sortedCars.length} vehicles available for immediate delivery</p>
          </div>
          
          <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-4">Sort by:</span>
            <select 
              className="bg-transparent text-white font-bold focus:outline-none p-2 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest" className="bg-dark text-white">Newest Arrivals</option>
              <option value="price-low" className="bg-dark text-white">Price: Low to High</option>
              <option value="price-high" className="bg-dark text-white">Price: High to Low</option>
              <option value="mileage-low" className="bg-dark text-white">Lowest Mileage</option>
              <option value="year-new" className="bg-dark text-white">Newest Year</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full">
            <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between border-white/10 text-white hover:bg-white/5 py-4"
            >
                <span className="font-bold uppercase tracking-widest text-sm">
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </span>
                <Filter size={18} className="text-secondary" />
            </Button>
          </div>

          {/* Sidebar */}
          <aside className={`lg:w-80 shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32 glass-card p-6 md:p-8 border-white/5">
              <FilterSidebar />
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 4, 5, 6].map(i => (
                  <div key={i} className="card-dark h-[500px] animate-pulse" />
                ))}
              </div>
            ) : sortedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {sortedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 md:py-40 glass-card mx-4 md:mx-0">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Car size={32} className="text-gray-600 md:w-10 md:h-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">No Vehicles Found</h3>
                <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md mx-auto px-4">We couldn't find any cars matching your current filters. Try adjusting your preferences.</p>
                <Button 
                  variant="outline"
                  onClick={() => dispatch(resetFilters())}
                  className="px-8 md:px-10 border-white/20 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Cars
