import {Routes , Route, Navigate   } from 'react-router-dom'
import ProtectedRoute from "./pages/dashboard/components/ProtectedRoute";
import { AuthProvider } from "./pages/dashboard/context/AuthContext";

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
import ProductsList from './pages/dashboard/pages/ProductsList';
import ProductsAdd from './pages/dashboard/pages/ProductsAdd';
import ProductsEdit from './pages/dashboard/pages/ProductsEdit';
import CategoryList from './pages/dashboard/pages/CategoryList';
import CategoryAdd from './pages/dashboard/pages/CategoryAdd';
import LoginPage from './pages/dashboard/pages/LoginPage';
import HomeBannerList from './pages/dashboard/pages/HomeBannerList';
import HomeBannerAdd from './pages/dashboard/pages/HomeBannerAdd';
import Faq from './pages/faq/faq'
import Blog from './pages/blog/blog'
import Contact from './pages/contact/Contact'
import CheckResetEmail from './pages/forgotPassword/CheckResetEmail'
import PageTransition from './pages/dashboard/components/PageTransition';


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
          <Route path="faq" element={<Faq />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
 
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        
        <Route path="verifyEmail" element={<Verify />} />
        <Route path="verifyEmail/:token" element={<Verify />} />

        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="checkResetEmail" element={<CheckResetEmail />} />
        <Route path="resetPassword/:token" element={<ResetPassword />} />
        <Route path="successfulEmail" element={<SuccessfulEmail />} />

        {/* ── Admin Auth + Dashboard (AuthProvider هنا بس) ── */}
        <Route
          path="/sys"
          element={
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          }
        />

        <Route element={<PageTransition/>}>
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </AuthProvider>
          }
        >
          
          <Route index element={<Content />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products/list" element={<ProductsList />} />
          <Route path="products/upload" element={<ProductsAdd />} />
          <Route path="products/edit/:id" element={<ProductsEdit />} />
          <Route path="category/list" element={<CategoryList />} />
          <Route path="category/add" element={<CategoryAdd />} />
          <Route path="homeslider/list" element={<HomeBannerList />} />
          <Route path="homeslider/add" element={<HomeBannerAdd />} />


           <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
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