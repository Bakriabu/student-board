import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthProvider'
import Login from './auth/Login'
import Dashboard from './dashboard/Dashboard'
import AdminDashboard from './admin/AdminDashboard'

function PrivateRoute({ children }){
  const { user, loading } = useAuth()
  if(loading) return <div className="p-6">جار التحقق...</div>
  return user ? children : <Navigate to="/login" replace />
}

export default function App(){
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  )
}