import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function NotProtectedRoute({children}) {
  let navigate=useNavigate()
  let{isUserLoggedIn}=useContext(AuthContext)
  if(!isUserLoggedIn){
    return children
  }else{
    navigate('/E-Commerce/home')
  }
}
