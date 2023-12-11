import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingCart from '../LoadingCart/LoadingCart';
import { Helmet } from 'react-helmet';
import imgCart from '../../images/cart-icon.png'
export default function Brands() {
  let [allBrands,setAllBrandas]=useState([])
  let [isLoading,setIsLoading]=useState(false)
  let [error,setError]=useState()
  async function getBrands(){
    setIsLoading(true)
    let config={params:{
      limit:50,
    }}
    let data= await axios.get('https://ecommerce.routemisr.com/api/v1/brands',config).catch((err)=>{
      setError(err?.message);
      setIsLoading(false)
      
    })
    if(data?.statusText==='OK'){
      setAllBrandas(data?.data.data)
    
    }
    setIsLoading(false)
  }
  useEffect(()=>{
    getBrands()
  },[])
  return (
    <>
    
    <Helmet>
      <title>All Orders</title>
      <link rel="icon" href={imgCart} />
      
    </Helmet>
      <div className="row g-3 justify-content-center">
        {isLoading?<LoadingCart/>:<>{!error?<>
   {allBrands?.map((brand)=>{
   return(
     <div className="col-md-4" key={brand?._id}>
      <div className="brand p-4 overflow-hidden rounded-5 postion-relative">
     <img src={brand?.image} alt={brand?.name} title={brand?.name} className='w-100' />
     <h3 className='text-main font-sm'>{brand?.name}</h3>
     </div>
     </div>
   )
 }) }
   </>:<>
   <div className="error shadow p-5">
     <h2 className='text-danger text-center'>{error}</h2>
     <Link to={"/E-Commerce/home"}><button className='btn bg-main text-white mt-3'>Home</button></Link>
     </div>
   </>}</>}   
      </div>
    </>
  )
}






