import 'animate.css';
import Categories from '../Categories/Categories';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import LoadingCart from '../LoadingCart/LoadingCart';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import imgCart from '../../images/cart-icon.png'
function Home() {
  let [products,setProducts]=useState([]);
  let [isLoading,setIsLoading]=useState(false)
  let [error,setError]=useState()
 async  function getAllProducts(){
  setIsLoading(true)
  let config={
    params:{
      limit:50,
      sort: "desc",
      
    }
  }
    let res=await axios.get('https://ecommerce.routemisr.com/api/v1/products',config).catch((err)=>{
      setError(err?.message);
      setIsLoading(false)
    })
    if(res?.statusText==='OK'){
      setProducts(res?.data.data)
      
      setInterval(()=>{
        setIsLoading(false)
      },2000)
    }
    
  }
  useEffect( ()=>{
    getAllProducts()
    
  },[])
  
  

  
  return (
    <>
    <Helmet>
      <title>Home</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
      
    {!isLoading && <Categories/>  ?
    <>
    
    {!error?<>
      <Categories />
    <div className="row g-3 mt-2">
        {products?.map((product)=>{
          return <div key={product?._id} className="col-md-4 col-sm-6 ">
            <Product product={product}/>
            </div>
        })}
          
        
    </div></>:<div className="error shadow p-5">
            <h2 className='text-danger text-center'>{error}</h2>
            <Link to={"/E-Commerce/home"}><button className='btn bg-main text-white mt-3'>Home</button></Link>
            </div>}
    </>: <LoadingCart/>}
    
    </>
  )
}

export default Home


