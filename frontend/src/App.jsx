import {Routes , Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import Landing from './pages/Landing'
import About from './pages/about/About'
import Verify from './pages/verifyEmail/Verify'
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ShoppingCartProvider from "./context/ShoppingCartContext"; // 1. استيراد الـ Provider
import Products from './pages/products/Products'
import ProductDetails from './pages/products/ProductDetails'
import ResetPassword from "./pages/resetPassword/ResetPassword"
import SuccessfulEmail from './pages/successfulEmail/SuccessfulEmail'
import Users from './pages/dashboard/pages/Users'
import Orders from './pages/dashboard/pages/Orders'
import Checkout from './pages/checkout/Checkout';
import Content from './pages/dashboard/pages/Content'


function App() {

  return (
    <>
    <ShoppingCartProvider>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout/>} />
        </Route>
 
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verifyEmail" element={<Verify />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="successfulEmail" element={<SuccessfulEmail />} />


         {/* الصفحة الرئيسية */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Content />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </ShoppingCartProvider>
    
      {/* <Routes>
    <Route path="/dashboard" element={<Dashboard />}>
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        


    </Route>
    </Routes> */}
    </>
  );

}

export default App;