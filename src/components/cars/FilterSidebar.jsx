import { useSelector, useDispatch } from 'react-redux'
import { Search, RotateCcw } from 'lucide-react'
import {
  setSearchQuery,
  setPriceRange,
  setFuelType,
  setTransmission,
  setBodyType,
  resetFilters,
} from '../../redux/slices/filterSlice'

const FilterSidebar = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
  const transmissions = ['Manual', 'Automatic']
  const bodyTypes = ['Hatchback', 'SUV', 'Sedan', 'Coupe', 'Convertible']

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-3">
          <Search size={16} />
          Search
        </h3>
        <input 
          type="text" 
          placeholder="Model, Brand, Key..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-secondary/50 placeholder:text-gray-600 transition-all font-medium"
          value={filter.searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary">Budget</h3>
          <span className="text-xs font-bold text-gray-500">Up to £{filter.priceRange[1]?.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="200000" 
          step="1000"
          className="w-full accent-secondary h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
          value={filter.priceRange[1]}
          onChange={(e) => dispatch(setPriceRange([0, parseInt(e.target.value)]))}
        />
      </div>

      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary mb-6">Fuel Performance</h3>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map((type) => (
            <button
              key={type}
              onClick={() => dispatch(setFuelType(filter.fuelType === type ? '' : type))}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filter.fuelType === type 
                ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary mb-6">Transmission</h3>
        <div className="grid grid-cols-2 gap-3">
          {transmissions.map((type) => (
            <button
              key={type}
              onClick={() => dispatch(setTransmission(filter.transmission === type ? '' : type))}
              className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                filter.transmission === type 
                ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary mb-6">Body Type</h3>
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((type) => (
            <button
              key={type}
              onClick={() => dispatch(setBodyType(filter.bodyType === type ? '' : type))}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filter.bodyType === type 
                ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5">
        <button 
          onClick={() => dispatch(resetFilters())}
          className="w-full py-4 rounded-2xl border border-white/5 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} />
          Reset All Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar
