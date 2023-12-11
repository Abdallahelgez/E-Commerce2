import 'animate.css';
import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import imgCart from '../../images/cart-icon.png'
import { Helmet } from 'react-helmet';
export default function UpdateData() {
  let [isLoading,setIsLoading]=useState(false)
  let [errorMessage,setErrorMessage]=useState()
  let navigate=useNavigate()
  
  async function updatePassword(values){
    setIsLoading(true)
let data=await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe",values,{
  headers:{
    token:localStorage.getItem('token')
  }
}).catch((err)=>{
  setErrorMessage(err?.response.data.message);
  toast.error(err?.response.data.message)

  setIsLoading(false)
})
if(data?.statusText==="OK"){
  toast.success("The personal data was changed.")
  
  setInterval(()=>{
    navigate("/E-Commerce/home")
  },5000)
  setIsLoading(false);

}
  }
let validationSchema=yup.object({
        name:yup.string().min(3,"Name must be more than 3 character").max(20,"Name must be less than 20 character").required("Name is requird."),
        email:yup.string().required('Email is requird.').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Email not valid') ,
        phone:yup.string().required('Phone is requird.').matches(/^01[0125][0-9]{8}$/,'Phone not valid')
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
      <title>Update Personal data</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    <div className='shadow our-form all-mar animate__animated animate__fadeIn '>
      <form onSubmit={formik.handleSubmit} className='all-pad '>
              <h2 className='mb-5 text-center text-main d-block animate__animated animate__backInDown'>Update personal data</h2>
              <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}  type="text" className="form-control inp-w m-auto animate__animated animate__bounceInLeft" name='name' id='name' placeholder='Write Your Name '  />
                   {formik.errors.name && formik.touched.name?<div className='alert alert-danger inp-w m-auto animate__animated animate__bounceInLeft'>
                 <p>{formik.errors.name}</p>
                   </div>:null}
                 </div>
                 <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" className="form-control inp-w m-auto animate__animated animate__bounceInRight" name='email' id='email' placeholder='Write Your Email ' />
                   {formik.errors.email && formik.touched.email?<div className='alert alert-danger inp-w m-auto animate__animated animate__bounceInRight'>
                 <p>{formik.errors.email}</p>
                   </div>:null}
                 </div>
                 <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className="form-control inp-w m-auto animate__animated animate__rotateInUpLeft" name='phone' id='phone' placeholder='Write Your Phone Number '  />
                   {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger inp-w m-auto animate__animated animate__rotateInUpLeft'>
                 <p>{formik.errors.phone}</p>
                   </div>:null}
                 </div>
                 {errorMessage?<div className='mb-3 m-auto inp-w alert alert-danger animate__animated animate__bounceInUp'>{errorMessage}</div>:null}
          <div className='mb-3 m-auto inp-w'>
          <button type="submit" disabled={isLoading} className="btn bg-main text-white ms-auto d-block animate__animated animate__bounceInUp">change</button>
          </div> 
        </form>
        </div>
    </>
  )
}
