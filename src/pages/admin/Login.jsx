import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Car, Lock, Shield, AlertCircle } from 'lucide-react'
import { login, clearError } from '../../redux/slices/authSlice'
import { Button } from '../../components/common/UIComponents'

const Login = () => {
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ password }))
  }

  // Clear error when user types
  const handlePasswordChange = (e) => {
      setPassword(e.target.value)
      if (error) dispatch(clearError())
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full fade-up relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 text-white rounded-3xl mb-6 shadow-2xl border border-white/10 backdrop-blur-sm">
            <Car size={36} className="text-secondary" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">Admin Access</h1>
          <p className="text-gray-400 mt-3 text-lg">Enter secure passkey to proceed</p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[32px] border border-white/10 bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Secure Passkey</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors pointer-events-none">
                        <Lock size={20} />
                    </div>
                    <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all font-bold text-lg text-white placeholder-gray-600"
                        value={password}
                        onChange={handlePasswordChange}
                        autoFocus
                    />
                </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium border border-red-500/20 animate-shake">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold bg-secondary text-dark hover:bg-white hover:text-dark transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1"
            >
              Unlock Dashboard
            </Button>
          </form>
        </div>
        
        <div className="text-center mt-10">
             <div className="flex items-center justify-center gap-2 text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">
                <Shield size={12} />
                Secure Admin Environment
             </div>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-white transition-colors text-sm font-bold border-b border-transparent hover:border-white pb-0.5"
          >
            ← Return to Website
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
