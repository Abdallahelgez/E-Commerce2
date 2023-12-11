import 'animate.css';
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import imgCart from '../../images/cart-icon.png'
export default function UpdatePassword() {
  let [isLoading,setIsLoading]=useState(false)
  let [errorMessage,setErrorMessage]=useState()
  let navigate=useNavigate()
  async function updatePassword(values){
    setIsLoading(true)
let data=await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",values,{
  headers:{
    token:localStorage.getItem('token')
  }
}).catch((err)=>{
  setErrorMessage(err?.response.data.message);
  toast.error(err?.response.data.message)
  setIsLoading(false)
})
if(data?.statusText==="OK"){
  toast.success("The password was changed.")
  setInterval(()=>{
    navigate("/E-Commerce/home")
  },5000)
  setIsLoading(false);

}
  }
let validationSchema=yup.object({
  currentPassword:yup.string().required('Password is requird.').matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password not valid'),
  password:yup.string().required('Password is requird.').matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password not valid'),
  rePassword:yup.string().required('Repassword is requird.').oneOf([yup.ref('password')],'Repassword not matching with password'),
})
  let formik =useFormik({
    initialValues:{
      currentPassword:'',
      password:'',
      rePassword:'',
    },onSubmit:updatePassword,validationSchema
  })
  return (
    <>
      
    <Helmet>
      <title>Update Password</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    <div className='shadow our-form all-mar animate__animated animate__fadeIn'>
    <form onSubmit={formik.handleSubmit} className='all-pad '>
        <h2 className='mb-5 text-center text-main d-block animate__animated animate__backInDown'>Update Password</h2>
      <div className="mb-3 ">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentPassword} type="password" className="form-control inp-w m-auto animate__animated animate__bounceInLeft" name='currentPassword' id="currentPassword" placeholder='Write the current Password...'/>
    </div>
    {formik.errors.currentPassword &&formik.touched.currentPassword? <div className='alert alert-danger inp-w m-auto mb-1 animate__animated animate__bounceInLeft'><p>{formik.errors.currentPassword}</p></div>:null}
    <div className="mb-3 ">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className="form-control inp-w m-auto animate__animated animate__bounceInRight" name='password' id="password" placeholder='Write password...'/>
    </div>
    {formik.errors.password &&formik.touched.password? <div className='alert alert-danger inp-w m-auto mb-1 animate__animated animate__bounceInRight'><p>{formik.errors.password}</p></div>:null}
    <div className="mb-3">
      <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className="form-control inp-w m-auto animate__animated animate__rotateInUpLeft" name='rePassword' id='rePassword' placeholder='Write the rePassword...' />
    </div>
    {formik.errors.rePassword &&formik.touched.rePassword?<div className='alert alert-danger inp-w m-auto mb-1 animate__animated animate__rotateInUpLeft'><p>{formik.errors.rePassword}</p></div>:null}
    {errorMessage?<div className='mb-3 m-auto inp-w alert alert-danger animate__animated animate__bounceInUp'>{errorMessage}</div>:null}
    <div className='mb-3 m-auto inp-w'>
    <button type="submit" disabled={isLoading} className="btn bg-main text-white ms-auto d-block animate__animated animate__bounceInUp">change</button>
    </div> 
  </form>
    </div>
    
    
    </>
  )
}
