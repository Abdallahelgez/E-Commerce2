import 'animate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import LoadingCart from '../LoadingCart/LoadingCart';
function Categories() {
  let [categories,setCategories]=useState();
  let [isLoading,setIsLoading]=useState(false)
  let [error,setError]=useState()
async  function getCategories(){
  setIsLoading(true)
  let res=await axios.get('https://ecommerce.routemisr.com/api/v1/categories').catch((err)=>{
    if(err?.name==='AxiosError'){
      setError(err?.message)
    }
    setIsLoading(false)
  })
  if(res?.statusText==='OK'){
    setCategories(res?.data.data)
    setIsLoading(false)  
    
  }
}
  useEffect(()=>{
    getCategories();
  },[])
  const settings={
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3500,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
      
  }

  return (
    <>
    {!error?<div className="row">
      <Slider {...settings} >
      {categories?.map((category)=>{
        return <>
        <div   key={category?._id}>
          <Link to={'/E-Commerce/categories/'+category?._id+'/subcategories'}>
          <img height={200} src={category?.image} alt={category?.name} title={category?.name} className='w-100 animate__animated animate__fadeInUpBig'/>
          <div className='w-100 text-center overflow-hidden font-sm animate__animated animate__animated animate__backInDown'>{category?.name.split(" ").slice(0,1).join(" ")}</div>
          </Link>
          </div>
          
        </>
      })}
    </Slider>
      </div>:null}

    </>
  )
}

export default Categories