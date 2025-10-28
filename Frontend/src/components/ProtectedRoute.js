import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  useEffect(() => {
    console.log('ProtectedRoute - Auth State:', {
      user: user ? 'Logged in' : 'Not logged in',
      timestamp: new Date().toISOString()
    })
  }, [user])

  if (!user) {
    console.log('ProtectedRoute - Redirecting to login')
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute