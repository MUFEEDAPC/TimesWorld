import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  
  console.log('ProtectedRoute - Auth state:', { isAuthenticated })
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to login')
    return <Navigate to="/login" replace />
  }
  
  // Render protected content if authenticated
  console.log('ProtectedRoute - Rendering protected content')
  return children
}

export default ProtectedRoute 