import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Phone, MessageSquare } from 'lucide-react'
import { fetchCars } from '../redux/slices/carsSlice'
import { Container, Section } from '../components/common/Layout'
import { Button, Badge } from '../components/common/UIComponents'
import CarCard from '../components/cars/CarCard'
import { HeroCinematic } from '../components/home/HeroCinematic'
import TrustBadges from '../components/home/TrustBadges'
import ExperienceLuxury from '../components/home/ExperienceLuxury'
import TheOneMotorsWay from '../components/home/TheOneMotorsWay'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CTA'

const Home = () => {
  const dispatch = useDispatch()
  const { items: cars, loading } = useSelector((state) => state.cars)

  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch])

  const featuredCars = cars.filter(car => car.featured).slice(0, 3)


  return (
    <div className="flex flex-col bg-dark">
      {/* Hero Section */}
      <HeroCinematic />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Cars Section */}
      <Section className="bg-dark relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[120px]" />
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
            <div className="fade-up relative z-10">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                 <span className="w-8 md:w-12 h-[2px] bg-secondary" />
                 <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Our Showcase</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight">Latest <span className="text-secondary italic">Arrivals</span></h2>
            </div>
            <Link to="/cars" className="group flex items-center gap-3 text-secondary font-bold text-base md:text-lg hover:text-white transition-all relative z-10 bg-dark/50 rounded-full px-4 py-2 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none backdrop-blur-sm border border-white/10 md:border-none">
              View All Collection 
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {!loading && featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-dark h-[400px] md:h-[500px] animate-pulse" />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Buying Process Section - NEW */}
      <TheOneMotorsWay />

      {/* Why Choose Us / Experience Luxury */}
      <ExperienceLuxury />

      {/* Testimonials Section - NEW */}
      <Testimonials />

      {/* CTA Banner */}
      <CallToAction />
    </div>
  )
}
//...

export default Home
