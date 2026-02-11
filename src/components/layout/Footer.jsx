import { Link } from 'react-router-dom'
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-16 mb-16 md:mb-20">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6 md:mb-8">
            <Car className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
            <span className="text-2xl md:text-3xl  font-bold">
              ONE <span className="text-secondary">MOTORS</span>
            </span>
          </Link>
          <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
            Professional Service, Hand-Picked Quality Cars. We bring extensive knowledge and expertise to ensure your next car purchase is handled professionally.
          </p>
          <div className="flex gap-4 md:gap-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all hover:scale-110">
                <Icon size={18} className="md:w-[22px] md:h-[22px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 ">Quick Links</h4>
          <ul className="flex flex-col gap-3 md:gap-5">
            {['Home', 'Cars', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-secondary transition-colors inline-block hover:translate-x-1 duration-300 text-sm md:text-base">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 ">Our Services</h4>
          <ul className="flex flex-col gap-3 md:gap-5">
            {['Nationwide Delivery', 'Part Exchange', 'Sell Your Car', 'Vehicle Inspection'].map((service) => (
              <li key={service} className="text-gray-400 flex items-center gap-2 md:gap-3 text-sm md:text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/50 shrink-0" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 ">Contact Info</h4>
          <ul className="flex flex-col gap-4 md:gap-6">
            <li className="flex items-start gap-4 text-gray-400 group cursor-pointer">
              <MapPin className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={20} />
              <span className="leading-snug text-sm md:text-base">288a Kingston Rd, Leatherhead KT22 7QD</span>
            </li>
            <li className="flex items-center gap-4 text-gray-400 group cursor-pointer">
              <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={20} />
              <a href="tel:07733488929" className="hover:text-white transition-colors text-sm md:text-base">07733 488 929</a>
            </li>
            <li className="flex items-center gap-4 text-gray-400 group cursor-pointer">
              <Mail className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={20} />
              <a href="mailto:info@onemotors.co.uk" className="hover:text-white transition-colors text-sm md:text-base">info@onemotors.co.uk</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} One Motors. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
