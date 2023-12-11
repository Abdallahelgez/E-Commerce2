import 'animate.css';
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Product({product}) {
  let [cartProducts,setCartProducts]=useState([])
  let [wishlistProducts,setWishlistProducts]=useState([])
  let idp=[]
async  function addToWishlist(productId){
  let res=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch(()=>{

    })
        if(res?.data.status==="success"){
          setWishlistProducts(res?.data.data);
          for(let i=0;i<res?.data.data.length;i++){
            idp.push(res.data.data[i]["_id"])
          }
        }
        let setIds=new Set(idp);
        if(setIds.has(productId)){
          toast.error("The product is added to Wishlist before.")
        }else{
          let res=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{
            headers:{
              token:localStorage.getItem("token")
            }
          }).catch((err)=>{
            toast.error(err?.response.data.message)
          })

          toast.success(res.data.message);
        }
          
  }
  async function addProductToCart(productId){
    let data=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch(()=>{

    })
    if(data?.data.status==="success"){
    
      setCartProducts(data?.data.data.products)
      localStorage.setItem('cart-owner',data.data.data.cartOwner)
    
      for (let i =0 ; i< data.data.data.products.length;i++) {
        idp.push(data.data.data.products[i].product['_id'])
      }
    }
    
      
    
      let setIds=new Set(idp);
      if(setIds.has(productId)){
        toast.error("The product is added to cart before.")
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
    
          <div className="product p-4 overflow-hidden rounded-5 postion-relative">
          <div className="data">
          <button className=' bg-main text-white w-50 rounded-3 ms-auto  pointer mb-2 animate__animated animate__wobble' onClick={()=>addToWishlist(product?._id)}><i className="fa-solid fa-thumbtack"></i></button>
          <button className='bg-none text-main w-50 rounded-3 me-auto  pointer mb-2' >{product?.brand?.name}</button>
          </div>
            <Link to={'/E-Commerce/productDetails/'+product?._id}>
          
            
            <img src={product?.imageCover} alt={product?.title.split(" ").slice(0,2).join(" ")} className='w-50 m-auto d-block animate__animated animate__rotateIn' />
            
            <h3 className='text-main font-sm animate__animated animate__rollIn'>{product?.category.name}</h3>
            <h3 className=' font-sm animate__animated animate__slideInRight'>{product?.title.split(" ").slice(0,2).join(" ")}</h3>
            {product?.priceAfterDiscount? <><h5 className='animate__animated animate__fadeInTopLeft' >{product?.priceAfterDiscount}EG</h5>
            <span className='text-decoration-line-through font-sm text-decoration-color animate__animated animate__jackInTheBox'>{product?.price}EG</span> </>
            :<h5 className='animate__animated animate__fadeInTopRight' >{product?.price}EG</h5>}
            </Link>
            <button onClick={()=>addProductToCart(product._id)} className='btn bg-main text-white w-100 pointer'>add to cart</button>
            </div>
            
          
    </>
  )
}
