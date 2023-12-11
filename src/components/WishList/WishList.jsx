import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import imgCart from '../../images/cart-icon.png'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function WishList() {
  let[wishlistProducts,setWishlistProducts]=useState([])
  let [empityWishListError,setEmpityWishListError]=useState()
  let [error,setError]=useState()
  let [tokenError,setTokenError]=useState()
  let [pathError,setPathError]=useState()
  async function getWishList(){
    let res=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch((err)=>{
      if(err.response?.data.message.split(" ").slice(0,2).join(" ")==='Invalid Token.'){
        setTokenError(err.response.data.message)
        
        }else if(err.response?.data.message.split(" ").slice(0,3).join(" ")==="Can\'t find this"){
          setPathError("This route isn't right.")
          
        }else{
          setError(err?.message);
          
        }
    })
    if(res?.data.status==='success'&&res?.data.count!==0){
      setWishlistProducts(res?.data.data)
    }else if(res?.data.status==='success'&&res?.data.count===0){
      setEmpityWishListError("Your Wishlist is currently Empty")
    }
    
  
  }
      useEffect(()=>{
        getWishList()
      },[])
    async function removeProduct(productId,index){
      let newWishlist=[...wishlistProducts]
      for(index=0;index<newWishlist.length;index++){
        if(newWishlist[index]['_id']===productId){
           newWishlist.splice(index,1)
          
        }
      }
      setWishlistProducts(newWishlist)
      let data=await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId,{
        headers:{
          token:localStorage.getItem('token')
        }
      }).catch((err)=>{
        
      })


      toast.success(data.data?.message)
      
        setWishlistProducts(newWishlist)
      }
      
  return (
    <>
      
    <Helmet>
      <title>Wishlist</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    {error||pathError||tokenError?<>
    
      <div className="error shadow all-pad animate__animated animate__fadeIn">
     <h2 className='text-danger text-center animate__animated animate__bounceInLeft'>{pathError || tokenError || error}</h2>
  <Link to={"/E-Commerce/home"}><button className='btn bg-main text-white mt-3 animate__animated animate__backInDown'>Home</button></Link>
     
     </div>
    </>:<>{empityWishListError?<>
             <div className='d-flex justify-content-center align-items-center'>
               <img src={imgCart} className='w-25' alt="Wishlist Cart" />
             </div>
             <h2 className='text-center text-main'>{empityWishListError}</h2>    
                </>:<><div className="row g-3 justify-content-center">
      {wishlistProducts?.map((product,index)=>{
      return(
        <div key={product?._id} className="col-md-3">
      <div  className="product p-4 overflow-hidden rounded-5 postion-relative">
          <button className=' bg-white p-2 text-danger  btn btn-danger mb-2 pointer animate__animated animate__rubberBand' onClick={()=>removeProduct(product?._id,index)}>Remove</button>
            <Link to={'/productDetails/'+product?._id}>
            
            <img src={product?.imageCover} alt={product?.title?.split(" ").slice(0,2).join(" ")}  className='w-100 animate__animated animate__rotateIn' />
            <h3 className='text-main font-sm animate__animated animate__rollIn'>{product?.category?.name}</h3>
            <h3 className=' font-sm animate__animated animate__slideInRight'>{product?.title?.split(" ").slice(0,2).join(" ")}</h3>
            {product?.priceAfterDiscount? <><h5 className='animate__animated animate__fadeInTopLeft' >{product?.priceAfterDiscount}EG</h5>
            <span className='text-decoration-line-through font-sm text-decoration-color animate__animated animate__jackInTheBox'>{product?.price}EG</span> </>
            :<h5 className='animate__animated animate__fadeInTopRight' >{product?.price}EG</h5>}
            </Link>
            </div>
            </div>
      )
    })

    }</div></>}</>}
      
    
    </>
  )
}
    