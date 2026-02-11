import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronLeft, Upload, X, Plus, AlertCircle, Check, Trash2 } from 'lucide-react'
import { supabase } from '../../services/supabase'
import { updateCar, deleteCar } from '../../redux/slices/carsSlice'
import { Container, Section } from '../../components/common/Layout'
import { Button, Input } from '../../components/common/UIComponents'

const EditCar = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: cars } = useSelector((state) => state.cars)
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    body_type: 'SUV',
    color: '',
    description: '',
    featured: false,
    images: []
  })

  useEffect(() => {
    const getCar = async () => {
      setFetching(true)
      const car = cars.find(c => c.id === id)
      if (car) {
        setFormData(car)
        setFetching(false)
      } else {
        const { data, error } = await supabase.from('cars').select('*').eq('id', id).single()
        if (data) setFormData(data)
        if (error) setError('Car not found')
        setFetching(false)
      }
    }
    getCar()
  }, [id, cars])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploading(true)
    const newImageUrls = []

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(filePath)

        newImageUrls.push(publicUrl)
      } catch (err) {
        setError(`Error uploading image: ${err.message}`)
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImageUrls]
    }))
    setUploading(false)
  }

  const removeImage = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(url => url !== urlToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const resultAction = await dispatch(updateCar({
        id,
        carData: {
          ...formData,
          price: parseFloat(formData.price),
          mileage: parseInt(formData.mileage),
          year: parseInt(formData.year)
        }
      }))

      if (updateCar.fulfilled.match(resultAction)) {
        navigate('/admin/dashboard')
      } else {
        throw new Error(resultAction.payload)
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this car?')) {
      const resultAction = await dispatch(deleteCar(id))
      if (deleteCar.fulfilled.match(resultAction)) {
        navigate('/admin/dashboard')
      }
    }
  }

  if (fetching) return <div className="pt-40 text-center">Loading car data...</div>

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <Button 
            variant="outline" 
            className="text-red-500 border-red-100 hover:bg-red-50 flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 size={18} />
            Delete Car
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Side */}
          <div className="lg:col-span-8 flex-grow">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12">
              <h1 className="text-4xl  font-bold mb-10">Edit Vehicle</h1>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} required />
                      <Input label="Model" name="model" value={formData.model} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Year" name="year" type="number" value={formData.year} onChange={handleChange} required />
                      <Input label="Price (£)" name="price" type="number" value={formData.price} onChange={handleChange} required />
                    </div>
                    <Input label="Mileage" name="mileage" type="number" value={formData.mileage} onChange={handleChange} required />
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Technical Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Fuel Type</label>
                      <select name="fuel_type" value={formData.fuel_type} onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20">
                        {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Transmission</label>
                        <select name="transmission" value={formData.transmission} onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20">
                            {['Automatic', 'Manual'].map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Body Type</label>
                        <select name="body_type" value={formData.body_type} onChange={handleChange} className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20">
                            {['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible'].map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <Input label="Ext. Color" name="color" value={formData.color} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
                  <textarea 
                    name="description" 
                    rows="6" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-secondary" />
                  <label htmlFor="featured" className="font-bold cursor-pointer select-none">Mark as Featured Vehicle</label>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3">
                    <AlertCircle size={20} />
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full py-5 text-lg font-bold" disabled={loading || uploading}>
                  {loading ? 'Saving Changes...' : 'Update Car Listing'}
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:w-96 w-full">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 h-fit lg:sticky lg:top-32">
              <h3 className="text-xl font-bold mb-6">Vehicle Images</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {formData.images.map((url, idx) => (
                  <div key={url} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(url)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-secondary transition-all">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  {uploading ? <div className="animate-spin text-secondary"><Plus size={24} /></div> : <Upload className="text-gray-300" size={24} />}
                </label>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default EditCar
