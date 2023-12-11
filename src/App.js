import './App.css';
import {createBrowserRouter ,Navigate,RouterProvider} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';
import Cart from './components/Cart/Cart';
import Notfound from './components/Notfound/Notfound';
import Home from './components/Home/Home'
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotProtectedRoute from './components/NotProtectedRoute/NotProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CheckOut from './components/CheckOut/CheckOut';
import ResetCode from './components/ResetCode/ResetCode';
import WishList from './components/WishList/WishList';
import SubCategories from './components/SubCategories/SubCategories';
import Addresses from './components/Addresses/Addresses';
import AddAddress from './components/AddAddress/AddAddress';
import CashOrder from './components/CashOrder/CashOrder';
import SubCategoriesOnCategories from './components/SubCategoriesOnCategories/SubCategoriesOnCategories';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import UpdateData from './components/UpdateData/UpdateData';
import AllOrders from './components/AllOrders/AllOrders';
function App() {
  
let routers=createBrowserRouter([
  {path:'E-Commerce',element:<Layout/>,children:[
    { path: '', element: <Navigate to={'home'} /> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'update-password', element: <ProtectedRoute> <UpdatePassword/> </ProtectedRoute> },
        { path: 'orders', element: <ProtectedRoute> <AllOrders/> </ProtectedRoute> },
        { path: 'update-personal-data', element: <ProtectedRoute> <UpdateData/> </ProtectedRoute> },
        { path: 'categories/:id/subcategories', element: <ProtectedRoute><SubCategoriesOnCategories /></ProtectedRoute>},
        { path: 'all-sub-categories', element: <ProtectedRoute><SubCategories/>  </ProtectedRoute>},
        { path: 'cart', element:<ProtectedRoute> <Cart /></ProtectedRoute>},
        { path: 'wishlist', element:<ProtectedRoute> <WishList/> </ProtectedRoute>},
        { path: 'checkout/:id', element: <ProtectedRoute> <CheckOut/> </ProtectedRoute>},
        { path: 'cash-order/:id', element: <ProtectedRoute> <CashOrder/> </ProtectedRoute>},
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
        { path: 'addresses', element: <ProtectedRoute> <Addresses/></ProtectedRoute>},
        { path: 'add-address', element: <ProtectedRoute> <AddAddress/> </ProtectedRoute>},
        { path: 'signup', element: <NotProtectedRoute><Signup /></NotProtectedRoute>},
        { path: 'login', element: <NotProtectedRoute><Login /></NotProtectedRoute> },
        { path: 'forget-password', element:<NotProtectedRoute> <ForgetPassword/> </NotProtectedRoute> },
        { path: 'reset-code', element:<NotProtectedRoute> <ResetCode/> </NotProtectedRoute> },
        { path: '*', element: <ProtectedRoute><Notfound /></ProtectedRoute> }
  ]
} 
]);

  return (
    <>
  <RouterProvider router={routers}>

</RouterProvider>
    </>
  );
}

export default App;
