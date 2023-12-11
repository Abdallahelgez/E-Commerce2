import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import imgCart from '../../images/cart-icon.png'
export default function SubCategories() {
  let [allSubCategories,setAllSubCategories]=useState([])
  
  
  async function getAllSubCategories(){
    let config={
      params:{
        limit:50,
      
      }
    }
    let data= await axios.get('https://route-ecommerce.onrender.com/api/v1/subcategories',config)
  
    setAllSubCategories(data?.data.data);

  }
  useEffect(()=>{
    getAllSubCategories()
  })
  return (
    <>
    
    <Helmet>
      <title>Sub Categories</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
      <div className="row g-3 justify-content-center">
        {allSubCategories.map((subcategories)=>{
          return(
            <div className="col-md-4" key={subcategories._id}>
                <div className="subcategories item text-center p-4 overflow-hidden rounded-5 postion-relative">
            <h3 className='text-main font-sm animate__animated animate__wobble'>{subcategories.name}</h3>
            </div>
            </div>
          )

        })}
      </div>
    </> 
  )
}
