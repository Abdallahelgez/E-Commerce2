import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {
  let {isUserLoggedIn}=useContext(AuthContext)
  if(isUserLoggedIn){
    return children;
  }else{
    return <Login/>;
  }
  
}
