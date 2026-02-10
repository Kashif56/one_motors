import { Container } from '../common/Layout'

const stats = [
    { label: 'Fully Inspected', value: '100%', sub: 'Peace of Mind' },
    { label: 'Delivery Service', value: 'Nationwide', sub: 'To Your Door' }, // Changed NATIONWIDE to Nationwide to match serif style better
    { label: 'Customer Rating', value: '5.0 ★', sub: 'Verified Reviews' },
    { label: 'Valuation', value: 'Free', sub: 'Instant Quote' } // Changed FREE to Free
]

// Editorial Divider Style
const TrustBadges = () => {
    return (
        <div className="bg-[#0c0c0c] border-y border-white/5 py-12 md:py-16">
            <Container>
                <div className="flex flex-wrap justify-center lg:justify-between gap-y-12">
                     {stats.map((stat, i) => (
                         <div key={i} className="w-1/2 lg:w-1/4 px-4 border-l border-white/10 first:border-l-0 flex flex-col justify-between h-24 hover:bg-white/5 transition-colors -ml-[1px] pl-8 group cursor-default rounded-r-xl">
                             <div className="text-secondary font-bold text-[10px] uppercase tracking-[0.2em] mb-auto opacity-70 group-hover:opacity-100 transition-opacity">
                                0{i+1}
                             </div>
                             <div>
                                 <div className="text-3xl md:text-5xl font-serif text-white mb-2 leading-none italic group-hover:text-secondary transition-colors">
                                    {stat.value}
                                 </div>
                                 <div className="text-xs text-gray-500 font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                                    {stat.label}
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
            </Container>
        </div>
    )
}

export default TrustBadges
