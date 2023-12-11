import 'animate.css';
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import imgCart from '../../images/cart-icon.png'
import { Helmet } from 'react-helmet'
export default function ForgetPassword() {
  let [isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()
  async function submit(values){
    setIsLoading(true)
    let data=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      values
    ).catch((err)=>{
        toast.error(err?.response.data.message)
        navigate('/E-Commerce/forget-password')  

    })
    if(data?.data.statusMsg==="success"){
        setIsLoading(false)
      navigate('/E-Commerce/reset-code')
      let mail= document.getElementById('email').value
      localStorage.setItem("email",mail)
      
    }
    

    
  }
  let validationSchema=yup.object({
    email:yup.string().required('Email is requird.').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Email not valid')
  })
  let formik = useFormik({
    initialValues:{
      email:''
    },
    onSubmit:submit,
    validationSchema
  })
  return (
    <>
    
    <Helmet>
      <title>Forget Password</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    <div className='shadow our-form all-mar  '>
  <form onSubmit={formik.handleSubmit} className='all-pad animate__animated animate__fadeIn'>
              <h3 className='m-auto inp-w mb-3 text-main animate__animated animate__bounceInLeft '>Forget Password</h3>
            <div className="mb-3 ">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="form-control inp-w m-auto animate__animated animate__bounceInRight" name='email' id="email" placeholder='Email address'/>
          </div>
          {formik.errors.email &&formik.touched.email? <div className='alert alert-danger inp-w m-auto mb-1 animate__animated animate__bounceInUP'><p>{formik.errors.email}</p></div>:null}
          
          <div className='mb-3 m-auto inp-w'>
          <button type="submit" disabled={isLoading} className="btn bg-main text-white ms-auto d-block animate__animated animate__zoomInUp">submit</button>
          </div> 
  </form>
  </div>
    </>
          )
}
 