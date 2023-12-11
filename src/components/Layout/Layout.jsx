import React, { Children } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from '../../contexts/AuthContext'
import { Offline } from "react-detect-offline";
import  { Toaster } from 'react-hot-toast';
export default function Layout() {
  return (
    <>
    <AuthContextProvider>
      
      <Navbar />
      <div className="container p-5">
      <Outlet />
      </div>
      <Footer />
      <div className='bg-dark text-white text-center'>
        <Toaster/>
        <Offline>offline mode!</Offline>
      </div>
      
      </AuthContextProvider>
    </>
  )
}

 