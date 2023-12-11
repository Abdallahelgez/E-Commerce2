import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LoadingCart from '../LoadingCart/LoadingCart';
import { Helmet } from 'react-helmet';
import imgCart from '../../images/cart-icon.png'


export default function SubCategoriesOnCategories() {
  let {id}=useParams()
  let [subcategories,setsubcategories]=useState([])
  let [isLoading,setIsLoading]=useState(false)
  let [error,setError]=useState()
  async function getSubCategoriesOnCategories(){
    setIsLoading(true)
    let data=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`).catch((err)=>{
      setError(err?.message);
      setIsLoading(false)
    })
    if (data?.statusText==='OK'){
      if(data.data.results===0){
        setError("there is not found subcategories now. ")
        setIsLoading(false)
      }else{
        setsubcategories(data?.data.data);
      setIsLoading(false)
      }
    }
    
    
    
  }
  useEffect(()=>{
    getSubCategoriesOnCategories()
  },[])
  return (
    <>
      
    
      {isLoading?<LoadingCart/>:<div className="row justify-content-center g-3 align-items-center">
        {subcategories?.map((item)=>{
          return<><Helmet>
          <title>{item.name}</title>
          <link rel="icon" href={imgCart} />
        </Helmet>
          <div className="col-md-4 p-3 " key={item?._id}>
              <div className="item p-3 rounded-5">
              <h6 className='p-2 text-main text-center animate__animated animate__wobble'>{item?.name}</h6>
            </div>
          </div>
          </>
        })}
        {error?<>
            <div className="error shadow all-pad animate__animated animate__fadeIn">
            <h2 className='text-danger text-center animate__animated animate__bounceInLeft'>{error}</h2>
            <Link to={"/E-Commerce/home"}><button className='btn bg-main text-white mt-3 animate__animated animate__backInDown'>Home</button></Link>
            </div>
        </>:null}
      </div>}
    </>
  )
}
