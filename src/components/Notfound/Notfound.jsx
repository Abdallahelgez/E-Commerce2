import 'animate.css';
import React from 'react'
import notfound from './../../images/error.svg'
import { Helmet } from 'react-helmet';
import imgCart from '../../images/cart-icon.png'
function Notfound() {
  return (
    <>
    <Helmet>
      <title>Not Found</title>
      <link rel="icon" href={imgCart} />
    </Helmet>
    <div className='text-center'>
      <img src={notfound} className='w-75' alt="Error 404" title='Error 404' />
    </div></>
    
  )
}

export default Notfound