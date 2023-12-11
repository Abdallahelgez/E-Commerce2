import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast  from 'react-hot-toast'
import LoadingCart from '../LoadingCart/LoadingCart'
import imgCart from '../../images/cart-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function Cart() {
  let navigate=useNavigate()
  let [error,setError]=useState()
  let [tokenError,setTokenError]=useState()
  let [empityCartError,setEmpityCartError]=useState()
  let [pathError,setPathError]=useState()
  let [isLoading,setIsLoading]=useState(false)
  let [numOfCartItems,setNumOfCartItems]=useState(0)
  let [totalCartPrice,setTotalCartPrice]=useState(0)
  let [cartProducts,setCartProducts]=useState([])
  let [requestTimeOut,setRequestTimeOut]=useState()
  let [cartId,setCartId]=useState("")
  async function getProducts(index){
    setIsLoading(true)
    let res= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem("token")
      }


    }).catch((err)=>{
      
      if(err.response?.data.message.split(" ").slice(0,2).join(" ")==='Invalid Token.'){
      setTokenError(err.response.data.message)
      }else if(err.response?.data.message.split(" ").slice(0,2).join(" ")==="No cart"){
        setEmpityCartError(err.response.data.message)
      }else if(err.response?.data.message.split(" ").slice(0,3).join(" ")==="Can\'t find this"){
        setPathError("This route isn't right.")
      }else{
        setError(err?.message);
        localStorage.setItem("cart-owner",err.response?.data.message.split(': ').slice(1).join());
      }
      
      
    });
    
    if(res?.data.status==='success'){
    setCartId(res.data?.data._id)
    localStorage.setItem("cart-owner",res?.data.data.cartOwner);
    let newCartProducts=[...res?.data.data.products];
        var totalPrice=0;
        var counter=0;
        for(index=0;index<newCartProducts.length;index++){
        
          totalPrice=(newCartProducts[index]['price']*newCartProducts[index]['count'])+ totalPrice
          
      
          if(newCartProducts[index]['count']===0){
            newCartProducts.splice(index,1)
          }
          if(newCartProducts[index]['count']!==0){
              counter++
            
          }

        }
        
    setCartProducts(newCartProducts);
    setTotalCartPrice(totalPrice)
    setNumOfCartItems(counter)      
    // setCartProducts(res.data?.data.products);
    // setTotalCartPrice(res.data?.data.totalCartPrice)
    // setNumOfCartItems(res.data?.numOfCartItems)
  }
    setIsLoading(false)
  }
  useEffect(()=>{
    getProducts()
  },[])
  async function removeItem(productId,index){
    let newCartProducts=[...cartProducts];
        var totalPrice=0;
        var counter=0;
        for(index=0;index<newCartProducts.length;index++){
          if(newCartProducts[index]['_id']===productId){
            newCartProducts[index]['_id'].splice(index,1)
          }else{
            totalPrice=(newCartProducts[index]['price']*newCartProducts[index]['count'])+ totalPrice
            counter++
          }
        }
    setCartProducts(newCartProducts);
    setTotalCartPrice(totalPrice)
    setNumOfCartItems(counter)
    let data=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
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
    if(data?.data.status==='success'){
      setCartProducts(data.data.data?.products);
      setTotalCartPrice(data.data.data?.totalCartPrice)
      setNumOfCartItems(data.data?.numOfCartItems)
      toast.success("The Item Deleted Successfuly")
      
    }
  }
  async function clearCart(){
    let data=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/',{
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
    
    
    if(data?.data.message==="success"){
      toast.success("The Cart Deleted Successfuly")
      setCartProducts([]);
      setTotalCartPrice(0)
      setNumOfCartItems(0)
    }
  }
    function updateProduct(productId,count,index){
        let newCartProducts=[...cartProducts];
        newCartProducts[index]['count']=count
        
      
        var totalPrice=0;
        var counter=0;
        for(index=0;index<newCartProducts.length;index++){
        
          totalPrice=(newCartProducts[index]['price']*newCartProducts[index]['count'])+ totalPrice
          
          if(newCartProducts[index]['count']!==0){
            counter++
            
          }

        }
        setCartProducts(newCartProducts);
        setNumOfCartItems(counter)
        setTotalCartPrice(totalPrice)
        clearTimeout(requestTimeOut)
        setRequestTimeOut(setTimeout(async()=>{
          let data= await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{count},{
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
          if(data?.data.status==='success'){
            setNumOfCartItems (data?.data.numOfCartItems);
            setCartProducts(data.data.data?.products);
            setTotalCartPrice(data.data.data?.totalCartPrice)
          }
          
        
        },500))
  }
  
  return (
    <>
    <Helmet>
      <title>Cart</title>
      <link rel="icon" href={imgCart} />
      
    </Helmet>
      {isLoading?<LoadingCart/>:<>
      {tokenError || pathError ||error?<>
        <div className="error shadow all-pad">
     <h2 className='text-danger text-center animate__animated animate__flip '>{pathError || tokenError || error}</h2>
     <Link to={"/E-Commerce/home"}><button className='btn animate__animated animate__backInDown bg-main text-white mt-3'>Home</button></Link>
     
     </div></>:<>{empityCartError?
      <>
             <div className='d-flex justify-content-center align-items-center'>
               <img src={imgCart} className='w-25 animate__animated animate__rollIn' alt='empity cart' />
             </div>
             <h2 className='text-center text-main animate__animated animate__flip'>Your cart is currently empty</h2>    
                </>:<>
                <> 
      <div className='text-end '>
      <button  className='btn btn-danger animate__animated animate__bounceInUp'  onClick={clearCart} >Clear</button>
      </div>
      <div className='text-start mb-3 animate__animated animate__bounceInRight'>    <h5>Number of Cart Items: {numOfCartItems}.</h5>
      </div>
      
       {cartProducts?.map((product,index)=>{
       return (
        <> 
       {cartProducts.count===0?null:
       <div key={product.product._id} className="row align-items-center p-1 g-5 rounded-3 shadow m-1">
       <div className="col-md-3">
         <img src={product.product.imageCover} alt={product.product.title} className='w-100 my-3 animate__animated animate__rotateIn' />
       </div>
       <div className="col-md-9 ">
         <div className='d-flex align-items-center justify-content-between '>
           <div>
           <h3 className='animate__animated animate__bounceInUp'>{product.product.title}</h3>
           <h5 className='animate__animated animate__bounceInLeft'>{product.product.category.name}</h5>
          
             <p className='animate__animated animate__bounceInRight'>Price :{product.price}EGP</p>
             <p className='animate__animated animate__bounceInDown'><i className='fas text-main fa-star'></i> {product.product.ratingsAverage}</p>
          
           </div>
        
         <div className='align-items-between animate__animated animate__zoomInDown'>
         <div>
           <button  onClick={()=>removeItem(product.product._id,index)} className='btn text-danger' >Remove</button>
         </div>
         <div className='d-flex align-items-center m-3'>
           <button disabled={product.count===1} onClick={()=>updateProduct(product.product._id,product.count -1 ,index)} className=' btn bg-main text-white fs-5 p-2 m-1'>-</button>
           <span>{product.count}</span>
           <button disabled={product.count===10} onClick={()=>updateProduct(product.product._id,product.count +1,index)} className='btn bg-main text-white fs-5 p-2 m-1'>+</button>
         </div>
         </div>
       </div>
       </div>
     </div>
     }
       
       </>)

       })}
       <div className='d-flex flex-wrap'>
        <div className='me-auto'><Link to={"/E-Commerce/checkout/"+ cartId}><button className='btn bg-main text-white mt-3 me-3 animate__animated animate__bounceInDown'>Check out</button></Link>
        <Link to={"/E-Commerce/cash-order/"+ cartId}><button className='btn bg-main text-white mt-3 animate__animated animate__bounceInRight'>Cash</button></Link></div>
        <h5 className=' mt-3 text-center animate__animated animate__bounceInUp'>Total Cart Price: {totalCartPrice}EGP</h5>
        
       </div> </>       
                </>
     }
     </>}
      </>}
  </>)
}

export default Cart;



