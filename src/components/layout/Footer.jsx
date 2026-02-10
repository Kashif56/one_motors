import { Link } from 'react-router-dom'
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Car className="w-10 h-10 text-secondary" />
            <span className="text-3xl font-serif font-bold">
              ONE <span className="text-secondary">MOTORS</span>
            </span>
          </Link>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Professional Service, Hand-Picked Quality Cars. We bring extensive knowledge and expertise to ensure your next car purchase is handled professionally.
          </p>
          <div className="flex gap-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all hover:scale-110">
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-8 font-serif">Quick Links</h4>
          <ul className="flex flex-col gap-5">
            {['Home', 'Cars', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-secondary transition-colors inline-block hover:translate-x-1 duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-8 font-serif">Our Services</h4>
          <ul className="flex flex-col gap-5">
            {['Nationwide Delivery', 'Part Exchange', 'Sell Your Car', 'Vehicle Inspection'].map((service) => (
              <li key={service} className="text-gray-400 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-8 font-serif">Contact Info</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4 text-gray-400 group cursor-pointer">
              <MapPin className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={24} />
              <span className="leading-snug">288a Kingston Rd, Leatherhead KT22 7QD</span>
            </li>
            <li className="flex items-center gap-4 text-gray-400 group cursor-pointer">
              <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={24} />
              <a href="tel:07733488929" className="hover:text-white transition-colors">07733 488 929</a>
            </li>
            <li className="flex items-center gap-4 text-gray-400 group cursor-pointer">
              <Mail className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={24} />
              <a href="mailto:info@onemotors.co.uk" className="hover:text-white transition-colors">info@onemotors.co.uk</a>
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
