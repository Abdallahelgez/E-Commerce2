import 'animate.css';
import React, { useContext} from 'react'
import logo from './../../images/freshcart-logo.svg'
import {Link, Route, useNavigate, useParams} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios';
import toast from 'react-hot-toast';
function Navbar() {
  let {isUserLoggedIn,setIsUserLoggedIn}=useContext(AuthContext);
  let navigate=useNavigate()
  
   function logout(){
    localStorage.removeItem("cart-owner")
    localStorage.removeItem('token')
    setIsUserLoggedIn(false)
    navigate('/E-Commerce/login')
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container">
    <Link className="navbar-brand"  to="/E-Commerce/home"><img src={logo} className='w-100' alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
    {isUserLoggedIn?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  className={window.location.pathname==="/E-Commerce/home"?"nav-link active":"nav-link"} aria-current="page"  to="/E-Commerce/home">Home</Link>
        </li>
        
        <li className="nav-item" >
          <Link className={window.location.pathname==="/E-Commerce/all-sub-categories"?"nav-link active":"nav-link"}  to="/E-Commerce/all-sub-categories">Sub Categories</Link>
        </li>
        <li className="nav-item">
          <Link className={window.location.pathname==="/E-Commerce/wishlist"?"nav-link active":"nav-link"}  to="/E-Commerce/wishlist">Wishlist</Link>
        </li>
        <li className="nav-item">
          <Link className={window.location.pathname==="/E-Commerce/orders"?"nav-link active":"nav-link"}  to="/E-Commerce/orders">Orders</Link>
        </li>
        <li className="nav-item">
          <Link className={window.location.pathname==="/E-Commerce/addresses"?"nav-link active":"nav-link"}  to="/E-Commerce/addresses">Addresses</Link>
        </li>
        
      </ul>:null}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {!isUserLoggedIn?<><li className="nav-item">
          <Link className={window.location.pathname==="/E-Commerce/login"?"nav-link active":"nav-link"}  to="/E-Commerce/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className={window.location.pathname==="/E-Commerce/signup"?"nav-link active":"nav-link"}  to="/E-Commerce/signup">Register</Link>
        </li></>:null}
        {isUserLoggedIn?<Link className={window.location.pathname==="/E-Commerce/cart"?"nav-link active":"nav-link"}  to="/E-Commerce/cart" ><i className="fa-solid fa-cart-shopping fs-1 ms-auto"></i></Link>:null}
        
        {isUserLoggedIn?  <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Settings
          </a>
            <ul className="dropdown-menu bg-light menu" aria-labelledby="navbarDropdownMenuLink">
            <li><Link className="dropdown-item font-small" to={"/E-Commerce/update-password"}>Update password</Link></li>
            <li><Link className="dropdown-item" to={"/E-Commerce/update-personal-data"}>Update details data</Link></li>
            <li><Link className="dropdown-item" to={"/E-Commerce/add-address"}>Add address</Link></li>
            <li >
          <Link className="dropdown-item" onClick={logout}>Logout</Link>
        </li>
          </ul>
        </li>:null}
      </ul>
    </div>
    
    
  </div>
</nav></>
  )
}

export default Navbar;
