import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import LoadingCart from '../LoadingCart/LoadingCart'
import { Helmet } from 'react-helmet'
import imgCart from '../../images/cart-icon.png'
export default function AllOrders() {
  let [orders,setOrders]=useState()
  let [error,setError]=useState()
  let [error2,setError2]=useState()
  let [isLoading,setIsLoading]=useState(false)
  let [isEmpity,setIsEmpity]=useState(false)
  

  async function getAllOrders(){
    setIsLoading(true)
    let data =await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("cart-owner")}`)
          .catch((err)=>{
            setError2(err?.message);
            setIsLoading(false)

              })
          
          setError(null)
            setIsLoading(false)
          
    if(data.data.length===0){
      setIsEmpity(true)
      
    }else{
      setOrders(data?.data)
    }
    
        
        
  }
  useEffect(()=>{
  
  
      getAllOrders()
    
  },[])
  return (
    <>
    <Helmet>
      <title>All orders</title>
      <link rel="icon" href={imgCart} />
      
    </Helmet>
      {<div className="row g-3 justify-content-center">
        
          {isLoading?<LoadingCart/>
          :<>
          {error||error2||isEmpity||orders?<>
            {error || error2 ?<>
            <div className="error shadow all-pad animate__animated animate__fadeIn">
            <h2 className='text-danger text-center animate__animated animate__bounceInLeft'>{error||error2}</h2>
            <Link to={"/E-Commerce/home"}><button className='btn bg-main text-white mt-3 animate__animated animate__backInDown'>Home</button></Link>
            </div>
          </>
          :<>{isEmpity?<>
            <div className='d-flex justify-content-center align-items-center'>
              <img src={imgCart} className='w-25 animate__animated animate__rollIn' alt="orders Cart" />
            </div>
            <h2 className='text-center text-main animate__animated animate__flip'>{"You don't make orders."}</h2>    
               </>:<>{orders?.map((order,index)=>{
              return(
              <div className="col-md-4 col-sm-6 " key={order?._id}>
                  <div className="item p-4 overflow-hidden rounded-5 postion-relative animate__animated animate__rollIn ">
                    <h5 className='text-center text-main animate__animated animate__flip'>{index+1}</h5>
                    <h6 className='animate__animated animate__bounceInLeft' >Payment-Method : {order?.paymentMethodType} </h6>
                    <h6 className='animate__animated animate__bounceInRight'>total-Order-Price : {order?.totalOrderPrice}<span className='text-main'> EGP</span></h6>
                    <h6 className='animate__animated animate__fadeInTopLeft'>isPaid : {`${order.isPaid}`}</h6> 
                    <h6 className='animate__animated animate__fadeInTopRight'>isDelivered : {`${order?.isDelivered}`}</h6> 
                  </div>
              </div>
              )
            })}</>

          }
          

          </>}
          </>:null

          }
          
          
          </>

          }
        
      </div> }
    </>
  )
}
