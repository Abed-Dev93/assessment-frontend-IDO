import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../contexts/UserProvider'

const ProtectedRoute = ({ isAllowed, children, redirectPath }) => {

    const [user, checkUser] = useContext(useUserContext)

    !user && !checkUser ? <Navigate to={redirectPath}  /> :
        !isAllowed ? <Navigate to={redirectPath} /> :
            children ? children : <Outlet />
}

export default ProtectedRoute