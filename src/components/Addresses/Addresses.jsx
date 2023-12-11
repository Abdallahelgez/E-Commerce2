import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import LoadingCart from '../LoadingCart/LoadingCart'
import imgCart from '../../images/cart-icon.png'
import { Helmet } from 'react-helmet'


export default function Addresses() {
  let [addresses,setAddresses]=useState([])
  let [error,setError]=useState()
  let [isLoading,setIsLoading]=useState(false)
  let [isEmpity,setIsEmpity]=useState(false)
  async function getAddresses(){
    setIsLoading(true)
    let data=await axios.get('https://ecommerce.routemisr.com/api/v1/addresses',{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch((error)=>{
      {error.message==="Network Error"?setError(error?.message):setError(error.response?.data.message)}
      
      
    })
    if(data?.data.status==='success'){
      
      if(data?.data.data.length===0){
        setIsEmpity(true)
      }else{
        setAddresses(data?.data.data)
      }
      setError(null)
      
    }
    setIsLoading(false)
    
  }
  async function removeAddress(addressId,index){
    let data= await axios.delete('https://ecommerce.routemisr.com/api/v1/addresses/'+addressId,{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch((error)=>{
       toast.error(error?.response.data.statusMsg)
      
    })
    if(data?.data.status==="success"){
      toast.success(data?.data.message)
      if(data?.data.data.length===0){
        setIsEmpity(true)
      }else{
        setAddresses(data?.data.data)
      }      setError(null)
    }
    
  }

  useEffect(()=>{
    getAddresses()
  },[])
  return (
    <>
    <Helmet>
      <title>Addresses</title>
      <link rel="icon" href={imgCart} />
      
    </Helmet>
     {isLoading?<LoadingCart/>:<div className="row g-3 justify-content-center animate__animated animate__fadeIn ">
    {!error||isEmpity?<>{isEmpity?<>  
            <h2 className='text-center text-main animate__animated animate__flip'>{"You don't have any address."}</h2></>:<>  <h2 className='text-main me-auto animate__animated animate__bounceInLeft'>The addresses :</h2>
    {addresses?.map((address,index)=>{
      return(
      <div className="col-md-4 col-sm-6 " key={address?._id}>
          <div className="item p-4 overflow-hidden rounded-5 postion-relative animate__animated animate__rollIn ">
          <button className='  text-white w-25 rounded-3 bg-white p-0 ms-auto d-block pointer mb-2 animate__animated animate__bounceInUp' onClick={()=>removeAddress(address?._id,index)}><i className="fa-solid fa-trash-can fs-3 " ></i></button>
            <h6 className='animate__animated animate__bounceInLeft'>Name : {address?.name} </h6>
            <h6 className='animate__animated animate__bounceInRight'>City : {address?.city}</h6>
            <h6 className='animate__animated animate__fadeInTopLeft'>Details : {address?.details}</h6> 
            <h6 className='animate__animated animate__fadeInTopRight'>Phone : {address?.phone}</h6> 
          </div>
      </div>
      )
    })}</>}
    </>:<>
              <div className="error shadow all-pad animate__animated animate__fadeIn">
              <h4 className='text-danger text-center animate__animated animate__bounceInLeft'>{error}</h4>
              <Link to={"/E-Commerce/home"}><button className='btn bg-main text-white mt-3 animate__animated animate__backInDown'>Home</button></Link>
              </div>
    </>}
  </div> }
    </>
  )
}

