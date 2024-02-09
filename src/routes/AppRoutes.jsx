import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import IdoList from '../pages/idoLists/IdoList'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/ido' element={<IdoList />} />
    </Routes>
  )
}

export default AppRoutes