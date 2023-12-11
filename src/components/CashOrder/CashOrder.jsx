import 'animate.css';
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import imgCart from '../../images/cart-icon.png'
export default function CashOrder() {
  let [isLoading,setIsLoading]=useState(false)
  let [errorMessage,setErrorMessage]=useState()
  let {id}=useParams()
    async function cashOrder(values){
      setIsLoading(true)
    let data=await axios.post('https://ecommerce.routemisr.com/api/v1/orders/'+id,values,{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch((error)=>{
      setErrorMessage(error?.response.data.message);
      toast.error(error.response.data.message)
      setIsLoading(false)
    })
    if(data?.data.status==="success"){
      toast.success('The order is created.')
      setIsLoading(false);
      
    }
    
  }

  let validationSchema=yup.object({
    details:yup.string().min(3,"The details must be more than 3 character").max(40,"The details must be less than 20 character").required("The details is requird"),
    city:yup.string().min(3,"The city must be more than 3 character").max(40,"The city must be less than 20 character").required("The city is requird").matches(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/,"The city name not right "),
    phone:yup.string().required('Phone is requird.').matches(/^01[0125][0-9]{8}$/,'Phone not valid')
   })
  
  let formik=useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit:cashOrder,
     validationSchema,
  })
  return (
    <>
    <Helmet>
      <title>Cash Order</title>
      <link rel="icon" href={imgCart} />
      
    </Helmet>
      <form onSubmit={formik.handleSubmit} className='py-5 shadow rounded-5 animate__animated animate__fadeIn'>
        <h2 className='mb-5 text-center text-main d-block animate__animated animate__rubberBand'>Add address</h2>
        <div className="mb-3 ">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" className="form-control w-75 m-auto animate__animated animate__bounceInLeft" name='details' id="details" placeholder='Write details address...'/>
  </div>
  {formik.errors.details &&formik.touched.details? <div className='alert alert-danger w-75 m-auto mb-1 animate__animated animate__bounceInLeft'><p>{formik.errors.details}</p></div>:null}
  <div className="mb-3">
    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className="form-control w-75 m-auto animate__animated animate__bounceInRight" name='city' id='city' placeholder='Write the city address...' />
  </div>
  {formik.errors.city &&formik.touched.city?<div className='alert alert-danger w-75 m-auto mb-1 animate__animated animate__bounceInRight'><p>{formik.errors.city}</p></div>:null}
  <div className="mb-3">
    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="form-control w-75 m-auto animate__animated animate__rotateInUpLeft" name='phone' id='phone' placeholder='Write your phone...' />
  </div>
  {formik.errors.phone &&formik.touched.phone?<div className='alert alert-danger w-75 m-auto mb-1 animate__animated animate__rotateInUpLeft'><p>{formik.errors.phone}</p></div>:null}
   {errorMessage?<div className='mb-3 m-auto w-75 alert alert-danger animate__animated animate__fadeInTopLeft'>{errorMessage}</div>:null}
  <div className='mb-3 m-auto w-75'>
  <button type="submit" disabled={isLoading} className="btn bg-main text-white ms-auto d-block animate__animated animate__zoomInDown">Order</button>
  </div> 
</form>
    </>
  )
}
