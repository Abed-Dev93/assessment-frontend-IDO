import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState()
    const [checkUser, setCheckUser] = useState(true)
    const [userUpdated, setUserUpdated] = useState(false)

    useEffect(() => {
        !user || userUpdated ? fetchUser() : null
    }, [user, userUpdated])

    const fetchUser = async () => {
        try {
            setCheckUser(true)
            const response = await axios.get(`${process.env.REACT_APP_PATH}/User/UserData`, { withCredentials: true })
            setUser(response.data.fetchedUser)
        }
        catch (error) {
            setUser(null)
            console.log('Wrong Credentials', error)
        }
        finally {
            setCheckUser(false)
        }
    }

    const logOut = async () => {
        await axios.post(`${process.env.REACT_APP_PATH}/User/Logout`)
        setUser(null)
    }
    
    return (
        <UserContext.Provider value={{ user, setUser, logOut, fetchUser, checkUser, setUserUpdated }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}