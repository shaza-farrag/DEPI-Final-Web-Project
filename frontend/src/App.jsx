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
import ResetPassword from "./pages/resetPassword/ResetPassword"
import SuccessfulEmail from './pages/successfulEmail/SuccessfulEmail'
import Checkout from './pages/Checkout/Checkout'


function App() {

  return (

    <ShoppingCartProvider>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verifyEmail" element={<Verify />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="successfulEmail" element={<SuccessfulEmail />} />
         <Route path="Checkout" element={<Checkout />} />

      </Routes>
    </ShoppingCartProvider>
  );

}

export default App;