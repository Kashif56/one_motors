import { useState } from 'react'
import { Search, ChevronDown, Calendar, MapPin, Gauge } from 'lucide-react'
import { Button } from '../common/UIComponents'

const HeroFilter = () => {
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [price, setPrice] = useState('')

    return (
        <div className="w-full max-w-5xl mx-auto mt-12 fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-4 md:p-6 backdrop-blur-2xl border-white/10 bg-black/40 rounded-[2rem] shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Make Selection */}
                    <div className="flex-1 relative group">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                            <Gauge size={20} />
                         </div>
                        <select 
                            className="w-full h-14 pl-12 pr-10 bg-white/5 text-white border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-secondary focus:bg-white/10 transition-all font-medium cursor-pointer"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        >
                            <option value="" className="bg-dark">All Makes</option>
                            <option value="BMW" className="bg-dark">BMW</option>
                            <option value="Mercedes" className="bg-dark">Mercedes-Benz</option>
                            <option value="Audi" className="bg-dark">Audi</option>
                            <option value="Porsche" className="bg-dark">Porsche</option>
                            <option value="Lamborghini" className="bg-dark">Lamborghini</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors" size={16} />
                    </div>

                    {/* Model Selection */}
                    <div className="flex-1 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                            <Calendar size={20} />
                        </div>
                        <select 
                            className="w-full h-14 pl-12 pr-10 bg-white/5 text-white border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-secondary focus:bg-white/10 transition-all font-medium cursor-pointer"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        >
                            <option value="" className="bg-dark">All Models</option>
                            <option value="M4" className="bg-dark">M4 Competition</option>
                            <option value="C63" className="bg-dark">C63 AMG</option>
                            <option value="RS6" className="bg-dark">RS6 Avant</option>
                            <option value="911" className="bg-dark">911 GT3</option>
                            <option value="Huracan" className="bg-dark">Huracan Evo</option>
                        </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors" size={16} />
                    </div>

                    {/* Price Range */}
                    <div className="flex-1 relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                            <span className="font-serif font-bold text-lg">£</span>
                        </div>
                        <select 
                            className="w-full h-14 pl-12 pr-10 bg-white/5 text-white border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-secondary focus:bg-white/10 transition-all font-medium cursor-pointer"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                            <option value="" className="bg-dark">Any Price</option>
                            <option value="50000" className="bg-dark">Up to £50,000</option>
                            <option value="100000" className="bg-dark">Up to £100,000</option>
                            <option value="150000" className="bg-dark">Up to £150,000</option>
                            <option value="200000" className="bg-dark">Up to £200,000</option>
                        </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors" size={16} />
                    </div>

                    {/* Search Button */}
                    <Button className="h-14 px-8 bg-secondary text-dark font-bold hover:bg-white hover:text-dark transition-all duration-300 shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 lg:min-w-[160px]">
                        <Search size={20} />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroFilter
