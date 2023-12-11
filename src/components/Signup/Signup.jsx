import 'animate.css';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import imgCart from '../../images/cart-icon.png'
    function Signup() {
      let navigate = useNavigate()
      let [isLoading , setIsLoading] = useState(false);
      let [isCreated , setIsCreated] = useState('');
      let [pathError,setPathError]=useState('')
      let [error,setError]=useState()
      
      let validationSchema=yup.object({
        name:yup.string().min(3,"Name must be more than 3 character").max(20,"Name must be less than 20 character").required("Name is requird."),
        email:yup.string().required('Email is requird.').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Email not valid') ,
        password:yup.string().required('Password is requird.').matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password not valid'),
        rePassword:yup.string().required('Repassword is requird.').oneOf([yup.ref('password')],'Repassword not matching with password'),
        phone:yup.string().required('Phone is requird.').matches(/^01[0125][0-9]{8}$/,'Phone not valid')
       })
      let formik = useFormik({
        initialValues:{
          name:'',
          email:'',
          password:'',
          rePassword:'',
          phone:''
        },
        onSubmit:register,
       validationSchema ,
             
      });
    
      
        async function register(values){
            setIsLoading(true)
            
            let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
               if(err.response?.data.message.split(" ").slice(0,3).join(" ")==="Can\'t find this"){
                  setPathError("This route isn't right.")
                }else if(err.response?.data.message==="Account Already Exists"){
                  toast.error(err.response?.data.message)

                }else{
                  setError(err?.message);
                }  
            
              setIsLoading(false)
            })
          
            setIsCreated(data.message)
            setIsLoading(false)
            
            navigate('/E-Commerce/login')
          }
        
          return (
            <>
              
    <Helmet>
      <title>Sign Up</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
            {error || pathError?<div className="error shadow p-5">
            <h2 className='text-danger text-center'>{error||pathError}</h2>
            <Link to={"/E-Commerce/login"}><button className='btn bg-main text-white mt-3'>Login</button></Link>
            </div>:<>
            <div className='shadow our-form all-mar animate__animated animate__wobble'>
               <form onSubmit={formik.handleSubmit} className='all-pad'>
               <h3 className='text-main mb-5 text-center animate__animated animate__backInDown'>Sign Up</h3>
               <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}  type="text" className="form-control inp-w m-auto animate__animated animate__bounceInDown" name='name' id='name' placeholder='Write Your Name '  />
                   {formik.errors.name && formik.touched.name?<div className='alert alert-danger inp-w m-auto animate__animated animate__bounceInDown'>
                 <p>{formik.errors.name}</p>
                   </div>:null}
                 </div>
                 <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" className="form-control inp-w m-auto animate__animated animate__bounceInUp" name='email' id='email' placeholder='Write Your Email ' />
                   {formik.errors.email && formik.touched.email?<div className='alert alert-danger inp-w m-auto animate__animated'>
                 <p>{formik.errors.email}</p>
                   </div>:null}
                 </div>
                 <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}  type="password" className="form-control inp-w m-auto animate__animated animate__bounceInDown" name='password' id='password' placeholder='Write Your Password ' />
                   {formik.errors.password && formik.touched.password?<div className='alert alert-danger inp-w m-auto animate__animated animate__bounceInDown'>
                 <p>{formik.errors.password}</p>
                   </div>:null}
                 </div>
                 <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword}  type="password" className="form-control inp-w m-auto animate__animated animate__bounceInUp" name='rePassword' id='rePassword' placeholder='Write Your Password ' />
                   {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger inp-w m-auto animate__animated animate__bounceInUp'>
                 <p>{formik.errors.rePassword}</p>
                   </div>:null}
                 </div>
                 <div className="mb-3">
                   <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className="form-control inp-w m-auto animate__animated animate__bounceInDown" name='phone' id='phone' placeholder='Write Your Phone Number '  />
                   {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger inp-w m-auto animate__animated animate__bounceInDown'>
                 <p>{formik.errors.phone}</p>
                   </div>:null}
                 </div>
                
                
                 {isCreated?<div className='alert alert-success inp-w m-auto mb-3'>{isCreated}</div>:null}
                 <div className='mb-3 m-auto inp-w'>
                  
                    <button disabled={isLoading}  type="submit" className="btn bg-main text-white d-block ms-auto animate__animated animate__wobble">Submit</button> 
                
                 </div>
               </form>
             </div>
                    </>}

              
            </>
          )
    }

export default Signup;


