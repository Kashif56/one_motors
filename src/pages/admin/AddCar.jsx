import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, Upload, X, Plus, AlertCircle, Check } from 'lucide-react'
import { supabase } from '../../services/supabase'
import { addCar } from '../../redux/slices/carsSlice'
import { Container, Section } from '../../components/common/Layout'
import { Button, Input, Badge } from '../../components/common/UIComponents'

const AddCar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
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
    setError(null)
    const newImageUrls = []

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(filePath, file)

        if (uploadError) {
            console.error("Supabase Storage Error:", uploadError)

            // Enhanced error handling
            if (uploadError.message.includes('row-level security policy') || uploadError.code === '42501') {
                throw new Error("Permission Denied: Public uploads are disabled. Go to Supabase > Storage > car-images > Policies and enable 'Public Access'.")
            }
            if (uploadError.message.includes('Bucket not found') || uploadError.error === 'Bucket not found') {
                throw new Error("System Error: The 'car-images' storage bucket is missing in Supabase. Please contact the administrator.")
            }
            throw uploadError
        }

        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(filePath)

        newImageUrls.push(publicUrl)
      } catch (err) {
        console.error("Upload failed:", err)
        setError(err.message || 'Error uploading image')
        // Stop uploading on critical bucket error to avoid spamming alerts
        if (err.message.includes('storage bucket is missing')) {
            setUploading(false)
            return 
        }
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
      const resultAction = await dispatch(addCar({
        ...formData,
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        year: parseInt(formData.year)
      }))

      if (addCar.fulfilled.match(resultAction)) {
        navigate('/admin/dashboard')
      } else {
        throw new Error(resultAction.payload)
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark min-h-screen pt-24 pb-20">
      <Container>
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 group transition-colors">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 fade-up">
          {/* Form Side */}
          <div className="lg:col-span-8 flex-grow">
            <div className="glass-card p-8 md:p-12 rounded-[40px] border border-white/10 bg-white/5">
              <h1 className="text-4xl  font-bold mb-10 text-white">Add New Vehicle</h1>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Listing Title</label>
                       <input 
                          name="title" 
                          placeholder="e.g. 2022 BMW M4 Competition" 
                          value={formData.title} 
                          onChange={handleChange} 
                          required 
                          className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Brand</label>
                         <input name="brand" placeholder="BMW" value={formData.brand} onChange={handleChange} required className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Model</label>
                         <input name="model" placeholder="M4" value={formData.model} onChange={handleChange} required className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Year</label>
                         <input name="year" type="number" value={formData.year} onChange={handleChange} required className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Price (£)</label>
                         <input name="price" type="number" placeholder="65000" value={formData.price} onChange={handleChange} required className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Mileage</label>
                       <input name="mileage" type="number" placeholder="12000" value={formData.mileage} onChange={handleChange} required className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Technical Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Fuel Type</label>
                      <select name="fuel_type" value={formData.fuel_type} onChange={handleChange} className="px-4 py-3 rounded-xl bg-[#151515] text-white border border-white/10 focus:outline-none focus:border-secondary cursor-pointer">
                        {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(opt => <option key={opt} value={opt} className="bg-dark">{opt}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Transmission</label>
                        <select name="transmission" value={formData.transmission} onChange={handleChange} className="px-4 py-3 rounded-xl bg-[#151515] text-white border border-white/10 focus:outline-none focus:border-secondary cursor-pointer">
                            {['Automatic', 'Manual'].map(opt => <option key={opt} value={opt} className="bg-dark">{opt}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Body Type</label>
                        <select name="body_type" value={formData.body_type} onChange={handleChange} className="px-4 py-3 rounded-xl bg-[#151515] text-white border border-white/10 focus:outline-none focus:border-secondary cursor-pointer">
                            {['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible'].map(opt => <option key={opt} value={opt} className="bg-dark">{opt}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Ext. Color</label>
                       <input name="color" placeholder="Black Sapphire" value={formData.color} onChange={handleChange} required className="w-full h-12 px-4 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-400 block mb-2">Description</label>
                  <textarea 
                    name="description" 
                    rows="6" 
                    className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-secondary transition-all resize-none"
                    placeholder="Full vehicle history, options, and features..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setFormData(prev => ({...prev, featured: !prev.featured}))}>
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${formData.featured ? 'bg-secondary border-secondary' : 'border-gray-500'}`}>
                    {formData.featured && <Check size={16} className="text-dark" />}
                  </div>
                  <label className="font-bold cursor-pointer select-none text-white">Mark as Featured Vehicle (Shows on Home Page)</label>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 text-red-500 rounded-xl flex items-center gap-3 border border-red-500/20">
                    <AlertCircle size={20} />
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full py-5 text-lg font-bold bg-secondary text-dark hover:bg-white hover:text-dark border-none shadow-lg shadow-secondary/10" disabled={loading || uploading}>
                  {loading ? 'Creating Listing...' : 'Publish Car Listing'}
                </Button>
              </form>
            </div>
          </div>

          {/* Image Upload Side */}
          <div className="lg:w-96 w-full">
            <div className="glass-card p-8 rounded-[40px] border border-white/10 bg-white/5 h-fit lg:sticky lg:top-32">
              <h3 className="text-xl font-bold mb-6 text-white">Vehicle Images</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {formData.images.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-white/10 bg-[#151515]">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(url)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark text-[10px] py-1 text-center font-bold uppercase tracking-widest">
                        Main Cover
                      </div>
                    )}
                  </div>
                ))}
                
                <label className={`aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all bg-[#151515] ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  {uploading ? (
                    <div className="animate-spin text-secondary"><Plus size={24} /></div>
                  ) : (
                    <>
                      <Upload className="text-gray-500 mb-2 group-hover:text-secondary" size={24} />
                      <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">Upload Photos</span>
                    </>
                  )}
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check size={14} className="text-secondary" />
                  <span>Recommend 10+ high-quality images</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check size={14} className="text-secondary" />
                  <span>First image will be used as cover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AddCar
