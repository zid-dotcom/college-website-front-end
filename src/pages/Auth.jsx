


// src/pages/Auth.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/AllApi'

export default function Auth(){
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setErr(null)
    setLoading(true)

    try{
      if(mode === 'login'){
        const res = await loginApi({ email: form.email, password: form.password })
        console.log('Login response:', res)
        setLoading(false)
        setForm({ name: '', email: '', password: '' })
        // Redirect to Dashboard after login
        navigate('/dashboard')
      } else {
        const res = await registerApi({ name: form.name, email: form.email, password: form.password })
        console.log('Register response:', res)
        setLoading(false)
        // switch to login mode so user can sign in
        setMode('login')
        setForm(prev => ({ ...prev, name: '', password: '' }))
      }
    }catch(error){
      setLoading(false)
      const backendMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        'Something went wrong'
      setErr(backendMsg)
      console.error('Auth error:', error)
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{mode === 'login' ? 'Login' : 'Register'}</h2>
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErr(null) }}
            className="text-sm text-indigo-600"
          >
            Switch to {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-sm">Full name</label>
              <input
                value={form.name}
                onChange={e=>setForm({...form, name: e.target.value})}
                className="w-full mt-1 p-3 rounded-md border"
                placeholder="Your full name"
                required={mode === 'register'}
              />
            </div>
          )}

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e=>setForm({...form, email: e.target.value})}
              className="w-full mt-1 p-3 rounded-md border"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e=>setForm({...form, password: e.target.value})}
              className="w-full mt-1 p-3 rounded-md border"
              placeholder="Minimum 6 characters"
              required
              minLength={6}
            />
          </div>

          {err && <div className="text-sm text-red-600">{String(err)}</div>}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-indigo-300' : 'bg-indigo-600'}`}
            >
              {loading ? (mode === 'login' ? 'Logging in...' : 'Creating...') : (mode === 'login' ? 'Login' : 'Create account')}
            </button>

            <a className="text-sm text-slate-500">Forgot password?</a>
          </div>
        </form>
      </div>
    </main>
  )
}
