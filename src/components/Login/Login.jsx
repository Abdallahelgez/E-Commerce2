import 'animate.css';
import React, { useContext, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext'
import { Helmet } from 'react-helmet'
import imgCart from '../../images/cart-icon.png'
function Login() {
  let [isLoading,setIsLoading]=useState(false)
  let [errorMessage,setErrorMessage]=useState('')
  let {isUserLoggedIn,setIsUserLoggedIn}=useContext(AuthContext);
  let [error,setError]=useState()
  let navigate=useNavigate()
  async function cartOwner(){
    let res= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem("token")
      }
    }).catch((err)=>{
      
      
      if(err.response?.data.message.split(': ').slice(1).join()!="undefined" && err.response?.data.message.split(' ').slice(0,2).join(" ")==='No cart'){
        localStorage.setItem("cart-owner",err.response?.data.message.split(': ').slice(1).join());
      }else{
        setError(err.response?.data.message);
      }
      setIsLoading(false)
       })
       if(res?.data.status==="success"){
        localStorage.setItem("cart-owner",res?.data.data.cartOwner);
        navigate('/E-Commerce/home')
        setIsLoading(false)
       }
      
                  
                
                
      
  }
  async function login(values){
    setIsLoading(true)
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
       setErrorMessage(err?.response.data.message)
      setIsLoading(false)
      
    })
    localStorage.setItem("token",data.token)
  await  cartOwner()
    setErrorMessage(null)
    setIsUserLoggedIn(true)
    
  }
  let validationSchema =yup.object({
    email:yup.string().required('Email is requird.').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Email not valid') ,
    password:yup.string().required('Password is requird.').matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password not valid'),
  })


  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:login,
    validationSchema,
    
    
  })

  return ( <>
    
    <Helmet>
      <title>Login</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    {!isUserLoggedIn?<div className='shadow our-form all-mar animate__animated animate__fadeIn  '>
    <form onSubmit={formik.handleSubmit} className='all-pad'>
      <h3 className='text-main mb-5 text-center animate__animated animate__backInDown'>Login</h3>
  <div className="mb-3 ">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="form-control inp-w m-auto animate__animated animate__bounceInLeft" name='email' id="email" placeholder='Email address'/>
  </div>
  {formik.errors.email &&formik.touched.email? <div className='alert alert-danger inp-w m-auto mb-1 animate__animated animate__bounceInLeft'><p>{formik.errors.email}</p></div>:null}
  <div className="mb-3">
    <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="form-control inp-w m-auto animate__animated animate__bounceInRight" name='password' id='password' placeholder='Password' />
  </div>
  {formik.errors.password &&formik.touched.password?<div className='alert alert-danger inp-w m-auto mb-1 animate__animated animate__bounceInRight'><p>{formik.errors.password}</p></div>:null}
  <span className='inp-w d-block m-auto mb-3 animate__animated animate__rollIn'><Link to="/E-Commerce/forget-password">Forget Password?</Link></span>
  {errorMessage?<div className='mb-3 m-auto inp-w alert alert-danger '>{errorMessage}</div>:null}
  <div className='mb-3 m-auto inp-w animate__animated animate__fadeInBottomRight'>
  <button type="submit" disabled={isLoading} className="btn bg-main text-white ms-auto d-block ">Submit</button>
  </div>
</form>
    </div>:null}
    </>
  )
}

export default Login