import { useEffect } from 'react'
import { fetchCars, deleteCar } from '../../redux/slices/carsSlice'
import { logout } from '../../redux/slices/authSlice'
import { 
  Plus, 
  Settings, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  LayoutDashboard, 
  Car as CarIcon,
  Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../../components/common/Layout'
import { Button, Badge } from '../../components/common/UIComponents'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { items: cars, loading } = useSelector((state) => state.cars)

  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await dispatch(deleteCar(id))
    }
  }

  return (
    <div className="bg-dark min-h-screen pt-24 pb-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 fade-up">
          <div>
            <h1 className="text-4xl  font-bold text-white">Inventory Management</h1>
            <p className="text-gray-400 mt-2">Manage your cars and featured listings</p>
          </div>
          <div className="flex gap-4">
            <Link to="/admin/add-car">
              <Button className="flex items-center gap-2 bg-secondary text-dark hover:bg-white hover:text-dark border-none">
                <Plus size={20} />
                Add New Car
              </Button>
            </Link>
            <Button variant="outline" onClick={() => dispatch(logout())} className="flex items-center gap-2 border-white/10 text-gray-400 hover:text-white hover:border-white">
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card p-8 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white">
              <CarIcon size={28} />
            </div>
            <div>
              <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Inventory</p>
              <h3 className="text-3xl font-bold text-white">{cars.length}</h3>
            </div>
          </div>
          <div className="glass-card p-8 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <Star size={28} />
            </div>
            <div>
              <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Featured Cars</p>
              <h3 className="text-3xl font-bold text-white">{cars.filter(c => c.featured).length}</h3>
            </div>
          </div>
          <div className="glass-card p-8 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Active Listings</p>
              <h3 className="text-3xl font-bold text-white">{cars.length}</h3>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-[#151515] rounded-[40px] shadow-2xl border border-white/5 overflow-hidden fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Car Details</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/5">
                          <img src={car.images?.[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-white">{car.title}</p>
                          <p className="text-gray-500 text-sm">{car.brand} • {car.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-lg text-white">£{car.price?.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      {car.featured ? (
                        <Badge className="bg-secondary/10 text-secondary border-none">Featured</Badge>
                      ) : (
                        <Badge className="bg-white/5 text-gray-400 border-none">Standard</Badge>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/edit-car/${car.id}`} title="Edit">
                          <Button variant="outline" className="p-2 border-white/10 text-white hover:bg-white/10 hover:border-white/20">
                            <Settings size={18} />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="p-2 border-white/10 text-red-500 hover:bg-red-500/10 hover:border-red-500/30"
                          onClick={() => handleDelete(car.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                        <Link to={`/cars/${car.id}`} target="_blank" title="View Live">
                          <Button variant="outline" className="p-2 border-white/10 text-gray-400 hover:text-white hover:border-white">
                            <ExternalLink size={18} />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && !loading && (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-gray-500 italic">
                      No cars found in inventory. Add your first car to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Dashboard
