import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingCart from './../LoadingCart/LoadingCart.jsx'
import {Helmet} from 'react-helmet'
import Slider from 'react-slick'
import {toast} from 'react-hot-toast'
export default function ProductDetails() {
  let {id}=useParams()
  let [isLoading,setIsLoading]=useState(false)
  let[productDetails,setProductDetails]=useState()
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arows:true,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }
  useEffect(()=>{
    getDetails(id)
  },[])
    async function getDetails(productId){
      setIsLoading(true)
      let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products/'+productId)
      setProductDetails(data.data)
      
      setIsLoading(false)
    }
    let [cartProducts,setCartProducts]=useState([])
    let idp=[]
  async function addProductToCart(productId){
    let data=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch(()=>{

    })
    if(data?.data.status==="success"){
      setCartProducts(data?.data.data.products)
      localStorage.setItem("cart-owner",data?.data.data.cartOwner);
      for (let i =0 ; i< data?.data.data.products.length;i++) {
        idp.push(data?.data.data.products[i].product['_id'])
      }
    }
    
      
      let setIds=new Set(idp);
      if(setIds?.has(productId)){
        toast.error("The product is added before.")
      }else{
        let res=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
          headers:{
            token:localStorage.getItem("token")
          }
        }).catch((err)=>{
          toast.error(err?.response.data.message)
        })
        
        if(res?.data.status === "success"){
          toast.success(res.data.message)
        }
      }
  
    
  }
  return (
    <>
    <Helmet>
      <title>{productDetails?.title}</title>
      <link rel="icon" href={productDetails?.imageCover} />
      
    </Helmet>
      {isLoading? <LoadingCart/>
      :
    <div className="row align-items-center">
    <><div className="col-md-3 animate__animated animate__rollIn">
        <Slider {...settings} >
      {productDetails?.images.map((img)=>{
        return <img src={img} className='w-50 m-auto d-block' alt={productDetails?.category?.name} />
      })}
    </Slider>
      </div>
      <div className="col-md-9 p-5">
        <h5  className='animate__animated animate__bounceInUp'>{productDetails?.category?.name}</h5>
        <p  className='animate__animated animate__bounceInLeft'>price: {productDetails?.price}EGP</p>
        <p className='animate__animated animate__bounceInRight'>{productDetails?.description}</p>
        <p className='animate__animated animate__bounceInDown'><i className='fas text-main fa-star'></i> {productDetails?.ratingsAverage}</p>
        <button onClick={()=>addProductToCart(productDetails?._id)} className='btn bg-main text-white d-block ms-auto w-50 pointer animate__animated animate__zoomInDown'>add to cart</button>
      </div></>
    </div>}
    </>
  )
}
