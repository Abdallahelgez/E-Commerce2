import 'animate.css';
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import imgCart from '../../images/cart-icon.png'
export default function ResetCode() {
  let [isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()
  let mail=localStorage.getItem('email')
  async function submit(values){
    setIsLoading(true)
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      values
    ).catch((err)=>{
        toast.error(err.response.data.message)
        navigate('/E-Commerce/forget-password')  

    })
    if(data.statusMsg==="success"){
        setIsLoading(false)
      navigate('/E-Commerce/reset-code')
    }
    

  
  }
  let validationSchema=yup.object({
    email:yup.number().required('Reset code is required').min(6,'Your code is 6 numbers long ').max(6,'Your code is 6 numbers long')
  })
  let formik = useFormik({
    initialValues:{
      reset_code:''
    },
    onSubmit:submit,
    validationSchema
  })
  return (
    <>
        
    <Helmet>
      <title>Reset Code</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    <div className='shadow our-form all-mar animate__animated animate__fadeIn '>
      <form onSubmit={formik.handleSubmit} className='all-pad inp-w m-auto '>
        <h5 className='p-2 text-main animate__animated animate__zoomInRight'>Enter security code</h5>
        <p className='font-sm p-2 animate__animated animate__bounceInLeft'>Please check your emails for a message with your code. Your code is 6 numbers long.</p>
            <div className="mb-3 ">
    <div>
    <div className="row">
      <div className='col-md-6 mb-2  animate__animated animate__backInDown'>  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.reset_code} type="number" className="form-control w-100 font-sm" name='reset_code' id="reset_code" placeholder='Write reset code.... '/> </div>
      <div className="col-md-6  animate__animated animate__backInUp"> <p className='p-2'>
          <p className='font-sm m-0 p-0'>We sent your code to:</p>
          <p className='font-sm '>{mail}</p>
        </p></div>
    </div>
    </div>
  </div>
  {formik.errors.reset_code &&formik.touched.reset_code? <div className='alert alert-danger w-50 m-auto mb-1 animate__animated animate__zoomInUp'><p>{formik.errors.reset_code}</p></div>:null}
  <div className='mb-3 m-auto inp-w'>
  <button type="submit" disabled={isLoading} className="btn bg-main text-white ms-auto d-block animate__animated animate__zoomInUp ">submit</button>
  </div> 
</form>
</div>
    </>
  )
}
