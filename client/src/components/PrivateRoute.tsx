// PrivateRoute.tsx
import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface PrivateRouteProps {
    children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default PrivateRoute
